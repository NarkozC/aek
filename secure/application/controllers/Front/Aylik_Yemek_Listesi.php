<?php

class Aylik_Yemek_Listesi extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/AylikYemekListesi-view');
	}

	public function GetAylikYemekListesi(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetAylikYemekListesi();
			echo json_encode($result);
		}
	}

	public function GetAylikYemekListesiNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetAylikYemekListesiNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}


}
