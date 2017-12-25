<?php

class Navbar_F extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
                        'cacheKeys' => array(

                          'GetNavbarFTR' => md5('GetNavbarFCacheTR'),
                          'GetNavbarFEN' => md5('GetNavbarFCacheEN'),
                        ),
    );
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

  }

  public function index()
  {
    if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
      $this->load->view('Back/Admin/NavbarF-view');
    } else {
      redirect('Portal');
    }
  }

  public function AddNavbarF(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $en = $_POST["English"];
        if ($en == "true") {
          $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_EN['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_EN['Ad'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('IsLink', FORM_LANG_EN['IsLink'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('IsLinkInBaseurl', FORM_LANG_EN['IsLinkInBaseurl'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Link', FORM_LANG_EN['Link'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Level', FORM_LANG_EN['Level'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('MainSectionID', FORM_LANG_EN['UstBirim'], 'trim|max_length[255]|strip_tags|xss_clean'); 
        } else {
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_TR['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_TR['Ad'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('IsLink', FORM_LANG_TR['IsLink'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('IsLinkInBaseurl', FORM_LANG_TR['IsLinkInBaseurl'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Link', FORM_LANG_TR['Link'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Level', FORM_LANG_TR['Level'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('MainSectionID', FORM_LANG_TR['UstBirim'], 'trim|max_length[255]|strip_tags|xss_clean');       
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $level = $this->input->post('Level');
          $isLink;
          $isLinkInBaseurl;
          $link;
          $mainSectionIDF = '';
          $subSectionIDF = '';
          if ($this->input->post('Link') == '') {
            $link = '';
          } else {
            $link = $this->input->post('Link');
          }
          if ($this->input->post('IsLink') == '') {
            $isLink = array('IsLink', '0');
          } else {
            $isLink = explode("-",$this->input->post('IsLink'));
          }
          if ($this->input->post('IsLinkInBaseurl') == '') {
            $isLinkInBaseurl = array('IsLinkInBaseurl', '0');
          } else {
            $isLinkInBaseurl = explode("-",$this->input->post('IsLinkInBaseurl'));
          }
          if ($level == "Main") {
            if ($isLink[1] == 0) {
              $mainSectionIDF = TurkceToIngilizce($this->input->post('tr_Ad'));
            }
          } else if ($level == "Sub") {
            if ($isLink[1] == 0) {
              $subSectionIDF = TurkceToIngilizce($this->input->post('tr_Ad'));
            }
            $mainSectionIDF = $this->input->post('MainSectionID');
          } else if ($level == "SubSub") {
            $mainSectionIDF = $this->input->post('MainSectionID');
          }
          
          $ModelData = array(
                        'Link'              => $link,
                        'IsLink'            => $isLink[1],
                        'IsLinkInBaseurl'   => $isLinkInBaseurl[1],
                        'MainSectionID'     => $mainSectionIDF,
                        'SubSectionID'      => $subSectionIDF,
                        );
          $this->data['ModelData'] = $ModelData;
          $result = $this->General_Model->AddNavbarF($ModelData);
          if ($result) {
            $cacheKeys = array('NavbarF');
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
            $this->data['data'] = $this->General_Model->EditNavbarF('0');
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

  public function UpdateNavbarF(){
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
          $this->form_validation->set_rules('IsLink', FORM_LANG_EN['IsLink'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('IsLinkInBaseurl', FORM_LANG_EN['IsLinkInBaseurl'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Link', FORM_LANG_EN['Link'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Level', FORM_LANG_EN['Level'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('MainSectionID', FORM_LANG_EN['UstBirim'], 'trim|max_length[255]|strip_tags|xss_clean');     
        } else {
          $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
          $this->form_validation->set_rules('tr_Ad', FORM_LANG_TR['Ad'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('en_Ad', FORM_LANG_TR['Ad'], 'trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('IsLink', FORM_LANG_TR['IsLink'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('IsLinkInBaseurl', FORM_LANG_TR['IsLinkInBaseurl'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Link', FORM_LANG_TR['Link'], 'trim|max_length[255]|strip_tags|xss_clean');
          $this->form_validation->set_rules('Level', FORM_LANG_TR['Level'], 'required|trim|max_length[255]|strip_tags|xss_clean'); 
          $this->form_validation->set_rules('MainSectionID', FORM_LANG_TR['UstBirim'], 'trim|max_length[255]|strip_tags|xss_clean'); 
        }
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $level = $this->input->post('Level');
          $isLink;
          $isLinkInBaseurl;
          $link;
          $mainSectionIDF = '';
          $subSectionIDF = '';
          if ($this->input->post('Link') == '') {
            $link = '';
          } else {
            $link = $this->input->post('Link');
          }
          if ($this->input->post('IsLink') == '') {
            $isLink = array('IsLink', '0');
          } else {
            $isLink = explode("-",$this->input->post('IsLink'));
          }
          if ($this->input->post('IsLinkInBaseurl') == '') {
            $isLinkInBaseurl = array('IsLinkInBaseurl', '0');
          } else {
            $isLinkInBaseurl = explode("-",$this->input->post('IsLinkInBaseurl'));
          }
          if ($level == "Main") {
            if ($isLink[1] == 0) {
              $mainSectionIDF = TurkceToIngilizce($this->input->post('tr_Ad'));
            }
          } else if ($level == "Sub") {
            if ($isLink[1] == 0) {
              $subSectionIDF = TurkceToIngilizce($this->input->post('tr_Ad'));
            }
            $mainSectionIDF = $this->input->post('MainSectionID');
          } else if ($level == "SubSub") {
            $mainSectionIDF = $this->input->post('MainSectionID');
          }
          
          $ModelData = array(
                        'Link'              => $link,
                        'IsLink'            => $isLink[1],
                        'IsLinkInBaseurl'   => $isLinkInBaseurl[1],
                        'MainSectionID'     => $mainSectionIDF,
                        'SubSectionID'      => $subSectionIDF,
                        );
          $this->data['ModelData'] = $ModelData;
          $result = $this->General_Model->UpdateNavbarF($ModelData);
          $this->data['type'] = 'update';
          if($result){
            $cacheKeys = array('NavbarF');
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
            $this->data['data'] = $this->General_Model->EditNavbarF();
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

  public function EditNavbarF(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $this->data['data'] = $this->General_Model->EditNavbarF();
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

  public function DeleteNavbarF(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DeleteNavbarF();
          if($result){
            $cacheKeys = array('NavbarF');
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

  public function UpNavbarF(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_rules('ListOrder', FORM_LANG_TR['ListOrder'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {

          $result = $this->General_Model->UpNavbarF();
          if($result){
            $cacheKeys = array('NavbarF');
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

  public function DownNavbarF(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        $this->form_validation->set_rules('No', FORM_LANG_TR['No'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_rules('ListOrder', FORM_LANG_TR['ListOrder'], 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
        $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
        if ($this->form_validation->run()) {
          $result = $this->General_Model->DownNavbarF();
          if($result){
            $cacheKeys = array('NavbarF');
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
