<?php

class Hakkimizda extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
						'cacheKeys' => array(
                          'GetHakkimizdaTR' => md5('GetHakkimizdaCacheTR'),
                          'GetHakkimizdaEN' => md5('GetHakkimizdaCacheEN'),

                          'GetHakkimizdaHtmlTR' => md5('GetHakkimizdaHtmlCacheTR'),
                          'GetHakkimizdaHtmlEN' => md5('GetHakkimizdaHtmlCacheEN'),
                        ),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function index()
	{
		$this->load->view('Front/Hakkimizda-view');
	}

	public function GetHakkimizda(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetHakkimizdaTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetHakkimizdaEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetHakkimizda();
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
							$this->data['data'] = $this->General_Model->GetHakkimizda();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetHakkimizda();
						}
					}
					
				}
			}
			echo json_encode($this->data);
		}
	}

	public function GetHakkimizdaNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetHakkimizdaNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
