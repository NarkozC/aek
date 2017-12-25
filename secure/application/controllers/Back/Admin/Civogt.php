<?php

class Civogt extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
                        'cacheKeys' => array(

                          'GetCivogtTR' => md5('GetCivogtCacheTR'),
                          'GetCivogtEN' => md5('GetCivogtCacheEN'),

                          'GetCivogtHtmlTR' => md5('GetCivogtHtmlCacheTR'),
                          'GetCivogtHtmlEN' => md5('GetCivogtHtmlCacheEN'),

                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/Civogt-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddCivogt(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('Yil', FORM_LANG_EN['Yil'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Donem', FORM_LANG_EN['Donem'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Okul', FORM_LANG_EN['Okul'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Ders', FORM_LANG_EN['Ders'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sinif', FORM_LANG_EN['Sinif'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube', FORM_LANG_EN['Sube'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Gun', FORM_LANG_EN['Gun'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Saat', FORM_LANG_EN['Saat'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('Yil', FORM_LANG_TR['Yil'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Donem', FORM_LANG_TR['Donem'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Okul', FORM_LANG_TR['Okul'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Ders', FORM_LANG_TR['Ders'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sinif', FORM_LANG_TR['Sinif'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube', FORM_LANG_TR['Sube'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Gun', FORM_LANG_TR['Gun'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Saat', FORM_LANG_TR['Saat'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->AddCivogt();
          if ($result) {
            $cacheKeys = array('Civogt','CivogtHtml');
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
            $this->data['data'] = $this->General_Model->EditCivogt();
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

  public function UpdateCivogt(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Yil', FORM_LANG_EN['Yil'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Donem', FORM_LANG_EN['Donem'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Okul', FORM_LANG_EN['Okul'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Ders', FORM_LANG_EN['Ders'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sinif', FORM_LANG_EN['Sinif'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube', FORM_LANG_EN['Sube'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Gun', FORM_LANG_EN['Gun'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Saat', FORM_LANG_EN['Saat'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Yil', FORM_LANG_TR['Yil'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Donem', FORM_LANG_TR['Donem'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Okul', FORM_LANG_TR['Okul'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Ders', FORM_LANG_TR['Ders'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sinif', FORM_LANG_TR['Sinif'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Sube', FORM_LANG_TR['Sube'], 'required|trim|max_length[255]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Gun', FORM_LANG_TR['Gun'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');       
          $this->form_validation->set_rules('Saat', FORM_LANG_TR['Saat'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->UpdateCivogt();
          $this->data['type'] = 'update';
          if($result){
            $cacheKeys = array('Civogt','CivogtHtml');
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
            $this->data['data'] = $this->General_Model->EditCivogt();
            $this->data['sayfa'] = $_POST['Okul'];
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

  public function EditCivogt(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditCivogt();
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

  public function DeleteCivogt(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteCivogt();
          if($result){
            $cacheKeys = array('Civogt','CivogtHtml');
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
