<?php

class General_Email_List extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Email-List-view');
    } else {
      redirect('Portal');
    }
  }

  public function GetEmailList(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $result = $this->General_Model->GetEmailList();
      echo json_encode($result);
    } else {
      redirect('Portal');
    }
  }

  public function GetEmailListNum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $result = $this->General_Model->GetEmailListNum();
      echo json_encode($result);
    } else {
      redirect('Portal');
    }
  }

  public function AddEmail(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('Isim', 'İsim', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('Email', 'Email', 'required|trim|valid_email|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->AddEmail();
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

  public function EditEmail(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->General_Model->EditEmail();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateEmail(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Isim', 'İsim', 'required|trim|max_length[65]|strip_tags|xss_clean');       
      $this->form_validation->set_rules('Email', 'Email', 'required|trim|valid_email|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->UpdateEmail();
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->General_Model->EditEmail();
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

  public function DeleteEmail(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->DeleteEmail();
        if($result){
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function SendEmails(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('Yazi', 'Yazı', 'required|trim');     
      $this->form_validation->set_rules('Konu', 'Konu', 'required|trim');     
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        
        $result = $this->General_Model->GetEmailList();
        if ($result) {
          $this->data['success'] = true;
          $emails = array();
          foreach ($result as $email) {
            $emails[$email->Email] = $email->Email;
          }
          $this->data['emails'] = $emails;
          
          $this->load->library('email'); // Note: no $config param needed

          $message = $this->input->post('Yazi');
          $subject = $this->input->post('Konu');

          $this->email->from('info@morfill.com', 'Morfill Koçluk ve Danışmanlık');
          $this->email->to($emails);
          $this->email->subject($subject);
          $this->email->message($message);


          if ($this->email->send()) {
            $this->data['success'] = true;
          }
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
  
}
