<?php

class Genel_Popup extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(
                'GetPopupTR' => md5('GetPopupCacheTR'),
                'GetPopupEN' => md5('GetPopupCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/Popup-view');
        } else {
            redirect('Portal');
        }
    }

    public function AddPopup(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('BasSaat', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('BitSaat', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('Resim', "", 'required|trim|strip_tags|xss_clean');
                $this->form_validation->set_rules('Link', "", 'trim|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->AddPopup();
                    if ($result) {
                        $cacheKeys = array('Popup');
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

    public function UpdatePopup(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('BasSaat', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('BitSaat', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('Resim', "", 'required|trim|strip_tags|xss_clean');
                $this->form_validation->set_rules('Link', "", 'trim|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdatePopup();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('Popup');
                        DeleteCaches($cacheKeys, $this->data);
                        $this->data['data'] = $this->General_Model->EditPopup();
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

    public function EditPopup(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditPopup();
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

    public function DeletePopup(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeletePopup();
                    if($result){
                        $cacheKeys = array('Popup');
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
