<?php

class Anasayfa extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

	}

	public function index()
	{
		$this->load->view('Front/index');
	}

	public function GetBannerYazi(){
		$result = $this->Anasayfa_Model->GetBannerYazi();
		echo json_encode($result);
	}

	public function GetYorumlar(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->Anasayfa_Model->GetYorumlar();
			echo json_encode($result);
		} else {
			redirect('Portal');
		}
	}

	public function GetActiveYorumlar(){
		$result = $this->Anasayfa_Model->GetActiveYorumlar();
		echo json_encode($result);
	}

	public function GetYorumlarNum(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->Anasayfa_Model->GetYorumlarNum();
			echo json_encode($result);
		} else {
			redirect('Portal');
		}
	}

	public function GetBannerSlider(){
		$result = $this->Anasayfa_Model->GetBannerSlider();
		echo json_encode($result);
	}

	public function GetBannerSliderNum(){
		// check if logged in
		if($this->session->userdata('logged_in')) {
			$result = $this->Anasayfa_Model->GetBannerSliderNum();
			echo json_encode($result);
		} else {
			redirect('Portal');
		}
	}

	public function AddYorum()
	{
		$en = $_POST["English"];

		if ($en == "true") {
			$this->config->set_item('language', 'english');
			$this->form_validation->set_rules('en_Isim', 'Name and Surname', 'required|trim|max_length[65]|strip_tags|xss_clean');				
			$this->form_validation->set_rules('en_Email', 'E-mail', 'required|trim|valid_email|strip_tags|xss_clean');
			$this->form_validation->set_rules('en_Yorum', 'Comment', 'required|trim|max_length[500]|strip_tags|xss_clean');
		} else {
			$this->config->set_item('language', 'turkce');
			$this->form_validation->set_rules('tr_Isim', 'Ad ve Soyad', 'required|trim|max_length[65]|strip_tags|xss_clean');				
			$this->form_validation->set_rules('tr_Email', 'E-mail', 'required|trim|valid_email|strip_tags|xss_clean');
			$this->form_validation->set_rules('tr_Yorum', 'Yorum', 'required|trim|max_length[500]|strip_tags|xss_clean');
		}
		$this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
		if ($this->form_validation->run()) {
			
		    // getting the captcha
		    $captcha = "";
		    if (isset($_POST["g-recaptcha-response"])) {
		        $captcha = $_POST["g-recaptcha-response"];
		    }
		    if (!$captcha) {
		        $this->data['captcha'] = false;
		    } else {
		    	
			    // handling the captcha and checking if it's ok
			    $secret = "6LfE8CcUAAAAABm6qxv9Y5bFynh6fKMQ3lpxGMV3";
			    $response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER["REMOTE_ADDR"]), true);

			    // if the captcha is cleared with google
			    if ($response["success"] != false) {
			    	
			        // the echo goes back to the ajax, so the user can know if everything is ok
			        # mail liste ekleniyor
			        if ($en == "true") {
			        	$mailA = array(
			        	'Isim' => $this->input->post('en_Isim'),
			        	'Email' => $this->input->post('en_Email'),
			        	);
			        } else {
			        	$mailA = array(
			        	'Isim' => $this->input->post('tr_Isim'),
			        	'Email' => $this->input->post('tr_Email'),
			        	);
			        }
			        
					$mailListQ =  $this->General_Model->AddEmailWA($mailA);
					if ($mailListQ == 1) {
					    //$this->input->post('en_Isim')
						# yorumlara ekleniyor
						$verifykey = md5(uniqid(rand(), true));
						if ($en == "true") {
							$yorumA = array(
								'YVerifyKey'	=>$verifykey,

								'tr_Isim'		=>"",
								'tr_Yorum'		=>"",

								'en_Isim'		=>$this->input->post('en_Isim'),
								'en_Yorum'		=>$this->input->post('en_Yorum'),
								);
						} else {
							$yorumA = array(
								'YVerifyKey'	=>$verifykey,

								'tr_Isim'		=>$this->input->post('tr_Isim'),
								'tr_Yorum'		=>$this->input->post('tr_Yorum'),

								'en_Isim'		=>"",
								'en_Yorum'		=>"",
								);
						}
						
						$yorumekleQ = $this->Anasayfa_Model->AddYorum($yorumA);
						if ($yorumekleQ == 1) {
							
							$this->load->library('email'); // Note: no $config param needed
							$usersQ = $this->General_Model->GetKullanicilar();
							$users = array();
							foreach ($usersQ as $user) {
								$users[$user->Email] = $user->Email;
							}
							$email = " ";
							$name = " ";
							$yorum = " ";
							if ($en == "true") {
								$email = $this->input->post('en_Email');
								$name = $this->input->post('en_Isim');
								$yorum = $this->input->post('en_Yorum');
							} else {
								$email = $this->input->post('tr_Email');
								$name = $this->input->post('tr_Isim');
								$yorum = $this->input->post('tr_Yorum');
							}
							$dil = " ";
							if ($en == "true") {
								$dil = "İngilizce";
							} else {
								$dil = "Türkçe";
							}
							$message = "Gönderilen Yorumun Dili: ".$dil."<br>
										Gönderen Kişi: ".$name."<br>
										Gönderen Kişinin Emaili: ".$email."<br><br>

										Yorum: ".$yorum."<br><br>

										Bu yorumu yorumlara eklemek için  <a href='". base_url() ."Ap/Anasayfa-Yorumlar/ActiveYorumVK/".$verifykey."'>tıklayınız.</a> <br><br>

										Bu yorumu silmek için  <a href='". base_url() ."Ap/Anasayfa-Yorumlar/DeleteYorumVK/".$verifykey."'>tıklayınız.</a> <br><br>";

							$this->email->from('info@morfill.com', 'Morfill Koçluk ve Danışmanlık');
							$this->email->to($users);
							$this->email->subject("Yorum | Morfill");
							$this->email->message($message);

							if ($this->email->send()) {
								$this->data['success'] = true;
							}
							
		            	}
		            		
					}
			    } else {
			    	$this->data['captcha'] = false;
			    }
			    
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
