<?php

class Sinav_Yonergeleri extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetSinavYonergeleriTR' => md5('GetSinavYonergeleriCacheTR'),
                'GetSinavYonergeleriEN' => md5('GetSinavYonergeleriCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/SinavYonergeleri-view');
        } else {
            redirect('Portal');
        }
    }

    public function UpdateSinavYonergeleri(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Ilkokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Ilkokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Ortaokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Ortaokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Lise', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Lise', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_IGIIlkokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_IGIIlkokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_IGIOrtaokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_IGIOrtaokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_IGILise', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_IGILise', "", 'trim|max_length[255]|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Ilkokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Ilkokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Ortaokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Ortaokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Lise', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Lise', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_IGIIlkokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_IGIIlkokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_IGIOrtaokul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_IGIOrtaokul', "", 'trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_IGILise', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_IGILise', "", 'trim|max_length[255]|strip_tags|xss_clean');     
                }
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdateSinavYonergeleri();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('SinavYonergeleri');
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
                        $this->data['data'] = $this->General_Model->EditSinavYonergeleri();
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

    public function EditSinavYonergeleri(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditSinavYonergeleri();
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
