<?php

class Sinav_Etkinlik extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetSinavEtkinlik(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetSinavEtkinlik();
			echo json_encode($result);
		}
	}

	public function GetSinavEtkinlikNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetSinavEtkinlikNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}


}
