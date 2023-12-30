<?php

defined('BASEPATH') or exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
class Cust extends CI_Controller
{

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     * 		http://example.com/index.php/welcome
     * 	- or -
     * 		http://example.com/index.php/welcome/index
     * 	- or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     * success - 200
     * unsuccess- 201
     */
    public function __construct()
    {
        parent::__construct();
        $this->db->query("SET time_zone='+5:30'");
    }
    public function index()
    {
        return true;
    }
    public function login_acc()
    {
        $ret_data = array();
        $uname = $this->input->post('phone');
        $pwd = $this->input->post('password');

        $ret_val = $this->db->get_where('access_profile', array('phone' => $this->input->post('phone')));
        if ($ret_val->num_rows() < 1) {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Account Not Registered, Please Register.';
        } else {

            $acc = $this->db->get_where('access_profile', array('phone' => $uname, 'password' => $pwd));
            if ($acc->num_rows() == 1) {
                $acc_code = $this->mm->access_code_create();

                $this->db->where('phone', $uname);
                $ret = $this->db->update('access_profile', array('access_code' => $acc_code));

                if ($ret) {
                    $ret_data['access_code'] = $acc_code;
                    $ret_data['status_code'] = 200;
                    $ret_data['status_msg'] = 'Login Successful';
                }
            } else {
                $ret_data['status_code'] = 201;
                $ret_data['status_msg'] = 'Incorrect Password';
            }
        }

        echo json_encode($ret_data);
    }
    public function signup()
    {
        $data = $this->mm->arrayToDataArray($_POST);

        $phone_exis = $this->db->get_where('access_profile', array('phone' => $data['phone']));

        if ($phone_exis->num_rows() > 0) {
            $ret_data['status_code'] = 203;
            $ret_data['status_msg'] = 'Phone number exists, please use valid phone number.';
        } else {
            if (is_null($data['name']) || empty($data['name']) || is_null($data['phone']) || empty($data['phone'])) {
                $ret_data['status_code'] = 202;
                $ret_data['status_msg'] = 'Information provided is not sufficient.';
            } else {
                $data['access_code'] = $this->mm->access_code_create();
                if ($this->db->insert('access_profile', $data)) {
                    $this->mm->create_verification_code($data['access_code']);
                    $ret_data['authId'] = $data['access_code'];
                    $ret_data['status_code'] = 200;
                    $ret_data['status_msg'] = 'Signup Successful';
                } else {
                    $ret_data['status_code'] = 201;
                    $ret_data['status_msg'] = 'Signup Not-Successful';
                }
            }
        }

        echo json_encode($ret_data);
    }

    public function updatePhoneSignup()
    {
        $ret_data['status_code'] = 201;
        $ret_data['status_msg'] = 'Access not accepted';

        $data = $this->mm->arrayToDataArray($_POST);

        if (isset($data['authId'])) {
            $phone_exis = $this->db->get_where('access_profile', array('phone', $data['phone']));

            if ($phone_exis->num_rows() > 0) {
                $ret_data['status_code'] = 203;
                $ret_data['status_msg'] = 'Phone number exists, please use valid phone number.';
            } else {
                $this->db->where('access_code', $data['authId']);
                $this->db->update('access_profile', array('phone' => $data['phone']));
                if ($this->db->affected_rows() > 0) {
                    $ret_data['status_code'] = 200;
                    $ret_data['status_msg'] = 'Phone Number Updated';
                } else {
                    $ret_data['status_code'] = 201;
                    $ret_data['status_msg'] = 'Phone Number not updated';
                }
            }
        }

        echo json_encode($ret_data);
    }

    public function updateEmailSignup()
    {
        $ret_data['status_code'] = 201;
        $ret_data['status_msg'] = 'Access not accepted';

        $data = $this->mm->arrayToDataArray($_POST);

        if (isset($data['authId'])) {
            $phone_exis = $this->db->get_where('access_profile', array('email' => $data['email']));

            if ($phone_exis->num_rows() > 0) {
                $ret_data['status_code'] = 203;
                $ret_data['status_msg'] = 'Email id exists, please use valid email id.';
            } else {
                $this->db->where('access_code', $data['authId']);
                $this->db->update('access_profile', array('email' => $data['email']));
                if ($this->db->affected_rows() > 0) {
                    $ret_data['status_code'] = 200;
                    $ret_data['status_msg'] = 'Email Number Updated';
                } else {
                    $ret_data['status_code'] = 201;
                    $ret_data['status_msg'] = 'Email Number not updated';
                }
            }
        }

        echo json_encode($ret_data);
    }

