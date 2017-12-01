<?php

class Aylik_Yemek_Listesi extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/AylikYemekListesi-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddAylikYemekListesi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_EN['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Resim', FORM_LANG_EN['Resim'], 'required|trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_EN['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Resim', FORM_LANG_EN['Resim'], 'trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('Okul[]', FORM_LANG_EN['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_EN['Tarih'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_TR['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Resim', FORM_LANG_TR['Resim'], 'required|trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_TR['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Resim', FORM_LANG_TR['Resim'], 'trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('Okul[]', FORM_LANG_TR['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_TR['Tarih'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $okulKoduF = ArrayToComma($_POST['Okul']);

          $ModelData = array(
                        'Okul'           => $okulKoduF,
                        );
          $this->data['deneme'] = $ModelData;
          $result = $this->General_Model->AddAylikYemekListesi($ModelData);
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

  public function UpdateAylikYemekListesi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_EN['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Resim', FORM_LANG_EN['Resim'], 'required|trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_EN['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Resim', FORM_LANG_EN['Resim'], 'trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('Okul[]', FORM_LANG_EN['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_EN['Tarih'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_TR['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_Resim', FORM_LANG_TR['Resim'], 'required|trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_TR['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Resim', FORM_LANG_TR['Resim'], 'trim|max_length[255]|strip_tags|xss_clean');

          $this->form_validation->set_rules('Okul[]', FORM_LANG_TR['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_TR['Tarih'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $okulKoduF = ArrayToComma($_POST['Okul']);

          $ModelData = array(
                        'Okul'           => $okulKoduF,
                        );
          $this->data['deneme'] = $ModelData;
          $result = $this->General_Model->UpdateAylikYemekListesi($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $this->data['data'] = $this->General_Model->EditAylikYemekListesi();
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

  public function EditAylikYemekListesi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditAylikYemekListesi();
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

  public function DeleteAylikYemekListesi(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteAylikYemekListesi();
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
