<?php

class Nav_Yan extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetNavYan(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetNavYan();
			echo json_encode($result);
		}
	}
}
