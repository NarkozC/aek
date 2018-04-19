<?php

class Iletisim extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetIletisimTR' => md5('GetIletisimCacheTR'),
                'GetIletisimEN' => md5('GetIletisimCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Iletisim-view');
        } else {
            redirect('Portal');
        }
    }

    public function UpdateIletisim(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tel1', "".'1', 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Tel2', "".'2', 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Tel3', "".'3', 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Email', "", 'required|trim|valid_email|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('YolTarifi', "", 'required|trim|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('Adres', "", 'required|trim|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Maps', "", 'trim|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tel1', "".'1', 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Tel2', "".'2', 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Tel3', "".'3', 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Email', "", 'required|trim|valid_email|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('YolTarifi', "", 'required|trim|strip_tags|xss_clean');       
                    $this->form_validation->set_rules('Adres', "", 'required|trim|strip_tags|xss_clean');     
                    $this->form_validation->set_rules('Maps', "", 'trim|strip_tags|xss_clean');      
                }
                
                if ($this->form_validation->run()) {
                    $tel1F = TurkceToIngilizce($this->input->post('Tel1'));
                    $tel1F = str_replace('-','',$tel1F);
                    $tel2F = TurkceToIngilizce($this->input->post('Tel2'));
                    $tel2F = str_replace('-','',$tel1F);
                    $tel3F = TurkceToIngilizce($this->input->post('Tel3'));
                    $tel3F = str_replace('-','',$tel1F);

                    $ModelData = array(
                        'Tel1D'    => $tel1F,
                        'Tel2D'    => $tel2F,
                        'Tel3D'    => $tel3F,
                    );
                    $this->data['ModelData'] = $ModelData;
                    $result = $this->General_Model->UpdateIletisim($ModelData);
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Iletisim');
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
                        $this->data['data'] = $this->General_Model->EditIletisim();
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

    public function EditIletisim(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditIletisim();
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

}
