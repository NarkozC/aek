<?php

class Egitim_Sistemimiz extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetEgitimSistemimizTR' => md5('GetEgitimSistemimizCacheTR'),
                'GetEgitimSistemimizEN' => md5('GetEgitimSistemimizCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/EgitimSistemimiz-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddEgitimSistemimiz(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|xss_clean'); 
                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|xss_clean'); 
                    $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|xss_clean');       
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');       
                } else {
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|xss_clean'); 
                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|xss_clean'); 
                    $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|xss_clean');       
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');       
                }
                
                if ($this->form_validation->run()) {
                    $resimF = ArrayToComma($_POST['Resim']);

                    $ModelData = array(
                        'Resim'    => $resimF,
                    );
                    $result = $this->General_Model->AddEgitimSistemimiz($ModelData);
                    if ($result) {
                        $cacheKeys = array('EgitimSistemimiz');
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
                        $this->data['data'] = $this->General_Model->EditEgitimSistemimiz('0');
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

        public function UpdateEgitimSistemimiz(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|xss_clean'); 
                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|xss_clean'); 
                        $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|xss_clean');       
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');       
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|xss_clean'); 
                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|xss_clean'); 
                        $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|xss_clean');       
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|xss_clean');       
                    }
                    
                    if ($this->form_validation->run()) {
                        $resimF = ArrayToComma($_POST['Resim']);

                        $ModelData = array(
                            'Resim'    => $resimF,
                        );
                        $this->data['ModelData'] = $ModelData;
                        $result = $this->General_Model->UpdateEgitimSistemimiz($ModelData);
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('EgitimSistemimiz');
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
                            $this->data['data'] = $this->General_Model->EditEgitimSistemimiz();
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

        public function EditEgitimSistemimiz(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditEgitimSistemimiz();
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

        public function DeleteEgitimSistemimiz(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteEgitimSistemimiz();
                        if($result){
                            $cacheKeys = array('EgitimSistemimiz');
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

        public function UpEgitimSistemimiz(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|xss_clean');
                    
                    if ($this->form_validation->run()) {

                        $result = $this->General_Model->UpEgitimSistemimiz();
                        if($result){
                            $cacheKeys = array('EgitimSistemimiz');
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

        public function DownEgitimSistemimiz(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DownEgitimSistemimiz();
                        if($result){
                            $cacheKeys = array('EgitimSistemimiz');
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
