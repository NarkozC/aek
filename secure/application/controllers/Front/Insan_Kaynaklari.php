<?php

class Insan_Kaynaklari extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
			'cacheKeys' => array(
				'GetInsanKaynaklariTR' => md5('GetInsanKaynaklariCacheTR'),
				'GetInsanKaynaklariEN' => md5('GetInsanKaynaklariCacheEN'),
			),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function index()
	{
		$this->load->view('Front/InsanKaynaklari-view');
	}

	public function GetInsanKaynaklari(){
		if(! $this->input->is_ajax_request()) {
			redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetInsanKaynaklariTR'];
			$cacheKeyEN = $this->data['cacheKeys']['GetInsanKaynaklariEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetInsanKaynaklari();
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
							$this->data['data'] = $this->General_Model->GetInsanKaynaklari();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetInsanKaynaklari();
						}
					}

				}
			}
			echo json_encode($this->data);
		}
	}

	public function AddInsanKaynaklari(){
		if(! $this->input->is_ajax_request()) {
			redirect('404');
		} else {
			$en = $_POST["English"];
			if ($en == "true") {
				$this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
			}
			$this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
			$this->form_validation->set_rules('DogumTarihi', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('Email', "", 'required|trim|valid_email|strip_tags|xss_clean');
			$this->form_validation->set_rules('Tel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
			$this->form_validation->set_rules('AltTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
			$this->form_validation->set_rules('Pozisyon', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('MOO', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('Brans', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('OTS', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('DTS', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('YTS', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			$this->form_validation->set_rules('CvV', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
			if ($this->form_validation->run()) {
				$AdSoyad = $this->input->post('AdSoyad');
				$CvIsim = $AdSoyad.'_Cv';
				$CvIsim = preg_replace('!\s+!', ' ', $CvIsim);
				$config['upload_path'] = 'resources/pdfs/Cv';
				$config['allowed_types'] = 'pdf';
				$config['file_name'] = TurkceToIngilizce($CvIsim);

				$this->load->library('upload', $config);
				$this->upload->initialize($config);
				if($this->upload->do_upload('file')) {
					$data = $this->upload->data();
					$Cv = $data["file_name"];
					$BasTarihi = date("y.m.d");

					$InsertData = array(
						'Cv' => $Cv,
						'BasTarihi' => $BasTarihi
					);
					$result = $this->General_Model->AddInsanKaynaklari($InsertData);
					if ($result) {
						$this->data['success'] = true;
					}
				}
				$cacheKeys = array('InsanKaynaklari');
				DeleteCaches($cacheKeys, $this->data);
			} else {
				foreach ($_POST as $key => $value) {
					$this->data['messages'][$key] = form_error($key);
				}
			}
			echo json_encode($this->data);
		}
	}

}
