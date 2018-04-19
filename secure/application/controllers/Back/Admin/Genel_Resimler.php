<?php

class Genel_Resimler extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
            'cacheKeys' => array(
                'GetResimlerTR' => md5('GetResimlerCacheTR'),
                'GetResimlerEN' => md5('GetResimlerCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in')) {
            $this->load->view('Back/Admin/Resimler-view');
        } else {
            redirect('Portal');
        }
    }

    public function GetResimler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            $this->data['cachePostTR'] = $this->input->post('CacheTR');
            $this->data['cachePostEN'] = $this->input->post('CacheEN');
            $cacheKeyTR = $this->data['cacheKeys']['GetResimlerTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetResimlerEN'];
            $this->data['English'] = $this->input->post('English');
            $this->data['NeedData'] = $this->input->post('NeedData');

            if ($this->data['NeedData'] == "true") {
                $this->data['data'] = $this->General_Model->GetResimler();
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
                            $this->data['data'] = $this->General_Model->GetResimler();
                        } else if($this->data['English'] == "false" && !$gotCacheTR) {
                            $this->data['data'] = $this->General_Model->GetResimler();
                        }
                    }

                }
            }
            echo json_encode($this->data);
        }
    }

    public function GetResimlerNum(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $this->data['data'] = $this->General_Model->GetResimlerNum();
                if ($this->data['data']) {
                    $this->data['success'] = true;
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

    public function AddResimler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('RIsim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('RKategori', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('RDosyaV', "", 'required|strip_tags|xss_clean');
                $this->form_validation->set_rules('IsNamesSameV', "", 'required|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $Isim = $this->input->post('RIsim');
                    $Isim = preg_replace('!\s+!', ' ', $Isim);
                    $Kategori = $this->input->post('RKategori');
                    $IsNamesSame = $this->input->post('IsNamesSame');
                    $InsertData = array();

                    $config['upload_path'] = 'resources/images/'.$Kategori;
                    $config['allowed_types'] = 'gif|jpg|png|jpeg';

                    for($i = 0; $i < count($_FILES["files"]["name"]); $i++) {
                        $_FILES["file"]["name"] = $_FILES["files"]["name"][$i];
                        $_FILES["file"]["type"] = $_FILES["files"]["type"][$i];
                        $_FILES["file"]["tmp_name"] = $_FILES["files"]["tmp_name"][$i];
                        $_FILES["file"]["error"] = $_FILES["files"]["error"][$i];
                        $_FILES["file"]["size"] = $_FILES["files"]["size"][$i];
                        $tempFinalFileName = explode(".", $_FILES["file"]["name"]);
                        $FinalFileName = "";
                        if ($IsNamesSame == "true") {
                            $FinalFileName = $Isim.($i + 1);
                        } else {
                            if ($Isim == "") {
                                for ($j=0; $j < count($tempFinalFileName); $j++) { 
                                    if (($j + 1) != count($tempFinalFileName)) {
                                        $FinalFileName .= $tempFinalFileName[$j];
                                    }
                                }
                            } else {
                                $FinalFileName = $Isim;
                            }
                        }
                        $config['file_name'] = TurkceToIngilizce($FinalFileName);
                        $this->load->library('upload', $config);
                        $this->upload->initialize($config);
                        if($this->upload->do_upload('file')) {
                            $data = $this->upload->data();
                            $RDosya = $data["file_name"];
                            $RTarih = date("d.m.y H:i:s");

                            $InsertData[count($InsertData)] = array(
                                'RIsim' => $FinalFileName,
                                'RKategori' => $Kategori,
                                'RDosya' => $RDosya,
                                'RTarih' => $RTarih
                            );
                        } else {
                            $this->data['success'] = false;
                        }

                    }
                    
                    $result = $this->General_Model->AddResimler($InsertData);
                    if ($result) {
                        $cacheKeys = array('Resimler');
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

    public function EditResimler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditResimler();
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

    public function UpdateResimler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('RIsim', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('RKategori', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $Isim = preg_replace('!\s+!', ' ', $this->input->post('RIsim'));
                    $FileName = TurkceToIngilizce($this->input->post('RIsim'));

                    $data = array(
                        'Isim'        =>$Isim,
                        'FileName'    =>$FileName,
                    );

                    $result = $this->General_Model->UpdateResimler($data);
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Resimler');
                        DeleteCaches($cacheKeys, $this->data);
                        $this->data['data'] = $this->General_Model->EditResimler();
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

    public function DeleteResimler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeleteResimler();
                    if($result){
                        $cacheKeys = array('Resimler');
                        DeleteCaches($cacheKeys, $this->data);
                        $file_to_remove = $this->input->post('file_to_remove');
                        $this->data['isRemoved'] = unlink($file_to_remove);
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
