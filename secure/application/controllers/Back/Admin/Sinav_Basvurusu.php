<?php

class Sinav_Basvurusu extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
                        'cacheKeys' => array(

                          'GetSinavBasvurusuTR' => md5('GetSinavBasvurusuCacheTR'),
                          'GetSinavBasvurusuEN' => md5('GetSinavBasvurusuCacheEN'),
                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/SinavBasvurusu-view');
    } else {
      redirect('Portal');
    }
  }

  public function UpdateSinavBasvurusu(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('No', FORM_LANG_EN['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tc', FORM_LANG_EN['Tc'], 'required|trim|numeric|exact_length[11]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('AdSoyad', FORM_LANG_EN['AdSoyad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('Cinsiyet', FORM_LANG_EN['Cinsiyet'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('DogumTarihi', FORM_LANG_EN['DogumTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('DogumYeri', FORM_LANG_EN['DogumYeri'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('AnneAd', FORM_LANG_EN['AnneAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('AnneTel', FORM_LANG_EN['AnneTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('AnneEmail', FORM_LANG_EN['AnneEmail'], 'required|trim|valid_email|strip_tags|xss_clean');
          $this->form_validation->set_rules('BabaAd', FORM_LANG_EN['BabaAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('BabaTel', FORM_LANG_EN['BabaTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('BabaEmail', FORM_LANG_EN['BabaEmail'], 'required|trim|valid_email|strip_tags|xss_clean');
          $this->form_validation->set_rules('Adres', FORM_LANG_EN['Adres'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('OOOkul', FORM_LANG_EN['OOOkul'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('OOSinif', FORM_LANG_EN['OOSinif'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('Bolum', FORM_LANG_EN['Bolum'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('Aciklama', FORM_LANG_EN['Aciklama'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('SinavTarihi', FORM_LANG_EN['SinavTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean');   
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Tc', FORM_LANG_TR['Tc'], 'required|trim|numeric|exact_length[11]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('AdSoyad', FORM_LANG_TR['AdSoyad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('Cinsiyet', FORM_LANG_TR['Cinsiyet'], 'required|trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('DogumTarihi', FORM_LANG_TR['DogumTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('DogumYeri', FORM_LANG_TR['DogumYeri'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('AnneAd', FORM_LANG_TR['AnneAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('AnneTel', FORM_LANG_TR['AnneTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('AnneEmail', FORM_LANG_TR['AnneEmail'], 'required|trim|valid_email|strip_tags|xss_clean');
          $this->form_validation->set_rules('BabaAd', FORM_LANG_TR['BabaAd'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('BabaTel', FORM_LANG_TR['BabaTel'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('BabaEmail', FORM_LANG_TR['BabaEmail'], 'required|trim|valid_email|strip_tags|xss_clean');
          $this->form_validation->set_rules('Adres', FORM_LANG_TR['Adres'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('OOOkul', FORM_LANG_TR['OOOkul'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('OOSinif', FORM_LANG_TR['OOSinif'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('Bolum', FORM_LANG_TR['Bolum'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('Aciklama', FORM_LANG_TR['Aciklama'], 'trim|strip_tags|xss_clean');
          $this->form_validation->set_rules('SinavTarihi', FORM_LANG_TR['SinavTarihi'], 'required|trim|max_length[255]|strip_tags|xss_clean');
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['type'] = 'update';
          $this->form_validation->reset_validation();
          $this->form_validation->set_rules('Tc', FORM_LANG_EN['Tc'], 'is_unique[general_sinavbasvurusu.Tc]');
            $this->form_validation->set_error_delimiters('<p style="margin:10px 0px;" class="text-danger">', '</p>');
            if ($this->form_validation->run()) {
              $this->data['secondval'] = true;
              $result = $this->General_Model->UpdateSinavBasvurusu();
              if ($result) {
                $cacheKeys = array('SinavBasvurusu');
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
                $this->data['data'] = $this->General_Model->EditSinavBasvurusu();
                $this->data['success'] = true;
              }
            } else {
              $tc = $this->input->post('Tc');
              $tarih = $this->input->post('Tarih');
              $check = $this->General_Model->GetSinavBasvurusuByTarihAndTc($tarih, $tc);

              if ($check) {
                $this->data['messages']['Tc'] = '<p style="margin:10px 0px;" class="text-danger">Bu tarihteki sınava başvurunuz mevcut.</p>';
              } else {
                $result = $this->General_Model->UpdateSinavBasvurusu();
                if ($result) {
                  $cacheKeys = array('SinavBasvurusu');
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
                  $this->data['data'] = $this->General_Model->EditSinavBasvurusu();
                  $this->data['success'] = true;
                }
              }
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

  public function EditSinavBasvurusu(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditSinavBasvurusu();
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

  public function DeleteSinavBasvurusu(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteSinavBasvurusu();
          if($result){
            $cacheKeys = array('SinavBasvurusu');
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
