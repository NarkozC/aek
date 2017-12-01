<?php 

/**
* All in One Narkoz Model
*/
class Narkoz_Model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}




	/*
		=====================================
		  ------------- GET ---------------
		=====================================
	*/
	public function Get_Basic($Table)
	{
		return $this->db
		->get($Table)
		->result();
	}

	public function Get_With_NumRows($Table)
	{
		return $this->db
		->get($Table)
		->num_rows();
	}

	public function Get_With_OrderBy($Data)
	{
		return $this->db
		->order_by($Data['by'],$Data['order'])
		->get($Data['table'])
		->result();
	}

	public function Get_Row_With_OrderBy($Data)
	{
		return $this->db
		->order_by($Data['by'],$Data['order'])
		->get($Data['table'])
		->row();
	}

	public function Get_Row_With_Where($Data)
	{
		return $this->db
		->where($Data['search'], $Data['equal'])
		->get($Data['table'])
		->row();
	}

	public function Get_Row_With_Where_And_OrderBy($Data)
	{
		return $this->db
		->where($Data['search'], $Data['equal'])
		->order_by($Data['by'],$Data['order'])
		->get($Data['table'])
		->row();
	}





	/*
		=====================================
		  ------------ ADD ----------------
		=====================================
	*/
	public function Add_Basic($Table, $Data)
	{
		return $this->db
		->insert($Table, $Data);
	}





	/*
		=====================================
		  ------------ UPDATE -------------
		=====================================
	*/
	public function Update_Basic($Table, $Data)
	{
		return $this->db
		->update($Table, $Data);
	}

	public function Update_With_Where($Table, $Data, $Where)
	{
		return $this->db
		->where($Where['search'], $Where['equal'])
		->update($Table, $Data);
	}





	/*
		=====================================
		  ------------ DELETE -------------
		=====================================
	*/
	public function Delete_Basic($Table, $Data)
	{
		return $this->db
		->where($Data['search'], $Data['equal'])
		->delete($Table);
	}







}
