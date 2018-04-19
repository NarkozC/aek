<?php

class Kadro extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(
                'GetKadroTR' => md5('GetKadroCacheTR'),
                'GetKadroEN' => md5('GetKadroCacheEN'),

                'GetKadroGrupTR' => md5('GetKadroGrupCacheTR'),
                'GetKadroGrupEN' => md5('GetKadroGrupCacheEN'),

                'GetKadroHtmlTR' => md5('GetKadroHtmlCacheTR'),
                'GetKadroHtmlEN' => md5('GetKadroHtmlCacheEN'),

                'GetYonetimKuruluTR' => md5('GetYonetimKuruluCacheTR'),
                'GetYonetimKuruluEN' => md5('GetYonetimKuruluCacheEN'),

                'GetOkulAileBirligiTR' => md5('GetOkulAileBirligiCacheTR'),
                'GetOkulAileBirligiEN' => md5('GetOkulAileBirligiCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Kadro-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddKadro(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                $sayfa = $_POST["Sayfa"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('Sayfa', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    if ($sayfa == "kadro" || $sayfa == "yonetim-kurulu" || $sayfa == "okul-aile-birligi") {
                        $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    }
                    if ($sayfa == "yonetim-kurulu") {
                        $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    }
                    if ($sayfa == "okul-aile-birligi-galeri") { 
                        $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    }
                } else {
                    $this->form_validation->set_rules('Sayfa', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    if ($sayfa == "kadro" || $sayfa == "yonetim-kurulu" || $sayfa == "okul-aile-birligi") {
                        $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    }
                    if ($sayfa == "yonetim-kurulu") {
                        $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    }
                    if ($sayfa == "okul-aile-birligi-galeri") { 
                        $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    }
                }
                
                if ($this->form_validation->run()) {
                    $ModelData = array();
                    if ($sayfa != "okul-aile-birligi-galeri") {
                        $ModelData = array(
                            'AdSoyad'              => $this->input->post('AdSoyad'),
                            'GrupSectionID'        => $this->input->post('GrupSectionID'),
                            'Aciklama'             => $this->input->post('Aciklama'),
                            'Resim'                => $this->input->post('Resim'),
                            'tr_UzunAciklama'      => $this->input->post('tr_UzunAciklama'),
                            'en_UzunAciklama'      => $this->input->post('en_UzunAciklama'),
                        );
                    } else if ($sayfa == "okul-aile-birligi-galeri") {
                        $ResimF = '';
                        if(isset($_POST['Resim'])) {
                            $ResimF = ArrayToComma($_POST['Resim']);
                        }
                        $ModelData = array(
                            'GrupSectionID'        => $this->input->post('GrupSectionID'),
                            'Aciklama'             => $this->input->post('Aciklama'),
                            'Resim'                => $ResimF,
                            'tr_UzunAciklama'      => $this->input->post('tr_UzunAciklama'),
                            'en_UzunAciklama'      => $this->input->post('en_UzunAciklama'),
                            'AdSoyad'              => $this->input->post('tr_UzunAciklama'),
                        );
                    }
                    $result = $this->General_Model->AddKadro($ModelData);
                    if ($result) {
                        $cacheKeys = array('Kadro', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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
                        $this->data['data'] = $this->General_Model->EditKadro('0');
                        $this->data['sayfa'] = $this->input->post('Sayfa');
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

        public function UpdateKadro(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    $sayfa = $_POST["Sayfa"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Sayfa', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        if ($sayfa == "kadro" || $sayfa == "yonetim-kurulu" || $sayfa == "okul-aile-birligi") {
                            $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        }
                        if ($sayfa == "yonetim-kurulu") {
                            $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        }
                        if ($sayfa == "okul-aile-birligi-galeri") { 
                            $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        }
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('Sayfa', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        if ($sayfa == "kadro" || $sayfa == "yonetim-kurulu" || $sayfa == "okul-aile-birligi") {
                            $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('Aciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('Resim', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        }
                        if ($sayfa == "yonetim-kurulu") {
                            $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        }
                        if ($sayfa == "okul-aile-birligi-galeri") { 
                            $this->form_validation->set_rules('GrupSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('Resim[]', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('tr_UzunAciklama', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('en_UzunAciklama', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        }
                    }
                    
                    if ($this->form_validation->run()) {
                        $ModelData = array();
                        if ($sayfa != "okul-aile-birligi-galeri") {
                            $ModelData = array(
                                'AdSoyad'              => $this->input->post('AdSoyad'),
                                'GrupSectionID'        => $this->input->post('GrupSectionID'),
                                'Aciklama'             => $this->input->post('Aciklama'),
                                'Resim'                => $this->input->post('Resim'),
                                'tr_UzunAciklama'      => $this->input->post('tr_UzunAciklama'),
                                'en_UzunAciklama'      => $this->input->post('en_UzunAciklama'),
                            );
                        } else if ($sayfa == "okul-aile-birligi-galeri") {
                            $ResimF = '';
                            if(isset($_POST['Resim'])) {
                                $ResimF = ArrayToComma($_POST['Resim']);
                            }
                            $ModelData = array(
                                'GrupSectionID'        => $this->input->post('GrupSectionID'),
                                'Aciklama'             => $this->input->post('Aciklama'),
                                'Resim'                => $ResimF,
                                'tr_UzunAciklama'      => $this->input->post('tr_UzunAciklama'),
                                'en_UzunAciklama'      => $this->input->post('en_UzunAciklama'),
                                'AdSoyad'              => $this->input->post('tr_UzunAciklama'),
                            );
                        }
                        $result = $this->General_Model->UpdateKadro($ModelData);
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('Kadro', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

                            $this->data['data'] = $this->General_Model->EditKadro();
                            $this->data['sayfa'] = $this->input->post('Sayfa');
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

        public function EditKadro(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditKadro();
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

        public function DeleteKadro(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteKadro();
                        if($result){
                            $cacheKeys = array('Kadro', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

        public function UpKadro(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {

                        $result = $this->General_Model->UpKadro();
                        if($result){
                            $cacheKeys = array('Kadro', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

        public function DownKadro(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DownKadro();
                        if($result){
                            $cacheKeys = array('Kadro', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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













        public function AddKadroGrup(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    $mainOrSub = $_POST["MainOrSub"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('MainOrSub', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('MainSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('tr_KisaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_KisaAd', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                    } else {
                        $this->form_validation->set_rules('MainOrSub', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('MainSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('tr_KisaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('en_KisaAd', "", 'trim|max_length[255]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                    }
                    
                    if ($this->form_validation->run()) {
                        $KisaAd = $this->input->post('tr_KisaAd');
                        $KisaAdF = TurkceToIngilizce($KisaAd);
                        $ModelData = array(
                            'SubSectionID'        => $KisaAdF,
                        );
                        $result = $this->General_Model->AddKadroGrup($ModelData);
                        if ($result) {
                            $cacheKeys = array('KadroGrup', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

                            $this->data['data'] = $this->General_Model->EditKadroGrup('0');
                            $this->data['sayfa'] = $mainOrSub;
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

            public function UpdateKadroGrup(){
                if(! $this->input->is_ajax_request()) {
                    redirect('404');
                } else {
                    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                        $en = $_POST["English"];
                        $mainOrSub = $_POST["MainOrSub"];
                        if ($en == "true") {
                            $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                            $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('MainOrSub', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('MainSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('tr_KisaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('en_KisaAd', "", 'trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('tr_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                        } else {
                            $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('MainOrSub', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('MainSectionID', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('tr_KisaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('en_KisaAd', "", 'trim|max_length[255]|strip_tags|xss_clean');
                            $this->form_validation->set_rules('tr_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                            $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                        }
                        
                        if ($this->form_validation->run()) {
                            $KisaAd = $this->input->post('tr_KisaAd');
                            $KisaAdF = TurkceToIngilizce($KisaAd);
                            $ModelData = array(
                                'SubSectionID'        => $KisaAdF,
                            );
                            $result = $this->General_Model->UpdateKadroGrup($ModelData);
                            $this->data['type'] = 'update';
                            if($result){
                                $cacheKeys = array('KadroGrup', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

                                $this->data['data'] = $this->General_Model->EditKadroGrup();
                                $this->data['sayfa'] = $mainOrSub;
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

            public function EditKadroGrup(){
                if(! $this->input->is_ajax_request()) {
                    redirect('404');
                } else {
                    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        
                        if ($this->form_validation->run()) {
                            $this->data['data'] = $this->General_Model->EditKadroGrup();
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

            public function DeleteKadroGrup(){
                if(! $this->input->is_ajax_request()) {
                    redirect('404');
                } else {
                    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        
                        if ($this->form_validation->run()) {
                            $result = $this->General_Model->DeleteKadroGrup();
                            if($result){
                                $cacheKeys = array('KadroGrup', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

            public function UpKadroGrup(){
                if(! $this->input->is_ajax_request()) {
                    redirect('404');
                } else {
                    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        
                        if ($this->form_validation->run()) {
                            $result = $this->General_Model->UpKadroGrup();
                            if($result){
                                $cacheKeys = array('KadroGrup', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

            public function DownKadroGrup(){
                if(! $this->input->is_ajax_request()) {
                    redirect('404');
                } else {
                    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('ListOrder', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        
                        if ($this->form_validation->run()) {
                            $result = $this->General_Model->DownKadroGrup();
                            if($result){
                                $cacheKeys = array('KadroGrup', 'KadroHtml', 'YonetimKurulu', 'OkulAileBirligi');

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

            function ResetCache($cachekey){

            }

        }
