<?php 

class Egitimler_Model extends CI_Model
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

	public function GetEgitimlerBireysel()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('egitimler_bireysel')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('egitimler_bireysel', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('egitimler_bireysel')
		->result();
	}

	public function GetEgitimlerBireyselNum()
	{
		return $this->db
		->get('egitimler_bireysel')
		->num_rows();
	}

	public function AddBireyselEgitim($SectionIDs){

		$num = $this->db
		->get('egitimler_bireysel')
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
		$this->db->insert('egitimler_bireysel', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteBireyselEgitim(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('egitimler_bireysel');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditBireyselEgitim(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('egitimler_bireysel');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateBireyselEgitim($SectionIDs){
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
		$this->db->update('egitimler_bireysel', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpBireyselEgitim(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('egitimler_bireysel', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('egitimler_bireysel', $field);
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

	public function DownBireyselEgitim(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('egitimler_bireysel', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('egitimler_bireysel', $field);
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

	public function GetEgitimlerKurumsal()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('egitimler_kurumsal')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('egitimler_kurumsal', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('egitimler_kurumsal')
		->result();
	}

	public function GetEgitimlerKurumsalNum()
	{
		return $this->db
		->get('egitimler_kurumsal')
		->num_rows();
	}

	public function AddKurumsalEgitim($SectionIDs){

		$num = $this->db
		->get('egitimler_kurumsal')
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
		$this->db->insert('egitimler_kurumsal', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteKurumsalEgitim(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('egitimler_kurumsal');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditKurumsalEgitim(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('egitimler_kurumsal');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateKurumsalEgitim($SectionIDs){
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
		$this->db->update('egitimler_kurumsal', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpKurumsalEgitim(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('egitimler_kurumsal', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('egitimler_kurumsal', $field);
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

	public function DownKurumsalEgitim(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('egitimler_kurumsal', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('egitimler_kurumsal', $field);
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