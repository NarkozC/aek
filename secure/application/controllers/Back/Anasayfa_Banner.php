<?php

class Anasayfa_Banner extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Anasayfa/Banner-view');
    } else {
      redirect('Portal');
    }
  }
  public function EditBannerYazi(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Anasayfa_Model->EditBannerYazi();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateBannerYazi(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_BtnYazi', 'Türkçe Buton Yazı', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('tr_Link', 'Türkçe Link', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Yazi', 'Türkçe Yazı', 'required|trim');
      $this->form_validation->set_rules('en_BtnYazi', 'İngilizce Buton Yazı', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('en_Link', 'İngilizce Link', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Yazi', 'İngilizce Yazı', 'trim');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->UpdateBannerYazi();
        $this->data['type'] = 'update';
        if($result){
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

  public function AddBannerSlide(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate     
      $this->form_validation->set_rules('tr_Resim', 'Türkçe Resim', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Arkaplan', 'Türkçe Arkaplan', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Resim', 'İngilizce Resim', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Arkaplan', 'İngilizce Arkaplan', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->AddBannerSlide();
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

  public function EditBannerSlide(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Anasayfa_Model->EditBannerSlide();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateBannerSlide(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Resim', 'Türkçe Resim', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Arkaplan', 'Türkçe Arkaplan', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Resim', 'İngilizce Resim', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Arkaplan', 'İngilizce Arkaplan', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->UpdateBannerSlide();
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->Anasayfa_Model->EditBannerSlide();
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

  public function UpBannerSlide(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->UpBannerSlide();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DownBannerSlide(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->DownBannerSlide();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DeleteBannerSlide(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->DeleteBannerSlide();
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
