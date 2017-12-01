<?php 

/**
* General bölümü için model
*/
class Anasayfa_Model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}





	/*
		=====================================
		  ------------ YORUMLAR -----------
		=====================================
	*/
	public function GetYorumlar()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('anasayfa_yorumlar')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('anasayfa_yorumlar', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('anasayfa_yorumlar')
		->result();
	}

	public function GetYorumlarNum()
	{
		return $this->db
		->get('anasayfa_yorumlar')
		->num_rows();
	}

	public function GetActiveYorumlar()
	{
		return $this->db
		->where('Durum',1)
		->order_by('ListOrder','asc')
		->get('anasayfa_yorumlar')
		->result();
	}

	public function AddYorum($array){

		$num = $this->db
		->get('anasayfa_yorumlar')
		->num_rows();

		$Data = array(
			'ListOrder'		=>$num+1,
			'YVerifyKey'	=>$array['YVerifyKey'],

			'tr_Isim'		=>$array['tr_Isim'],
			'tr_Yorum'		=>$array['tr_Yorum'],

			'en_Isim'		=>$array['en_Isim'],
			'en_Yorum'		=>$array['en_Yorum'],
		);
		$this->db->insert('anasayfa_yorumlar', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteYorum(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('anasayfa_yorumlar');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditYorum(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('anasayfa_yorumlar');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateYorum(){
		$No = $this->input->post('No');
		$field = array(
			'tr_Isim'		=>$this->input->post('tr_Isim'),
			'tr_Yorum'		=>$this->input->post('tr_Yorum'),

			'en_Isim'		=>$this->input->post('en_Isim'),
			'en_Yorum'		=>$this->input->post('en_Yorum'),
		);
		$this->db->where('No', $No);
		$this->db->update('anasayfa_yorumlar', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpYorum(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('anasayfa_yorumlar', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('anasayfa_yorumlar', $field);
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

	public function DownYorum(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('anasayfa_yorumlar', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('anasayfa_yorumlar', $field);
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

	public function ActiveYorum(){
		$No = $this->input->post('No');
		$field = array(
		'Durum'	=> 1
		);
		$this->db->where('No', $No);
		$this->db->update('anasayfa_yorumlar', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function PassiveYorum(){
		$No = $this->input->post('No');
		$field = array(
		'Durum'	=> 0
		);
		$this->db->where('No', $No);
		$this->db->update('anasayfa_yorumlar', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function ActiveYorumVK(){
		$vk = $this->input->post('YVerifyKey');
		$field = array(
		'Durum'	=> 1
		);
		$this->db->where('YVerifyKey', $vk);
		$this->db->update('anasayfa_yorumlar', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function DeleteYorumVK(){
		$vk = $this->input->post('YVerifyKey');
		$this->db->where('YVerifyKey', $vk);
		$this->db->delete('anasayfa_yorumlar');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	





	/*
		=====================================
		  -------------- Banner -----------
		=====================================
	*/
	 public function GetBannerYazi()
	{
		return $this->db
		->get('anasayfa_banner_yazi')
		->result();
	}

	public function EditBannerYazi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('anasayfa_banner_yazi');
		if($query->num_rows() > 0){
		  return $query->row();
		}else{
		  return false;
		}
	}

	public function UpdateBannerYazi(){
		$No = $this->input->post('No');
		$field = array(
		  'tr_Yazi'   =>$this->input->post('tr_Yazi'),
		  'tr_BtnYazi'    =>$this->input->post('tr_BtnYazi'),
		  'tr_Link'   =>$this->input->post('tr_Link'),

		  'en_Yazi'   =>$this->input->post('en_Yazi'),
		  'en_BtnYazi'    =>$this->input->post('en_BtnYazi'),
		  'en_Link'   =>$this->input->post('en_Link'),
		);
		$this->db->where('No', $No);
		$this->db->update('anasayfa_banner_yazi', $field);
		if($this->db->affected_rows() > 0){
		  return true;
		}else{
		  return false;
		}
	}

	public function GetBannerSlider()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('anasayfa_banner_slider')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('anasayfa_banner_slider', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('anasayfa_banner_slider')
		->result();
	}

	public function GetBannerSliderNum()
	{
		return $this->db
		->get('anasayfa_banner_slider')
		->num_rows();
	}

	public function AddBannerSlide(){
		$num = $this->db
		->get('anasayfa_banner_slider')
		->num_rows();

		$Data = array(
		  'ListOrder'   =>  $num+1,

		  'tr_Resim'    =>$this->input->post('tr_Resim'),
		  'tr_Arkaplan'   =>$this->input->post('tr_Arkaplan'),

		  'en_Resim'   =>$this->input->post('en_Resim'),
		  'en_Arkaplan'    =>$this->input->post('en_Arkaplan'),
		);
		$this->db->insert('anasayfa_banner_slider', $Data);
		if($this->db->affected_rows() > 0){
		  return true;
		}else{
		  return false;
		}
	}

	function DeleteBannerSlide(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('anasayfa_banner_slider');
		if($this->db->affected_rows() > 0){
		  return true;
		}else{
		  return false;
		}
	}

	public function EditBannerSlide(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('anasayfa_banner_slider');
		if($query->num_rows() > 0){
		  return $query->row();
		}else{
		  return false;
		}
	}

	public function UpdateBannerSlide(){
		$No = $this->input->post('No');
		$field = array(
		  'tr_Resim'    =>$this->input->post('tr_Resim'),
		  'tr_Arkaplan'   =>$this->input->post('tr_Arkaplan'),

		  'en_Resim'   =>$this->input->post('en_Resim'),
		  'en_Arkaplan'    =>$this->input->post('en_Arkaplan'),
		);
		$this->db->where('No', $No);
		$this->db->update('anasayfa_banner_slider', $field);
		if($this->db->affected_rows() > 0){
		  return true;
		}else{
		  return false;
		}
	}

	public function UpBannerSlide(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
		  'ListOrder'     =>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('anasayfa_banner_slider', $field);
		if($this->db->affected_rows() > 0){
		  $field = array(
		    'ListOrder'     =>$ListOrder-1,
		  );
		  $this->db->where('No', $No);
		  $this->db->where('ListOrder', $ListOrder);
		  $this->db->update('anasayfa_banner_slider', $field);
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

	public function DownBannerSlide(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
		  'ListOrder'     =>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('anasayfa_banner_slider', $field);
		if($this->db->affected_rows() > 0){
		  $field = array(
		    'ListOrder'     =>$ListOrder+1,
		  );
		  $this->db->where('No', $No);
		  $this->db->where('ListOrder', $ListOrder);
		  $this->db->update('anasayfa_banner_slider', $field);
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

