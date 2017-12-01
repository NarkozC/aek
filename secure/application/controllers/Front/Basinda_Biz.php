<?php

class Basinda_Biz extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Basinda-Biz-view');
	}

	public function GetBasindaBiz(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetBasindaBiz();
			echo json_encode($result);
		}
	}

	public function GetBasindaBizNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetBasindaBizNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
