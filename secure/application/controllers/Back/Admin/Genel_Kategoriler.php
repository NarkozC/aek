<?php

class Genel_Kategoriler extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
            'cacheKeys' => array(
                'GetKategorilerTR' => md5('GetKategorilerCacheTR'),
                'GetKategorilerEN' => md5('GetKategorilerCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Kategoriler-view');
        } else {
            redirect('Portal');
        }
    }

    public function GetKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            $this->data['cachePostTR'] = $this->input->post('CacheTR');
            $this->data['cachePostEN'] = $this->input->post('CacheEN');
            $cacheKeyTR = $this->data['cacheKeys']['GetKategorilerTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetKategorilerEN'];
            $this->data['English'] = $this->input->post('English');
            $this->data['NeedData'] = $this->input->post('NeedData');

            if ($this->data['NeedData'] == "true") {
                $this->data['data'] = $this->General_Model->GetKategoriler();
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
                            $this->data['data'] = $this->General_Model->GetKategoriler();
                        } else if($this->data['English'] == "false" && !$gotCacheTR) {
                            $this->data['data'] = $this->General_Model->GetKategoriler();
                        }
                    }

                }
            }
            echo json_encode($this->data);
        }
    }

    public function AddKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('Isim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');     
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->AddKategoriler();
                    if ($result) {
                        $cacheKeys = array('Kategoriler');
                        DeleteCaches($cacheKeys, $this->data);
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

    public function UpdateKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                $this->form_validation->set_rules('Isim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');

                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdateKategoriler();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Kategoriler');
                        DeleteCaches($cacheKeys, $this->data);
                        $this->data['data'] = $this->General_Model->EditKategoriler();
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

    public function EditKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');

                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditKategoriler();
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

    public function DeleteKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');

                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeleteKategoriler();
                    if($result){
                        $cacheKeys = array('Kategoriler');
                        DeleteCaches($cacheKeys, $this->data);
                        $this->data['success'] = true;
                    }
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

    public function UpKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');

                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpKategoriler();
                    if($result){
                        $cacheKeys = array('Kategoriler');
                        DeleteCaches($cacheKeys, $this->data);
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

    public function DownKategoriler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');

                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DownKategoriler();
                    if($result){
                        $cacheKeys = array('Kategoriler');
                        DeleteCaches($cacheKeys, $this->data);
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
