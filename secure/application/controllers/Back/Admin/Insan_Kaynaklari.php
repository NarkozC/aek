<?php

class Insan_Kaynaklari extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(
                'GetInsanKaynaklariTR' => md5('GetInsanKaynaklariCacheTR'),
                'GetInsanKaynaklariEN' => md5('GetInsanKaynaklariCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/InsanKaynaklari-view');
        } else {
            redirect('Portal');
        }
    }

    public function UpdateInsanKaynaklari(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                }
                $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('DogumTarihi', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('Email', "", 'required|trim|valid_email|strip_tags|xss_clean');
                $this->form_validation->set_rules('Tel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('AltTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean'); 
                $this->form_validation->set_rules('Pozisyon', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('MOO', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('Brans', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('OTS', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('DTS', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                $this->form_validation->set_rules('YTS', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $result = $this->General_Model->UpdateInsanKaynaklari();
                    $this->data['type'] = 'update';
                    if($result){
                        $cacheKeys = array('InsanKaynaklari');
                        DeleteCaches($cacheKeys, $this->data);
                        $this->data['data'] = $this->General_Model->EditInsanKaynaklari();
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

    public function EditInsanKaynaklari(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                if ($this->form_validation->run()) {
                    $this->data['data'] = $this->General_Model->EditInsanKaynaklari();
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

    public function DeleteInsanKaynaklari(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');

                if ($this->form_validation->run()) {
                    $result = $this->General_Model->DeleteInsanKaynaklari();
                    if($result){
                        $cacheKeys = array('InsanKaynaklari');
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

    public function DownloadInsanKaynaklari($Cv){
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->helper('download');
            $data = file_get_contents(base_url('/resources/pdfs/Cv/'.$Cv));
            force_download($Cv, $data);
            $this->load->view('Close-view');
        } else {
            redirect('Portal'); 
        }
    }

    

}
