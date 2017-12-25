<?php

class Genel_Dersler extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
                        'cacheKeys' => array(

                          'GetDerslerTR' => md5('GetDerslerCacheTR'),
                          'GetDerslerEN' => md5('GetDerslerCacheEN'),
                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/Dersler-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddDersler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_EN['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_EN['Ad'], 'trim|max_length[255]|strip_tags|xss_clean');     
        } else {
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_TR['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_TR['Ad'], 'trim|max_length[255]|strip_tags|xss_clean');     
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $kodF = TurkceToIngilizce($_POST['tr_Ad']);
          
          $ModelData = array(
                        'Kod'    => $kodF,
                        );
          $result = $this->General_Model->AddDersler($ModelData);
          if ($result) {
            $cacheKeys = array('Dersler');
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
            $this->data['data'] = $this->General_Model->EditDersler('0');
            $this->data['success'] = true;
          }
        } else {
          foreach ($_POST as $key => $value) {
            $this->data['messages'][$key] = form_error($key);
          
        }}
      
      echo json_encode($this->data);
      } else {
        redirect('Portal');
      }
    }
  }

  public function UpdateDersler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_EN['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_EN['Ad'], 'trim|max_length[255]|strip_tags|xss_clean');       
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_TR['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_TR['Ad'], 'trim|max_length[255]|strip_tags|xss_clean');       
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $kodF = TurkceToIngilizce($_POST['tr_Ad']);
          
          $ModelData = array(
                        'Kod'    => $kodF,
                        );
          $this->data['ModelData'] = $ModelData;
          $result = $this->General_Model->UpdateDersler($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $cacheKeys = array('Dersler');
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
            $this->data['data'] = $this->General_Model->EditDersler();
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

  public function EditDersler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditDersler();
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

  public function DeleteDersler(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteDersler();
          if($result){
            $cacheKeys = array('Dersler');
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
