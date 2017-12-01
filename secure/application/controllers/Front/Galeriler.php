<?php

class Galeriler extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Galeriler-view');
	}

	public function Galeri()
	{
		$this->load->view('Front/Galeriler-view');
	}

	public function GetGaleriler(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetGaleriler();
			echo json_encode($result);
		}
	}

	public function GetGalerilerNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetGalerilerNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

	public function GetGaleri(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$en = $_POST["English"];
			$SectionID = $this->input->post('SectionID');
			if ($en == "true") {
				$result = $this->General_Model->GetGaleriWEnSectionID($SectionID);
				if ($result == null) {
					$result = $this->General_Model->GetGaleriWTrSectionID($SectionID);
				}
			} else {
				$result = $this->General_Model->GetGaleriWTrSectionID($SectionID);
			}

			echo json_encode($result);
		}
	}


}
