<?php

class Iletisim extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

	}

	public function index()
	{
		$this->load->view('Front/Iletisim-view');
	}

	public function GetIletisim(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetIletisim();
			echo json_encode($result);
		}
	}

	public function Mesaj() {
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$en = $_POST["English"];

			if ($en == "true") {
				$this->config->set_item('language', 'english');
				$this->form_validation->set_rules('AdSoyad', FORM_LANG_EN['AdSoyad'], 'required|trim|max_length[255]|strip_tags|xss_clean');
				$this->form_validation->set_rules('Email', FORM_LANG_EN['Email'], 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('Mesaj', FORM_LANG_EN['Mesaj'], 'required|trim|strip_tags|xss_clean');
			} else {
				$this->form_validation->set_rules('AdSoyad', FORM_LANG_TR['AdSoyad'], 'required|trim|max_length[255]|strip_tags|xss_clean');
				$this->form_validation->set_rules('Email', FORM_LANG_TR['Email'], 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('Mesaj', FORM_LANG_TR['Mesaj'], 'required|trim|strip_tags|xss_clean');
			}
			$this->form_validation->set_rules('MAdres', FORM_LANG_TR['MAdres'], 'required|trim|strip_tags|xss_clean');
			$this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
			if ($this->form_validation->run()) {
				$isVerified = false;
				$secret="6LdEEy4UAAAAACxIXHGMvBnC3FI4NrpRsqgISfIF";
				$response=$this->input->post('ReCaptcha');
				$verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
				$captcha_success=json_decode($verify);
				if ($captcha_success->success==false) {
				  $isVerified = false;
				}
				else if ($captcha_success->success==true) {
				  $isVerified = true;
				}
				if ($isVerified) {
					$this->data['captcha'] = true;
					
					$AdSoyad = $this->input->post('AdSoyad');
					$Email = $this->input->post('Email');
					$Mesaj = $this->input->post('Mesaj');
					$MAdres = $this->input->post('MAdres');
					
					# mail liste ekleniyor
					$mailListQ = $this->General_Model->AddEmailList();
					$this->data['mailListQ'] = $mailListQ;
					if ($mailListQ == 1) {
						$this->load->library('encrypt');
						$this->load->library('email'); // Note: no $config param needed
						$Dil = " ";
						if ($en == "true") {
							$Dil = "İngilizce";
						} else {
							$Dil = "Türkçe";
						}
						$message = "Gönderilen Mesajın Dili: ".$Dil."<br>
									Gönderen Kişi: ".$AdSoyad."<br>
									Gönderen Kişinin Emaili: ".$Email."<br><br>
									
									Mesaj: ".$Mesaj;

						$this->email->from('aek.k12.tr@gmail.com', 'Ankara Eğitim Kurumları');
						$this->email->to('sasiogludogucan@gmail.com'); //$users
						// $this->email->to($MAdres);
						$this->email->subject("Mesaj | AEK");
						$this->email->message($message);

						$this->data['send'] = $this->email->send();
						if ($this->email->send()) {
							$this->data['success'] = true;
						} else {
							$this->data['error'] = $this->email->print_debugger();
						}
					}
				} else {
					$this->data['success'] = false;
					$this->data['captcha'] = false;
				}
			}
			else {
				foreach ($_POST as $key => $value) {
					$this->data['messages'][$key] = form_error($key);
				}
			}
			echo json_encode($this->data);
		}	
	}



}