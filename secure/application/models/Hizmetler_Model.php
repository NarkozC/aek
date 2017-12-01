<?php 

class Hizmetler_Model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}





	/*
		=====================================
		  ------------ Bireysel -----------
		=====================================
	*/

	public function GetHizmetlerBireysel()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('hizmetler_bireysel')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('hizmetler_bireysel', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('hizmetler_bireysel')
		->result();
	}

	public function GetHizmetlerBireyselNum()
	{
		return $this->db
		->get('hizmetler_bireysel')
		->num_rows();
	}

	public function AddBireyselHizmet($SectionIDs){

		$num = $this->db
		->get('hizmetler_bireysel')
		->num_rows();

		$Data = array(
			'ListOrder'		=>  $num+1,

			'tr_Baslik'		=>$this->input->post('tr_Baslik'),
			'tr_Resim'		=>$this->input->post('tr_Resim'),
			'tr_Yazi'		=>$this->input->post('tr_Yazi'),
			'tr_SectionID'	=>$SectionIDs['tr_SectionID'],

			'en_Baslik'		=>$this->input->post('en_Baslik'),
			'en_Resim'		=>$this->input->post('en_Resim'),
			'en_Yazi'		=>$this->input->post('en_Yazi'),
			'en_SectionID'	=>$SectionIDs['en_SectionID'],
		);
		$this->db->insert('hizmetler_bireysel', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteBireyselHizmet(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('hizmetler_bireysel');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditBireyselHizmet(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('hizmetler_bireysel');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateBireyselHizmet($SectionIDs){
		$No = $this->input->post('No');
		$field = array(
			'tr_Baslik'		=>$this->input->post('tr_Baslik'),
			'tr_Resim'		=>$this->input->post('tr_Resim'),
			'tr_Yazi'		=>$this->input->post('tr_Yazi'),
			'tr_SectionID'	=>$SectionIDs['tr_SectionID'],

			'en_Baslik'		=>$this->input->post('en_Baslik'),
			'en_Resim'		=>$this->input->post('en_Resim'),
			'en_Yazi'		=>$this->input->post('en_Yazi'),
			'en_SectionID'	=>$SectionIDs['en_SectionID'],
		);
		$this->db->where('No', $No);
		$this->db->update('hizmetler_bireysel', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpBireyselHizmet(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('hizmetler_bireysel', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('hizmetler_bireysel', $field);
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

	public function DownBireyselHizmet(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('hizmetler_bireysel', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('hizmetler_bireysel', $field);
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
		  ------------ Kurumsal -----------
		=====================================
	*/

	public function GetHizmetlerKurumsal()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('hizmetler_kurumsal')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('hizmetler_kurumsal', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('hizmetler_kurumsal')
		->result();
	}

	public function GetHizmetlerKurumsalNum()
	{
		return $this->db
		->get('hizmetler_kurumsal')
		->num_rows();
	}

	public function AddKurumsalHizmet($SectionIDs){

		$num = $this->db
		->get('hizmetler_kurumsal')
		->num_rows();

		$Data = array(
			'ListOrder'		=>  $num+1,

			'tr_Baslik'		=>$this->input->post('tr_Baslik'),
			'tr_Resim'		=>$this->input->post('tr_Resim'),
			'tr_Yazi'		=>$this->input->post('tr_Yazi'),
			'tr_SectionID'	=>$SectionIDs['tr_SectionID'],

			'en_Baslik'		=>$this->input->post('en_Baslik'),
			'en_Resim'		=>$this->input->post('en_Resim'),
			'en_Yazi'		=>$this->input->post('en_Yazi'),
			'en_SectionID'	=>$SectionIDs['en_SectionID'],
		);
		$this->db->insert('hizmetler_kurumsal', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteKurumsalHizmet(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('hizmetler_kurumsal');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditKurumsalHizmet(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('hizmetler_kurumsal');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateKurumsalHizmet($SectionIDs){
		$No = $this->input->post('No');
		$field = array(
			'tr_Baslik'		=>$this->input->post('tr_Baslik'),
			'tr_Resim'		=>$this->input->post('tr_Resim'),
			'tr_Yazi'		=>$this->input->post('tr_Yazi'),
			'tr_SectionID'	=>$SectionIDs['tr_SectionID'],

			'en_Baslik'		=>$this->input->post('en_Baslik'),
			'en_Resim'		=>$this->input->post('en_Resim'),
			'en_Yazi'		=>$this->input->post('en_Yazi'),
			'en_SectionID'	=>$SectionIDs['en_SectionID'],
		);
		$this->db->where('No', $No);
		$this->db->update('hizmetler_kurumsal', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpKurumsalHizmet(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('hizmetler_kurumsal', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('hizmetler_kurumsal', $field);
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

	public function DownKurumsalHizmet(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('hizmetler_kurumsal', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('hizmetler_kurumsal', $field);
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