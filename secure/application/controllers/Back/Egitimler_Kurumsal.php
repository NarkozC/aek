<?php

class Egitimler_Kurumsal extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Egitimler/Kurumsal/Egitimler-Kurumsal-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddKurumsalEgitim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('tr_Baslik', 'Türkçe Başlık', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('tr_Resim', 'Türkçe Resim', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Yazi', 'Türkçe Yazı', 'required|trim');
      $this->form_validation->set_rules('en_Baslik', 'İngilizce Başlık', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('en_Resim', 'İngilizce Resim', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Yazi', 'İngilizce Yazı', 'trim');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $tr_SectionID = $this->input->post('tr_Baslik');
        $tr_SectionID = $this->General_Model->TurkceToIngilizce($tr_SectionID);

        $en_SectionID = $this->input->post('en_Baslik');
        $en_SectionID = $this->General_Model->TurkceToIngilizce($en_SectionID);

        $tr_SectionID = strtolower($tr_SectionID);
        $en_SectionID = strtolower($en_SectionID);
        $SectionIDs = array(
                      'tr_SectionID'    =>$tr_SectionID,
                      'en_SectionID'    =>$en_SectionID,
                    );
        
        $result = $this->Egitimler_Model->AddKurumsalEgitim($SectionIDs);
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

  public function EditKurumsalEgitim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Egitimler_Model->EditKurumsalEgitim();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateKurumsalEgitim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Baslik', 'Türkçe Başlık', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('tr_Resim', 'Türkçe Resim', 'required|trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Yazi', 'Türkçe Yazı', 'required|trim');
      $this->form_validation->set_rules('en_Baslik', 'İngilizce Başlık', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('en_Resim', 'İngilizce Resim', 'trim|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Yazi', 'İngilizce Yazı', 'trim');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $tr_SectionID = $this->input->post('tr_Baslik');
        $tr_SectionID = $this->General_Model->TurkceToIngilizce($tr_SectionID);

        $en_SectionID = $this->input->post('en_Baslik');
        $en_SectionID = $this->General_Model->TurkceToIngilizce($en_SectionID);

        $tr_SectionID = strtolower($tr_SectionID);
        $en_SectionID = strtolower($en_SectionID);
        $SectionIDs = array(
                      'tr_SectionID'    =>$tr_SectionID,
                      'en_SectionID'    =>$en_SectionID,
                    );

        $result = $this->Egitimler_Model->UpdateKurumsalEgitim($SectionIDs);
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->Egitimler_Model->EditKurumsalEgitim();
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

  public function UpKurumsalEgitim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Egitimler_Model->UpKurumsalEgitim();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DownKurumsalEgitim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Egitimler_Model->DownKurumsalEgitim();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DeleteKurumsalEgitim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Egitimler_Model->DeleteKurumsalEgitim();
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