    public function updateGeneric()
    {
        $ret_data['status_code'] = 201;
        $ret_data['status_msg'] = 'Access not accepted';

        $data = $this->mm->arrayToDataArray($_POST);
        $authId = $data['authId'];
        unset($data['authId']);
        if (isset($authId)) {

            $phone_exis = $this->db->get_where('access_profile', $data);

            if ($phone_exis->num_rows() > 0) {
                $ret_data['status_code'] = 203;
                $ret_data['status_msg'] = "Already exists, please try with alternate value.";
            } else {
                $this->db->where('access_code', $authId);
                $this->db->update('access_profile', $data);
                if ($this->db->affected_rows() > 0) {
                    $ret_data['status_code'] = 200;
                    $ret_data['status_msg'] = 'Profile Updated';
                } else {
                    $ret_data['status_code'] = 201;
                    $ret_data['status_msg'] = 'Profile updated';
                }
            }
        }

        echo json_encode($ret_data);
    }

    public function verifyVerificationNumber()
    {

        $data = $this->mm->arrayToDataArray($_POST);
        $type = $data['type'];
        unset($data['type']);
        $this->db->limit(1);
        $this->db->order_by('create_dt', 'desc');
        $exis = $this->db->get_where('user_verification_code', $data);
        $ret_resp = '';
        if ($exis->num_rows() > 0) {
            if ($type == 'phone') {
                //send OTP Email
                $this->mm->create_verification_code($data['access_code']);
                $password = ''; //remove
            }
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Verification Code Accepted. ' . $ret_resp;
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Verification Code Not Accepted.';
        }

        echo json_encode($ret_data);
    }

    public function resend_verification_number()
    {
        $ret_response['status'] = 'failed';
        $access_code = $this->input->post('access_code');
        $sendType = $this->input->post('type');

        $access_Data = $this->db->get_where('access_profile', array('access_code' => $access_code));
        $otpCode = $this->mm->create_verification_code($access_code);
        if ($sendType == 'phone') {
            if ($access_Data->num_rows() > 0) {
                $access_Data = $access_Data->row();
                $ret_response = json_decode($this->mm->sendSMS(array($access_Data->phone), 'otp', array('titleName' => $access_Data->name, 'otpNum' => $otpCode)), true);
            }
            if ($ret_response['status'] == 'success') {
                $ret_data['status_code'] = 200;
                $ret_data['status_msg'] = 'OTP Has Been Sent To Your Registered Phone.';
            } else {
                $ret_data['status_code'] = 201;
                $ret_data['status_msg'] = 'Unable To Send OTP To Phone.';
            }
        } else if ($sendType == 'email') {
            if ($access_Data->num_rows() > 0) {
                $access_Data = $access_Data->row();
                $ret_response = $this->mm->sendEmail($access_Data->email, "Your OTP For Famile Email Verification", $this->load->view('emailTemplates/userOTP_email', array('otp' => $otpCode), true));
            }
            if ($ret_response) {
                $ret_data['status_code'] = 200;
                $ret_data['status_msg'] = 'OTP Has Been Sent To Your Registered Email.';
            } else {
                $ret_data = 201;
                $ret_data['status_msg'] = 'Unable To Send OTP To Email.';
            }
        }
        echo json_encode($ret_data);
    }

    public function createPass(
        $access_code,
        $password
    ) {
        $ret_response['status'] = 'failed';
        $access_Data = $this->db->get_where('access_profile', array('access_code' => $access_code));

        if ($access_Data->num_rows() > 0) {
            $access_Data = $access_Data->row();
            $ret_response = json_decode($this->mm->sendSMS(array($access_Data->phone), 'password', array('titleName' => $access_Data->name, 'password' => $password)), true);
            if ($ret_response['status'] == 'success') {
                $ret_data = 'Password Has Been Sent To Your Registered Phone.';
            } else {
                $ret_data = 'Unable To Send Password To Phone.';
            }
            $ret_response = $this->mm->sendEmail($access_Data->email, "Your Password For Famile Login", $this->load->view('emailTemplates/userPassword_email', array('password' => $password), true));
            if ($ret_response) {
                $ret_data = $ret_data . ' ' . 'Password Has Been Sent To Your Registered Email.';
            } else {
                $ret_data = $ret_data . ' ' . 'Unable To Send Password To Email.';
            }
        } else {
            $ret_data = 201;
            $ret_data =  'Failed to retrive users.';
        }
        return $ret_data;
    }

