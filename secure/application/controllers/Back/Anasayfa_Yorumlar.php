<?php

class Anasayfa_Yorumlar extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Anasayfa/Yorumlar-view');
    } else {
      redirect('Portal');
    }
  }

  public function EditYorum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Anasayfa_Model->EditYorum();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateYorum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('tr_Isim', 'Türkçe İsim', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('tr_Yorum', 'Türkçe Yorum', 'trim|max_length[500]|strip_tags|xss_clean');
      $this->form_validation->set_rules('en_Isim', 'İngilizce İsim', 'trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('en_Yorum', 'İngilizce Yorum', 'trim|max_length[500]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->UpdateYorum();
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->Anasayfa_Model->EditYorum();
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

  public function UpYorum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->UpYorum();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DownYorum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('ListOrder', 'ListOrder', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->DownYorum();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function DeleteYorum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->DeleteYorum();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function ActiveYorum()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->ActiveYorum();
        if($result){
          $this->data['data'] = $this->Anasayfa_Model->EditYorum();
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }

    
  }

  public function PassiveYorum()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->Anasayfa_Model->EditYorum();
        $result = $this->Anasayfa_Model->PassiveYorum();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }

    
  }

  public function ActiveYorumVK()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Anasayfa/Yorumlar-view.php');
      } else {
        redirect('Portal');
      }
    
  }

  public function DeleteYorumVK()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Anasayfa/Yorumlar-view.php');
      } else {
        redirect('Portal');
      }
    
  }

  public function SetActiveYorumVK()
  {
      // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('YVerifyKey', 'YVerifyKey', 'required|trim|max_length[60]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->ActiveYorumVK();
        $this->data['type'] = 'active';
        if($result){
          $this->data['data'] = $this->Anasayfa_Model->EditYorum();
          $this->data['type'] = 'actived';
          $this->data['success'] = true;
        }
      } else {
        $this->data['type'] = 'active';
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
    
  }

  public function SetDeleteYorumVK()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('YVerifyKey', 'YVerifyKey', 'required|trim|max_length[61]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->Anasayfa_Model->DeleteYorumVK();
        $this->data['type'] = 'delete';
        if($result){
          $this->data['data'] = $this->Anasayfa_Model->EditYorum();
          $this->data['type'] = 'deleted';
          $this->data['success'] = true;
        }
      } else {
        $this->data['type'] = 'active';
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
    
  }


}
