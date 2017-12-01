<?php

class General_Siniflar extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetSiniflar(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetSiniflar();
			echo json_encode($result);
		}
	}

}
