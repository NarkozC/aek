<?php

class Footer extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetFooterTR' => md5('GetFooterCacheTR'),
                'GetFooterEN' => md5('GetFooterCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Footer-view');
        } else {
            redirect('Portal');
        }
    }

    public function UpdateFooter(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Facebook', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Facebook', "", 'trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Twitter', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Twitter', "", 'trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Instagram', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Instagram', "", 'trim|strip_tags|xss_clean');    
                    $this->form_validation->set_rules('tr_Youtube', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Youtube', "", 'trim|strip_tags|xss_clean');     
                } else {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('tr_Facebook', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Facebook', "", 'trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Twitter', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Twitter', "", 'trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Instagram', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Instagram', "", 'trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('tr_Youtube', "", 'required|trim|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Youtube', "", 'trim|strip_tags|xss_clean');      
                }
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdateFooter();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Footer');
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
                        $this->data['data'] = $this->General_Model->EditFooter();
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

    public function EditFooter(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditFooter();
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
