<?php

defined('BASEPATH') or exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
class Pi extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->db->query("SET time_zone='+5:30'");
    }

    public function paymentInitiate()
    {
        if (!$this->mm->access_code_verify($this->input->post('authId'))) {
            $ret_data['status_code'] = 101;
            $ret_data['status_msg'] = "Access Code not correct, Please login again.";
            echo json_encode($ret_data);
            return;
        }
        $authId = $this->input->post('authId');
        $phoneNumber = $this->input->post('phoneNumber');
        $amount = 1;
        $merchantTransactionId = $this->mm->setPmt_init_db($authId, $amount);

        $jayParsedAry = [
            "merchantId" => 'M16GR563D6R8',
            "merchantTransactionId" => $merchantTransactionId,
            "merchantUserId" => 'MUID_' . $authId . '_' . time(),
            "amount" => ($amount * 100),
            "redirectMode" => "POST",
            "redirectUrl" =>   base_url('index.php/pi/callbk_url/'),  //change in production;
            "mobileNumber" => $phoneNumber,
            "paymentInstrument" => [
                "type" => "PAY_PAGE"
            ],
        ];
        $encode = json_encode($jayParsedAry);
        $encoded = base64_encode($encode);
        $key = '736059fd-2d56-4a84-ac9b-c9477f8ada7d'; // KEY
        $key_index = 1; // KEY_INDEX
        $string = $encoded . "/pg/v1/pay" . $key;
        $sha256 = hash("sha256", $string);
        $final_x_header = $sha256 . '###' . $key_index;

        $data = json_encode(['request' => $encoded]);

        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => "https://api.phonepe.com/apis/hermes/pg/v1/pay",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTPHEADER => [
                "Content-Type: application/json",
                "accept: application/json",
                "X-VERIFY: " . $final_x_header,
            ],
            CURLOPT_POSTFIELDS => $data
        ]);

        $response = json_decode(curl_exec($curl));
        $err = curl_error($curl);

        curl_close($curl);
        if ($err) {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = "Payment Performed unsuccesful";
            $ret_data['pg_response'] = $err;
            echo json_encode($ret_data);
            // return;
        } else {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = "Payment Performed";
            $ret_data['pg_response'] = $response;
            echo json_encode($ret_data);
            // return;
        }
    }

    public function callbk_url()
    {
        $resp_data = $_POST;
        $order_id = $resp_data['merchantOrderId'];

        $acc = $this->db->query("SELECT b.phone, b.access_code FROM `subscriptions` a inner join access_profile b on a.user_id = b.id where orderId = '$order_id';")->row();

        if ($resp_data['code'] == 'PAYMENT_SUCCESS') {

            $this->db->where('orderId', $order_id);
            $this->db->update('subscriptions', array(
                'sub_date' =>
                date('y-m-d'), 'valid_till' => Date('y:m:d', strtotime('+365 days')),
                'amount' => ($resp_data['amount'] / 100), 'transaction_id' =>  $resp_data['transactionId'],
                'providerReferenceId' => isset($resp_data['providerReferenceId']) ? $resp_data['providerReferenceId'] : 'Error', 'status' => $resp_data['code'], 'responseType' => 'cal_back'
            ));

            header('Location: ' . $this->config->item('cust_url') . '?path=pmtresult&aid=' . $acc->access_code . '&phone=' . $acc->phone . '');
        } else {
            header('Location: ' . $this->config->item('cust_url') . '?path=pmtfailed&aid=' . $acc->access_code . '&phone=' . $acc->phone . '');
        }
    }
}
