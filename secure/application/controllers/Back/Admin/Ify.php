<?php

class Ify extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetIfyTR' => md5('GetIfyCacheTR'),
                'GetIfyEN' => md5('GetIfyCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Ify-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddIfy(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $resimF = ArrayToComma($_POST['Resim']);

                    $ModelData = array(
                        'Resim'    => $resimF,
                    );
                    $result = $this->General_Model->AddIfy($ModelData);
                    if ($result) {
                        $cacheKeys = array('Ify');
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
                        $this->data['data'] = $this->General_Model->EditIfy('0');
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

        public function UpdateIfy(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    }
                    
                    if ($this->form_validation->run()) {
                        $resimF = ArrayToComma($_POST['Resim']);

                        $ModelData = array(
                            'Resim'    => $resimF,
                        );
                        $this->data['ModelData'] = $ModelData;
                        $result = $this->General_Model->UpdateIfy($ModelData);
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('Ify');
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
                            $this->data['data'] = $this->General_Model->EditIfy();
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

        public function EditIfy(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditIfy();
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

        public function DeleteIfy(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteIfy();
                        if($result){
                            $cacheKeys = array('Ify');
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

        public function UpIfy(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {

                        $result = $this->General_Model->UpIfy();
                        if($result){
                            $cacheKeys = array('Ify');
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

        public function DownIfy(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DownIfy();
                        if($result){
                            $cacheKeys = array('Ify');
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
