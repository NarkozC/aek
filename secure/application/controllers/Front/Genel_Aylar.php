<?php

class Genel_Aylar extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetAylar(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetAylar();
			echo json_encode($result);
		}
	}

	public function GetAylarNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetAylarNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}


}
