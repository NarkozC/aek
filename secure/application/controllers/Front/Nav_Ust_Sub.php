<?php

class Nav_Ust_Sub extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function GetNavUstSub(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetNavUstSub();
			echo json_encode($result);
		}
			
	}
	
}
