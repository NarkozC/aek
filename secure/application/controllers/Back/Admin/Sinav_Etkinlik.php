<?php

class Sinav_Etkinlik extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/SinavEtkinlik-view');
    } else {
      redirect('Portal');
    }
  }

  public function EditSinavEtkinlik(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditSinavEtkinlik();
          if ($this->data['data']) {
            $this->data['success'] = true;
          }
        }
        echo json_encode($this->data);
      } else {
        redirect('Portal');
      }
    }
  }

  public function AddSinavEtkinlik(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', 'english');
          $this->form_validation->set_rules('tr_Ad', 'Name', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Aciklama', 'Description', 'required|trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Ders', 'Class', 'trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('en_Ad', 'Name', 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', 'Description', 'trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ders', 'Class', 'required|trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('Sinif', 'Sınıf', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube[]', 'Şube', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', 'Date', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('SinavEtkinlik', 'Sinav-Etkinlik', 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('tr_Ad', 'Ad', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Aciklama', 'Açıklama', 'required|trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Ders', 'Ders', 'required|trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('en_Ad', 'Ad', 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', 'Açıklama', 'trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ders', 'Ders', 'trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('Sinif', 'Sınıf', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube[]', 'Şube', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', 'Tarih', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('SinavEtkinlik', 'Sinav-Etkinlik', 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          if(isset($_POST['Sube'])){
            $k = 0;
            foreach ($_POST['Sube'] as $value){
              $SubeF[$k] = $value;
              $k++;
            }
            $k = 0;
            foreach ($SubeF as $value){
              $SubeS = $SubeS."$value,";
              $k++;
            }
            $SubeF = preg_replace('/,[^,]*$/', '', $SubeS);
          }

          $ModelData = array(
                        'Sube'           => $SubeF,
                        );
          $result = $this->General_Model->AddSinavEtkinlik($ModelData);
          if ($result) {
            $this->data['success'] = true;
          }
        } else {
          //show errors
          foreach ($_POST as $key => $value) {
            $this->data['messages'][$key] = form_error($key);
          
        }}
      
      echo json_encode($this->data);
      } else {
        redirect('Portal');
      }
    }
  }

  public function UpdateSinavEtkinlik(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', 'english');
          $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Ad', 'Name', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Aciklama', 'Description', 'required|trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Ders', 'Class', 'required|trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('en_Ad', 'Name', 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', 'Description', 'trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ders', 'Class', 'required|trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('Sinif', 'Sınıf', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube[]', 'Şube', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', 'Date', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('SinavEtkinlik', 'Sinav-Etkinlik', 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Ad', 'Ad', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Aciklama', 'Açıklama', 'required|trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Ders', 'Ders', 'required|trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('en_Ad', 'Ad', 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', 'Açıklama', 'trim|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ders', 'Ders', 'required|trim|strip_tags|xss_clean'); 

          $this->form_validation->set_rules('Sinif', 'Sınıf', 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube[]', 'Şube', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', 'Tarih', 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('SinavEtkinlik', 'Sinav-Etkinlik', 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          if(isset($_POST['Sube'])){
            $k = 0;
            foreach ($_POST['Sube'] as $value){
              $SubeF[$k] = $value;
              $k++;
            }
            $k = 0;
            foreach ($SubeF as $value){
              $SubeS = $SubeS."$value,";
              $k++;
            }
            $SubeF = preg_replace('/,[^,]*$/', '', $SubeS);
          }

          $ModelData = array(
                        'Sube'           => $SubeF,
                        );
          $result = $this->General_Model->UpdateSinavEtkinlik($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $this->data['data'] = $this->General_Model->EditSinavEtkinlik();
            $this->data['success'] = true;
          }
        } else {
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

  public function DeleteSinavEtkinlik(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteSinavEtkinlik();
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

}
