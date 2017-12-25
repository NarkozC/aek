<?php

class Hakkimizda extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
                        'cacheKeys' => array(

                          'GetHakkimizdaTR' => md5('GetHakkimizdaCacheTR'),
                          'GetHakkimizdaEN' => md5('GetHakkimizdaCacheEN'),
                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/Hakkimizda-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddHakkimizda(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_EN['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Baslik', FORM_LANG_EN['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_EN['Aciklama'], 'required|trim|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_EN['Aciklama'], 'trim|strip_tags|xss_clean');       
        } else {
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_TR['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Baslik', FORM_LANG_TR['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_TR['Aciklama'], 'required|trim|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_TR['Aciklama'], 'trim|strip_tags|xss_clean');       
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $resimF = ArrayToComma($_POST['Resim']);
          
          $ModelData = array(
                        'Resim'    => $resimF,
                        );
          $result = $this->General_Model->AddHakkimizda($ModelData);
          if ($result) {
            $cacheKeys = array('Hakkimizda');
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
            $this->data['data'] = $this->General_Model->EditHakkimizda('0');
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

  public function UpdateHakkimizda(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_EN['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Baslik', FORM_LANG_EN['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_EN['Aciklama'], 'required|trim|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_EN['Aciklama'], 'trim|strip_tags|xss_clean');       
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Baslik', FORM_LANG_TR['Baslik'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Baslik', FORM_LANG_TR['Baslik'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('tr_Aciklama', FORM_LANG_TR['Aciklama'], 'required|trim|strip_tags|xss_clean');       
          $this->form_validation->set_rules('en_Aciklama', FORM_LANG_TR['Aciklama'], 'trim|strip_tags|xss_clean');       
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $resimF = ArrayToComma($_POST['Resim']);
          
          $ModelData = array(
                        'Resim'    => $resimF,
                        );
          $this->data['ModelData'] = $ModelData;
          $result = $this->General_Model->UpdateHakkimizda($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $cacheKeys = array('Hakkimizda');
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
            $this->data['data'] = $this->General_Model->EditHakkimizda();
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

  public function EditHakkimizda(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditHakkimizda();
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

  public function DeleteHakkimizda(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteHakkimizda();
          if($result){
            $cacheKeys = array('Hakkimizda');
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

  public function UpHakkimizda(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_rules('ListOrder', FORM_LANG_TR['ListOrder'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {

          $result = $this->General_Model->UpHakkimizda();
          if($result){
            $cacheKeys = array('Hakkimizda');
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

  public function DownHakkimizda(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_rules('ListOrder', FORM_LANG_TR['ListOrder'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DownHakkimizda();
          if($result){
            $cacheKeys = array('Hakkimizda');
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
