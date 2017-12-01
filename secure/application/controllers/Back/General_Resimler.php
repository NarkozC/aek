<?php

class General_Resimler extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false, 'messages' => array(), 'type' => 'add');

  }

  public function index()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->load->view('Back/General/Resimler-view');
    } else {
      redirect('Portal');
    }
  }

  public function GetResimler(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $result = $this->General_Model->GetResimler();
      echo json_encode($result);
    } else {
      redirect('Portal');
    }
  }

  public function GetResimlerNum(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $result = $this->General_Model->GetResimlerNum();
      echo json_encode($result); 
    } else {
      redirect('Portal');
    }
  }

  public function AddResim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('Isim', 'İsim', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Kategori', 'Kategori', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['success'] = true;
      } else {
        //show errors
        foreach ($_POST as $key => $value) {
          $this->data['messages'][$key] = form_error($key);
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }

  }

  public function EditResim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $this->data['data'] = $this->General_Model->EditResim();
        if ($this->data['data']) {
          $this->data['type'] = 'update';
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }

  public function UpdateResim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      //validate
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Isim', 'İsim', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_rules('Kategori', 'Kategori', 'required|trim|max_length[65]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $Isim =$this->input->post('Isim');
        $DIsim =$this->input->post('Isim');

        $DIsim = $this->General_Model->TurkceToIngilizce($DIsim);
        $Isim = preg_replace('!\s+!', ' ', $Isim);

        $data = array(
                      'Isim'    =>$Isim,
                      'DIsim'    =>$DIsim,
                    );

        $result = $this->General_Model->UpdateResim($data);
        $this->data['type'] = 'update';
        if($result){
          $this->data['data'] = $this->General_Model->EditResim();
          $this->data['success'] = true;
        }
      } else {
        //show errors
        if (form_error('No')) {
          $this->data['NoV'] = true;
          $this->data['messages']['No'] = form_error('No');
        } else {
          foreach ($_POST as $key => $value) {
            $this->data['messages'][$key] = form_error($key);
          }
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }

    
  }

  public function DeleteResim(){
    // check if logged in
    if($this->session->userdata('logged_in')) {
      $this->form_validation->set_rules('No', 'No', 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
      $this->form_validation->set_error_delimiters('<p class="text-danger">', '</p>');
      if ($this->form_validation->run()) {
        $result = $this->General_Model->DeleteResim();
        if($result){
          AddResimUpload();
          $this->data['success'] = true;
        }
      }
      echo json_encode($this->data);
    } else {
      redirect('Portal');
    }
  }


  public function AddResimUpload()
  {
    // check if logged in
    if($this->session->userdata('logged_in')) {
      
      if ( ! empty($_FILES))
      {
        $Isim = $this->input->post('Isim');
        $Kategori = $this->input->post('Kategori');
        $Isim = preg_replace('!\s+!', ' ', $Isim);

        $Dosya = $Isim;

        $Dosya = $this->General_Model->TurkceToIngilizce($Dosya);

        $config['upload_path'] = 'resources/images/'.$Kategori;
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '10000';
        $config['file_name'] = $Dosya;

        $this->load->library('upload', $config);
        if (! $this->upload->do_upload("Dosya")) {
          echo "Dosya yüklenemez";
        } else {
          $dosya = $this->upload->data('full_path');
          if ($dosya) {

            $parts = explode('/', $dosya);
            $value = $parts[count($parts) - 1];
            $dosya = $value;
            $yukleme_Tarihi = date("d.m.y H:i:s");

            $resim = array(
              'Isim' => $Isim,
              'Kategori' => $Kategori,
              'Dosya' => $dosya,
              'Tarihi' => $yukleme_Tarihi,
            );
            $result = $this->General_Model->AddResim($resim);
            if ($result) {
              echo 'Dosya yüklendi';
            }
              
          }
        }

      } else if ($this->input->post('file_to_remove')) {
        $result = $this->General_Model->DeleteResim();
        if($result){
          $file_to_remove = $this->input->post('file_to_remove');
          unlink($file_to_remove);
          $this->data['success'] = true;
        }
        echo json_encode($this->data);
        
      }
    } else {
      redirect('Portal');
    }
  }

  public function Deneme(){
    $resim = array(
              'Isim' => 'den       e me          ',
              'Kategori' => 'asdfasdfKategori',
            );
    $this->General_Model->AddResim($resim);
  }
  
}
