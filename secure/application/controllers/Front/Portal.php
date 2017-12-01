<?php

class Portal extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'wrong' => false, 'Ogrenci' => false, 'Ogretmen' => false, 'Rehberlik' => false, 'Teknik' => false, 'Yonetici' => false, 'Admin' => false);
	}

	public function index()
	{
		// check if logged in
		if($this->session->userdata('logged_in')) {
			if ($this->session->userdata('Ogrenci') == true) {
				redirect('Portal/Ogrenci/');
			} else if ($this->session->userdata('Ogretmen') == true) {
				redirect('Portal/Ogretmen/');
			} else if ($this->session->userdata('Rehberlik') == true) {
				redirect('Portal/Rehberlik/');
			} else if ($this->session->userdata('Teknik') == true) {
				redirect('Portal/Teknik/');
			} else if ($this->session->userdata('Yonetici') == true) {
				redirect('Portal/Yonetici/');
			} else if ($this->session->userdata('Admin') == true) {
				redirect('Portal/Admin/');
			} else {
				redirect('');
			}
		} else {
			$this->load->view('Login-view');
		}

	}

	public function Login()
	{
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			//validate
			$en = $_POST["English"];

			if ($en == "true") {
				$this->config->set_item('language', 'english');
			}
			$this->form_validation->set_rules('TCNoOrEmail', 'TC No/Email', 'required|trim|max_length[65]|strip_tags|xss_clean');				
			$this->form_validation->set_rules('Sifre', 'Şifre', 'required|trim|max_length[65]|strip_tags|xss_clean');
			$this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
	        if ($this->form_validation->run()) {
	    		$TCNoOrEmail = $this->input->post('TCNoOrEmail');
	    		$Sifre = $this->input->post('Sifre');
				// attempt to login
				if($this->simpleloginsecure->login($TCNoOrEmail, $Sifre)) {
				    $userData = $this->General_Model->GetKullaniciWEmail($TCNoOrEmail);
				    if ($userData != null) {
				    	$this->data['userdata'] = $userData;
				    	$this->data['success'] = true;
				    } else {
				    	$userData = $this->General_Model->GetKullaniciWTCNo($TCNoOrEmail);
				    	if ($userData != null) {
				    		$this->data['userdata'] = $userData;
				    		$this->data['success'] = true;
				    	}
				    }
				} else {
					$this->data['wrong'] = true;
					$this->data['success'] = false;
				}
				$this->data['suserdata'] = $this->session->userdata('Admin');
				echo json_encode($this->data);
			} else {
				//show errors
				foreach ($_POST as $key => $value) {
					$this->data['messages'][$key] = form_error($key);
				}
				echo json_encode($this->data);
			}
		}
		

	}

	public function Logout()
	{	
		// check if logged in
		if($this->session->userdata('logged_in')) {
		    $this->simpleloginsecure->logout();
			redirect('');
		} else {
			redirect('Portal');
		}
		    
	}

	public function Check()
	{
		if(! $this->input->is_ajax_request()) {
			if($this->session->userdata('logged_in')) {
				redirect('Portal');
			} else {
				redirect('404');
			}
		    
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$this->data['success'] = true;

				if($this->session->userdata('Ogrenci')) {
					$this->data['Ogrenci'] = true;
				}
				if($this->session->userdata('Ogretmen')) {
					$this->data['Ogretmen'] = true;
				}
				if($this->session->userdata('Rehberlik')) {
					$this->data['Rehberlik'] = true;
				}
				if($this->session->userdata('Teknik')) {
					$this->data['Teknik'] = true;
				}
				if($this->session->userdata('Yonetici')) {
					$this->data['Yonetici'] = true;
				}
				if($this->session->userdata('Admin')) {
					$this->data['Admin'] = true;
				}
			} else {
				$this->data['success'] = false;
			}
			echo json_encode($this->data);  
		}
	}

	public function Hesap()
	{
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$this->load->view('Back/Hesap-view');
		} else {
			redirect('Portal');
		}
	}





	public function Create()
	{
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->simpleloginsecure->create('doktorlar@gmail.com', '12345678910', 'Mb!271190', 0, 0, 0, 0, 0, 1);
		}
	}

	public function Delete()
	{
		if ($this->simpleloginsecure->delete(6)) {
			echo 'success';
		} else {
			echo 'fail';
		}
	}


}
