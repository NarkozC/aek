<?php

class Birimler extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Birimler-view');
	}

	public function GetBirimlerIdari(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetBirimlerIdari();
			echo json_encode($result);
		}
	}

	public function GetBirimlerIdariNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetBirimlerIdariNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

	public function GetBirimlerLojistikHizmetler(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetBirimlerLojistikHizmetler();
			echo json_encode($result);
		}
	}

	public function GetBirimlerLojistikHizmetlerNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetBirimlerLojistikHizmetlerNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
