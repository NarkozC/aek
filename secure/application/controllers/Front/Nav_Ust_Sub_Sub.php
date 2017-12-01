<?php

class Nav_Ust_Sub_Sub extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetNavUstSubSub(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetNavUstSubSub();
			echo json_encode($result);
		}
			
	}
	
}
