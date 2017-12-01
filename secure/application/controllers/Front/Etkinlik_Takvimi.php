<?php

class Etkinlik_Takvimi extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Etkinlik-Takvimi-view');
	}

	public function GetEtkinlikTakvimi(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetEtkinlikTakvimi();
			echo json_encode($result);
		}
	}

	public function GetEtkinlikTakvimiNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetEtkinlikTakvimiNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}


}