    public function phone_exists()
    {
        $ret_val = $this->db->get_where('access_profile', array('phone' => $this->input->post('phone')));
        if ($ret_val->num_rows() < 1) {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Phone Number does not exists';
        } else {
            $ret_data['status_code'] = 202;
            $ret_data['status_msg'] = 'Phone Number does exists';
        }
    }

    public function email_exists()
    {
        $ret_val = $this->db->get_where('access_profile', array('email' => $this->input->post('email')));
        if ($ret_val->num_rows() < 1) {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Email does not exists';
        } else {
            $ret_data['status_code'] = 202;
            $ret_data['status_msg'] = 'Email does exists';
        }
    }

    public function setpersonalinfo()
    {
        if (!$this->mm->access_code_verify($this->input->post('authId'))) {
            $ret_data['status_code'] = 101;
            $ret_data['status_msg'] = "Access Code not correct, Please login again.";
            echo json_encode($ret_data);
            return;
        }

        $affrow = 0;
        $ret_data['status_msg'] = '';
        $authId = $this->input->post('authId');
        $data = $this->mm->arrayToDataArray($_POST);
        $data['user_id'] = $this->mm->getUserID($this->input->post('authId'));
        unset($data['authId']);

        $config['upload_path']          = './upload/customer_img';
        $config['allowed_types']        = 'gif|jpg|png|jpeg';
        $config['max_size']             = 100;
        $config['file_name']            = time() . '_' . $data['user_id'];
        $this->load->library('upload', $config);
        if (isset($_FILES["photo"]["name"])) {
            if (!$this->upload->do_upload('photo')) {
                $error = array('error' => $this->upload->display_errors());

                $ret_data['status_code'] = 201;
                $ret_data['status_msg'] = $error['error'];
                echo json_encode($ret_data);
                return;
            } else {
                $data_up = array('upload_data' => $this->upload->data());
                $data['photo'] = $data_up['upload_data']['file_name'];
            }
        }

        if (isset($data['email'])) {
            $ret_val = $this->db->get_where('access_profile', array('access_code <>' => $this->input->post('authId'), 'email' => $data['email']));
            if ($ret_val->num_rows() == 0) {
                $this->db->where('access_code', $authId);
                $this->db->update('access_profile', array('email' =>  $data['email']));
                $password = $this->mm->createPassword($authId);
                if ($this->db->get_where('personal_info', array('user_id' => $data['user_id']))->num_rows() > 0) {
                    $this->db->where('user_id', $data['user_id']);
                    $this->db->update('personal_info', $data);
                } else {
                    $this->db->insert('personal_info', $data);
                    $ret_data['status_msg'] = $this->createPass($authId, $password);
                }
                $affrow = $this->db->affected_rows();
            } else {
                $ret_data['status_msg'] = "Email Exists, Choose New Email.";
            }
        } else {
            if ($this->db->get_where('personal_info', array('user_id' => $data['user_id']))->num_rows() > 0) {
                $this->db->where('user_id', $data['user_id']);
                $this->db->update('personal_info', $data);
            } else {
                $this->db->insert('personal_info', $data);
            }
            $affrow = $this->db->affected_rows();
        }
        if ($affrow > 0) {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Personal Information Updated. ' . $ret_data['status_msg'];
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Personal Information Not Updated. ' . $ret_data['status_msg'];
        }

        echo json_encode($ret_data);
    }

