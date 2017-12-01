<?php

class Egitim_Sistemimiz extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Egitim-Sistemimiz-view');
	}

	public function GetEgitimSistemi(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetEgitimSistemi();
			echo json_encode($result);
		}
	}

	public function GetEgitimSistemiNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetEgitimSistemiNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
