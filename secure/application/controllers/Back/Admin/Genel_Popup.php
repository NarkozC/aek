<?php

class Genel_Popup extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
                        'cacheKeys' => array(

                          'GetPopupTR' => md5('GetPopupCacheTR'),
                          'GetPopupEN' => md5('GetPopupCacheEN'),

                          'GetPopupHtmlTR' => md5('GetPopupHtmlCacheTR'),
                          'GetPopupHtmlEN' => md5('GetPopupHtmlCacheEN'),

                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/Popup-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddPopup(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('BasSaat', FORM_LANG_EN['BasSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('BitSaat', FORM_LANG_EN['BitSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Resim', FORM_LANG_EN['Resim'], 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('BasSaat', FORM_LANG_TR['BasSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('BitSaat', FORM_LANG_TR['BitSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Resim', FORM_LANG_TR['Resim'], 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->AddPopup();
          if ($result) {
            $cacheKeys = array('Popup');
            for ($i=0; $i < sizeof($cacheKeys); $i++) { 
              $cacheKeyTR = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
              $cacheKeyEN = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];
              
              $gotCacheTR = $this->cache->get($cacheKeyTR);
              $gotCacheEN = $this->cache->get($cacheKeyEN);

              if ($gotCacheTR) {
                $this->cache->delete($cacheKeyTR);
              }
              if ($gotCacheEN) {
                $this->cache->delete($cacheKeyEN);
              }
            }
            $this->data['data'] = $this->General_Model->EditPopup('0');
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

  public function UpdatePopup(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('BasSaat', FORM_LANG_EN['BasSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('BitSaat', FORM_LANG_EN['BitSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Resim', FORM_LANG_EN['Resim'], 'required|trim|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('BasSaat', FORM_LANG_TR['BasSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('BitSaat', FORM_LANG_TR['BitSaat'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Resim', FORM_LANG_TR['Resim'], 'required|trim|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->UpdatePopup($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $cacheKeys = array('Popup');
            for ($i=0; $i < sizeof($cacheKeys); $i++) { 
              $cacheKeyTR = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
              $cacheKeyEN = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];
              
              $gotCacheTR = $this->cache->get($cacheKeyTR);
              $gotCacheEN = $this->cache->get($cacheKeyEN);

              if ($gotCacheTR) {
                $this->cache->delete($cacheKeyTR);
              }
              if ($gotCacheEN) {
                $this->cache->delete($cacheKeyEN);
              }
            }
            $this->data['data'] = $this->General_Model->EditPopup();
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

  public function EditPopup(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditPopup();
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

  public function DeletePopup(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeletePopup();
          if($result){
            $cacheKeys = array('Popup');
            for ($i=0; $i < sizeof($cacheKeys); $i++) { 
              $cacheKeyTR = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
              $cacheKeyEN = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];
              
              $gotCacheTR = $this->cache->get($cacheKeyTR);
              $gotCacheEN = $this->cache->get($cacheKeyEN);

              if ($gotCacheTR) {
                $this->cache->delete($cacheKeyTR);
              }
              if ($gotCacheEN) {
                $this->cache->delete($cacheKeyEN);
              }
            }
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
