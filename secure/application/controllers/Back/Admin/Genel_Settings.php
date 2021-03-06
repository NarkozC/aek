<?php

class Genel_Settings extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetSettingsTR' => md5('GetSettingsCacheTR'),
                'GetSettingsEN' => md5('GetSettingsCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function UpdateSettings(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('ControllerName', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger1', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger2', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger3', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger4', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger5', "", 'trim|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('ControllerName', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger1', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger2', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger3', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger4', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Deger5', "", 'trim|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdateSettings();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Settings');
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
                        $this->data['success'] = true;
                    }
                } else {
                    foreach ($_POST as $key => $value) {
                        $this->data['messages'][$key] = form_error($key);
                    }
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

    public function EditSettings(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditSettings();
                    if ($this->data['data']) {
                        $this->data['success'] = true;
                    }
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

    public function DeleteSettings(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeleteSettings();
                    if($result){
                        $cacheKeys = array('Settings','SettingsHtml');
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
                        $this->data['success'] = true;
                    }
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

}
