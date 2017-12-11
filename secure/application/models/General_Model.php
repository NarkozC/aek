<?php 

/**
* All in One Narkoz Model
*/
class General_Model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}



	/*
		=====================================
		  ----------- Hakkımızda ----------
		=====================================
	*/
	public function GetHakkimizda()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_hakkimizda')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_hakkimizda', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_hakkimizda')
		->result();
	}

	public function GetHakkimizdaNum()
	{
		return $this->db
		->get('general_hakkimizda')
		->num_rows();
	}








	/*
		=====================================
		  ------------ Kadro --------------
		=====================================
	*/
	public function GetKadro()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_kadro')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_kadro', $field);
		  $i++;
		}

		$result = $this->db
		->order_by('ListOrder','asc')
		->get('general_kadro')
		->result();
		return $result;
	}

	public function GetKadroWGrupSectionID($GrupSectionID)
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_kadro')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_kadro', $field);
		  $i++;
		}

		return $this->db
		->where('GrupSectionID', $GrupSectionID)
		->order_by('ListOrder','asc')
		->get('general_kadro')
		->result();
	}

	public function GetKadroNum()
	{
		return $this->db
		->get('general_kadro')
		->num_rows();
	}

	public function GetKadroNumWGrupSectionID($GrupSectionID)
	{
		return $this->db
		->where('GrupSectionID',$GrupSectionID)
		->get('general_kadro')
		->num_rows();
	}

	public function EditKadro($listOrder = -1){
		if ($listOrder != -1) {
			$this->db->where('ListOrder', $listOrder);
			$query = $this->db->get('general_kadro');
			$num = $query->num_rows();
			if ($num > 1) {
				return '-1';
			} else {
				if($num > 0){
					return $query->row();
				}else{
					return false;
				}
			}
			
		} else {
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_kadro');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}
		
	}

	public function AddKadro($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'AdSoyad'				=>$CData['AdSoyad'],
			'Aciklama'				=>$CData['Aciklama'],
			'tr_UzunAciklama'		=>$CData['tr_UzunAciklama'],
			'en_UzunAciklama'		=>$CData['en_UzunAciklama'],
			'Resim'					=>$CData['Resim'],
			'GrupSectionID'			=>$CData['GrupSectionID'],
		);
		$this->db->insert('general_kadro', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateKadro($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'AdSoyad'				=>$CData['AdSoyad'],
			'Aciklama'				=>$CData['Aciklama'],
			'tr_UzunAciklama'		=>$CData['tr_UzunAciklama'],
			'en_UzunAciklama'		=>$CData['en_UzunAciklama'],
			'Resim'					=>$CData['Resim'],
			'GrupSectionID'			=>$CData['GrupSectionID'],
		);
		$this->db->where('No', $No);
		$this->db->update('general_kadro', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	public function DeleteKadro(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_kadro');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpKadro(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('general_kadro', $field);
		if($this->db->affected_rows() > 0) {
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_kadro', $field);
			if($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
			
		} else {
			return false;
		}
	}

	public function DownKadro(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('general_kadro', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_kadro', $field);
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
		  ----------- Kadro Grup ----------
		=====================================
	*/
	public function GetKadroGrup()
	{
		$query = $this->db
		->order_by('Listorder','asc')
		->get('general_kadro_grup')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_kadro_grup', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_kadro_grup')
		->result();
	}

	public function GetKadroGrupNum()
	{
		return $this->db
		->get('general_kadro_grup')
		->num_rows();
	}

		public function EditKadroGrup($listOrder = -1){
		if ($listOrder != -1) {
			$this->db->where('ListOrder', $listOrder);
			$query = $this->db->get('general_kadro_grup');
			$num = $query->num_rows();
			if ($num > 1) {
				return '-1';
			} else {
				if($num > 0){
					return $query->row();
				}else{
					return false;
				}
			}
			
		} else {
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_kadro_grup');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}
		
	}

	public function AddKadroGrup($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_KisaAd'				=>$this->input->post('tr_KisaAd'),
			'en_KisaAd'				=>$this->input->post('en_KisaAd'),
			'tr_Ad'					=>$this->input->post('tr_Ad'),
			'en_Ad'					=>$this->input->post('en_Ad'),

			'MainSectionID'			=>$this->input->post('MainSectionID'),
			'SubSectionID'			=>$CData['SubSectionID'],
			'MainOrSub'				=>$this->input->post('MainOrSub'),
		);
		$this->db->insert('general_kadro_grup', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateKadroGrup($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_KisaAd'				=>$this->input->post('tr_KisaAd'),
			'en_KisaAd'				=>$this->input->post('en_KisaAd'),
			'tr_Ad'					=>$this->input->post('tr_Ad'),
			'en_Ad'					=>$this->input->post('en_Ad'),

			'MainSectionID'			=>$this->input->post('MainSectionID'),
			'SubSectionID'			=>$CData['SubSectionID'],
			'MainOrSub'				=>$this->input->post('MainOrSub'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_kadro_grup', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	public function DeleteKadroGrup(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_kadro_grup');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpKadroGrup(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('general_kadro_grup', $field);
		if($this->db->affected_rows() > 0) {
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_kadro_grup', $field);
			if($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
			
		} else {
			return false;
		}
	}

	public function DownKadroGrup(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('general_kadro_grup', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_kadro_grup', $field);
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
		  ------------ Navbar --------------
		=====================================
	*/
	public function GetNavbarFront()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_navbar_front')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_navbar_front', $field);
		  $i++;
		}

		$result = $this->db
		->order_by('ListOrder','asc')
		->get('general_navbar_front')
		->result();
		return $result;
	}

	public function GetNavbarBack()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_navbar_back')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_navbar_back', $field);
		  $i++;
		}

		$result = $this->db
		->order_by('ListOrder','asc')
		->get('general_navbar_back')
		->result();
		return $result;
	}




	/*
		=====================================
		  ------------ Civogt --------------
		=====================================
	*/
	public function GetCivogt()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_civogt')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_civogt', $field);
		  $i++;
		}

		$result = $this->db
		->order_by('ListOrder','asc')
		->get('general_civogt')
		->result();
		return $result;
		// return true;
	}

	public function GetCivogtNum()
	{
		return $this->db
		->get('general_civogt')
		->num_rows();
	}

	public function EditCivogt($listOrder = -1){
		if ($listOrder != -1) {
			$this->db->where('ListOrder', $listOrder);
			$query = $this->db->get('general_civogt');
			$num = $query->num_rows();
			if ($num > 1) {
				return '-1';
			} else {
				if($num > 0){
					return $query->row();
				}else{
					return false;
				}
			}
			
		} else {
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_civogt');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}
		
	}

	public function AddCivogt($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'AdSoyad'				=>$CData['AdSoyad'],
			'Aciklama'				=>$CData['Aciklama'],
			'tr_UzunAciklama'		=>$CData['tr_UzunAciklama'],
			'en_UzunAciklama'		=>$CData['en_UzunAciklama'],
			'Resim'					=>$CData['Resim'],
			'GrupSectionID'			=>$CData['GrupSectionID'],
		);
		$this->db->insert('general_civogt', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateCivogt($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'AdSoyad'				=>$CData['AdSoyad'],
			'Aciklama'				=>$CData['Aciklama'],
			'tr_UzunAciklama'		=>$CData['tr_UzunAciklama'],
			'en_UzunAciklama'		=>$CData['en_UzunAciklama'],
			'Resim'					=>$CData['Resim'],
			'GrupSectionID'			=>$CData['GrupSectionID'],
		);
		$this->db->where('No', $No);
		$this->db->update('general_civogt', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	public function DeleteCivogt(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_civogt');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpCivogt(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('general_civogt', $field);
		if($this->db->affected_rows() > 0) {
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_civogt', $field);
			if($this->db->affected_rows() > 0) {
				return true;
			} else {
				return false;
			}
			
		} else {
			return false;
		}
	}

	public function DownCivogt(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('general_civogt', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_civogt', $field);
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
		  --------- Birimler İdari --------
		=====================================
	*/
	public function GetBirimlerIdari()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_birimler_idari')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_birimler_idari', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_birimler_idari')
		->result();
	}

	public function GetBirimlerIdariNum()
	{
		return $this->db
		->get('general_birimler_idari')
		->num_rows();
	}





	/*
		=====================================
		  --- Birimler Lojistik Hizmetler -
		=====================================
	*/
	public function GetBirimlerLojistikHizmetler()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_birimler_lojistik_hizmetler')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_birimler_lojistik_hizmetler', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_birimler_lojistik_hizmetler')
		->result();
	}

	public function GetBirimlerLojistikHizmetlerNum()
	{
		return $this->db
		->get('general_birimler_lojistik_hizmetler')
		->num_rows();
	}





	/*
		=====================================
		  --------- Kurucu Mesajı ---------
		=====================================
	*/
	public function GetKurucuMesaji()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_kurucu_mesaji')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_kurucu_mesaji', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_kurucu_mesaji')
		->result();
	}

	public function GetKurucuMesajiNum()
	{
		return $this->db
		->get('general_kurucu_mesaji')
		->num_rows();
	}





	/*
		=====================================
		  --------- Egitim Sistemi --------
		=====================================
	*/
	public function GetEgitimSistemi()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_egitim_sistemi')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_egitim_sistemi', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_egitim_sistemi')
		->result();
	}

	public function GetEgitimSistemiNum()
	{
		return $this->db
		->get('general_egitim_sistemi')
		->num_rows();
	}




	/*
		=====================================
		  ----------- Neden AEK -----------
		=====================================
	*/
	public function GetNedenAEK()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_neden_aek')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('general_neden_aek', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_neden_aek')
		->result();
	}

	public function GetNedenAEKNum()
	{
		return $this->db
		->get('general_neden_aek')
		->num_rows();
	}





	/*
		=====================================
		  ------- Duyurular-Etkinlikler ---
		=====================================
	*/
	public function GetDuyurularEtkinlikler()
	{
		return $this->db
		->order_by('Tarih','desc')
		->get('general_duyurularEtkinlikler')
		->result();
	}

	public function GetDuyurularEtkinliklerNum()
	{
		return $this->db
		->get('general_duyurularEtkinlikler')
		->num_rows();
	}

	public function GetDuyuruEtkinlikWTrSectionID($TrSectionID)
	{
		return $this->db
		->where('tr_SectionID', $TrSectionID)
		->get('general_duyurularEtkinlikler')
		->row();
	}

	public function GetDuyuruEtkinlikWEnSectionID($EnSectionID)
	{
		return $this->db
		->where('en_SectionID', $EnSectionID)
		->get('general_duyurularEtkinlikler')
		->row();
	}

	public function AddDuyurularEtkinlikler($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul_Kodu'			=>$CData['Okul_Kodu'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_duyurularEtkinlikler', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditDuyurularEtkinlikler(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_duyurularEtkinlikler');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateDuyurularEtkinlikler($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
	    $No = $this->input->post('No');
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul_Kodu'			=>$CData['Okul_Kodu'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_duyurularEtkinlikler', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}



	function DeleteDuyurularEtkinlikler(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_duyurularEtkinlikler');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}






	/*
		=====================================
		  ----------- Galeriler -----------
		=====================================
	*/
	public function GetGaleriler()
	{
		// $query = $this->db
		// ->order_by('Tarih','desc')
		// ->get('general_galeriler')
		// ->result();

		// $i = 1;
		// foreach ($query as $item) {
		// 	$okulKodu = '';
		// 	$tr_okul = explode(',', $item->Okullar);
		// 	// $okul_kodu = explode(',', $item->Okul_Kodu);
		// 	for ($k=0; $k < sizeof($tr_okul); $k++) { 
		// 		if ($tr_okul[$k] == "Tüm Anaokulu") {
		// 			$okulKodu = $okulKodu."0,";
		// 		}
		// 		if ($tr_okul[$k] == "Tüm İlkokul") {
		// 			$okulKodu = $okulKodu."1,";
		// 		}
		// 		if ($tr_okul[$k] == "Tüm Ortaokul") {
		// 			$okulKodu = $okulKodu."2,";
		// 		}
		// 		if ($tr_okul[$k] == "Tüm Anadolu Lisesi") {
		// 			$okulKodu = $okulKodu."3,";
		// 		}
		// 	}

		// 	for ($k=0; $k < sizeof($okul_kodu); $k++) {
		// 		if ($okul_kodu[$k] == "") {
		// 			$okulKodu = "0,1,2,3,";
		// 		}
		// 	}
		// 	$okulKodu = preg_replace('/,[^,]*$/', '', $okulKodu);
		//   	$field = array(
		// 			  'Okul_Kodu'   =>$okulKodu,
		// 			);
		// 	$this->db->where('No', $item->No);
		// 	$this->db->update('general_galeriler', $field);
		// 	$i++;
		// }

		return $this->db
		->order_by('Tarih','desc')
		->get('general_galeriler')
		->result();
	}

	public function GetGalerilerNum()
	{
		return $this->db
		->get('general_galeriler')
		->num_rows();
	}

	public function GetGaleriWTrSectionID($TrSectionID)
	{
		return $this->db
		->where('tr_SectionID', $TrSectionID)
		->get('general_galeriler')
		->row();
	}

	public function GetGaleriWEnSectionID($EnSectionID)
	{
		return $this->db
		->where('en_SectionID', $EnSectionID)
		->get('general_galeriler')
		->row();
	}

	public function AddGaleriler($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul_Kodu'			=>$CData['Okul_Kodu'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_galeriler', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditGaleriler(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_galeriler');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateGaleriler($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
	    $No = $this->input->post('No');
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul_Kodu'			=>$CData['Okul_Kodu'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_galeriler', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}



	function DeleteGaleriler(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_galeriler');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}








	/*
		=====================================
		  ----------- Haberler -----------
		=====================================
	*/
	public function GetHaberler()
	{
		return $this->db
		->order_by('Tarih','desc')
		->get('general_haberler')
		->result();
	}

	public function GetHaberlerNum()
	{
		return $this->db
		->get('general_haberler')
		->num_rows();
	}

	public function GetHaberWTrSectionID($TrSectionID)
	{
		return $this->db
		->where('tr_SectionID', $TrSectionID)
		->get('general_haberler')
		->row();
	}

	public function GetHaberWEnSectionID($EnSectionID)
	{
		return $this->db
		->where('en_SectionID', $EnSectionID)
		->get('general_haberler')
		->row();
	}

	public function AddHaberler($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul'				=>$CData['Okul'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_haberler', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditHaberler(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_haberler');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateHaberler($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
	    $No = $this->input->post('No');
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul'				=>$CData['Okul'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_haberler', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}



	function DeleteHaberler(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_haberler');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}


	


	/*
		=====================================
		  ----------- SinavBasvurusu -----------
		=====================================
	*/
	public function GetSinavBasvurusu()
	{
		return $this->db
		->order_by('No','asc')
		->get('general_sinavbasvurusu')
		->result();
	}

	public function GetSinavBasvurusuByTarihAndTc($tarih, $tc)
	{
		$where = array('Tc' => $tc, 'SinavTarihi' => $tarih);
		$query = $this->db
		->order_by('No','asc')
		->where($where)
		->get('general_sinavbasvurusu');

		if ($query->num_rows() > 0) {
		    return true;
		} 
		else {
		    return false;
		}
	}

	public function GetSinavBasvurusuNum()
	{
		return $this->db
		->get('general_sinavbasvurusu')
		->num_rows();
	}

	public function AddSinavBasvurusu(){
		$Data = array(
			'AdSoyad'			=>$this->input->post('AdSoyad'),
			'Cinsiyet'			=>$this->input->post('Cinsiyet'),
			'SinavTarihi'		=>$this->input->post('SinavTarihi'),
			'DogumTarihi'		=>$this->input->post('DogumTarihi'),
			'DogumYeri'			=>$this->input->post('DogumYeri'),
			'OOSinif'			=>$this->input->post('OOSinif'),
			'OOOkul'			=>$this->input->post('OOOkul'),
			'Bolum'				=>$this->input->post('Bolum'),
			'AnneAd'			=>$this->input->post('AnneAd'),
			'AnneTel'			=>$this->input->post('AnneTel'),
			'AnneEmail'			=>$this->input->post('AnneEmail'),
			'BabaAd'			=>$this->input->post('BabaAd'),
			'BabaTel'			=>$this->input->post('BabaTel'),
			'BabaEmail'			=>$this->input->post('BabaEmail'),
			'Adres'				=>$this->input->post('Adres'),
			'Tc'				=>$this->input->post('Tc'),
			'Aciklama'			=>$this->input->post('Aciklama'),
		);
		$this->db->insert('general_sinavbasvurusu', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditSinavBasvurusu(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_sinavbasvurusu');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateSinavBasvurusu($CData){
	    $No = $this->input->post('No');
		$Data = array(
			'AdSoyad'			=>$this->input->post('AdSoyad'),
			'Cinsiyet'			=>$this->input->post('Cinsiyet'),
			'SinavTarihi'		=>$this->input->post('SinavTarihi'),
			'DogumTarihi'		=>$this->input->post('DogumTarihi'),
			'DogumYeri'			=>$this->input->post('DogumYeri'),
			'OOSinif'			=>$this->input->post('OOSinif'),
			'OOOkul'			=>$this->input->post('OOOkul'),
			'Bolum'				=>$this->input->post('Bolum'),
			'AnneAd'			=>$this->input->post('AnneAd'),
			'AnneTel'			=>$this->input->post('AnneTel'),
			'BabaAd'			=>$this->input->post('BabaAd'),
			'BabaTel'			=>$this->input->post('BabaTel'),
			'Adres'				=>$this->input->post('Adres'),
			'Tc'				=>$this->input->post('Tc'),
			'Aciklama'			=>$this->input->post('Aciklama'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_sinavbasvurusu', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}

	function DeleteSinavBasvurusu(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_sinavbasvurusu');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}






	/*
		=====================================
		  --------- Sinav Tarihleri -------
		=====================================
	*/
	public function GetSinavTarihleri()
	{
		$query = $this->db
		->order_by('Tarih','desc')
		->get('general_sinav_tarihleri')
		->result();

		$today = date("Y-m-d");
		$today_dt = new DateTime($today);
		foreach ($query as $item) {
			$records = $item->Tarih;
			$records_dt = new DateTime($records);

			if ($records_dt < $today_dt) {
				$No = $item->No;
				$this->db->where('No', $No);
				$this->db->delete('general_sinav_tarihleri');
				if($this->db->affected_rows() > 0){}
			}
		}

		return $this->db
		->order_by('Tarih','desc')
		->get('general_sinav_tarihleri')
		->result();
		
	}

	public function GetSinavTarihleriNum()
	{
		return $this->db
		->get('general_sinav_tarihleri')
		->num_rows();
	}

	public function AddSinavTarihleri($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul'				=>$CData['Okul'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_sinav_tarihleri', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditSinavTarihleri(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_sinav_tarihleri');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateSinavTarihleri($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
	    $No = $this->input->post('No');
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_AnaResim'		=>$this->input->post('tr_AnaResim'),
			'tr_DigerResimler'	=>$CData['tr_DigerResimler'],
			'tr_Yazi'			=>$this->input->post('tr_Yazi'),
			'tr_SectionID'		=>$CData['tr_SectionID'],

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_AnaResim'		=>$this->input->post('en_AnaResim'),
			'en_DigerResimler'	=>$CData['en_DigerResimler'],
			'en_Yazi'			=>$this->input->post('en_Yazi'),
			'en_SectionID'		=>$CData['en_SectionID'],

			'Okul'				=>$CData['Okul'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_sinav_tarihleri', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}



	function DeleteSinavTarihleri(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_sinav_tarihleri');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}







	/*
		=====================================
		  ------- Aylık Yemek Listesi -----
		=====================================
	*/
	public function GetAylikYemekListesi()
	{
		// $query = $this->db
		// ->order_by('Tarih','desc')
		// ->get('general_aylikyemeklistesi')
		// ->result();

		// $i = 1;
		// foreach ($query as $item) {
		// 	$okulKodu = '';
			// $tr_okul = explode(',', $item->tr_Okul);
			// for ($k=0; $k < sizeof($tr_okul); $k++) { 
		// 		if ($tr_okul[$k] == "Anaokulu") {
		// 			$okulKodu = $okulKodu."0,";
		// 		}
		// 		if ($tr_okul[$k] == "İlkokul") {
		// 			$okulKodu = $okulKodu."1,";
		// 		}
		// 		if ($tr_okul[$k] == "Ortaokul") {
		// 			$okulKodu = $okulKodu."2,";
		// 		}
		// 		if ($tr_okul[$k] == "Anadolu Lisesi") {
		// 			$okulKodu = $okulKodu."3,";
		// 		}
		// 	}
		// 	$okulKodu = preg_replace('/,[^,]*$/', '', $okulKodu);
		//   	$field = array(
		// 			  'Okul_Kodu'   =>$okulKodu,
		// 			);
		// 	$this->db->where('No', $item->No);
		// 	$this->db->update('general_aylikyemeklistesi', $field);
		// 	$i++;
		// }

		return $this->db
		->order_by('Tarih','desc')
		->get('general_aylikyemeklistesi')
		->result();
	}

	public function GetAylikYemekListesiNum()
	{
		return $this->db
		->get('general_aylikyemeklistesi')
		->num_rows();
	}

	public function EditAylikYemekListesi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_aylikyemeklistesi');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function AddAylikYemekListesi($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_Resim'			=>$this->input->post('tr_Resim'),

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_Resim'			=>$this->input->post('en_Resim'),

			'Okul'				=>$CData['Okul'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_aylikyemeklistesi', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateAylikYemekListesi($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Baslik'			=>$this->input->post('tr_Baslik'),
			'tr_Resim'			=>$this->input->post('tr_Resim'),

			'en_Baslik'			=>$this->input->post('en_Baslik'),
			'en_Resim'			=>$this->input->post('en_Resim'),

			'Okul'				=>$CData['Okul'],
			'Tarih'				=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_aylikyemeklistesi', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	function DeleteAylikYemekListesi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_aylikyemeklistesi');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}




	/*
		=====================================
		  ------- Sınav Etkinlik ----------
		=====================================
	*/
	public function GetSinavEtkinlik()
	{
		return $this->db
		->order_by('Tarih','desc')
		->get('general_sinav_etkinlik')
		->result();
	}

	public function GetSinavEtkinlikNum()
	{
		return $this->db
		->get('general_sinav_etkinlik')
		->num_rows();
	}

	public function EditSinavEtkinlik(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_sinav_etkinlik');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function AddSinavEtkinlik($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Ad'			=>$this->input->post('tr_Ad'),
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			'tr_Ders'		=>$this->input->post('tr_Ders'),

			'en_Ad'			=>$this->input->post('en_Ad'),
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			'en_Ders'		=>$this->input->post('en_Ders'),

			'Sinif'			=>$this->input->post('Sinif'),
			'Sube'			=>$CData['Sube'],
			'Tarih'			=>$this->input->post('Tarih'),
			'SinavEtkinlik'	=>$this->input->post('SinavEtkinlik'),
		);
		$this->db->insert('general_sinav_etkinlik', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateSinavEtkinlik($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Ad'			=>$this->input->post('tr_Ad'),
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			'tr_Ders'		=>$this->input->post('tr_Ders'),

			'en_Ad'			=>$this->input->post('en_Ad'),
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			'en_Ders'		=>$this->input->post('en_Ders'),

			'Sinif'			=>$this->input->post('Sinif'),
			'Sube'			=>$CData['Sube'],
			'Tarih'			=>$this->input->post('Tarih'),
			'SinavEtkinlik'	=>$this->input->post('SinavEtkinlik'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_sinav_etkinlik', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	function DeleteSinavEtkinlik(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_sinav_etkinlik');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}




	/*
		=====================================
		  ------- Sınav Takvimi -----------
		=====================================
	*/
	public function GetSinavTakvimi()
	{

		// $query = $this->db
		// ->order_by('Tarih','asc')
		// ->get('general_sinav_takvimi')
		// ->result();


		// $i = 0;
		// foreach ($query as $item) {
		// 	$subes = explode(',', $item->Sube);
		// 	if (sizeof($subes) > 1) {
		// 		$newString = '';
		// 		$willUpdate = false;
		// 		for ($k=0; $k < sizeof($subes); $k++) {
		// 			if ($subes[$k] == $subes[$k+1]) {
		// 				$newString .= $subes[$k].',';
		// 				// $k++;
		// 				$willUpdate = true;
		// 			} else {
		// 				$newString .= $subes[$k].',';
		// 			}
		// 		}

		// 		$newString = preg_replace('/,[^,]*$/', '', $newString);

		// 		if ($willUpdate) {
		// 			$updateRecord = array(
		// 				// 'Okul_Kodu'   	=> $newString,
		// 				'Sube'   		=> $newString,
		// 			);
		// 			$No = $item->No;
		// 			$this->db->where('No', $No);
		// 			$this->db->update('general_sinav_takvimi', $updateRecord);
		// 			$this->db->trans_complete();
		// 		}
		// 	}
		// }


		// $i = 0;

		// foreach ($query as $item) {
		// 	$row1 = $query[$i];
		// 	$row2 = $query[$i+1];
		// 	if ($row1->Tarih == $row2->Tarih && $row1->tr_Aciklama == $row2->tr_Aciklama) {
		// 		$newRecord = array(
		// 			  'Okul_Kodu'   	=> $row1->Okul_Kodu.','.$row2->Okul_Kodu,
		// 			  'tr_Aciklama'   	=> $row1->tr_Aciklama,
		// 			  'en_Aciklama'   	=> $row1->en_Aciklama,
		// 			  'Sube'   			=> $row1->Sube.','.$row2->Sube,
		// 			  'Tarih'   		=> $row1->Tarih,
		// 			  'Yil'   			=> $row1->Yil,
		// 			  'tr_Ders'   		=> $row1->tr_Ders,
		// 			  'en_Ders'   		=> $row1->en_Ders,
		// 		);

		// 		$No = $row1->No;
		// 		$this->db->where('No', $No);
		// 		$this->db->delete('general_sinav_takvimi');
		// 		if($this->db->affected_rows() > 0){}

		// 		$No2 = $row2->No;
		// 		$this->db->where('No', $No2);
		// 		$this->db->delete('general_sinav_takvimi');
		// 		if($this->db->affected_rows() > 0){}

		// 		$this->db->insert('general_sinav_takvimi', $newRecord);
		// 		if($this->db->affected_rows() > 0){}
		// 		$i = $i + 2;
		// 	} else {
		// 		$i++;
		// 	}
		// }

		// $query2 = $this->db
		// 	->order_by('Tarih','asc')
		// 	->get('general_sinav_takvimi')
		// 	->result();
		

		// return sizeof($query2);

		return $this->db
		->order_by('Tarih','desc')
		->get('general_sinav_takvimi')
		->result();
	}

	public function GetSinavTakvimiNum()
	{
		return $this->db
		->get('general_sinav_takvimi')
		->num_rows();
	}

	public function EditSinavTakvimi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_sinav_takvimi');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function AddSinavTakvimi($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			
			'Sube'			=>$CData['Sube'],
			'Okul'			=>$this->input->post('Okul'),
			'Yil'			=>$this->input->post('Yil'),
			'Tarih'			=>$this->input->post('Tarih'),
			'Ders'			=>$this->input->post('Ders'),
		);
		$this->db->insert('general_sinav_takvimi', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateSinavTakvimi($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			
			'Sube'			=>$CData['Sube'],
			'Okul'			=>$this->input->post('Okul'),
			'Yil'			=>$this->input->post('Yil'),
			'Tarih'			=>$this->input->post('Tarih'),
			'Ders'			=>$this->input->post('Ders'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_sinav_takvimi', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	function DeleteSinavTakvimi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_sinav_takvimi');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}






	/*
		=====================================
		  ------- İletişim -----------
		=====================================
	*/
	public function GetIletisim()
	{
		return $this->db
		->order_by('ListOrder','asc')
		->get('general_iletisim')
		->result();
	}

	public function GetIletisimNum()
	{
		return $this->db
		->get('general_iletisim')
		->num_rows();
	}

	public function EditIletisim(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_iletisim');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function AddIletisim($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			
			'Sube'			=>$CData['Sube'],
			'Okul_Kodu'		=>$this->input->post('Okul_Kodu'),
			'Yil'			=>$this->input->post('Yil'),
			'Tarih'			=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_iletisim', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateIletisim($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			
			'Sube'			=>$CData['Sube'],
			'Okul_Kodu'		=>$this->input->post('Okul_Kodu'),
			'Yil'			=>$this->input->post('Yil'),
			'Tarih'			=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_iletisim', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	function DeleteIletisim(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_iletisim');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}







	/*
		=====================================
		  ------------- Aylar -------------
		=====================================
	*/
	public function GetAylar()
	{
		return $this->db
		->order_by('No','asc')
		->get('genel_aylar')
		->result();
	}

	public function GetAylarNum()
	{
		return $this->db
		->get('genel_aylar')
		->num_rows();
	}





	/*
		=====================================
		  ------------ Sınıflar -----------
		=====================================
	*/
	public function GetSiniflar()
	{
		return $this->db
		->order_by('Kod','asc')
		->get('genel_siniflar')
		->result();
	}

	public function GetSiniflarNum()
	{
		return $this->db
		->get('genel_siniflar')
		->num_rows();
	}




	/*
		=====================================
		  ------------- Subeler -------------
		=====================================
	*/
	public function GetSubeler()
	{
		return $this->db
		->order_by('Sinif','asc')
		->get('genel_subeler')
		->result();
	}

	public function GetSubelerNum()
	{
		return $this->db
		->get('genel_subeler')
		->num_rows();
	}





	/*
		=====================================
		  ------------- Dersler -------------
		=====================================
	*/
	public function GetDersler()
	{
		return $this->db
		->order_by('No','asc')
		->get('genel_dersler')
		->result();
	}

	public function GetDerslerNum()
	{
		return $this->db
		->get('genel_dersler')
		->num_rows();
	}





	/*
		=====================================
		  ----------- Cinsiyetler ---------
		=====================================
	*/
	public function GetCinsiyetler()
	{
		return $this->db
		->order_by('No','asc')
		->get('genel_cinsiyetler')
		->result();
	}

	public function GetCinsiyetlerNum()
	{
		return $this->db
		->get('genel_cinsiyetler')
		->num_rows();
	}







	/*
		=====================================
		  ------- Etkinlik Takvimi --------
		=====================================
	*/
	public function GetEtkinlikTakvimi()
	{
		return $this->db
		->order_by('Tarih','desc')
		->get('general_etkinlik_takvimi')
		->result();
	}

	public function GetEtkinlikTakvimiNum()
	{
		return $this->db
		->get('general_etkinlik_takvimi')
		->num_rows();
	}

	public function EditEtkinlikTakvimi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_etkinlik_takvimi');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function AddEtkinlikTakvimi($CData){
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			
			'Sube'			=>$CData['Sube'],
			'Okul'			=>$this->input->post('Okul'),
			'Tarih'			=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_etkinlik_takvimi', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function UpdateEtkinlikTakvimi($CData){
		$No = $this->input->post('No');
		foreach ($CData as $key => $value) {
	       	if (is_null($value)) {
	            $CData[$key] = "";
	        }
	    }
		$Data = array(
			'tr_Aciklama'	=>$this->input->post('tr_Aciklama'),
			'en_Aciklama'	=>$this->input->post('en_Aciklama'),
			
			'Sube'			=>$CData['Sube'],
			'Okul'			=>$this->input->post('Okul'),
			'Tarih'			=>$this->input->post('Tarih'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_etkinlik_takvimi', $Data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE)
		{
			return false;
		} else {
			return true;
		}
	}

	function DeleteEtkinlikTakvimi(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_etkinlik_takvimi');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}








	/*
		=====================================
		  ----------- Nav Yan -----------
		=====================================
	*/
	public function GetNavYan()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('nav_yan')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('nav_yan', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('nav_yan')
		->result();
	}







	/*
		=====================================
		  ----------- Nav Ust -----------
		=====================================
	*/
	public function GetNavUst()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('nav_ust')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('nav_ust', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('nav_ust')
		->result();
	}






	/*
		=====================================
		  ----------- Nav Ust Sub -----------
		=====================================
	*/
	public function GetNavUstSub()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('nav_ust_sub')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('nav_ust_sub', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('nav_ust_sub')
		->result();
	}

	/*
		=====================================
		  -------- Nav Ust Sub Sub --------
		=====================================
	*/
	public function GetNavUstSubSub()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('nav_ust_sub_sub')
		->result();

		$i = 1;
		foreach ($query as $item) {
		  $field = array(
		  'ListOrder'   =>$i,
		  );
		  $this->db->where('No', $item->No);
		  $this->db->update('nav_ust_sub_sub', $field);
		  $i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('nav_ust_sub_sub')
		->result();
	}





	/*
		=====================================
		  ----------- Kullanıcılar --------
		=====================================
	*/
	public function GetKullanicilar()
	{
		return $this->db
		->order_by('user_last_login','desc')
		->get('general_kullanicilar')
		->result();
	}

	public function GetKullaniciWEmail($Email)
	{
		return $this->db
		->where('Email', $Email)
		->order_by('user_last_login','desc')
		->get('general_kullanicilar')
		->row();
	}

	public function GetKullaniciWTCNo($TCNo)
	{
		return $this->db
		->where('TCNo', $TCNo)
		->order_by('user_last_login','desc')
		->get('general_kullanicilar')
		->row();
	}

	public function GetKullanicilarNum()
	{
		return $this->db
		->get('general_kullanicilar')
		->num_rows();
	}

	public function EditKullanici(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_kullanicilar');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}




	/*
		=====================================
		  ----------- Okullar -----------
		=====================================
	*/
	public function GetOkullar()
	{
		return $this->db
		->order_by('No','asc')
		->get('genel_okullar')
		->result();
	}





	/*
		=====================================
		  ----------- Gunler -----------
		=====================================
	*/
	public function GetGunler()
	{
		return $this->db
		->order_by('No','asc')
		->get('genel_gunler')
		->result();
	}







	/*
	public function GetDuyurular()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_duyurular')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('general_duyurular', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_duyurular')
		->result();
	}

	public function GetDuyurularNum()
	{
		return $this->db
		->get('general_duyurular')
		->num_rows();
	}

	public function AddDuyuru(){

		$num = $this->db
		->get('general_duyurular')
		->num_rows();

		$Data = array(
			'ListOrder'		=>  $num+1,

			'tr_Baslik'		=>$this->input->post('tr_Baslik'),
			'tr_Resim'		=>$this->input->post('tr_Resim'),
			'tr_Bas_Tarihi'		=>$this->input->post('tr_Bas_Tarihi'),
			'tr_Bit_Tarihi'	=>$this->input->post('tr_Bit_Tarihi'),
			'tr_Link'	=>$this->input->post('tr_Link'),

			'en_Baslik'		=>$this->input->post('en_Baslik'),
			'en_Resim'		=>$this->input->post('en_Resim'),
			'en_Bas_Tarihi'		=>$this->input->post('en_Bas_Tarihi'),
			'en_Bit_Tarihi'	=>$this->input->post('en_Bit_Tarihi'),
			'en_Link'	=>$this->input->post('en_Link'),
		);
		$this->db->insert('general_duyurular', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteDuyuru(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_duyurular');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditDuyuru(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_duyurular');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateDuyuru(){
		$No = $this->input->post('No');
		$field = array(
			'tr_Baslik'		=>$this->input->post('tr_Baslik'),
			'tr_Resim'		=>$this->input->post('tr_Resim'),
			'tr_Bas_Tarihi'		=>$this->input->post('tr_Bas_Tarihi'),
			'tr_Bit_Tarihi'	=>$this->input->post('tr_Bit_Tarihi'),
			'tr_Link'	=>$this->input->post('tr_Link'),

			'en_Baslik'		=>$this->input->post('en_Baslik'),
			'en_Resim'		=>$this->input->post('en_Resim'),
			'en_Bas_Tarihi'		=>$this->input->post('en_Bas_Tarihi'),
			'en_Bit_Tarihi'	=>$this->input->post('en_Bit_Tarihi'),
			'en_Link'	=>$this->input->post('en_Link'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_duyurular', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function UpDuyuru(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('general_duyurular', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_duyurular', $field);
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

	public function DownDuyuru(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('general_duyurular', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_duyurular', $field);
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
	*/




	/*
		=====================================
		  ------------ POPUP --------------
		=====================================
	*/
	public function GetPopup()
	{
		return $this->db
		->order_by('BasSaat','asc')
		->get('general_popup')
		->result();
	}

	public function AddPopup(){
		$Data = array(
			'BasSaat'			=>$this->input->post('BasSaat'),
			'BitSaat'			=>$this->input->post('BitSaat'),
			'Resim'				=>$this->input->post('Resim'),
		);
		$this->db->insert('general_popup', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditPopup(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_popup');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdatePopup(){
	    $No = $this->input->post('No');
		$Data = array(
			'BasSaat'			=>$this->input->post('BasSaat'),
			'BitSaat'			=>$this->input->post('BitSaat'),
			'Resim'				=>$this->input->post('Resim'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_popup', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}



	function DeletePopup(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_popup');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}





	/*
		=====================================
		  ------------ Resimler -----------
		=====================================
	*/
	public function GetResimler()
  {
    return $this->db
    ->order_by("No","desc")
    ->get('genel_resimler')
    ->result();
  }

  public function GetResimlerNum()
  {
    return $this->db
    ->get('genel_resimler')
    ->num_rows();
  }

  public function GetResimlerWhereKategoriler($where)
  {
	return $this->db
	->where('Kategori',$where)
	->order_by('No','desc')
	->get('genel_resimler')
	->result();
  }

  public function AddResimler($array){
    $this->db->insert("genel_resimler", $array);
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }

  }

  function DeleteResimler(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $this->db->delete('genel_resimler');
    if($this->db->affected_rows() > 0){
      return true;
    }else{
      return false;
    }
  }

  public function EditResimler(){
    $No = $this->input->post('No');
    $this->db->where('No', $No);
    $query = $this->db->get('genel_resimler');
    if($query->num_rows() > 0){
      return $query->row();
    }else{
      return false;
    }
  }

  public function UpdateResimler($data){
    $No = $this->input->post('No');
    $Kategoriler = $this->input->post('RKategoriler');
    $Isim = $data['Isim'];

    $query = $this->db
    ->where('No', $No)
    ->get('genel_resimler')
    ->result();

    foreach ($query as $item) {
      $ext = strtolower(pathinfo($item->RDosya, PATHINFO_EXTENSION));
      
      $Dosya = $data['DIsim'].'.'.$ext;

      $field = array(
      'RIsim'      =>$Isim,
      'RKategoriler'    =>$Kategoriler,
      'RDosya'     =>$Dosya,
      );
      $this->db->where('No', $No);
      $this->db->update('genel_resimler', $field);
      if($this->db->affected_rows() > 0){
        
        return rename('resources/images/'.$item->RKategoriler.'/'.$item->RDosya, 'resources/images/'.$Kategoriler.'/'.$Dosya);
      }else{
        return 'its false';
      }
    }
  }





	/*
		=====================================
		  ------------ Sections -----------
		=====================================
	*/
	public function GetSections()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_sections')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('general_sections', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_sections')
		->result();
	}

	public function GetSectionWithIsim($Isim)
	{
		return $this->db
		->where('Isim', $Isim)
		->get('general_sections')
		->result();
		
	}

	public function GetSectionsNum()
	{
		return $this->db
		->get('general_sections')
		->num_rows();
	}

	public function EditSection(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_sections');
		if($query->num_rows() > 0){
		  return $query->row();
		}else{
		  return false;
		}
	}

	public function UpSection(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('general_sections', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_sections', $field);
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

	public function DownSection(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('general_sections', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_sections', $field);
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

	public function ActiveSection(){
		$No = $this->input->post('No');
		$field = array(
		'Display'	=> 'block'
		);
		$this->db->where('No', $No);
		$this->db->update('general_sections', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function PassiveSection(){
		$No = $this->input->post('No');
		$field = array(
		'Display'	=> 'none'
		);
		$this->db->where('No', $No);
		$this->db->update('general_sections', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}





	/*
		=====================================
		  ------------ Email List ---------
		=====================================
	*/
	public function GetEmailList()
	{
		return $this->db
		->order_by('No','desc')
		->get('general_email_listesi')
		->result();
	}

	public function GetEmailListNum()
	{
		return $this->db
		->get('general_email_listesi')
		->num_rows();
	}

	public function AddEmailList(){
		$Data = array(
			'AdSoyad'		=>$this->input->post('AdSoyad'),
			'Email'			=>$this->input->post('Email'),
		);
		$this->db->insert('general_email_listesi', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function AddEmailWA($array){

		$num = $this->db
		->get('general_email_listesi')
		->num_rows();

		$Data = array(
			'Isim'		=>$array['Isim'],
			'Email'		=>$array['Email'],
		);
		$this->db->insert('general_email_listesi', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	function DeleteEmail(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_email_listesi');
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}

	public function EditEmail(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_email_listesi');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateEmail(){
		$No = $this->input->post('No');
		$field = array(
			'Isim'		=>$this->input->post('Isim'),
			'Email'		=>$this->input->post('Email'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_email_listesi', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}





	/*
		=====================================
		  ----------- Kategoriler ---------
		=====================================
	*/
	public function GetKategoriler()
	{
		$query = $this->db
		->order_by('ListOrder','asc')
		->get('general_kategoriler')
		->result();

		$i = 1;
		foreach ($query as $item) {
			$field = array(
			'ListOrder'		=>$i,
			);
			$this->db->where('No', $item->No);
			$this->db->update('general_kategoriler', $field);
			$i++;
		}

		return $this->db
		->order_by('ListOrder','asc')
		->get('general_kategoriler')
		->result();
	}

	public function GetKategorilerNum()
	{
		return $this->db
		->get('general_kategoriler')
		->num_rows();
	}

	public function AddKategori($Isim){
		$num = $this->db
		->get('general_kategoriler')
		->num_rows();

		$Data = array(
			'Isim'			=> $Isim,
			'ListOrder'		=> $num+1,
			);
		$this->db->insert('general_kategoriler', $Data);
		if($this->db->affected_rows() > 0){
			return is_dir($path) || mkdir('resources/images/'.$Isim, 0777, true);
		}else{
			return false;
		}
	}

	function DeleteKategori(){
		$No = $this->input->post('No');
		$Isim = $this->input->post('Isim');
		$this->db->where('No', $No);
		$this->db->delete('general_kategoriler');
		if($this->db->affected_rows() > 0){
			rmdir('resources/images/'.$Isim.'/');
			return true;
		}else{
			return false;
		}
	}

	public function EditKategori(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_kategoriler');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateKategori($Isim){
		$No = $this->input->post('No');

		$query = $this->db
		->where('No', $No)
		->get('general_kategoriler')
		->result();

		foreach ($query as $item) {

			$field = array(
			'Isim'			=>$Isim,
			);
			$this->db->where('No', $No);
			$this->db->update('general_kategoriler', $field);
			if($this->db->affected_rows() > 0){
				rename('resources/images/'.$item->Isim, 'resources/images/'.$Isim);
				return true;
			}else{
				return false;
			}
		}

	}

	public function UpKategori(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder-1);
		$this->db->update('general_kategoriler', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder-1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_kategoriler', $field);
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

	public function DownKategori(){
		$No = $this->input->post('No');
		$ListOrder = $this->input->post('ListOrder');

		$field = array(
			'ListOrder'			=>$ListOrder,
		);
		$this->db->where('No !=', $No);
		$this->db->where('ListOrder', $ListOrder+1);
		$this->db->update('general_kategoriler', $field);
		if($this->db->affected_rows() > 0){
			$field = array(
				'ListOrder'			=>$ListOrder+1,
			);
			$this->db->where('No', $No);
			$this->db->where('ListOrder', $ListOrder);
			$this->db->update('general_kategoriler', $field);
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
		  ------------ Basliklar -----------
		=====================================
	*/
	public function GetBasliklar()
	{
		return $this->db
		->order_by('tr_Baslik')
		->get('genel_basliklar')
		->result();
	}

	public function GetBasliklarNum()
	{
		return $this->db
		->get('genel_basliklar')
		->num_rows();
	}

	public function GetBasliklarWVK($VerifyKey)
	{
		return $this->db
		->where('VerifyKey', $VerifyKey)
		->get('genel_basliklar')
		->row();
	}

	public function EditBasliklar(){
		$VerifyKey = $this->input->post('VerifyKey');
		$this->db->where('VerifyKey', $VerifyKey);
		$query = $this->db->get('genel_basliklar');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function EditBasliklarNo(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('genel_basliklar');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateBaslik()
	{
		$No = $this->input->post('No');
		$field = array(
		'tr_Baslik'		=>$this->input->post('tr_Baslik'),
		'en_Baslik'		=>$this->input->post('en_Baslik'),
		);
		$this->db->where('No', $No);
		$this->db->update('genel_basliklar', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}





	/*
		=====================================
		  ------------ Footer -------------
		=====================================
	*/
	public function GetFooter()
	{
		return $this->db
		->get('general_footer')
		->row();
	}

	public function EditFooter(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_footer');
		if($query->num_rows() > 0){
			return $query->row();
		}else{
			return false;
		}
	}

	public function UpdateFooter(){
		$No = $this->input->post('No');
		$field = array(
			'tr_Tel1'		=>$this->input->post('tr_Tel1'),
			'tr_Tel2'		=>$this->input->post('tr_Tel2'),
			'tr_Email'		=>$this->input->post('tr_Email'),
			'tr_Adres'		=>$this->input->post('tr_Adres'),
			'tr_Facebook'	=>$this->input->post('tr_Facebook'),
			'tr_Twitter'	=>$this->input->post('tr_Twitter'),
			'tr_Youtube'	=>$this->input->post('tr_Youtube'),
			'tr_Instagram'	=>$this->input->post('tr_Instagram'),

			'en_Tel1'		=>$this->input->post('en_Tel1'),
			'en_Tel2'		=>$this->input->post('en_Tel2'),
			'en_Email'		=>$this->input->post('en_Email'),
			'en_Adres'		=>$this->input->post('en_Adres'),
			'en_Facebook'	=>$this->input->post('en_Facebook'),
			'en_Twitter'	=>$this->input->post('en_Twitter'),
			'en_Youtube'	=>$this->input->post('en_Youtube'),
			'en_Instagram'	=>$this->input->post('en_Instagram'),
		);
		$this->db->where('No', $No);
		$this->db->update('general_footer', $field);
		if($this->db->affected_rows() > 0){
			return true;
		}else{
			return false;
		}
	}


}