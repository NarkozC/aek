<?php

class Etkinlik_Takvimi extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/EtkinlikTakvimi-view');
    } else {
      redirect('Portal');
    }
  }

  public function EditEtkinlikTakvimi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditEtkinlikTakvimi();
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

  public function AddEtkinlikTakvimi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']); 
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_EN['Aciklama'], 'required|trim|strip_tags|xss_clean'); 
               
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_EN['Aciklama'], 'trim|strip_tags|xss_clean'); 
               
          $this->form_validation->set_rules('Sube[]', FORM_LANG_EN['Sube'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Okul', FORM_LANG_EN['OkulKodu'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_EN['Tarih'], 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_TR['Aciklama'], 'required|trim|strip_tags|xss_clean'); 
            
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_TR['Aciklama'], 'trim|strip_tags|xss_clean'); 
               
          $this->form_validation->set_rules('Sube[]', FORM_LANG_TR['Sube'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Okul', FORM_LANG_TR['OkulKodu'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_TR['Tarih'], 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $SubeF = ArrayToComma($_POST['Sube']);

          $ModelData = array(
                        'Sube'           => $SubeF,
                        );
          $result = $this->General_Model->AddEtkinlikTakvimi($ModelData);
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

  public function UpdateEtkinlikTakvimi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_EN['Aciklama'], 'required|trim|strip_tags|xss_clean'); 
               
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_EN['Aciklama'], 'trim|strip_tags|xss_clean'); 
               
          $this->form_validation->set_rules('Sube[]', FORM_LANG_EN['Sube'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Okul', FORM_LANG_EN['OkulKodu'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_EN['Tarih'], 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_TR['Aciklama'], 'required|trim|strip_tags|xss_clean'); 
            
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_TR['Aciklama'], 'trim|strip_tags|xss_clean'); 
               
          $this->form_validation->set_rules('Sube[]', FORM_LANG_TR['Sube'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Okul', FORM_LANG_TR['OkulKodu'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_TR['Tarih'], 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $SubeF = ArrayToComma($_POST['Sube']);

          $ModelData = array(
                        'Sube'           => $SubeF,
                        );
          $result = $this->General_Model->UpdateEtkinlikTakvimi($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $this->data['data'] = $this->General_Model->EditEtkinlikTakvimi();
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

  public function DeleteEtkinlikTakvimi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteEtkinlikTakvimi();
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
