<?php

class Okul_Aile_Birligi extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

	}

	public function index()
	{
		$this->load->view('Front/Okul-Aile-Birligi-view');
	}

}
