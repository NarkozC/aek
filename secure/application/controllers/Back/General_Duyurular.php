<?php

class General_Duyurular extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Duyurular-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddDuyuru(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('tr_Baslik', 'Türkçe Başlık', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('tr_Resim', 'Türkçe Resim', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Bas_Tarihi', 'Türkçe Başlangıç Tarihi', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Bit_Tarihi', 'Türkçe Bitiş Tarihi', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Link', 'Türkçe Link', 'required|trim|strip_tags|xss_clean');

      $this->form_validation->set_rules('en_Baslik', 'İngilizce Başlık', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('en_Resim', 'İngilizce Resim', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Bas_Tarihi', 'İngilizce Başlangıç Tarihi', 'trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Bit_Tarihi', 'İngilizce Bitiş Tarihi', 'trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Link', 'İngilizce Link', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->AddDuyuru();
        if ($result) {
          $this->data['success'] = true;
        }
      } else {
        //show errors
        foreach ($_POST as $key => $value) {
          $this->data['messages'][$key] = form_error($key);
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }

  }

  public function EditDuyuru(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->General_Model->EditDuyuru();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateDuyuru(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Baslik', 'Türkçe Başlık', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('tr_Resim', 'Türkçe Resim', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Bas_Tarihi', 'Türkçe Başlangıç Tarihi', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Bit_Tarihi', 'Türkçe Bitiş Tarihi', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Link', 'Türkçe Link', 'required|trim|strip_tags|xss_clean');

      $this->form_validation->set_rules('en_Baslik', 'İngilizce Başlık', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('en_Resim', 'İngilizce Resim', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Bas_Tarihi', 'İngilizce Başlangıç Tarihi', 'trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Bit_Tarihi', 'İngilizce Bitiş Tarihi', 'trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Link', 'İngilizce Link', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->UpdateDuyuru();
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->General_Model->EditDuyuru();
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

  public function UpDuyuru(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->UpDuyuru();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DownDuyuru(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->DownDuyuru();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DeleteDuyuru(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->DeleteDuyuru();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }
  
}
