<?php

class Yabanci_Diller_Etkinlikleri extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

	}

	public function index()
	{
		$this->load->view('Front/Yabanci-Diller-Etkinlikleri-view');
	}

}
