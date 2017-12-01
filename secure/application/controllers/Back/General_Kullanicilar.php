<?php

class General_Kullanicilar extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Kullanicilar-view');
    } else {
      redirect('Portal');
    }
  }

  public function GetKullanicilar(){
		$result = $this->General_Model->GetKullanicilar();
		echo json_encode($result);
	}

  public function GetKullanicilarNum(){
    $result = $this->General_Model->GetKullanicilarNum();
    echo json_encode($result);
  }

  public function AddKullanici(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('Email', 'Email', 'required|trim|strip_tags|xss_clean');       
      $this->form_validation->set_rules('Password', 'Şifre', 'required|trim|max_length[60]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->simpleloginsecure->create($this->input->post('Email'), $this->input->post('Password'));
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

  public function EditKullanici(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->General_Model->EditKullanici();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdatePassword(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Email', 'Email', 'required|trim|strip_tags|xss_clean');  
      $this->form_validation->set_rules('OldPass', 'Eski Şifre', 'required|trim|max_length[60]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('NewPass', 'Yeni Şifre', 'required|trim|max_length[60]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->simpleloginsecure->edit_password($this->input->post('Email'), $this->input->post('OldPass'), $this->input->post('NewPass'));
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->General_Model->EditKullanici();
          $this->data['success'] = true;
        }
      } else {
        //show errors
        if (form_error('No')) {
          $this->data['NoV'] = true;
          $this->data['messages']['No'] = form_error('No');
        } if (form_error('Email')) {
          $this->data['EmailV'] = true;
          $this->data['messages']['Email'] = form_error('Email');
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


  public function DeleteKullanici(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->simpleloginsecure->delete($this->input->post('No'));
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
