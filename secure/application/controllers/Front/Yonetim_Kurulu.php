<?php

class Yonetim_Kurulu extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Yonetim-Kurulu-view');
	}

}
