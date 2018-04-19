<?php

class Genel_Dersler extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(
                'GetDerslerTR' => md5('GetDerslerCacheTR'),
                'GetDerslerEN' => md5('GetDerslerCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Dersler-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddDersler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);  
                }
                    $this->form_validation->set_rules('tr_Ad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean');     
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->AddDersler();
                    if ($result) {
                        $cacheKeys = array('Dersler');
                        DeleteCaches($cacheKeys, $this->data);
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

        public function UpdateDersler(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $en = $_POST["English"];
                    if ($en == "true") {
                        $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Ad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                    } else {
                        $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                        $this->form_validation->set_rules('tr_Ad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                        $this->form_validation->set_rules('en_Ad', "", 'trim|max_length[255]|strip_tags|xss_clean');       
                    }
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->UpdateDersler();
                        $this->data['type'] = 'update';
                        if($result){
                            $cacheKeys = array('Dersler');
                            DeleteCaches($cacheKeys, $this->data);
                            $this->data['data'] = $this->General_Model->EditDersler();
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

        public function EditDersler(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $this->data['data'] = $this->General_Model->EditDersler();
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

        public function DeleteDersler(){
            if(! $this->input->is_ajax_request()) {
                redirect('404');
            } else {
                if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    
                    if ($this->form_validation->run()) {
                        $result = $this->General_Model->DeleteDersler();
                        if($result){
                            $cacheKeys = array('Dersler');
                            DeleteCaches($cacheKeys, $this->data);
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
