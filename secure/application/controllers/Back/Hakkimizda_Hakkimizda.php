<?php

class Hakkimizda_Hakkimizda extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Hakkimizda/Hakkimizda-view');
    } else {
      redirect('Portal');
    }
  }

  public function EditHakkimizda(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Hakkimizda_Model->EditHakkimizda();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateHakkimizda(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Yazi', 'Türkçe Yazı', 'required|trim');
      $this->form_validation->set_rules('en_Yazi', 'İngilizce Yazı', 'trim');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Hakkimizda_Model->UpdateHakkimizda();
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->Hakkimizda_Model->EditHakkimizda();
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
