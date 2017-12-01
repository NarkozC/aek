<?php

class Kurucu_Mesaji extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Kurucu-Mesaji-view');
	}

	public function GetKurucuMesaji(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetKurucuMesaji();
			echo json_encode($result);
		}
		
	}

	public function GetKurucuMesajiNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetKurucuMesajiNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
