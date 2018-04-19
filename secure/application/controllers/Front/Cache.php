<?php

class Cache extends CI_Controller {

  public function __construct()
  {
    parent::__construct();

    $this->data = array('success' => false);
    $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));
  }

  public function DeleteAll(){
    if(! $this->input->is_ajax_request()) {
      redirect('404');
    } else {
      if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
        if ($this->cache->clean()) {
          $this->data['success'] = true;
        } else {
          $this->data['success'] = false;
        }
        echo json_encode($this->data);
      } else {
        redirect('Portal');
      }
    }
  }

  
}
