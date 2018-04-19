<?php

class Iletisim extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
						'cacheKeys' => array(
                          'GetIletisimTR' => md5('GetIletisimCacheTR'),
                          'GetIletisimEN' => md5('GetIletisimCacheEN'),

                          'GetIletisimHtmlTR' => md5('GetIletisimHtmlCacheTR'),
                          'GetIletisimHtmlEN' => md5('GetIletisimHtmlCacheEN'),
                        ),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function index()
	{
		$this->load->view('Front/Iletisim-view');
	}

	public function GetIletisim(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetIletisimTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetIletisimEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetIletisim();
			} else {
				if ($this->data['cachePostTR'] != null) {
					$this->cache->save($cacheKeyTR, $this->data['cachePostTR'], $this->data['cacheTime']);
					$this->data['cached'] = true;
					$this->data['cachedataTR'] = $this->data['cachePostTR'];

				} else if ($this->data['cachePostEN'] != null) {
					$this->cache->save($cacheKeyEN, $this->data['cachePostEN'], $this->data['cacheTime']);
					$this->data['cached'] = true;
					$this->data['cachedataEN'] = $this->data['cachePostEN'];
				} else {
					$gotCacheTR = $this->cache->get($cacheKeyTR);
					$gotCacheEN = $this->cache->get($cacheKeyEN);
					if ($gotCacheTR) {
						$this->data['cachedataTR'] = $gotCacheTR;
					}
					if ($gotCacheEN) {
						$this->data['cachedataEN'] = $gotCacheEN;
					}
					if ($this->data['English'] != null) {
						if ($this->data['English'] == "true" && !$gotCacheEN) {
							$this->data['data'] = $this->General_Model->GetIletisim();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetIletisim();
						}
					}
					
				}
			}
			echo json_encode($this->data);
		}
	}

	public function Mesaj() {
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$en = $_POST["English"];

			if ($en == "true") {
				$this->config->set_item('language', 'english');
				$this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
				$this->form_validation->set_rules('Email', "", 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('Mesaj', "", 'required|trim|strip_tags|xss_clean');
			} else {
				$this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
				$this->form_validation->set_rules('Email', "", 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('Mesaj', "", 'required|trim|strip_tags|xss_clean');
			}
			$this->form_validation->set_rules('MAdres', "", 'required|trim|strip_tags|xss_clean');
			
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
						// $this->email->to('sasiogludogucan@gmail.com'); //$users
						$this->email->to($MAdres);
						$this->email->subject("Mesaj | AEK");
						$this->email->message($message);

						$this->data['send'] = $this->email->send();
						if ($this->email->send()) {
							$this->data['success'] = true;
						} else {
							// $this->data['error'] = $this->email->print_debugger();
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