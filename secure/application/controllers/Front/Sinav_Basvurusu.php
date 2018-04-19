<?php

class Sinav_Basvurusu extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
			'cacheKeys' => array(
				'GetSinavBasvurusuTR' => md5('GetSinavBasvurusuCacheTR'),
				'GetSinavBasvurusuEN' => md5('GetSinavBasvurusuCacheEN'),

				'GetSinavYonergeleriTR' => md5('GetSinavYonergeleriCacheTR'),
				'GetSinavYonergeleriEN' => md5('GetSinavYonergeleriCacheEN'),
			),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function index()
	{
		$this->load->view('Front/SinavBasvurusu-view');
	}

	public function GetSinavBasvurusu(){
		if(! $this->input->is_ajax_request()) {
			redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetSinavBasvurusuTR'];
			$cacheKeyEN = $this->data['cacheKeys']['GetSinavBasvurusuEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetSinavBasvurusu();
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
							$this->data['data'] = $this->General_Model->GetSinavBasvurusu();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetSinavBasvurusu();
						}
					}

				}
			}
			echo json_encode($this->data);
		}
	}

	public function GetSinavYonergeleri(){
		if(! $this->input->is_ajax_request()) {
			redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetSinavYonergeleriTR'];
			$cacheKeyEN = $this->data['cacheKeys']['GetSinavYonergeleriEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetSinavYonergeleri();
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
							$this->data['data'] = $this->General_Model->GetSinavYonergeleri();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetSinavYonergeleri();
						}
					}

				}
			}
			echo json_encode($this->data);
		}
	}

	public function GetSinavBasvurusuNum(){
		if(! $this->input->is_ajax_request()) {
			redirect('404');
		} else {
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetSinavBasvurusuNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

	public function AddSinavBasvurusu(){
		if(! $this->input->is_ajax_request()) {
			redirect('404');
		} else {
			$en = $_POST["English"];
			if ($en == "true") {
				$this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
				$this->form_validation->set_rules('Tc', "", 'required|trim|numeric|exact_length[11]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('Cinsiyet', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
				$this->form_validation->set_rules('AnneAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('AnneTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
				$this->form_validation->set_rules('AnneEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('BabaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('BabaTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
				$this->form_validation->set_rules('BabaEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('OOOkul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('OOSinif', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('Bolum', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('SinavTarihi', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			} else {
				$this->form_validation->set_rules('Tc', "", 'required|trim|numeric|exact_length[11]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('Cinsiyet', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
				$this->form_validation->set_rules('AnneAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('AnneTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
				$this->form_validation->set_rules('AnneEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('BabaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('BabaTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
				$this->form_validation->set_rules('BabaEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
				$this->form_validation->set_rules('OOOkul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('OOSinif', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('Bolum', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
				$this->form_validation->set_rules('SinavTarihi', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			}
			
			if ($this->form_validation->run()) {
				$tc = $this->input->post('Tc');
				$tarih = $this->input->post('SinavTarihi');
				$this->form_validation->reset_validation();
				$this->form_validation->set_rules('Tc', "", 'is_unique[general_sinavbasvurusu.Tc]');
				
				if ($this->form_validation->run()) {
					$this->data['secondval'] = true;
					$result = $this->General_Model->AddSinavBasvurusu();
					if ($result) {
						$this->data['success'] = true;
					}
				} else {
					$check = $this->General_Model->GetSinavBasvurusuByTarihAndTc($tarih, $tc);

					if ($check) {
						$this->data['messages']['Tc'] = '<p style="margin:10px 0px;" class="text-danger">Bu tarihteki sınava başvurunuz mevcut.</p>';
					} else {
						$result = $this->General_Model->AddSinavBasvurusu();
						if ($result) {
							$this->data['success'] = true;
						}
					}
				}
				if ($this->data['success'] == true) {
					$data = $this->General_Model->GetSinavBasvurusuDataByTarihAndTc($tarih, $tc);
					$this->load->library('encrypt');
					$this->load->library('email');
					$CinsiyetShowName = '';
					$Cinsiyet = $data->Cinsiyet;
					$CinsiyetSec = $data->Cinsiyet;
					if ($Cinsiyet == "E") {
						$CinsiyetSec = "Erkek";
					} else {
						$CinsiyetSec = "Kız";
					}
					$TarihBasvuru = TarihToTr($data->TarihBasvuru);
					$AdSoyad = $data->AdSoyad;
					$SinavTarihi = explode("-", $data->SinavTarihi);
					$SinavTarihi = explode(".", $SinavTarihi[1]);
					$SinavTarihi = $SinavTarihi[0].'-'.$SinavTarihi[1].'-'.$SinavTarihi[2];
					$Sinif = explode("-", $data->OOSinif);
					$Sinif = $Sinif[1];
					if ($Cinsiyet == "E") {
						$CinsiyetShowName = 'oğlunuz';
					} else {
						$CinsiyetShowName = 'kızınız';
					}
					$messageB = "<i>".$TarihBasvuru."</i> tarihinde kurumumuz web sitesi üzerinden halen <i>".$Sinif.".</i> sınıfta okumakta olan ".$CinsiyetShowName." <i>".$AdSoyad."</i> adına yapmış olduğunuz sınav başvurusu kabul edilmiş olup, öğrencinizin sınavı <i>".$SinavTarihi."</i> tarihindedir.<br><br>".
					"Sınav saatleri sınav başvuru sayısına göre düzenlenecek olup sınavdan 3 gün önce resmi web sitemizde duyurulacak sizlere bilgilendirme mesajı gönderilecektir.<br><br>".
					"Sınav saatlerinde velilerimiz mutlaka konferans salonunda veli bilgilendirme toplantısına katılacaklardır. <br><br><br>
					Sınava Girecek Öğrencinin;<br><br>
					TC Kimlik No: <i>".$data->Tc."</i><br><br>
					Adı Soyadı: <i>".$data->AdSoyad."</i><br><br>
					Doğum Tarihi: <i>".TarihToTr($data->DogumTarihi)."</i><br><br>
					Cinsiyeti: <i>".$CinsiyetSec."</i><br><br>
					Anne Adı Soyadı: <i>".$data->AnneAd."</i><br><br>
					Anne Cep Telefonu: <i>".$data->AnneTel."</i><br><br>
					Anne E-posta: <i>".$data->AnneEmail."</i><br><br>
					Baba Adı Soyadı: <i>".$data->BabaAd."</i><br><br>
					Baba Cep Telefonu: <i>".$data->BabaTel."</i><br><br>
					Baba E-posta: <i>".$data->BabaEmail."</i><br><br>
					Okumakta Olduğu Okul: <i>".$data->OOOkul."</i><br><br>
					Okumakta Olduğu Sınıf: <i>".$Sinif."</i><br>	<br>
					<br><br>
					Yukarıdaki kayıtlı bilgilerinizde bir hata varsa lütfen (545) 722 45 15 no'lu telefondan Ebru SAYIN'ı arayarak gerekli düzeltmeleri yaptırınız.<br><br>
					Başvurunuz için teşekkür ederiz.<br><br>
					Saygılarımızla<br><br>
					Özel Ankara Eğitim Kurumları";

					$mailTo = array('Anne', 'Baba');
					foreach ($mailTo as $key) {
						$message = "Sayın ".$this->input->post($key.'Ad')."<br><br>".$messageB;
						$this->email->from('aek.k12.tr@gmail.com', 'Ankara Eğitim Kurumları');
						$this->email->to($this->input->post($key.'Email'));
						$this->email->subject("Sınav Başvurusu | AEK");
						$this->email->message($message);
						if ($this->email->send()) {
							$this->data['success'] = true;
						} else {
							$this->data['error'] = $this->email->print_debugger();
						}
					}
				}
				$cacheKeys = array('SinavBasvurusu');
				for ($i=0; $i < sizeof($cacheKeys); $i++) { 
					$cacheKeyTR = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
					$cacheKeyEN = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];

					$gotCacheTR = $this->cache->get($cacheKeyTR);
					$gotCacheEN = $this->cache->get($cacheKeyEN);

					if ($gotCacheTR) {
						$this->cache->delete($cacheKeyTR);
					}
					if ($gotCacheEN) {
						$this->cache->delete($cacheKeyEN);
					}
				}
			} else {
				foreach ($_POST as $key => $value) {
					$this->data['messages'][$key] = form_error($key);

				}
			}

			echo json_encode($this->data);
		}
	}


}
