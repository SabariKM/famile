<?php

use LDAP\Result;

defined('BASEPATH') or exit('No direct script access allowed');

class Mainmodel extends CI_Model
{

    public function arrayToDataArray($arrayData)
    {
        foreach ($arrayData as $key => $value) {
            if (is_string($value)) {
                $data[$key] = $value;
            }
        }
        return isset($data) ? $data : null;
    }

    public function access_code_create()
    {
        return time() . rand(1000, 9999);
    }

    public function getUserID($access_code)
    {
        return $this->db->get_where('access_profile', array('access_code' => $access_code))->row()->id;
    }

    public function access_code_verify($access_code)
    {
        $ret_val = $this->db->get_where('access_profile', array('access_code' => $access_code));
        if ($ret_val->num_rows() == 1) {
            return $ret_val->row();
        } else {
            return false;
        }
    }

    public function update_access_time($access_code)
    {
        $this->db->where('access_code', $access_code);
        $ret_val = $this->db->update('access_profile', array('last_acces_dt' => date("Y/m/d h:i:s")));
        if ($this->db->affected_rows() == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function create_verification_code($access_code)
    {
        $qret = false;
        $data['access_code'] = $access_code;
        $data['verification_code'] = rand(10000, 99999);

        $exis = $this->db->get_where('user_verification_code', array('access_code' => $data['access_code']));
        if ($exis->num_rows() > 0) {
            $this->db->where('access_code', $data['access_code']);
            $qret = $this->db->update('user_verification_code', array('verification_code' => $data['verification_code']));
        } else {
            $qret = $this->db->insert('user_verification_code', $data);
        }

        return $data['verification_code'];
    }

    public function edit_insert($access_code, $table_name)
    {
        $ret_val = $this->db->get_where('access_profile', array('access_code' => $access_code));
        if ($ret_val->num_rows() == 1) {
            $phone = $ret_val->row()->phone;
            $this->db->get_where($table_name, array('phone_access' => $phone));
            if ($ret_val->num_rows() == 1) {
                return 0;
            } else {
                return 1;
            }
        } else {
            return 2;
        }
    }

    public function createPassword($access_code)
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 6; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        $pass = implode($pass);
        $this->db->where('access_code', $access_code);
        $this->db->update('access_profile', array('password' => $pass));
        return $pass; //turn the array into a string
    }

    public function getPersonalInformations()
    {

        return $this->db->get('personal_info')->result_array();
    }

    public function getPersonalPreferance()
    {

        return $this->db->get('preference')->result_array();
    }

    public function getPersonalRegisteredUsers()
    {

        return $this->db->get('access_profile')->result_array();
    }

    public function getUsersSubscriptions()
    {

        return $this->db->get('subscriptions')->result_array();
    }

    public function getDataCount()
    {
        $data['reg_users'] = $this->db->query('select count(*) as cnt from access_profile')->row()->cnt;
        $data['personal_info'] = $this->db->query('select count(*) as cnt from personal_info')->row()->cnt;
        $data['preference'] = $this->db->query('select count(*) as cnt from preference')->row()->cnt;
        $data['subscribed'] = $this->db->query('select count(*) as cnt from subscriptions where status=1')->row()->cnt;

        return $data;
    }

    public function setPmt_init_db($authId, $amount)
    {
        $this->db->select(" max(cast(SUBSTRING(orderId, 6) as UNSIGNED)) as orderId");
        $retid = $this->db->get('subscriptions')->row();
        if (isset($retid->orderId)) {
            $val = (int)$retid->orderId + 1;
            $order_id = 'test_' . $val;
        } else {
            $order_id = 'test_1';
        }

        $ret_acc = $this->db->get_where('access_profile', array('access_code' => $authId))->row()->id;
        $this->db->insert('subscriptions', array('user_id' => $ret_acc, 'orderId' => $order_id ? $order_id : 'fmly_1', 'amount' => $amount));

        return $order_id;
    }

    public function setPmt_Callback_db($orderId, $resp_data)
    {
        $this->db->get_where('subscriptions', array('orderId'));
        $futureDate = date('Y-m-d', strtotime('+1 year'));
        $this->db->insert('subscriptions', array(
            'amount' => $resp_data['amount'], 'transaction_id' =>  $resp_data['transactionId'],
            'providerReferenceId' => $resp_data['providerReferenceId'], 'responseType' => 'cal_back', "valid_till" => $futureDate, "sub_date" => date('Y-m-d')
        ));
    }

    private function get_valid_users()
    {
        return $this->db->query('select a.id from access_profile a inner join subscriptions b on a.id = b.user_id and b.valid_till >= CURDATE();')->result_array();
    }

    private function set_matching_profile_comunications($dataArray)
    {
        $data['url'] = time() . $this->random_strings(5);
        $data['sender_id'] = $dataArray['sender_id'];
        $data['receiver_id'] = $dataArray['receiver_id'];

        return $this->db->insert('matching_profile_coms', $data);
    }

    public function generate_new_matching_profile()
    {
        $query = "select t.* from (select a.user_id as sender_id, b.user_id as receiver_id from preference a inner join personal_info b on a.gender = b.gender 
        and a.fromAge <= DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),DATE_FORMAT(STR_TO_DATE(b.dob, '%d-%m-%Y'), '%Y-%m-%d'))), '%Y') 
        and a.toAge >= DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),DATE_FORMAT(STR_TO_DATE(b.dob, '%d-%m-%Y'), '%Y-%m-%d'))), '%Y') 
        and a.food = b.food and a.language = b.language and a.religion = b.religion and a.state = b.state and a.country = b.country) as t 
        where CONCAT(t.sender_id, t.receiver_id) not in (select CONCAT(c.sender_id,c.receiver_id) from matching_profile_coms c where status = 0);";

        $retData = $this->db->query($query);
        if ($retData->num_rows() > 0) {
            foreach ($retData->result_array() as $row) {
                $this->set_matching_profile_comunications($row);
            }
        }
    }

    public function get_matching_profiles()
    {
        $data = [];
        $validUserid = $this->get_valid_users();
        $query = "select a.url,a.receiver_id,a.sender_id,b.*, DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),DATE_FORMAT(STR_TO_DATE(b.dob, '%d-%m-%Y'), '%Y-%m-%d'))), '%Y') +0 as age 
        from matching_profile_coms a inner join personal_info b on a.receiver_id = b.user_id WHERE a.created_dt > NOW() - INTERVAL 30 DAY and a.sender_id=";


        foreach ($validUserid as $userId) {
            $query = $query . $userId['id'];
            $retData = $this->db->query($query);
            if ($retData->num_rows() > 0) {
                array_push($data,  $retData->result_array());
            }
        }
        return $data;
    }

    public function update_sender_email_status($email_sent_arr)
    {
        foreach ($email_sent_arr as $row) {
            $this->update_matching_status($row['url'], 'receiver_emailed');
        }
    }

    public function update_matching_status($uqURL, $variable)
    {
        $this->db->where('url', $uqURL);
        $this->db->update('matching_profile_coms', array($variable => date('Y-m-d H:i:s')));
    }

    //utility
    public function sendEmail($to, $subject, $message_body)
    {
        $to      = $to;
        $subject = $subject;
        $message = $message_body;
        $headers = 'From: info@famile.org' . "\r\n" .
            'Reply-To: info@famile.org' . "\r\n" .
            'Content-type:text/html;charset=UTF-8' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
        return mail($to, $subject, $message, $headers);
    }
    function random_strings($length_of_string)
    {
        // String of all alphanumeric character
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        // Shuffle the $str_result and returns substring
        // of specified length
        return substr(str_shuffle($str_result), 0, $length_of_string);
    }

    //send SMS 
    private function smsMessage($type, $arrData)
    {
        $message = '';
        if ($type == 'otp') {
            $message = 'Dear ' . substr(explode(" ", trim($arrData['titleName']))[0], 0, 10) . ',%n' . substr($arrData['otpNum'], 0, 5) . ' is the OTP to verify your profile on Famile Matrimony (valid for 60 sec).%nNote: Do not share the OTP with anyone. -Famile';
        } else if ($type == 'password') {
            $message = 'Dear ' . substr(explode(" ", trim($arrData['titleName']))[0], 0, 10) . ',%nYour Famile.org password is ' . substr($arrData['password'], 0, 6) . '. Please do not share it with anyone. -Famile';
        }
        return $message;
    }

    public function sendSMS($phoneArr, $messagetype, $msgParamArr)
    {
        // Account details
        $apiKey = urlencode('NzMzMzU5NDI0MTVhNDk0NzQxNjI3YTczNjc3MzUyNDM=');

        // Message details
        $numbers = $phoneArr;
        $sender = urlencode('FAMCOM');
        $message = rawurlencode($this->smsMessage($messagetype, $msgParamArr));
        $numbers = implode(',', $numbers);

        // Prepare data for POST request
        $data = array('apikey' => $apiKey, 'numbers' => $numbers, "sender" => $sender, "message" => $message);

        // Send the POST request with cURL
        $ch = curl_init('https://api.textlocal.in/send/');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        // Process your response here
        return $response;
    }
}
