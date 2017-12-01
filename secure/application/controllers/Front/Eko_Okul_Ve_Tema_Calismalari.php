<?php

class Eko_Okul_Ve_Tema_Calismalari extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

	}

	public function index()
	{
		$this->load->view('Front/Eko-Okul-Ve-Tema-Calismalari-view');
	}

}
