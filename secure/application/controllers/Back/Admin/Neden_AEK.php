<?php

class Neden_AEK extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetNedenAEKTR' => md5('GetNedenAEKCacheTR'),
                'GetNedenAEKEN' => md5('GetNedenAEKCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/NedenAEK-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddNedenAEK(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Aciklama', "", 'trim|xss_clean');       
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');       
                } else {
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Aciklama', "", 'trim|xss_clean');       
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');       
                }
                
                if ($this->form_validation->run()) {
                    $resimF = ArrayToComma($_POST['Resim']);

                    $ModelData = array(
                        'Resim'    => $resimF,
                    );
                    $result = $this->General_Model->AddNedenAEK($ModelData);
                    if ($result) {
                        $cacheKeys = array('NedenAEK');
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
                        $this->data['data'] = $this->General_Model->EditNedenAEK('0');
                        $this->data['success'] = true;
                    }
                } else {
                    foreach ($_POST as $key => $value) {
                        $this->data['messages'][$key] = form_error($key);

                    }}

                    echo json_encode($this->data);
                } else {
                    redirect('Portal');
                }
            }
        }

        public function UpdateNedenAEK(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('tr_Aciklama', "", 'trim|xss_clean');       
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');         
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('tr_Aciklama', "", 'trim|xss_clean');       
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');           
                    }
                    
                    if ($this->form_validation->run()) {
                        $resimF = ArrayToComma($_POST['Resim']);

                        $ModelData = array(
                            'Resim'    => $resimF,
                        );
                        $this->data['ModelData'] = $ModelData;
                        $result = $this->General_Model->UpdateNedenAEK($ModelData);
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('NedenAEK');
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
                            $this->data['data'] = $this->General_Model->EditNedenAEK();
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

        public function EditNedenAEK(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditNedenAEK();
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

        public function DeleteNedenAEK(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteNedenAEK();
                        if($result){
                            $cacheKeys = array('NedenAEK');
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

        public function UpNedenAEK(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {

                        $result = $this->General_Model->UpNedenAEK();
                        if($result){
                            $cacheKeys = array('NedenAEK');
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

        public function DownNedenAEK(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DownNedenAEK();
                        if($result){
                            $cacheKeys = array('NedenAEK');
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
