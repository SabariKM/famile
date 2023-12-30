<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Access extends CI_Controller {

    public function index() {
        $this->session->sess_destroy();
        $this->load->view('admin/login');
    }

    public function login() {
        if (!$this->session->has_userdata('username')) {
            $username = $this->input->post('username');
            $password = $this->input->post('password');

            $retval = $this->db->get_where('admin_access', array('username' => $username, 'password' => $password));

            if ($retval->num_rows() > 0) {
                $this->session->set_userdata('username', $username);
                
            } else {
                $this->session->set_flashdata('login_error', 'username or password not matching');
                header("Location: " . base_url('index.php/access'));
            }
        }
        header("Location: " . base_url('index.php/admin'));
    }

    public function logout(){
        $this->session->sess_destroy();
        header("Location: " . base_url('index.php/admin'));
    }
}