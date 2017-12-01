<?php

class Footer extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetFooter(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetFooter();
			echo json_encode($result);
		}
	}


}
