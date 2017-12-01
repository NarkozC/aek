<?php

class Nav_Ust extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetNavUst(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetNavUst();
			echo json_encode($result);
		}
	}
	
}
