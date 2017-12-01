<?php

class Admin extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
  	if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
		$this->load->view('Back/Admin/Haberler-view');
	} else {
		redirect('Portal');
	}
  }

}
