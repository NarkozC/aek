<?php

class Hakkimizda extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

	}

	public function index()
	{
		$this->load->view('Front/Hakkimizda-view');
	}

	public function GetHakkimizda(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetHakkimizda();
			echo json_encode($result);
		}
	}

	public function GetHakkimizdaNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetHakkimizdaNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
