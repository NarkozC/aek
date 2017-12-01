<?php

class Hizmetler_Bireysel extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Hizmetler/Bireysel/Hizmetler-Bireysel-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddBireyselHizmet(){
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
        
        $result = $this->Hizmetler_Model->AddBireyselHizmet($SectionIDs);
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

  public function EditBireyselHizmet(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Hizmetler_Model->EditBireyselHizmet();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateBireyselHizmet(){
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

        $result = $this->Hizmetler_Model->UpdateBireyselHizmet($SectionIDs);
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->Hizmetler_Model->EditBireyselHizmet();
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

  public function UpBireyselHizmet(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Hizmetler_Model->UpBireyselHizmet();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DownBireyselHizmet(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Hizmetler_Model->DownBireyselHizmet();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DeleteBireyselHizmet(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Hizmetler_Model->DeleteBireyselHizmet();
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
