<?php

class Sinav_Basvurusu extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
						'cacheKeys' => array(
                          'GetSinavBasvurusuTR' => md5('GetSinavBasvurusuCacheTR'),
                          'GetSinavBasvurusuEN' => md5('GetSinavBasvurusuCacheEN'),

                          'GetSinavBasvurusuHtmlTR' => md5('GetSinavBasvurusuHtmlCacheTR'),
                          'GetSinavBasvurusuHtmlEN' => md5('GetSinavBasvurusuHtmlCacheEN'),
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

	public function GetSinavBasvurusuNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
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
	          $this->form_validation->set_rules('AdSoyad', FORM_LANG_EN['AdSoyad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Cinsiyet', FORM_LANG_EN['Cinsiyet'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('SinavTarihi', FORM_LANG_EN['SinavTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('DogumTarihi', FORM_LANG_EN['DogumTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('DogumYeri', FORM_LANG_EN['DogumYeri'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('OOSinif', FORM_LANG_EN['OOSinif'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('OOOkul', FORM_LANG_EN['OOOkul'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Bolum', FORM_LANG_EN['Bolum'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('AnneAd', FORM_LANG_EN['AnneAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('AnneTel', FORM_LANG_EN['AnneTel'], 'required|trimnumeric|max_length[11]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('BabaAd', FORM_LANG_EN['BabaAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('BabaTel', FORM_LANG_EN['BabaTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Adres', FORM_LANG_EN['Adres'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Tc', FORM_LANG_EN['Tc'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Aciklama', FORM_LANG_EN['Aciklama'], 'trim|max_length[255]|strip_tags|xss_clean');
	        } else {
	          $this->form_validation->set_rules('AdSoyad', FORM_LANG_TR['AdSoyad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Cinsiyet', FORM_LANG_TR['Cinsiyet'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('SinavTarihi', FORM_LANG_TR['SinavTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('DogumTarihi', FORM_LANG_TR['DogumTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('DogumYeri', FORM_LANG_TR['DogumYeri'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('OOSinif', FORM_LANG_TR['OOSinif'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('OOOkul', FORM_LANG_TR['OOOkul'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Bolum', FORM_LANG_TR['Bolum'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('AnneAd', FORM_LANG_TR['AnneAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('AnneTel', FORM_LANG_TR['AnneTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('BabaAd', FORM_LANG_TR['BabaAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('BabaTel', FORM_LANG_TR['BabaTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Adres', FORM_LANG_TR['Adres'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Tc', FORM_LANG_TR['Tc'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
	          $this->form_validation->set_rules('Aciklama', FORM_LANG_TR['Aciklama'], 'trim|max_length[255]|strip_tags|xss_clean');
	        }
	        $this->form_validation->set_error_delimiters('<p style="margin:10px 0px;" class="text-danger">', '</p>');
	        if ($this->form_validation->run()) {
	          $result = $this->General_Model->AddSinavBasvurusu();
	          $this->data['deneme'] = $result;
	          if ($result) {
	            $this->data['success'] = true;
	          }
	        } else {
	          	//show errors
	        	foreach ($_POST as $key => $value) {
	            	$this->data['messages'][$key] = form_error($key);
	          
	        	}
	    	}
	      
	      echo json_encode($this->data);
	    }
  	}


}
