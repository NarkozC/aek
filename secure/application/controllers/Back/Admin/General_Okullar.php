<?php

class General_Okullar extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetOkullar(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetOkullar();
			echo json_encode($result);
		}
	}

}
