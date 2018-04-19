<?php

class Aylik_Yemek_Listesi extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetAylikYemekListesiTR' => md5('GetAylikYemekListesiCacheTR'),
                'GetAylikYemekListesiEN' => md5('GetAylikYemekListesiCacheEN'),

                'GetAylikYemekListesiHtmlTR' => md5('GetAylikYemekListesiHtmlCacheTR'),
                'GetAylikYemekListesiHtmlEN' => md5('GetAylikYemekListesiHtmlCacheEN'),

            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/AylikYemekListesi-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddAylikYemekListesi(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('tr_Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');

                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('en_Resim', "", 'trim|max_length[255]|strip_tags|xss_clean');

                    $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('tr_Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');

                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('en_Resim', "", 'trim|max_length[255]|strip_tags|xss_clean');

                    $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $OkulF = ArrayToComma($_POST['Okul']);
                    $tr_Baslik = $this->input->post('tr_Baslik');
                    $en_Baslik = $this->input->post('en_Baslik');
                    $SectionIDs = array('Tr'=>TurkceToIngilizce($tr_Baslik),
                        'En'=>TurkceToIngilizce($en_Baslik)
                    );

                    $ModelData = array(
                        'tr_SectionID'        => $SectionIDs['Tr'],
                        'en_SectionID'        => $SectionIDs['En'],
                        'Okul'                => $OkulF,
                    );
                    $result = $this->General_Model->AddAylikYemekListesi($ModelData);
                    if ($result) {
                        $cacheKeys = array('AylikYemekListesi','AylikYemekListesiHtml');
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
                        $this->data['data'] = $this->General_Model->EditAylikYemekListesi('0');
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

        public function UpdateAylikYemekListesi(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('tr_Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');

                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('en_Resim', "", 'trim|max_length[255]|strip_tags|xss_clean');

                        $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('tr_Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');

                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('en_Resim', "", 'trim|max_length[255]|strip_tags|xss_clean');

                        $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                    }
                    
                    if ($this->form_validation->run()) {
                        $OkulF = ArrayToComma($_POST['Okul']);
                        $tr_Baslik = $this->input->post('tr_Baslik');
                        $en_Baslik = $this->input->post('en_Baslik');
                        $SectionIDs = array('Tr'=>TurkceToIngilizce($tr_Baslik),
                            'En'=>TurkceToIngilizce($en_Baslik)
                        );

                        $ModelData = array(
                            'tr_SectionID'        => $SectionIDs['Tr'],
                            'en_SectionID'        => $SectionIDs['En'],
                            'Okul'                => $OkulF,
                        );
                        $result = $this->General_Model->UpdateAylikYemekListesi($ModelData);
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('AylikYemekListesi','AylikYemekListesiHtml');
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
                            $this->data['data'] = $this->General_Model->EditAylikYemekListesi();
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

        public function EditAylikYemekListesi(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditAylikYemekListesi();
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

        public function DeleteAylikYemekListesi(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteAylikYemekListesi();
                        if($result){
                            $cacheKeys = array('AylikYemekListesi','AylikYemekListesiHtml');
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
