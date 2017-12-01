<?php

class General_Footer extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Footer-view');
    } else {
      redirect('Portal');
    }
  }

  public function EditFooter(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
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

  public function UpdateFooter(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Tel1', 'Türkçe Tel1', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Tel2', 'Türkçe Tel2', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Email', 'Türkçe Email', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Adres', 'Türkçe Adres', 'required|trim|xss_clean');
      $this->form_validation->set_rules('tr_Facebook', 'Türkçe Facebook', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Twitter', 'Türkçe Twitter', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Youtube', 'Türkçe Youtube', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Instagram', 'Türkçe İnstagram', 'required|trim|strip_tags|xss_clean');

      $this->form_validation->set_rules('en_Tel1', 'İngilizce Tel1', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Tel2', 'İngilizce Tel2', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Email', 'İngilizce Email', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Adres', 'İngilizce Adres', 'trim|xss_clean');
      $this->form_validation->set_rules('en_Facebook', 'İngilizce Facebook', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Twitter', 'İngilizce Twitter', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Youtube', 'İngilizce Youtube', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Instagram', 'İngilizce İnstagram', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->UpdateFooter();
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->General_Model->EditFooter();
          $this->data['success'] = true;
        }
      } else {
        //show errors
        if (form_error('No')) {
          $this->data['NoV'] = true;
          $this->data['messages']['No'] = form_error('No');
        } else {
          foreach ($_POST as $key => $value) {
            $this->data['messages'][$key] = form_error($key);
          }
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }

    
  }
  
}
