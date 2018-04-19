<?php

class Genel_Subeler extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(
                'GetSubelerTR' => md5('GetSubelerCacheTR'),
                'GetSubelerEN' => md5('GetSubelerCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Subeler-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddSubeler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('Okul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('Sinif', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('Kod', "", 'required|trim|max_length[255]|strip_tags|xss_clean');       
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->AddSubeler();
                    if ($result) {
                        $cacheKeys = array('Subeler');
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

    public function UpdateSubeler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);       
                }
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                $this->form_validation->set_rules('Okul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('Sinif', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('Kod', "", 'required|trim|max_length[255]|strip_tags|xss_clean');     
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdateSubeler();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Subeler');
                        DeleteCaches($cacheKeys, $this->data);
                        $this->data['data'] = $this->General_Model->EditSubeler();
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

    public function EditSubeler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditSubeler();
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

    public function DeleteSubeler(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeleteSubeler();
                    if($result){
                        $cacheKeys = array('Subeler');
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