    public function getpersonalinfo()
    {
        if (!$this->mm->access_code_verify($this->input->post('authId'))) {
            $ret_data['status_code'] = 101;
            $ret_data['status_msg'] = "Access Code not correct, Please login again.";
            echo json_encode($ret_data);
            return;
        }

        $userid = $this->mm->getUserID($this->input->post('authId'));
        $photo_path = base_url('upload/customer_img/');
        $userData = $this->db->query("SELECT a.user_id,CONCAT( '$photo_path', a.photo)as photo,a.email,a.fname,a.gender,a.dob,a.language,a.religion,a.edu_qual,a.profession,
        a.annual_income,a.food,a.height,a.weight,a.city,a.state,a.country FROM `personal_info` a where a.user_id =  '$userid';");

        if ($this->db->affected_rows() > 0) {
            $ret_data['data'] = $userData->result_array()[0];
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Personal Information Updated';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Personal Information Not Updated';
        }

        echo json_encode($ret_data);
    }

    public function setpreferance()
    {
        if (!$this->mm->access_code_verify($this->input->post('authId'))) {
            $ret_data['status_code'] = 101;
            $ret_data['status_msg'] = "Access Code not correct, Please login again.";
            echo json_encode($ret_data);
            return;
        }

        $data = $this->mm->arrayToDataArray($_POST);
        $data['user_id'] = $this->mm->getUserID($this->input->post('authId'));
        unset($data['authId']);

        $this->db->get_where('preference', array('user_id' => $data['user_id']));

        if ($this->db->get_where('preference', array('user_id' => $data['user_id']))->num_rows() > 0) {
            $this->db->where('user_id', $data['user_id']);
            $this->db->update('preference', $data);
        } else {
            $this->db->insert('preference', $data);
        }

        if ($this->db->affected_rows() > 0) {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Personal Information Updated';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Personal Information Not Updated';
        }


        echo json_encode($ret_data);
    }

    public function getpreferance()
    {
        if (!$this->mm->access_code_verify($this->input->post('authId'))) {
            $ret_data['status_code'] = 101;
            $ret_data['status_msg'] = "Access Code not correct, Please login again.";
            echo json_encode($ret_data);
            return;
        }

        $userid = $this->mm->getUserID($this->input->post('authId'));
        $userData = $this->db->get_where('preference', array('user_id' => $userid));

        if ($this->db->affected_rows() > 0) {
            $ret_data['data'] = $userData->result_array()[0];
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Personal Information Updated';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Personal Information Not Updated, No Change In Information';
        }

        echo json_encode($ret_data);
    }

    public function getSubscription()
    {
        if (!$this->mm->access_code_verify($this->input->post('authId'))) {
            $ret_data['status_code'] = 101;
            $ret_data['status_msg'] = "Access Code not correct, Please login again.";
            echo json_encode($ret_data);
            return;
        }
        $authid = $this->input->post('authId');
        $ret_val = $this->db->query("SELECT a.create_dt as sub_date, b.create_dt as reg_date, DATE_ADD(a.create_dt,INTERVAL 365 DAY) as valid_till, b.phone   
        FROM subscriptions a inner join access_profile b on a.user_id = b.id 
        WHERE b.access_code ='$authid' and status ='PAYMENT_SUCCESS';");

        if ($this->db->affected_rows() > 0) {
            $ret_data['data'] = $ret_val->row_array();
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Data Retrived';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'No Data to retirve';
        }

        echo json_encode($ret_data);
    }
    //batch
    public function sendProfileEmailBatch()
    {
        $this->mm->generate_new_matching_profile(); // generate new profile create url link into table matching_profile_coms
        $retData = $this->mm->get_matching_profiles(); // get personal info and the URL from matcing_profile.coms
        $mailStatus = [];

        foreach ($retData as $row) {
            $msg_body = $this->load->view('emailTemplates/matching_preferance_receive', array("profile_data" => $retData[0]), true);
            if ($this->mm->sendEmail($row[0]['email'], 'Famile Weekly Matching Profiles For You.', $msg_body)) {
                array_push($mailStatus, array("url" => $row[0]['url'], "sender_id" => $row[0]['sender_id'], "receiver_id" => $row[0]['receiver_id']));
            }
        }

        $this->mm->update_sender_email_status($mailStatus);
    }

    public function generate_Batch()
    {
        $this->mm->generate_matching_profiles();
    }

    public function getSenderDataFromURLID()
    {
        $uqURL = $this->input->post('uqURl');

        $this->mm->update_matching_status($uqURL, 'receiver_visited');

        $retVal = $this->db->query("SELECT b.*, DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),DATE_FORMAT(STR_TO_DATE(b.dob, '%d-%m-%Y'), '%Y-%m-%d'))), '%Y') +0 as age FROM `matching_profile_coms` a inner join personal_info b on a.receiver_id = b.user_id where url='$uqURL'");

        if ($this->db->affected_rows() > 0) {
            $ret_data['data'] = $retVal->result_array()[0];
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Data Retrived';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'No Data to retirve';
        }

        echo json_encode($ret_data);
    }

    public function getReceiverDataFromURLID()
    {
        $uqURL = $this->input->post('uqURl');

        $this->mm->update_matching_status($uqURL, 'receiver_visited');

        $retVal = $this->db->query("SELECT b.*, DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),DATE_FORMAT(STR_TO_DATE(b.dob, '%d-%m-%Y'), '%Y-%m-%d'))), '%Y') +0 as age FROM `matching_profile_coms` a inner join personal_info b on a.receiver_id = b.user_id where url='$uqURL'");

        if ($this->db->affected_rows() > 0) {
            $ret_data['data'] = $retVal->result_array()[0];
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Data Retrived';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'No Data to retirve';
        }

        echo json_encode($ret_data);
    }

    public function getSenderProfileConfirmationFromURLID()
    {
        $uqURL = $this->input->post('uqURl');
        $this->mm->update_matching_status($uqURL, 'receiver_accepted');

        $retVal = $this->db->query("SELECT a.url, b.*, DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),DATE_FORMAT(STR_TO_DATE(b.dob, '%d-%m-%Y'), '%Y-%m-%d'))), '%Y') +0 as age FROM `matching_profile_coms` a inner join personal_info b on a.sender_id = b.user_id where url='$uqURL'")->result_array();

        $msg_body = $this->load->view('emailTemplates/matching_profile_intrested', array("profile_data" => $retVal[0]), true);

        if ($this->mm->sendEmail($retVal[0]['email'], 'Someone is interested in you.', $msg_body)) {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Email sent to the sender.';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Email is not sent.';
        }
        echo json_encode($ret_data);
    }

    //TODO
    public function getConfirmMutualInterestFromURLID()
    {
        $uqURL = $this->input->post('uqURl');
        $this->mm->update_matching_status($uqURL, 'receiver_accepted');

        $retVal = $this->db->query("select a.url, b.photo as sender_photo, b.email as sender_email, d.phone as sender_phone, c.photo as receiver_photo, 
        c.email as receiver_email, e.phone as receiver_phone from matching_profile_coms a inner join personal_info b on a.sender_id = b.user_id 
        inner join personal_info c on a.receiver_id = c.user_id inner join access_profile d on d.id = a.sender_id inner join access_profile e on e.id = a.receiver_id 
        where url='$uqURL'")->result_array();

        $sender_data['photo1'] = $retVal[0]['sender_photo'];
        $sender_data['photo2'] = $retVal[0]['receiver_photo'];
        $sender_data['phone'] = $retVal[0]['receiver_phone'];

        $msg_body = $this->load->view('emailTemplates/matching_matched', array("profile_data" =>  $sender_data), true);

        //person initiated the profile
        $this->mm->sendEmail($retVal[0]['sender_email'], 'Person of your interest has ackwnoledged', $msg_body);

        $receiver_data['photo1'] = $retVal[0]['receiver_photo'];
        $receiver_data['photo2'] = $retVal[0]['sender_photo'];
        $receiver_data['phone'] = $retVal[0]['sender_phone'];


        //person accepted the profile
        $msg_body = $this->load->view('emailTemplates/matching_matched', array("profile_data" => $receiver_data), true);

        $this->mm->sendEmail($retVal[0]['receiver_email'], 'Person of your interest has ackwnoledged', $msg_body);

        if (true) {
            $ret_data['status_code'] = 200;
            $ret_data['status_msg'] = 'Email sent to the sender.';
        } else {
            $ret_data['status_code'] = 201;
            $ret_data['status_msg'] = 'Email is not sent.';
        }
        echo json_encode($ret_data);
    }

    //redo the email uRL
    public function ematchingprofile_url($uqURL)
    {
        header("Location:" . $this->config->item('cust_url') . '?path=ematchingprofile&uqid=' . $uqURL);
        exit;
    }

    public function ematchingprofileresponse_url($uqURL)
    {
        header("Location:" . $this->config->item('cust_url') . '?path=ematchingprofileresponse&uqid=' . $uqURL);
        exit;
    }

    public function test()
    {
        echo $this->mm->sendSMS(array('9940610072'), '"Dear joseph,%nYour Famile.org password is A#@123. Please do not share it with anyone. -Famile"');
    }
}
