<?php

class Duyurular_Etkinlikler extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/DuyurularEtkinlikler-view');
	}

	public function DuyuruEtkinlik()
	{
		$this->load->view('Front/DuyurularEtkinlikler-view');
	}

	public function GetDuyurularEtkinlikler(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetDuyurularEtkinlikler();
			echo json_encode($result);
		}
	}

	public function GetDuyurularEtkinliklerNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetDuyurularEtkinliklerNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

	public function GetDuyuruEtkinlik(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$en = $_POST["English"];
			$SectionID = $this->input->post('SectionID');
			if ($en == "true") {
				$result = $this->General_Model->GetDuyuruEtkinlikWEnSectionID($SectionID);
				if ($result == null) {
					$result = $this->General_Model->GetDuyuruEtkinlikWTrSectionID($SectionID);
				}
			} else {
				$result = $this->General_Model->GetDuyuruEtkinlikWTrSectionID($SectionID);
			}

			echo json_encode($result);
		}
	}


}
