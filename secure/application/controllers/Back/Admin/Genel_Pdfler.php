<?php

class Genel_Pdfler extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
            'cacheKeys' => array(
                'GetPdflerTR' => md5('GetPdflerCacheTR'),
                'GetPdflerEN' => md5('GetPdflerCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
// check if logged in
        if($this->session->userdata('logged_in')) {
            $this->load->view('Back/Admin/Pdfler-view');
        } else {
            redirect('Portal');
        }
    }

    public function GetPdfler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            $this->data['cachePostTR'] = $this->input->post('CacheTR');
            $this->data['cachePostEN'] = $this->input->post('CacheEN');
            $cacheKeyTR = $this->data['cacheKeys']['GetPdflerTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetPdflerEN'];
            $this->data['English'] = $this->input->post('English');
            $this->data['NeedData'] = $this->input->post('NeedData');

            if ($this->data['NeedData'] == "true") {
                $this->data['data'] = $this->General_Model->GetPdfler();
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
                            $this->data['data'] = $this->General_Model->GetPdfler();
                        } else if($this->data['English'] == "false" && !$gotCacheTR) {
                            $this->data['data'] = $this->General_Model->GetPdfler();
                        }
                    }

                }
            }
            echo json_encode($this->data);
        }
    }

    public function GetPdflerNum(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $this->data['data'] = $this->General_Model->GetPdflerNum();
                if ($this->data['data']) {
                    $this->data['success'] = true;
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

    public function AddPdfler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('Isim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('Isim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $cacheKeys = array('Pdfler');
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

    public function EditPdfler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditPdfler();
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

    public function UpdatePdfler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {

                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Isim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Isim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $Isim =$this->input->post('Isim');
                    $IGIsim =$this->input->post('IGIsim');
                    $DIsim =$this->input->post('Isim');

                    $DIsim = TurkceToIngilizce($DIsim);
                    $Isim = preg_replace('!\s+!', ' ', $Isim);

                    $data = array(
                        'Isim'    =>$Isim,
                        'DIsim'    =>$DIsim,
                    );

                    $result = $this->General_Model->UpdatePdfler($data);
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Pdfler');
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
                        $this->data['data'] = $this->General_Model->EditPdfler();
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

    public function DeletePdfler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeletePdfler();
                    if($result){
                        $cacheKeys = array('Pdfler');
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


    public function AddPdflerUpload(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {

                if ( ! empty($_FILES)) {
                    $Isim = $this->input->post('Isim');
                    $RDosyaName = $this->input->post('DosyaName');
                    if ($Isim == "Dosya") {
                        $Isim = $DosyaName;
                    }
                    $Isim = preg_replace('!\s+!', ' ', $Isim);

                    $Dosya = $Isim;

                    $Dosya = TurkceToIngilizce($Dosya);

                    $config['upload_path'] = 'resources/pdfs';
                    $config['allowed_types'] = 'pdf|PDF';
                    $config['max_size'] = '30000';
                    $config['file_name'] = $Dosya;

                    $this->load->library('upload', $config);
                    if (! $this->upload->do_upload("Dosya")) {
                        $this->data['success'] = false;
                    } else {
                        $dosya = $this->upload->data('full_path');
                        if ($dosya) {
                            $parts = explode('/', $dosya);
                            $value = $parts[count($parts) - 1];
                            $new_value = pathinfo($value, PATHINFO_FILENAME) . '.' . strtolower(pathinfo($value, PATHINFO_EXTENSION));
                            $dosya = $new_value;
                            $yukleme_Tarihi = date("d.m.y H:i:s");

                            $pdf = array(
                                'Isim' => $Isim,
                                'Dosya' => $dosya,
                                'Tarih' => $yukleme_Tarihi,
                            );
                            $result = $this->General_Model->AddPdfler($pdf);
                            if ($result) {
                                $this->data['success'] = true;
                            }

                        }
                    }

                } else if ($this->input->post('file_to_remove')) {
                    $result = $this->General_Model->DeletePdfler();
                    if($result){
                        $file_to_remove = $this->input->post('file_to_remove');
                        $this->data['deneme'] = unlink($file_to_remove);
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
