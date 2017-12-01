<?php

class Buttons extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->view('Front/Buttons-view');
	}

}
