<?php

class Sinav_Takvimi extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Sinav-Takvimi-view');
	}

	public function GetSinavTakvimi(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetSinavTakvimi();
			echo json_encode($result);
		}
	}

	public function GetSinavTakvimiNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetSinavTakvimiNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}


}
