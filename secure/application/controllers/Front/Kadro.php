<?php

class Kadro extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
						'cacheKeys' => array(
                          'GetKadroTR' => md5('GetKadroCacheTR'),
                          'GetKadroEN' => md5('GetKadroCacheEN'),

                          'GetKadroGrupTR' => md5('GetKadroGrupCacheTR'),
                          'GetKadroGrupEN' => md5('GetKadroGrupCacheEN'),

                          'GetKadroHtmlTR' => md5('GetKadroHtmlCacheTR'),
                          'GetKadroHtmlEN' => md5('GetKadroHtmlCacheEN'),

                          'GetYonetimKuruluTR' => md5('GetYonetimKuruluCacheTR'),
                          'GetYonetimKuruluEN' => md5('GetYonetimKuruluCacheEN'),

                          'GetOkulAileBirligiTR' => md5('GetOkulAileBirligiCacheTR'),
                          'GetOkulAileBirligiEN' => md5('GetOkulAileBirligiCacheEN'),
                        ),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function index()
	{
		$this->load->view('Front/Kadro-view');
	}

	public function GetKadro(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetKadroTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetKadroEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetKadro();
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
							$this->data['data'] = $this->General_Model->GetKadro();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetKadro();
						}
					}
					
				}
			}
			echo json_encode($this->data);
		}
	}

	public function GetKadroGrup(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {

			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetKadroGrupTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetKadroGrupEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetKadroGrup();
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
							$this->data['data'] = $this->General_Model->GetKadroGrup();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetKadroGrup();
						}
					}
					
				}
			}
			
			echo json_encode($this->data);
		}
	}

	public function GetKadroHtml()
	{
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetKadroHtmlTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetKadroHtmlEN'];

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
				
			}
			
			echo json_encode($this->data);
		}
	}

	public function GetYonetimKurulu()
	{
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetYonetimKuruluTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetYonetimKuruluEN'];

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
				
			}
			
			echo json_encode($this->data);
		}
	}

	public function GetOkulAileBirligi()
	{
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetOkulAileBirligiTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetOkulAileBirligiEN'];

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
				
			}
			
			echo json_encode($this->data);
		}
	}

	public function GetKadroWGrupSectionID(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetKadroWGrupSectionID($this->input->post('GrupSectionID'));
			echo json_encode($result);
		}
	}

	public function GetKadroNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetKadroNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

	public function GetKadroNumWGrupSectionID(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$result = $this->General_Model->GetKadroNumWGrupSectionID($this->input->post('GrupSectionID'));
			echo json_encode($result);
		}
	}

	public function GetKadroGrupNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetKadroGrupNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
