<?php

class Genel_Resimler extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add', 'cached' => false, 'data' => '', 'cachedataTR' => '', 'cachedataEN' => '', 'cacheTime' => 172800,
                        'cacheKeys' => array(
                          'GetResimlerTR' => md5('GetResimlerCacheTR'),
                          'GetResimlerEN' => md5('GetResimlerCacheEN'),
                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/Admin/Resimler-view');
    } else {
      redirect('Portal');
    }
  }

  public function GetResimler(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
      $this->data['cachePostTR'] = $this->input->post('CacheTR');
      $this->data['cachePostEN'] = $this->input->post('CacheEN');
      $cacheKeyTR = $this->data['cacheKeys']['GetResimlerTR'];
            $cacheKeyEN = $this->data['cacheKeys']['GetResimlerEN'];
      $this->data['English'] = $this->input->post('English');
      $this->data['NeedData'] = $this->input->post('NeedData');

      if ($this->data['NeedData'] == "true") {
        $this->data['data'] = $this->General_Model->GetResimler();
      } else {
        if ($this->data['cachePostTR'] != null) {
          $this->cache->save($cacheKeyTR, $this->data['cachePostTR'], $this->data['cacheTime']);
          $this->data['cached'] = true;
          $this->data['cachedataTR'] = $this->data['cachePostTR'];

        } else if ($this->data['cachePostEN'] != null) {
          $this->cache->save($cacheKeyEN, $this->data['cachePostEN'], $this->data['cacheTime']);
          $this->data['cached'] = true;
          $this->data['cachedataEN'] = $this->data['cachePostEN'];
        } else {
          $gotCacheTR = $this->cache->get($cacheKeyTR);
          $gotCacheEN = $this->cache->get($cacheKeyEN);
          if ($gotCacheTR) {
            $this->data['cachedataTR'] = $gotCacheTR;
          }
          if ($gotCacheEN) {
            $this->data['cachedataEN'] = $gotCacheEN;
          }
          if ($this->data['English'] != null) {
            if ($this->data['English'] == "true" && !$gotCacheEN) {
              $this->data['data'] = $this->General_Model->GetResimler();
            } else if($this->data['English'] == "false" && !$gotCacheTR) {
              $this->data['data'] = $this->General_Model->GetResimler();
            }
          }
          
        }
      }
      echo json_encode($this->data);
    }
  }

  public function GetResimlerNum(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
      if($this->session->userdata('logged_in')) {
        $this->data['data'] = $this->General_Model->GetResimlerNum();
        if ($this->data['data']) {
          $this->data['success'] = true;
        }
        echo json_encode($this->data);
      } else {
        redirect('Portal');
      }
    }
  }

  public function AddResimler(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
      if($this->session->userdata('logged_in')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('RIsim', FORM_LANG_EN['Isim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('RKategoriler', FORM_LANG_EN['Kategori'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('RIsim', FORM_LANG_TR['Isim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('RKategoriler', FORM_LANG_TR['Kategori'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $cacheKeys = array('Resimler');
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

  public function EditResimler(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
      if($this->session->userdata('logged_in')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditResimler();
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

  public function UpdateResimler(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
      if($this->session->userdata('logged_in')) {

        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('RIsim', FORM_LANG_EN['Isim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('RKategoriler', FORM_LANG_EN['Kategori'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('RIsim', FORM_LANG_EN['Isim'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('RKategoriler', FORM_LANG_EN['Kategori'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $Isim =$this->input->post('RIsim');
          $DIsim =$this->input->post('RIsim');

          $DIsim = TurkceToIngilizce($DIsim);
          $Isim = preg_replace('!\s+!', ' ', $Isim);

          $data = array(
                        'Isim'    =>$Isim,
                        'DIsim'    =>$DIsim,
                      );

          $result = $this->General_Model->UpdateResimler($data);
          $this->data['type'] = 'update';
          $this->data['deneme'] = $result;
          if($result){
            $cacheKeys = array('Resimler');
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
            $this->data['data'] = $this->General_Model->EditResimler();
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

  public function DeleteResimler(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
      if($this->session->userdata('logged_in')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteResimler();
          if($result){
            $cacheKeys = array('Resimler');
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
            // AddResimlerUpload();
            $this->data['success'] = true;
          }
        }
        echo json_encode($this->data);
      } else {
        redirect('Portal');
      }
    }
  }


  public function AddResimlerUpload(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
        if($this->session->userdata('logged_in')) {
      
          if ( ! empty($_FILES)) {
            $Isim = $this->input->post('RIsim');
            $RDosyaName = $this->input->post('RDosyaName');
            if ($Isim == "RDosya") {
                $Isim = $RDosyaName;
            }
            $Kategori = $this->input->post('RKategoriler');
            $Isim = preg_replace('!\s+!', ' ', $Isim);

            $Dosya = $Isim;

            $Dosya = TurkceToIngilizce($Dosya);

            $config['upload_path'] = 'resources/images/'.$Kategori;
            $config['allowed_types'] = 'gif|jpg|png|jpeg|GIF|JPG|PNG|JPEG';
            $config['max_size'] = '10000';
            $config['file_name'] = $Dosya;

            $this->load->library('upload', $config);
            if (! $this->upload->do_upload("RDosya")) {
              $this->data['success'] = false;
            } else {
              $dosya = $this->upload->data('full_path');
              if ($dosya) {
                $parts = explode('/', $dosya);
                $value = $parts[count($parts) - 1];
                $new_value = pathinfo($value, PATHINFO_FILENAME) . '.' . strtolower(pathinfo($value, PATHINFO_EXTENSION));
                $dosya = $new_value;
                $yukleme_Tarihi = date("d.m.y H:i:s");

                $resim = array(
                  'RIsim' => $Isim,
                  'RKategoriler' => $Kategori,
                  'RDosya' => $dosya,
                  'RTarih' => $yukleme_Tarihi,
                );
                $result = $this->General_Model->AddResimler($resim);
                if ($result) {
                  $this->data['success'] = true;
                }
                  
              }
            }

          } else if ($this->input->post('file_to_remove')) {
            $result = $this->General_Model->DeleteResimler();
            if($result){
              $file_to_remove = $this->input->post('file_to_remove');
              $this->data['deneme'] = unlink($file_to_remove);
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