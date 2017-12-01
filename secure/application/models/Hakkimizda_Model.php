<?php 

/**
* All in One Narkoz Model
*/
class Hakkimizda_Model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}





	/*
		=====================================
		  ------------ HAKKIMIZDA ---------
		=====================================
	*/
	public function GetHakkimizda()
	{
		return $this->db
		->get('hakkimizda_hakkimizda')
		->row();
	}

	public function EditHakkimizda(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('hakkimizda_hakkimizda');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateHakkimizda(){
		$No = $this->input->post('No');
		$field = array(
			'tr_Yazi'		=>$this->input->post('tr_Yazi'),
			'en_Yazi'		=>$this->input->post('en_Yazi'),
		);
		$this->db->where('No', $No);
		$this->db->update('hakkimizda_hakkimizda', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	



	/*
		=====================================
		  -------- Akademi Üyeleri --------
		=====================================
	*/
	public function GetAkademiUyeleri()
  {
    $query = $this->db
    ->order_by('ListOrder','asc')
    ->get('hakkimizda_akademi_uyeleri')
    ->result();

    $i = 1;
    foreach ($query as $item) {
      $field = array(
      'ListOrder'   =>$i,
      );
      $this->db->where('No', $item->No);
      $this->db->update('hakkimizda_akademi_uyeleri', $field);
      $i++;
    }

    return $this->db
    ->order_by('ListOrder','asc')
    ->get('hakkimizda_akademi_uyeleri')
    ->result();
  }

  public function GetAkademiUyeleriNum()
  {
    return $this->db
    ->get('hakkimizda_akademi_uyeleri')
    ->num_rows();
  }

  public function AddAkademiUye(){

    $num = $this->db
    ->get('hakkimizda_akademi_uyeleri')
    ->num_rows();

    $Data = array(
      'ListOrder'   =>  $num+1,

      'tr_Isim'   =>$this->input->post('tr_Isim'),
      'tr_Resim'    =>$this->input->post('tr_Resim'),
      'tr_Aciklama'   =>$this->input->post('tr_Aciklama'),

      'en_Isim'   =>$this->input->post('en_Isim'),
      'en_Resim'    =>$this->input->post('en_Resim'),
      'en_Aciklama'   =>$this->input->post('en_Aciklama'),
    );
    $this->db->insert('hakkimizda_akademi_uyeleri', $Data);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  function DeleteAkademiUye(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $this->db->delete('hakkimizda_akademi_uyeleri');
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function EditAkademiUye(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $query = $this->db->get('hakkimizda_akademi_uyeleri');
    if($query->num_rows() > 0){
      return $query->row();
    }else{
      return false;
    }
  }

  public function UpdateAkademiUye(){
    $No = $this->input->post('No');
    $field = array(
      'tr_Isim'   =>$this->input->post('tr_Isim'),
      'tr_Resim'    =>$this->input->post('tr_Resim'),
      'tr_Aciklama'   =>$this->input->post('tr_Aciklama'),

      'en_Isim'   =>$this->input->post('en_Isim'),
      'en_Resim'    =>$this->input->post('en_Resim'),
      'en_Aciklama'   =>$this->input->post('en_Aciklama'),
    );
    $this->db->where('No', $No);
    $this->db->update('hakkimizda_akademi_uyeleri', $field);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function UpAkademiUye(){
    $No = $this->input->post('No');
    $ListOrder = $this->input->post('ListOrder');

    $field = array(
      'ListOrder'     =>$ListOrder,
    );
    $this->db->where('No !=', $No);
    $this->db->where('ListOrder', $ListOrder-1);
    $this->db->update('hakkimizda_akademi_uyeleri', $field);
    if($this->db->affected_rows() > 0){
      $field = array(
        'ListOrder'     =>$ListOrder-1,
      );
      $this->db->where('No', $No);
      $this->db->where('ListOrder', $ListOrder);
      $this->db->update('hakkimizda_akademi_uyeleri', $field);
      if($this->db->affected_rows() > 0){
        return true;
      }
      else {
        return false;
      }
      
    }else{
      return false;
    }
  }

  public function DownAkademiUye(){
    $No = $this->input->post('No');
    $ListOrder = $this->input->post('ListOrder');

    $field = array(
      'ListOrder'     =>$ListOrder,
    );
    $this->db->where('No !=', $No);
    $this->db->where('ListOrder', $ListOrder+1);
    $this->db->update('hakkimizda_akademi_uyeleri', $field);
    if($this->db->affected_rows() > 0){
      $field = array(
        'ListOrder'     =>$ListOrder+1,
      );
      $this->db->where('No', $No);
      $this->db->where('ListOrder', $ListOrder);
      $this->db->update('hakkimizda_akademi_uyeleri', $field);
      if($this->db->affected_rows() > 0){
        return true;
      }
      else {
        return false;
      }
      
    }else{
      return false;
    }
  }





	/*
		=====================================
		  ----------- Referanslar --------
		=====================================
	*/
	public function GetReferanslar()
  {
    $query = $this->db
    ->order_by('ListOrder','asc')
    ->get('hakkimizda_referanslar')
    ->result();

    $i = 1;
    foreach ($query as $item) {
      $field = array(
      'ListOrder'   =>$i,
      );
      $this->db->where('No', $item->No);
      $this->db->update('hakkimizda_referanslar', $field);
      $i++;
    }

    return $this->db
    ->order_by('ListOrder','asc')
    ->get('hakkimizda_referanslar')
    ->result();
  }

  public function GetReferanslarNum()
  {
    return $this->db
    ->get('hakkimizda_referanslar')
    ->num_rows();
  }

  public function AddReferans(){

    $num = $this->db
    ->get('hakkimizda_referanslar')
    ->num_rows();

    $Data = array(
      'ListOrder'   =>  $num+1,

      'tr_Isim'   =>$this->input->post('tr_Isim'),
      'tr_Resim'    =>$this->input->post('tr_Resim'),

      'en_Isim'   =>$this->input->post('en_Isim'),
      'en_Resim'    =>$this->input->post('en_Resim'),
    );
    $this->db->insert('hakkimizda_referanslar', $Data);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  function DeleteReferans(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $this->db->delete('hakkimizda_referanslar');
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function EditReferans(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $query = $this->db->get('hakkimizda_referanslar');
    if($query->num_rows() > 0){
      return $query->row();
    }else{
      return false;
    }
  }

  public function UpdateReferans(){
    $No = $this->input->post('No');
    $field = array(
      'tr_Isim'   =>$this->input->post('tr_Isim'),
      'tr_Resim'    =>$this->input->post('tr_Resim'),

      'en_Isim'   =>$this->input->post('en_Isim'),
      'en_Resim'    =>$this->input->post('en_Resim'),
    );
    $this->db->where('No', $No);
    $this->db->update('hakkimizda_referanslar', $field);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function UpReferans(){
    $No = $this->input->post('No');
    $ListOrder = $this->input->post('ListOrder');

    $field = array(
      'ListOrder'     =>$ListOrder,
    );
    $this->db->where('No !=', $No);
    $this->db->where('ListOrder', $ListOrder-1);
    $this->db->update('hakkimizda_referanslar', $field);
    if($this->db->affected_rows() > 0){
      $field = array(
        'ListOrder'     =>$ListOrder-1,
      );
      $this->db->where('No', $No);
      $this->db->where('ListOrder', $ListOrder);
      $this->db->update('hakkimizda_referanslar', $field);
      if($this->db->affected_rows() > 0){
        return true;
      }
      else {
        return false;
      }
      
    }else{
      return false;
    }
  }

  public function DownReferans(){
    $No = $this->input->post('No');
    $ListOrder = $this->input->post('ListOrder');

    $field = array(
      'ListOrder'     =>$ListOrder,
    );
    $this->db->where('No !=', $No);
    $this->db->where('ListOrder', $ListOrder+1);
    $this->db->update('hakkimizda_referanslar', $field);
    if($this->db->affected_rows() > 0){
      $field = array(
        'ListOrder'     =>$ListOrder+1,
      );
      $this->db->where('No', $No);
      $this->db->where('ListOrder', $ListOrder);
      $this->db->update('hakkimizda_referanslar', $field);
      if($this->db->affected_rows() > 0){
        return true;
      }
      else {
        return false;
      }
      
    }else{
      return false;
    }
  }





	/*
		=====================================
		  ------------- Galeri ------------
		=====================================
	*/
	public function GetGaleri()
  {
    $query = $this->db
    ->order_by('ListOrder','asc')
    ->get('hakkimizda_galeri')
    ->result();

    $i = 1;
    foreach ($query as $item) {
      $field = array(
      'ListOrder'   =>$i,
      );
      $this->db->where('No', $item->No);
      $this->db->update('hakkimizda_galeri', $field);
      $i++;
    }

    return $this->db
    ->order_by('ListOrder','asc')
    ->get('hakkimizda_galeri')
    ->result();
  }

  public function GetGaleriNum()
  {
    return $this->db
    ->get('hakkimizda_galeri')
    ->num_rows();
  }

  public function AddGaleri(){

    $num = $this->db
    ->get('hakkimizda_galeri')
    ->num_rows();

    $Data = array(
      'ListOrder'   =>  $num+1,

      'tr_Resim'    =>$this->input->post('tr_Resim'),

      'en_Resim'    =>$this->input->post('en_Resim'),
    );
    $this->db->insert('hakkimizda_galeri', $Data);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  function DeleteGaleri(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $this->db->delete('hakkimizda_galeri');
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function EditGaleri(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $query = $this->db->get('hakkimizda_galeri');
    if($query->num_rows() > 0){
      return $query->row();
    }else{
      return false;
    }
  }

  public function UpdateGaleri(){
    $No = $this->input->post('No');
    $field = array(
      'tr_Resim'    =>$this->input->post('tr_Resim'),

      'en_Resim'    =>$this->input->post('en_Resim'),
    );
    $this->db->where('No', $No);
    $this->db->update('hakkimizda_galeri', $field);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function UpGaleri(){
    $No = $this->input->post('No');
    $ListOrder = $this->input->post('ListOrder');

    $field = array(
      'ListOrder'     =>$ListOrder,
    );
    $this->db->where('No !=', $No);
    $this->db->where('ListOrder', $ListOrder-1);
    $this->db->update('hakkimizda_galeri', $field);
    if($this->db->affected_rows() > 0){
      $field = array(
        'ListOrder'     =>$ListOrder-1,
      );
      $this->db->where('No', $No);
      $this->db->where('ListOrder', $ListOrder);
      $this->db->update('hakkimizda_galeri', $field);
      if($this->db->affected_rows() > 0){
        return true;
      }
      else {
        return false;
      }
      
    }else{
      return false;
    }
  }

  public function DownGaleri(){
    $No = $this->input->post('No');
    $ListOrder = $this->input->post('ListOrder');

    $field = array(
      'ListOrder'     =>$ListOrder,
    );
    $this->db->where('No !=', $No);
    $this->db->where('ListOrder', $ListOrder+1);
    $this->db->update('hakkimizda_galeri', $field);
    if($this->db->affected_rows() > 0){
      $field = array(
        'ListOrder'     =>$ListOrder+1,
      );
      $this->db->where('No', $No);
      $this->db->where('ListOrder', $ListOrder);
      $this->db->update('hakkimizda_galeri', $field);
      if($this->db->affected_rows() > 0){
        return true;
      }
      else {
        return false;
      }
      
    }else{
      return false;
    }
  }

	


}