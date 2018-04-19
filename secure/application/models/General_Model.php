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
		  ----------- AtaturkKosesi -----------
		=====================================
	*/
		public function GetAtaturkKosesi()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_ataturkkosesi')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_ataturkkosesi', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_ataturkkosesi')
			->result();
		}

		public function GetAtaturkKosesiNum()
		{
			return $this->db
			->get('general_ataturkkosesi')
			->num_rows();
		}

		public function AddAtaturkKosesi($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_ataturkkosesi', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditAtaturkKosesi($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_ataturkkosesi');
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
				$query = $this->db->get('general_ataturkkosesi');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateAtaturkKosesi($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_ataturkkosesi', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteAtaturkKosesi(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_ataturkkosesi');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpAtaturkKosesi(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_ataturkkosesi', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ataturkkosesi', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownAtaturkKosesi(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_ataturkkosesi', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ataturkkosesi', $field);
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

		public function AddNavbarF($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}

		// $Data = array(
			// 'tr_Ad'				=>$this->input->post('tr_Ad'),
			// 'en_Ad'				=>$this->input->post('en_Ad'),
			// 'IsLink'			=>$CData['IsLink'],
			// 'IsLinkInBaseurl'	=>$CData['IsLinkInBaseurl'],
			// 'Link'				=>$CData['Link'],
			// 'Level'				=>$this->input->post('Level'),
			// 'MainSectionID'		=>$CData['MainSectionID'],
			// 'SubSectionID'		=>$CData['SubSectionID'],
		// );
			$Data = array(
				'tr_Ad'				=>$this->input->post('tr_Ad'),
				'en_Ad'				=>$this->input->post('en_Ad'),
				'IsLink'			=>$CData['IsLink'],
				'IsLinkInBaseurl'	=>$CData['IsLinkInBaseurl'],
				'Link'				=>$CData['Link'],
				'Level'				=>$this->input->post('Level'),
				'MainSectionID'		=>$CData['MainSectionID'],
				'SubSectionID'		=>$CData['SubSectionID'],
			);
			$this->db->insert('general_navbar_front', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditNavbarF($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_navbar_front');
				$num = $query->num_rows();
				if ($num > 1) {
					return $query->row();
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
				$query = $this->db->get('general_navbar_front');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateNavbarF($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Ad'				=>$this->input->post('tr_Ad'),
				'en_Ad'				=>$this->input->post('en_Ad'),
				'IsLink'			=>$CData['IsLink'],
				'IsLinkInBaseurl'	=>$CData['IsLinkInBaseurl'],
				'Link'				=>$CData['Link'],
				'Level'				=>$this->input->post('Level'),
				'MainSectionID'		=>$CData['MainSectionID'],
				'SubSectionID'		=>$CData['SubSectionID'],
			);
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->update('general_navbar_front', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteNavbarF(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_navbar_front');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpNavbarF(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_navbar_front', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_navbar_front', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownNavbarF(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_navbar_front', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_navbar_front', $field);
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

		public function AddCivogt(){
			$Data = array(
				'Yil'					=>$this->input->post('Yil'),
				'Donem'					=>$this->input->post('Donem'),
				'Okul'					=>$this->input->post('Okul'),
				'Ders'					=>$this->input->post('Ders'),
				'Sinif'					=>$this->input->post('Sinif'),
				'Sube'					=>$this->input->post('Sube'),
				'Gun'					=>$this->input->post('Gun'),
				'Saat'					=>$this->input->post('Saat'),
			);
			$this->db->insert('general_civogt', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function UpdateCivogt(){
			$No = $this->input->post('No');
			$Data = array(
				'Yil'					=>$this->input->post('Yil'),
				'Donem'					=>$this->input->post('Donem'),
				'Okul'					=>$this->input->post('Okul'),
				'Ders'					=>$this->input->post('Ders'),
				'Sinif'					=>$this->input->post('Sinif'),
				'Sube'					=>$this->input->post('Sube'),
				'Gun'					=>$this->input->post('Gun'),
				'Saat'					=>$this->input->post('Saat'),
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
		  ----------- DuyurularEtkinlikler -----------
		=====================================
	*/
		public function GetDuyurularEtkinlikler()
		{
			return $this->db
			->order_by('Tarih','desc')
			->get('general_duyurularetkinlikler')
			->result();
		}

		public function GetDuyurularEtkinliklerNum()
		{
			return $this->db
			->get('general_duyurularetkinlikler')
			->num_rows();
		}

		public function GetDuyuruEtkinlikWTrSectionID($TrSectionID)
		{
			return $this->db
			->where('tr_SectionID', $TrSectionID)
			->get('general_duyurularetkinlikler')
			->row();
		}

		public function GetDuyuruEtkinlikWEnSectionID($EnSectionID)
		{
			return $this->db
			->where('en_SectionID', $EnSectionID)
			->get('general_duyurularetkinlikler')
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

				'Okul'				=>$CData['Okul'],
				'Tarih'				=>$this->input->post('Tarih'),
			);
			$this->db->insert('general_duyurularetkinlikler', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditDuyurularEtkinlikler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_duyurularetkinlikler');
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

				'Okul'				=>$CData['Okul'],
				'Tarih'				=>$this->input->post('Tarih'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_duyurularetkinlikler', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		function DeleteDuyurularEtkinlikler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_duyurularetkinlikler');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}






	/*
		=====================================
		  ----------- Pozisyon -----------
		=====================================
	*/
		public function GetPozisyon()
		{
			return $this->db
			->order_by('tr_Ad','asc')
			->get('general_pozisyon')
			->result();
		}

		public function AddPozisyon($CData){
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
			$this->db->insert('general_pozisyon', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditPozisyon(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_pozisyon');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdatePozisyon($CData){
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
			$this->db->update('general_pozisyon', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		function DeletePozisyon(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_pozisyon');
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

				'Okul'				=>$CData['Okul'],
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

				'Okul'				=>$CData['Okul'],
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
		  ----------- Eovtc -----------
		=====================================
	*/
		public function GetEovtc()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_eovtc')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_eovtc', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_eovtc')
			->result();
		}

		public function GetEovtcNum()
		{
			return $this->db
			->get('general_eovtc')
			->num_rows();
		}

		public function AddEovtc($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_eovtc', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditEovtc($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_eovtc');
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
				$query = $this->db->get('general_eovtc');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateEovtc($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_eovtc', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteEovtc(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_eovtc');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpEovtc(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_eovtc', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_eovtc', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownEovtc(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_eovtc', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_eovtc', $field);
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
		  ----------- Hakkimizda -----------
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

		public function AddHakkimizda(){
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->insert('general_hakkimizda', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditHakkimizda($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_hakkimizda');
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
				$query = $this->db->get('general_hakkimizda');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateHakkimizda(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_hakkimizda', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteHakkimizda(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_hakkimizda');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpHakkimizda(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_hakkimizda', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_hakkimizda', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownHakkimizda(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_hakkimizda', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_hakkimizda', $field);
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
		  ----------- SinavYonergeleri -----------
		=====================================
	*/
		public function GetSinavYonergeleri()
		{
			return $this->db
			->order_by('No','asc')
			->get('general_sinavyonergeleri')
			->result();
		}

		public function GetSinavYonergeleriNum()
		{
			return $this->db
			->get('general_sinavyonergeleri')
			->num_rows();
		}

		public function EditSinavYonergeleri(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_sinavyonergeleri');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdateSinavYonergeleri(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Ilkokul'			=>$this->input->post('tr_Ilkokul'),
				'tr_Ortaokul'			=>$this->input->post('tr_Ortaokul'),
				'tr_Lise'				=>$this->input->post('tr_Lise'),
				'en_Ilkokul'			=>$this->input->post('en_Ilkokul'),
				'en_Ortaokul'			=>$this->input->post('en_Ortaokul'),
				'en_Lise'				=>$this->input->post('en_Lise'),
				'tr_IGIIlkokul'			=>$this->input->post('tr_IGIIlkokul'),
				'tr_IGIOrtaokul'		=>$this->input->post('tr_IGIOrtaokul'),
				'tr_IGILise'			=>$this->input->post('tr_IGILise'),
				'en_IGIIlkokul'			=>$this->input->post('en_IGIIlkokul'),
				'en_IGIOrtaokul'		=>$this->input->post('en_IGIOrtaokul'),
				'en_IGILise'			=>$this->input->post('en_IGILise'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_sinavyonergeleri', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}







	/*
		=====================================
		  ----------- Bolumler -----------
		=====================================
	*/
		public function GetBolumler()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('genel_bolumler')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('genel_bolumler', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('genel_bolumler')
			->result();
		}

		public function GetBolumlerNum()
		{
			return $this->db
			->get('genel_bolumler')
			->num_rows();
		}

		public function AddBolumler(){
			$Data = array(
				'Kod'				=>$this->input->post('Kod'),
			);
			$this->db->insert('genel_bolumler', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditBolumler($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('genel_bolumler');
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
				$query = $this->db->get('genel_bolumler');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateBolumler(){
			$No = $this->input->post('No');
			$Data = array(
				'Kod'				=>$this->input->post('Kod'),
			);
			$this->db->where('No', $No);
			$this->db->update('genel_bolumler', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteBolumler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('genel_bolumler');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpBolumler(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('genel_bolumler', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('genel_bolumler', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownBolumler(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('genel_bolumler', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('genel_bolumler', $field);
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
		  ----------- Subeler -----------
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

		public function AddSubeler(){
			$Data = array(
				'Okul'			=>$this->input->post('Okul'),
				'Sinif'			=>$this->input->post('Sinif'),
				'Kod'			=>$this->input->post('Kod'),
			);
			$this->db->insert('genel_subeler', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditSubeler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('genel_subeler');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdateSubeler(){
			$No = $this->input->post('No');
			$Data = array(
				'Okul'			=>$this->input->post('Okul'),
				'Sinif'			=>$this->input->post('Sinif'),
				'Kod'			=>$this->input->post('Kod'),
			);
			$this->db->where('No', $No);
			$this->db->update('genel_subeler', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteSubeler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('genel_subeler');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}










	/*
		=====================================
		  ----------- Dersler -----------
		=====================================
	*/
		public function GetDersler()
		{
			return $this->db
			->order_by('No','desc')
			->get('genel_dersler')
			->result();
		}

		public function AddDersler($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Ad'				=>$this->input->post('tr_Ad'),
				'en_Ad'				=>$this->input->post('en_Ad'),
				'Kod'				=>$CData['Kod'],
			);
			$this->db->insert('genel_dersler', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditDersler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('genel_dersler');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdateDersler(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Ad'				=>$this->input->post('tr_Ad'),
				'en_Ad'				=>$this->input->post('en_Ad'),
				'Kod'				=>TurkceToIngilizce($this->input->post('tr_Ad')),
			);
			$this->db->where('No', $No);
			$this->db->update('genel_dersler', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteDersler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('genel_dersler');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}










	/*
		=====================================
		  ----------- Footer -----------
		=====================================
	*/
		public function GetFooter()
		{
			return $this->db
			->get('general_footer')
			->row();
		}

		public function GetFooterNum()
		{
			return $this->db
			->get('general_footer')
			->num_rows();
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
			$Data = array(
				'tr_Facebook'			=>$this->input->post('tr_Facebook'),
				'en_Facebook'			=>$this->input->post('en_Facebook'),
				'tr_Twitter'			=>$this->input->post('tr_Twitter'),
				'en_Twitter'			=>$this->input->post('en_Twitter'),
				'tr_Instagram'			=>$this->input->post('tr_Instagram'),
				'en_Instagram'			=>$this->input->post('en_Instagram'),
				'tr_Youtube'			=>$this->input->post('tr_Youtube'),
				'en_Youtube'			=>$this->input->post('en_Youtube'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_footer', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}








	/*
		=====================================
		  ----------- Iletisim -----------
		=====================================
	*/
		public function GetIletisim()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_iletisim')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_iletisim', $field);
				$i++;
			}

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

		public function EditIletisim($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_iletisim');
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
				$query = $this->db->get('general_iletisim');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateIletisim($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$No = $this->input->post('No');
			$Data = array(
				'Tel1'			=>$this->input->post('Tel1'),
				'Tel1D'			=>$CData['Tel1D'],
				'Tel2'			=>$this->input->post('Tel2'),
				'Tel2D'			=>$CData['Tel2D'],
				'Tel3'			=>$this->input->post('Tel3'),
				'Tel3D'			=>$CData['Tel3D'],
				'Email'			=>$this->input->post('Email'),
				'YolTarifi'		=>$this->input->post('YolTarifi'),
				'Maps'			=>$this->input->post('Maps'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_iletisim', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}








	/*
		=====================================
		  ----------- NedenAEK -----------
		=====================================
	*/
		public function GetNedenAEK()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_nedenaek')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_nedenaek', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_nedenaek')
			->result();
		}

		public function GetNedenAEKNum()
		{
			return $this->db
			->get('general_nedenaek')
			->num_rows();
		}

		public function AddNedenAEK(){
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->insert('general_nedenaek', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditNedenAEK($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_nedenaek');
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
				$query = $this->db->get('general_nedenaek');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateNedenAEK(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_nedenaek', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteNedenAEK(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_nedenaek');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpNedenAEK(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_nedenaek', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_nedenaek', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownNedenAEK(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_nedenaek', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_nedenaek', $field);
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
		  ----------- EgitimSistemimiz -----------
		=====================================
	*/
		public function GetEgitimSistemimiz()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_egitimsistemimiz')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_egitimsistemimiz', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_egitimsistemimiz')
			->result();
		}

		public function GetEgitimSistemimizNum()
		{
			return $this->db
			->get('general_egitimsistemimiz')
			->num_rows();
		}

		public function AddEgitimSistemimiz(){
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->insert('general_egitimsistemimiz', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditEgitimSistemimiz($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_egitimsistemimiz');
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
				$query = $this->db->get('general_egitimsistemimiz');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateEgitimSistemimiz(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_egitimsistemimiz', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteEgitimSistemimiz(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_egitimsistemimiz');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpEgitimSistemimiz(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_egitimsistemimiz', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_egitimsistemimiz', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownEgitimSistemimiz(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_egitimsistemimiz', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_egitimsistemimiz', $field);
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
		  ----------- KurucuMesaji -----------
		=====================================
	*/
		public function GetKurucuMesaji()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_kurucumesaji')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_kurucumesaji', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_kurucumesaji')
			->result();
		}

		public function GetKurucuMesajiNum()
		{
			return $this->db
			->get('general_kurucumesaji')
			->num_rows();
		}

		public function AddKurucuMesaji(){
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->insert('general_kurucumesaji', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditKurucuMesaji($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_kurucumesaji');
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
				$query = $this->db->get('general_kurucumesaji');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateKurucuMesaji(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Baslik'			=>$this->input->post('tr_Baslik'),
				'en_Baslik'			=>$this->input->post('en_Baslik'),
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_kurucumesaji', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteKurucuMesaji(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_kurucumesaji');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpKurucuMesaji(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_kurucumesaji', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_kurucumesaji', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownKurucuMesaji(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_kurucumesaji', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_kurucumesaji', $field);
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
		  ----------- A4x4 -----------
		=====================================
	*/
		public function GetA4x4()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_a4x4')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_a4x4', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_a4x4')
			->result();
		}

		public function GetA4x4Num()
		{
			return $this->db
			->get('general_a4x4')
			->num_rows();
		}

		public function AddA4x4(){
			$Data = array(
				'tr_Baslik'		=>$this->input->post('tr_Baslik'),
				'en_Baslik'		=>$this->input->post('en_Baslik'),
				'Resim'			=>$this->input->post('Resim'),
				'Link'			=>$this->input->post('Link'),
			);
			$this->db->insert('general_a4x4', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditA4x4($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_a4x4');
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
				$query = $this->db->get('general_a4x4');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateA4x4(){
			$No = $this->input->post('No');
			$Data = array(
				'tr_Baslik'		=>$this->input->post('tr_Baslik'),
				'en_Baslik'		=>$this->input->post('en_Baslik'),
				'Resim'			=>$this->input->post('Resim'),
				'Link'			=>$this->input->post('Link'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_a4x4', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteA4x4(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_a4x4');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpA4x4(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_a4x4', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_a4x4', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownA4x4(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_a4x4', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_a4x4', $field);
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
		  ----------- Banner -----------
		=====================================
	*/
		public function GetBanner()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_banner')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_banner', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_banner')
			->result();
		}

		public function GetBannerNum()
		{
			return $this->db
			->get('general_banner')
			->num_rows();
		}

		public function AddBanner(){
			$Data = array(
				'Resim'				=>$this->input->post('Resim'),
			);
			$this->db->insert('general_banner', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditBanner($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_banner');
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
				$query = $this->db->get('general_banner');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateBanner(){
			$No = $this->input->post('No');
			$Data = array(
				'Resim'				=>$this->input->post('Resim'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_banner', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteBanner(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_banner');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpBanner(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_banner', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_banner', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownBanner(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_banner', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_banner', $field);
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
		  ----------- Ipc -----------
		=====================================
	*/
		public function GetIpc()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_ipc')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_ipc', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_ipc')
			->result();
		}

		public function GetIpcNum()
		{
			return $this->db
			->get('general_ipc')
			->num_rows();
		}

		public function AddIpc($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_ipc', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditIpc($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_ipc');
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
				$query = $this->db->get('general_ipc');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateIpc($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_ipc', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteIpc(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_ipc');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpIpc(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_ipc', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ipc', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownIpc(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_ipc', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ipc', $field);
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
		  ----------- Ify -----------
		=====================================
	*/
		public function GetIfy()
		{
			return $this->db
			->order_by('No','asc')
			->get('general_ify')
			->result();
		}

		public function GetIfyToArray()
		{
			return $this->db
			->order_by('No','asc')
			->get('general_ify')
			->result_array();
		}

		public function GetIfyNum()
		{
			return $this->db
			->get('general_ify')
			->num_rows();
		}

		public function EditIfy(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_ify');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdateIfy(){
			$No = $this->input->post('No');
			$Data = array(
				'Link'			=>$this->input->post('Link'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_ify', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}








	/*
		=====================================
		  ----------- Aektv -----------
		=====================================
	*/
		public function GetAektv()
		{
			return $this->db
			->order_by('No','asc')
			->get('general_aektv')
			->result();
		}

		public function GetAektvToArray()
		{
			return $this->db
			->order_by('No','asc')
			->get('general_aektv')
			->result_array();
		}

		public function GetAektvNum()
		{
			return $this->db
			->get('general_aektv')
			->num_rows();
		}

		public function EditAektv(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_aektv');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdateAektv(){
			$No = $this->input->post('No');
			$Data = array(
				'Link'			=>$this->input->post('Link'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_aektv', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}








	/*
		=====================================
		  ----------- Yde -----------
		=====================================
	*/
		public function GetYde()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_yde')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_yde', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_yde')
			->result();
		}

		public function GetYdeNum()
		{
			return $this->db
			->get('general_yde')
			->num_rows();
		}

		public function AddYde($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_yde', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditYde($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_yde');
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
				$query = $this->db->get('general_yde');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateYde($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_yde', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteYde(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_yde');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpYde(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_yde', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_yde', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownYde(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_yde', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_yde', $field);
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
		  ----------- Basarilarimiz -----------
		=====================================
	*/
		public function GetBasarilarimiz()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_basarilarimiz')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_basarilarimiz', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_basarilarimiz')
			->result();
		}

		public function GetBasarilarimizNum()
		{
			return $this->db
			->get('general_basarilarimiz')
			->num_rows();
		}

		public function AddBasarilarimiz($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_basarilarimiz', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditBasarilarimiz($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_basarilarimiz');
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
				$query = $this->db->get('general_basarilarimiz');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateBasarilarimiz($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_basarilarimiz', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteBasarilarimiz(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_basarilarimiz');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpBasarilarimiz(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_basarilarimiz', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_basarilarimiz', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownBasarilarimiz(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_basarilarimiz', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_basarilarimiz', $field);
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
		  ----------- Ssk -----------
		=====================================
	*/
		public function GetSsk()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_ssk')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_ssk', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_ssk')
			->result();
		}

		public function GetSskNum()
		{
			return $this->db
			->get('general_ssk')
			->num_rows();
		}

		public function AddSsk($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_ssk', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditSsk($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_ssk');
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
				$query = $this->db->get('general_ssk');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateSsk($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_ssk', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteSsk(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_ssk');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpSsk(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_ssk', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ssk', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownSsk(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_ssk', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ssk', $field);
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
		  ----------- Ssp -----------
		=====================================
	*/
		public function GetSsp()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_ssp')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_ssp', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_ssp')
			->result();
		}

		public function GetSspNum()
		{
			return $this->db
			->get('general_ssp')
			->num_rows();
		}

		public function AddSsp($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_ssp', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditSsp($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_ssp');
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
				$query = $this->db->get('general_ssp');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateSsp($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_ssp', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteSsp(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_ssp');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpSsp(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_ssp', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ssp', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownSsp(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_ssp', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_ssp', $field);
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
		  ----------- UluslararasiProjeler -----------
		=====================================
	*/
		public function GetUluslararasiProjeler()
		{
			$query = $this->db
			->order_by('ListOrder','asc')
			->get('general_uluslararasiprojeler')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'   =>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('general_uluslararasiprojeler', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('general_uluslararasiprojeler')
			->result();
		}

		public function GetUluslararasiProjelerNum()
		{
			return $this->db
			->get('general_uluslararasiprojeler')
			->num_rows();
		}

		public function AddUluslararasiProjeler($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->insert('general_uluslararasiprojeler', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditUluslararasiProjeler($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('general_uluslararasiprojeler');
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
				$query = $this->db->get('general_uluslararasiprojeler');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateUluslararasiProjeler($CData){
			$No = $this->input->post('No');
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'tr_Aciklama'		=>$this->input->post('tr_Aciklama'),
				'en_Aciklama'		=>$this->input->post('en_Aciklama'),
				'Resim'				=>$CData['Resim'],
			);
			$this->db->where('No', $No);
			$this->db->update('general_uluslararasiprojeler', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteUluslararasiProjeler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_uluslararasiprojeler');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}

		public function UpUluslararasiProjeler(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('general_uluslararasiprojeler', $field);
			if($this->db->affected_rows() > 0) {
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_uluslararasiprojeler', $field);
				if($this->db->affected_rows() > 0) {
					return true;
				} else {
					return false;
				}
				
			} else {
				return false;
			}
		}

		public function DownUluslararasiProjeler(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('general_uluslararasiprojeler', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('general_uluslararasiprojeler', $field);
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
		  ----------- Settings -----------
		=====================================
	*/
		public function GetSettings()
		{
			return $this->db
			->order_by('No','asc')
			->get('genel_settings')
			->result();
		}

		public function GetSettingsNum()
		{
			return $this->db
			->get('genel_settings')
			->num_rows();
		}

		public function EditSettings(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('genel_settings');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdateSettings(){
			$ControllerName = $this->input->post('ControllerName');
			$Data = array(
				'Deger1'			=>$this->input->post('Deger1'),
				'Deger2'			=>$this->input->post('Deger2'),
				'Deger3'			=>$this->input->post('Deger3'),
				'Deger4'			=>$this->input->post('Deger4'),
				'Deger5'			=>$this->input->post('Deger5'),
			);
			$this->db->where('ControllerName', $ControllerName);
			$this->db->update('genel_settings', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function DeleteSettings(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('genel_settings');
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

		public function GetSinavBasvurusuToArray()
		{
			return $this->db
			->order_by('No','asc')
			->get('general_sinavbasvurusu')
			->result_array();
		}

		public function GetSinavBasvurusuDataByTarihAndTc($tarih, $tc)
		{
			$where = array('Tc' => $tc, 'SinavTarihi' => $tarih);
			return $this->db
			->order_by('No','asc')
			->where($where)
			->get('general_sinavbasvurusu')
			->row();
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
				'OOSinif'			=>$this->input->post('OOSinif'),
				'OOOkul'			=>$this->input->post('OOOkul'),
				'Bolum'				=>$this->input->post('Bolum'),
				'AnneAd'			=>$this->input->post('AnneAd'),
				'AnneTel'			=>$this->input->post('AnneTel'),
				'AnneEmail'			=>$this->input->post('AnneEmail'),
				'BabaAd'			=>$this->input->post('BabaAd'),
				'BabaTel'			=>$this->input->post('BabaTel'),
				'BabaEmail'			=>$this->input->post('BabaEmail'),
				'Tc'				=>$this->input->post('Tc'),
				'TarihBasvuru'		=>date("Y/m/d"),
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
				'OOSinif'			=>$this->input->post('OOSinif'),
				'OOOkul'			=>$this->input->post('OOOkul'),
				'Bolum'				=>$this->input->post('Bolum'),
				'AnneAd'			=>$this->input->post('AnneAd'),
				'AnneTel'			=>$this->input->post('AnneTel'),
				'BabaAd'			=>$this->input->post('BabaAd'),
				'BabaTel'			=>$this->input->post('BabaTel'),
				'Tc'				=>$this->input->post('Tc'),
				'TarihDuzeltme'		=>date("Y/m/d"),
				'TarihMail'			=>date("Y/m/d"),
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
			->get('general_sinavtarihleri')
			->result();

			$today = date("Y-m-d");
			$today_dt = new DateTime($today);
			foreach ($query as $item) {
				$records = $item->Tarih;
				$records_dt = new DateTime($records);

				if ($records_dt < $today_dt) {
					$No = $item->No;
					$this->db->where('No', $No);
					$this->db->delete('general_sinavtarihleri');
					if($this->db->affected_rows() > 0){}
				}
		}

		return $this->db
		->order_by('Tarih','desc')
		->get('general_sinavtarihleri')
		->result();
		
	}

	public function GetSinavTarihleriNum()
	{
		return $this->db
		->get('general_sinavtarihleri')
		->num_rows();
	}

	public function AddSinavTarihleri($CData){
		foreach ($CData as $key => $value) {
			if (is_null($value)) {
				$CData[$key] = "";
			}
		}
		$Data = array(
			'Sinif'			=>$CData['Sinif'],
			'Tarih'			=>$this->input->post('Tarih'),
		);
		$this->db->insert('general_sinavtarihleri', $Data);
		if($this->db->affected_rows() > 0){
			return true;
		} else{
			return false;
		}
	}

	public function EditSinavTarihleri(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$query = $this->db->get('general_sinavtarihleri');
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
		$Data = array(
			'Sinif'			=>$CData['Sinif'],
			'Tarih'			=>$this->input->post('Tarih'),
		);
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->update('general_sinavtarihleri', $Data);
		if ($this->db->trans_status() === FALSE) {
			return false;
		} else {
			return true;
		}
	}

	function DeleteSinavTarihleri(){
		$No = $this->input->post('No');
		$this->db->where('No', $No);
		$this->db->delete('general_sinavtarihleri');
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
				'Link'				=>$this->input->post('Link'),
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
				'Link'				=>$this->input->post('Link'),
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

		public function AddResimler($array){
			$this->db->insert_batch("genel_resimler", $array);
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

		public function UpdateResimler($data) {
			$No = $this->input->post('No');
			$Kategori = $this->input->post('RKategori');
			$Isim = $data['Isim'];

			$item = $this->db
			->where('No', $No)
			->get('genel_resimler')
			->row();

			$ext = pathinfo($item->RDosya, PATHINFO_EXTENSION);
			
			$Dosya = $data['FileName'].'.'.$ext;

			$field = array(
				'RIsim'      =>$Isim,
				'RKategori'    =>$Kategori,
				'RDosya'     =>$Dosya,
			);
			$this->db->where('No', $No);
			$this->db->update('genel_resimler', $field);
			if($this->db->affected_rows() > 0) {
				return rename('resources/images/'.$item->RKategori.'/'.$item->RDosya, 'resources/images/'.$Kategori.'/'.$Dosya);
			} else{
				return false;
			}
			
		}






   	/*
		=====================================
		  ----------- InsanKaynaklari -----------
		=====================================
	*/
		public function GetInsanKaynaklari()
		{
			return $this->db
			->order_by('BasTarihi','desc')
			->get('general_insankaynaklari')
			->result();
		}

		public function AddInsanKaynaklari($CData){
			foreach ($CData as $key => $value) {
				if (is_null($value)) {
					$CData[$key] = "";
				}
			}
			$Data = array(
				'AdSoyad'		=>$this->input->post('AdSoyad'),
				'DogumTarihi'	=>$this->input->post('DogumTarihi'),
				'Email'			=>$this->input->post('Email'),
				'Tel'			=>$this->input->post('Tel'),
				'AltTel'		=>$this->input->post('AltTel'),
				'Pozisyon'		=>$this->input->post('Pozisyon'),
				'Brans'			=>$this->input->post('Brans'),
				'MOO'			=>$this->input->post('MOO'),
				'OTS'			=>$this->input->post('OTS'),
				'DTS'			=>$this->input->post('DTS'),
				'YTS'			=>$this->input->post('YTS'),
				'Cv'			=>$CData['Cv'],
				'BasTarihi'		=>$CData['BasTarihi'],
			);
			$this->db->insert('general_insankaynaklari', $Data);
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function UpdateInsanKaynaklari(){
			$No = $this->input->post('No');
			$Data = array(
				'AdSoyad'		=>$this->input->post('AdSoyad'),
				'DogumTarihi'	=>$this->input->post('DogumTarihi'),
				'Email'			=>$this->input->post('Email'),
				'Tel'			=>$this->input->post('Tel'),
				'AltTel'		=>$this->input->post('AltTel'),
				'Pozisyon'		=>$this->input->post('Pozisyon'),
				'Brans'			=>$this->input->post('Brans'),
				'MOO'			=>$this->input->post('MOO'),
				'OTS'			=>$this->input->post('OTS'),
				'DTS'			=>$this->input->post('DTS'),
				'YTS'			=>$this->input->post('YTS'),
			);
			$this->db->where('No', $No);
			$this->db->update('general_insankaynaklari', $Data);
			if ($this->db->trans_status() === FALSE) {
				return false;
			} else {
				return true;
			}
		}

		public function EditInsanKaynaklari(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('general_insankaynaklari');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		function DeleteInsanKaynaklari(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('general_insankaynaklari');
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}
		}







  	/*
		=====================================
		  ------------ Pdfler -----------
		=====================================
	*/
		public function GetPdfler()
		{
			return $this->db
			->order_by("No","desc")
			->get('genel_pdfler')
			->result();
		}

		public function GetPdflerNum()
		{
			return $this->db
			->get('genel_pdfler')
			->num_rows();
		}

		public function AddPdfler($array){
			$this->db->insert("genel_pdfler", $array);
			if($this->db->affected_rows() > 0){
				return true;
			}else{
				return false;
			}

		}

		function DeletePdfler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$this->db->delete('genel_pdfler');
			if($this->db->affected_rows() > 0){
				return true;
			} else{
				return false;
			}
		}

		public function EditPdfler(){
			$No = $this->input->post('No');
			$this->db->where('No', $No);
			$query = $this->db->get('genel_pdfler');
			if($query->num_rows() > 0){
				return $query->row();
			}else{
				return false;
			}
		}

		public function UpdatePdfler($data){
			$No = $this->input->post('No');
			$Isim = $data['Isim'];

			$query = $this->db
			->where('No', $No)
			->get('genel_pdfler')
			->result();

			foreach ($query as $item) {
				$ext = strtolower(pathinfo($item->Dosya, PATHINFO_EXTENSION));
				
				$Dosya = $data['DIsim'].'.'.$ext;

				$field = array(
					'Isim'      =>$Isim,
					'Dosya'     =>$Dosya,
				);
				$this->db->where('No', $No);
				$this->db->update('genel_pdfler', $field);
				if($this->db->affected_rows() > 0){
					
					return rename('resources/pdfs/'.$item->Dosya, 'resources/pdfs/'.$Dosya);
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
			->get('genel_kategoriler')
			->result();

			$i = 1;
			foreach ($query as $item) {
				$field = array(
					'ListOrder'		=>$i,
				);
				$this->db->where('No', $item->No);
				$this->db->update('genel_kategoriler', $field);
				$i++;
			}

			return $this->db
			->order_by('ListOrder','asc')
			->get('genel_kategoriler')
			->result();
		}

		public function AddKategoriler(){
			$Data = array(
				'Isim'			=> TurkceToIngilizce($this->input->post('Isim')),
			);
			$this->db->insert('genel_kategoriler', $Data);
			if($this->db->affected_rows() > 0){
				return is_dir($path) || mkdir('resources/images/'.$CData['Isim'], 0777, true);
			}else{
				return false;
			}
		}

		public function DeleteKategoriler(){
			$No = $this->input->post('No');
			$Isim = '';

			$query = $this->db
			->where('No',$No)
			->get('genel_kategoriler')
			->result();

			foreach ($query as $row)
			{
				$Isim = $row->Isim;
			}

			$this->db->where('No', $No);
			$this->db->delete('genel_kategoriler');
			if($this->db->affected_rows() > 0){
				rmdir('resources/images/'.$Isim.'/');
				return true;
			}else{
				return false;
			}
		}

		public function EditKategoriler($listOrder = -1){
			if ($listOrder != -1) {
				$this->db->where('ListOrder', $listOrder);
				$query = $this->db->get('genel_kategoriler');
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
				$query = $this->db->get('genel_kategoriler');
				if($query->num_rows() > 0){
					return $query->row();
				}else{
					return false;
				}
			}
		}

		public function UpdateKategoriler(){
			$Isim = TurkceToIngilizce($this->input->post('Isim'));
			$No = $this->input->post('No');

			$query = $this->db
			->where('No', $No)
			->get('genel_kategoriler')
			->result();

			foreach ($query as $item) {

				$field = array(
					'Isim'			=>$Isim,
				);
				$this->db->where('No', $No);
				$this->db->update('genel_kategoriler', $field);
				if($this->db->affected_rows() > 0){
					rename('resources/images/'.$item->Isim, 'resources/images/'.$Isim);
					return true;
				}else{
					return false;
				}
			}

		}

		public function UpKategoriler(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder-1);
			$this->db->update('genel_kategoriler', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder-1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('genel_kategoriler', $field);
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

		public function DownKategoriler(){
			$No = $this->input->post('No');
			$ListOrder = $this->input->post('ListOrder');

			$field = array(
				'ListOrder'			=>$ListOrder,
			);
			$this->db->where('No !=', $No);
			$this->db->where('ListOrder', $ListOrder+1);
			$this->db->update('genel_kategoriler', $field);
			if($this->db->affected_rows() > 0){
				$field = array(
					'ListOrder'			=>$ListOrder+1,
				);
				$this->db->where('No', $No);
				$this->db->where('ListOrder', $ListOrder);
				$this->db->update('genel_kategoriler', $field);
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


	}