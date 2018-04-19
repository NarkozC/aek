<?php

class Sinav_Takvimi extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetSinavTakvimiTR' => md5('GetSinavTakvimiCacheTR'),
                'GetSinavTakvimiEN' => md5('GetSinavTakvimiCacheEN'),

                'GetSinavTakvimiHtmlTR' => md5('GetSinavTakvimiHtmlCacheTR'),
                'GetSinavTakvimiHtmlEN' => md5('GetSinavTakvimiHtmlCacheEN'),

            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/SinavTakvimi-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddSinavTakvimi(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('Yil', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('Ders', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Sube[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tarih', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Okul', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('Yil', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('Ders', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Sube[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tarih', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('en_Aciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Okul', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $SubeF = ArrayToComma($_POST['Sube']);

                    $ModelData = array(
                        'Sube'                => $SubeF,
                    );
                    $result = $this->General_Model->AddSinavTakvimi($ModelData);
                    if ($result) {
                        $cacheKeys = array('SinavTakvimi','SinavTakvimiHtml');
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
                        $this->data['data'] = $this->General_Model->EditSinavTakvimi('0');
                        $this->data['sayfa'] = $_POST['Okul'];
                        $this->data['success'] = true;
                    }
                } else {
//show errors
                    foreach ($_POST as $key => $value) {
                        $this->data['messages'][$key] = form_error($key);

                    }}

                    echo json_encode($this->data);
                } else {
                    redirect('Portal');
                }
            }
        }

        public function UpdateSinavTakvimi(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Yil', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('Ders', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Sube[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Tarih', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Okul', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Yil', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('Ders', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Sube[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Tarih', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_Aciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Okul', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    }
                    
                    if ($this->form_validation->run()) {
                        $SubeF = ArrayToComma($_POST['Sube']);

                        $ModelData = array(
                            'Sube'                => $SubeF,
                        );
                        $result = $this->General_Model->UpdateSinavTakvimi($ModelData);
                        $this->data['result'] = $result;
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('SinavTakvimi','SinavTakvimiHtml');
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
                            $this->data['data'] = $this->General_Model->EditSinavTakvimi();
                            $this->data['sayfa'] = $_POST['Okul'];
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

        public function EditSinavTakvimi(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditSinavTakvimi();
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

        public function DeleteSinavTakvimi(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteSinavTakvimi();
                        if($result){
                            $cacheKeys = array('SinavTakvimi','SinavTakvimiHtml');
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
