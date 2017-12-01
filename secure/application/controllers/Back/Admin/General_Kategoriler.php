<?php

class General_Kategoriler extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Kategoriler-view');
    } else {
      redirect('Portal');
    }
  }

  public function GetKategoriler(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $result = $this->General_Model->GetKategoriler();
      echo json_encode($result);
    } else {
      redirect('Portal');
    }
  }

  public function GetKategorilerNum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $result = $this->General_Model->GetKategorilerNum();
      echo json_encode($result);
    } else {
      redirect('Portal');
    }
  }

  public function AddKategori(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('Isim', FORM_LANG_TR['Isim'], 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $Isim = $this->input->post('Isim');
        $Isim = $this->General_Model->TurkceToIngilizce($Isim);
        $result = $this->General_Model->AddKategori($Isim);
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

  public function EditKategori(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->General_Model->EditKategori();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateKategori(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Isim', FORM_LANG_TR['Isim'], 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $Isim = $this->input->post('Isim');
        $Isim = $this->General_Model->TurkceToIngilizce($Isim);
        $result = $this->General_Model->UpdateKategori($Isim);
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->General_Model->EditKategori();
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

  public function UpKategori(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', FORM_LANG_TR['ListOrder'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->UpKategori();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DownKategori(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', FORM_LANG_TR['ListOrder'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->DownKategori();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DeleteKategori(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Isim', FORM_LANG_TR['Isim'], 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $response = $this->General_Model->GetResimlerWhereKategoriler($this->input->post('Isim'));
        if (empty($response)) {
          $result = $this->General_Model->DeleteKategori();
          if($result){
            $this->data['success'] = true;
            $this->data['isFolderHasFiles'] = false;
          }
        } else {
          foreach ($response as $key => $value) {
            $this->data['data'][$key] = $value;
          }
          $this->data['isFolderHasFiles'] = true;
          $this->data['success'] = true;
        }
        
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }
  
}
