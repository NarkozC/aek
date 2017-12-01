<?php

class Galeriler extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/Galeriler-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddGaleriler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_EN['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_AnaResim', FORM_LANG_EN['AnaResim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_DigerResimler[]', FORM_LANG_EN['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Yazi', FORM_LANG_EN['Yazi'], 'required|trim');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_EN['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_AnaResim', FORM_LANG_EN['AnaResim'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_DigerResimler[]', FORM_LANG_EN['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_Yazi', FORM_LANG_EN['Yazi'], 'trim');

          $this->form_validation->set_rules('Okul_Kodu[]', FORM_LANG_EN['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_EN['Tarih'], 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_TR['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_AnaResim', FORM_LANG_TR['AnaResim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_DigerResimler[]', FORM_LANG_TR['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Yazi', FORM_LANG_TR['Yazi'], 'required|trim');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_TR['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_AnaResim', FORM_LANG_TR['AnaResim'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_DigerResimler[]', FORM_LANG_TR['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_Yazi', FORM_LANG_TR['Yazi'], 'trim');

          $this->form_validation->set_rules('Okul_Kodu[]', FORM_LANG_TR['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_TR['Tarih'], 'required|trim|strip_tags|xss_clean');
        }
        
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $Okul_KoduF = ArrayToComma($_POST['Okul_Kodu']);
          $tr_DigerResimF = '';
          $en_DigerResimF = '';
          if(isset($_POST['tr_DigerResimler'])) {
            $tr_DigerResimlerF = ArrayToComma($_POST['tr_DigerResimler']);
          }
          if(isset($_POST['en_DigerResimler'])) {
            $en_DigerResimlerF = ArrayToComma($_POST['en_DigerResimler']);
          }

          $tr_Baslik = $this->input->post('tr_Baslik');
          $en_Baslik = $this->input->post('en_Baslik');

          $SectionIDs = array('Tr'=>$tr_Baslik, 'En'=>$en_Baslik);
          $SectionIDs['Tr'] = TurkceToIngilizce($SectionIDs['Tr']);
          $SectionIDs['En'] = TurkceToIngilizce($SectionIDs['En']);
          
          $ModelData = array(
                        'tr_SectionID'        => $SectionIDs['Tr'],
                        'en_SectionID'        => $SectionIDs['En'],
                        'Okul_Kodu'           => $Okul_KoduF,
                        'tr_DigerResimler'    => $tr_DigerResimlerF,
                        'en_DigerResimler'    => $en_DigerResimlerF,
                        );
          $result = $this->General_Model->AddGaleriler($ModelData);
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

  public function UpdateGaleriler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_EN['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_AnaResim', FORM_LANG_EN['AnaResim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_DigerResimler[]', FORM_LANG_EN['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Yazi', FORM_LANG_EN['Yazi'], 'required|trim');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_EN['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_AnaResim', FORM_LANG_EN['AnaResim'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_DigerResimler[]', FORM_LANG_EN['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_Yazi', FORM_LANG_EN['Yazi'], 'trim');

          $this->form_validation->set_rules('Okul_Kodu[]', FORM_LANG_EN['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_EN['Tarih'], 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_TR['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('tr_AnaResim', FORM_LANG_TR['AnaResim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_DigerResimler[]', FORM_LANG_TR['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Yazi', FORM_LANG_TR['Yazi'], 'required|trim');

          $this->form_validation->set_rules('en_Baslik', FORM_LANG_TR['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_AnaResim', FORM_LANG_TR['AnaResim'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_DigerResimler[]', FORM_LANG_TR['DigerResimler'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('en_Yazi', FORM_LANG_TR['Yazi'], 'trim');

          $this->form_validation->set_rules('Okul_Kodu[]', FORM_LANG_TR['Okullar'], 'required|trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tarih', FORM_LANG_TR['Tarih'], 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $Okul_KoduF = ArrayToComma($_POST['Okul_Kodu']);
          $tr_DigerResimF = '';
          $en_DigerResimF = '';
          if(isset($_POST['tr_DigerResimler'])) {
            $tr_DigerResimlerF = ArrayToComma($_POST['tr_DigerResimler']);
          }
          if(isset($_POST['en_DigerResimler'])) {
            $en_DigerResimlerF = ArrayToComma($_POST['en_DigerResimler']);
          }

          $tr_Baslik = $this->input->post('tr_Baslik');
          $en_Baslik = $this->input->post('en_Baslik');

          $SectionIDs = array('Tr'=>$tr_Baslik, 'En'=>$en_Baslik);
          $SectionIDs['Tr'] = TurkceToIngilizce($SectionIDs['Tr']);
          $SectionIDs['En'] = TurkceToIngilizce($SectionIDs['En']);
          
          $ModelData = array(
                        'tr_SectionID'        => $SectionIDs['Tr'],
                        'en_SectionID'        => $SectionIDs['En'],
                        'Okul_Kodu'           => $Okul_KoduF,
                        'tr_DigerResimler'    => $tr_DigerResimlerF,
                        'en_DigerResimler'    => $en_DigerResimlerF,
                        );

          $result = $this->General_Model->UpdateGaleriler($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $this->data['data'] = $this->General_Model->EditGaleriler();
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

  public function EditGaleriler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditGaleriler();
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

  public function DeleteGaleriler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteGaleriler();
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
