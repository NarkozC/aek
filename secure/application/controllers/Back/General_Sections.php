<?php

class General_Sections extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add');
	}

	public function index()
	{
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$this->load->view('Back/General/Sections-view.php');
		} else {
			redirect('Portal');
		}
	}

	public function GetSections(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->General_Model->GetSections();
			echo json_encode($result);
		} else {
			redirect('Portal');
		}
	}

	public function GetSectionsNum(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->General_Model->GetSectionsNum();
			echo json_encode($result);
		} else {
			redirect('Portal');
		}
	}

	public function UpSection(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->General_Model->UpSection();
			if($result){
				$this->data['success'] = true;
			}
			echo json_encode($this->data);
		} else {
			redirect('Portal');
		}
		
	}

	public function DownSection(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->General_Model->DownSection();
			if($result){
				$this->data['success'] = true;
			}
			echo json_encode($this->data);
		} else {
			redirect('Portal');
		}
	}

	public function ActiveSection()
	{
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->General_Model->ActiveSection();
			if($result){
				$this->data['data'] = $this->General_Model->EditSection();
				$this->data['success'] = true;
			}
			echo json_encode($this->data);
		} else {
			redirect('Portal');
		}
	}

	public function PassiveSection()
	{
		// check if logged in
		if($this->session->userdata('logged_in')) {

			$result = $this->General_Model->PassiveSection();
			if($result){
				$this->data['data'] = $this->General_Model->EditSection();
				$this->data['success'] = true;
			}
			echo json_encode($this->data);
		} else {
			redirect('Portal');
		}

	}

}
