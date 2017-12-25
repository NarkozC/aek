<?php

class Ataturk_Kosesi extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
						'cacheKeys' => array(
                          'GetAtaturkKosesiTR' => md5('GetAtaturkKosesiCacheTR'),
                          'GetAtaturkKosesiEN' => md5('GetAtaturkKosesiCacheEN'),

                          'GetAtaturkKosesiHtmlTR' => md5('GetAtaturkKosesiHtmlCacheTR'),
                          'GetAtaturkKosesiHtmlEN' => md5('GetAtaturkKosesiHtmlCacheEN'),
                        ),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function index()
	{
		$this->load->view('Front/Ataturk-Kosesi-view');
	}

	public function GetAtaturkKosesi(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetAtaturkKosesiTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetAtaturkKosesiEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetAtaturkKosesi();
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
							$this->data['data'] = $this->General_Model->GetAtaturkKosesi();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetAtaturkKosesi();
						}
					}
					
				}
			}
			echo json_encode($this->data);
		}
	}

	public function GetAtaturkKosesiNum(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			// check if logged in
			if($this->session->userdata('logged_in')) {
				$result = $this->General_Model->GetAtaturkKosesiNum();
				echo json_encode($result);
			} else {
				redirect('Portal');
			}
		}
	}

}
