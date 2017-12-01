<?php

class General_Basliklar extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Basliklar-view');
    } else {
      redirect('Portal');
    }
  }

  public function EditBasliklar(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('VerifyKey', 'VerifyKey', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->General_Model->EditBasliklar();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateBaslik(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Baslik', 'tr_Baslik', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Baslik', 'en_Baslik', 'trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->UpdateBaslik();
        if($result){
          $this->data['data'] = $this->General_Model->EditBasliklarNo();
          if ($this->data['data']) {
            $this->data['success'] = true;
          }
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
