<?php

class Haberler extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetHaberlerTR' => md5('GetHaberlerCacheTR'),
                'GetHaberlerEN' => md5('GetHaberlerCacheEN'),

                'GetHaberlerHtmlTR' => md5('GetHaberlerHtmlCacheTR'),
                'GetHaberlerHtmlEN' => md5('GetHaberlerHtmlCacheEN'),

            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Haberler-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddHaberler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('tr_AnaResim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Yazi', "", 'required|trim');

                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('en_AnaResim', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('en_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('en_Yazi', "", 'trim');

                    $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('tr_AnaResim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Yazi', "", 'required|trim');

                    $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('en_AnaResim', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('en_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('en_Yazi', "", 'trim');

                    $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $OkulF = ArrayToComma($_POST['Okul']);
                    $tr_DigerResimlerF = ArrayToComma($_POST['tr_DigerResimler']);
                    $en_DigerResimlerF = ArrayToComma($_POST['en_DigerResimler']);

                    $tr_Baslik = $this->input->post('tr_Baslik');
                    $en_Baslik = $this->input->post('en_Baslik');
                    $SectionIDs = array('Tr'=>TurkceToIngilizce($tr_Baslik),
                        'En'=>TurkceToIngilizce($en_Baslik)
                    );

                    $ModelData = array(
                        'tr_SectionID'        => $SectionIDs['Tr'],
                        'en_SectionID'        => $SectionIDs['En'],
                        'Okul'                => $OkulF,
                        'tr_DigerResimler'    => $tr_DigerResimlerF,
                        'en_DigerResimler'    => $en_DigerResimlerF,
                    );
                    $result = $this->General_Model->AddHaberler($ModelData);
                    if ($result) {
                        $cacheKeys = array('Haberler','HaberlerHtml');
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
                        $this->data['data'] = $this->General_Model->EditHaberler('0');
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

        public function UpdateHaberler(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('tr_AnaResim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Yazi', "", 'required|trim');

                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('en_AnaResim', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_Yazi', "", 'trim');

                        $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Baslik', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('tr_AnaResim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Yazi', "", 'required|trim');

                        $this->form_validation->set_rules('en_Baslik', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                        $this->form_validation->set_rules('en_AnaResim', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_DigerResimler[]', "", 'trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_Yazi', "", 'trim');

                        $this->form_validation->set_rules('Okul[]', "", 'required|trim|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Tarih', "", 'required|trim|strip_tags|xss_clean');
                    }
                    
                    if ($this->form_validation->run()) {
                        $OkulF = ArrayToComma($_POST['Okul']);
                        $tr_DigerResimlerF = ArrayToComma($_POST['tr_DigerResimler']);
                        $en_DigerResimlerF = ArrayToComma($_POST['en_DigerResimler']);

                        $tr_Baslik = $this->input->post('tr_Baslik');
                        $en_Baslik = $this->input->post('en_Baslik');
                        $SectionIDs = array('Tr'=>TurkceToIngilizce($tr_Baslik),
                            'En'=>TurkceToIngilizce($en_Baslik)
                        );

                        $ModelData = array(
                            'tr_SectionID'        => $SectionIDs['Tr'],
                            'en_SectionID'        => $SectionIDs['En'],
                            'Okul'                => $OkulF,
                            'tr_DigerResimler'    => $tr_DigerResimlerF,
                            'en_DigerResimler'    => $en_DigerResimlerF,
                        );
                        $this->data['ModelData'] = $ModelData;
                        $result = $this->General_Model->UpdateHaberler($ModelData);
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('Haberler','HaberlerHtml');
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
                            $this->data['data'] = $this->General_Model->EditHaberler();
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

        public function EditHaberler(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditHaberler();
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

        public function DeleteHaberler(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteHaberler();
                        if($result){
                            $cacheKeys = array('Haberler','HaberlerHtml');
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
