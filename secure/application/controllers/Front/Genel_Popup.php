<?php

class Genel_Popup extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->data = array('cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800, 'popupTime' => 300,
						'cacheKeys' => array(
                          'GetPopupTR' => md5('GetPopupCacheTR'),
                          'GetPopupEN' => md5('GetPopupCacheEN'),

                          'GetPopupHtmlTR' => md5('GetPopupHtmlCacheTR'),
                          'GetPopupHtmlEN' => md5('GetPopupHtmlCacheEN'),
                        ),

		);
		$this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
	}

	public function GetPopup(){
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['cachePostTR'] = $this->input->post('CacheTR');
			$this->data['cachePostEN'] = $this->input->post('CacheEN');
			$cacheKeyTR = $this->data['cacheKeys']['GetPopupTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetPopupEN'];
			$this->data['English'] = $this->input->post('English');
			$this->data['NeedData'] = $this->input->post('NeedData');

			if ($this->data['NeedData'] == "true") {
				$this->data['data'] = $this->General_Model->GetPopup();
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
							$this->data['data'] = $this->General_Model->GetPopup();
						} else if($this->data['English'] == "false" && !$gotCacheTR) {
							$this->data['data'] = $this->General_Model->GetPopup();
						}
					}
					
				}
			}
			echo json_encode($this->data);
		}
	}

	public function SessionPopup()
	{	
		if(! $this->input->is_ajax_request()) {
		    redirect('404');
		} else {
			$this->data['success'] = false;
			if (!$_SESSION['Popup']) {
				$this->data['success'] = true;
				$this->session->set_tempdata('Popup', true, $this->data['popupTime']);
			}
			echo json_encode($this->data);
		}
	}
	
}
