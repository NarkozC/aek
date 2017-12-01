<?php

class Neden_AEK extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Neden-AEK-view');
	}

	public function GetNedenAEK(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetNedenAEK();
			echo json_encode($result);
		}
	}

	public function GetNedenAEKNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetNedenAEKNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
