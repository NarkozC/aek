<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require_once('phpass-0.3/PasswordHash.php');

define('PHPASS_HASH_STRENGTH', 8);
define('PHPASS_HASH_PORTABLE', false);

/**
 * SimpleLoginSecure Class
 *
 * Makes authentication simple and secure.
 *
 * Simplelogin expects the following database setup. If you are not using 
 * this setup you may need to do some tweaking.
 *   
 * For MYSQL 5.0 and 5.5 use :
 *
 *   CREATE TABLE `users` (
 *     `No` int(10) unsigned NOT NULL auto_increment,
 *     `Email` varchar(255) NOT NULL default '',
 *     `Password` varchar(60) NOT NULL default '',
 *     `user_date` datetime NOT NULL default '0000-00-00 00:00:00',
 *     `user_modified` datetime NOT NULL default '0000-00-00 00:00:00',
 *     `user_last_login` datetime NULL default NULL,
 *     PRIMARY KEY  (`No`),
 *     UNIQUE KEY `Email` (`Email`),
 *   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 *
 * For MYSQL 5.6 and more use :
 *
 *   CREATE TABLE `users` (
 *     `No` int(10) unsigned NOT NULL auto_increment,
 *     `Email` varchar(255) NOT NULL default '',
 *     `Password` varchar(60) NOT NULL default '',
 *     `user_date` datetime NOT NULL default CURRENT_TIMESTAMP,
 *     `user_modified` datetime NOT NULL default CURRENT_TIMESTAMP,
 *     `user_last_login` datetime NULL default NULL,
 *     PRIMARY KEY  (`No`),
 *     UNIQUE KEY `Email` (`Email`),
 *   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 * 
 * @package   SimpleLoginSecure
 * @version   2.1.1
 * @author    Stéphane Bourzeix, Pixelmio <stephane[at]bourzeix.com>
 * @copyright Copyright (c) 2012-2013, Stéphane Bourzeix
 * @license   http://www.gnu.org/licenses/gpl-3.0.txt
 * @link      https://github.com/DaBourz/SimpleLoginSecure
 */
class SimpleLoginSecure
{
	protected $CI; // CodeIgniter object
	protected $user_table = 'general_kullanicilar'; // Table name
	
	/**
	* Constructor
	* Get the current CI object
	*/
	public function __construct()
    {
        // Assign the CodeIgniter super-object
		$this->CI =& get_instance();
		date_default_timezone_set('Europe/Istanbul');
	}


	/**
	 * Create a user account
	 *
	 * @access	public
	 * @param	string
	 * @param	string
	 * @param	bool
	 * @return	bool
	 */
	function create($Email = '', $TCNo = '', $Sifre = '', $Ogrenci = 1, $Ogretmen = 0, $Rehberlik = 0, $Teknik = 0, $Yonetici = 0, $Admin = 0, $auto_login = true) 
	{

		//Make sure account info was sent
		if($Email == '' OR $TCNo == '' OR $Sifre == '') {
			return false;
		}
		
		//Check against user table
		$this->CI->db->where('Email', $Email); 
		$query = $this->CI->db->get_where($this->user_table);
		
		if ($query->num_rows() > 0) //Email already exists
			return false;

		$this->CI->db->where('TCNo', $TCNo); 
		$queryT = $this->CI->db->get_where($this->user_table);
		
		if ($queryT->num_rows() > 0) //TCNo already exists
			return false;

		//Hash Password using phpass
		$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);
		$Password_hashed = $hasher->HashPassword($Sifre);

		//Insert account into the database
		$data = array(
					'Email' 		=> $Email,
					'TCNo'			=> $TCNo,
					'Sifre' 		=> $Password_hashed,
					'Ogrenci' 		=> $Ogrenci,
					'Ogretmen' 		=> $Ogretmen,
					'Rehberlik' 	=> $Rehberlik,
					'Teknik' 		=> $Teknik,
					'Yonetici' 		=> $Yonetici,
					'Admin' 		=> $Admin,
					'user_date' 	=> date('c'),
					'user_modified' => date('c'),
				);

		$this->CI->db->set($data); 

		if(!$this->CI->db->insert($this->user_table)) //There was a problem! 
			return false;						
				
		if($auto_login)
			$this->login($TCNo, $Sifre);
		
		return true;
	}

	/**
	 * Update a user account
	 *
	 * updates the email,tcno,password just here for you can 
	 * extend / use it in your own class.
	 *
	 * @access	public
	 * @param integer
	 * @param	string
	 * @param	bool
	 * @return	bool
	 */
	function updateEmail($No = null, $Email = '', $auto_login = true) 
	{
		//Make sure account info was sent
		if($No == null OR $Email == '') {
			return false;
		}
		
		//Check against user table
		$this->CI->db->where('No', $No);
		$query = $this->CI->db->get_where($this->user_table);
		
		if ($query->num_rows() == 0){ // user don't exists
			return false;
		}
		
		//Update account into the database
		$data = array(
					'Email' => $Email,
					'user_modified' => date('c'),
				);
 
		$this->CI->db->where('No', $No);

		if(!$this->CI->db->update($this->user_table, $data)) //There was a problem! 
			return false;						
				
		if($auto_login){
			$user_data['Email'] = $Email;
			$user_data['user'] = $user_data['Email']; // for compatibility with Simplelogin
			
			$this->CI->session->set_userdata($user_data);
			}
		return true;
	}

	function updateTCNo($No = null, $TCNo = '', $auto_login = true) 
	{
		//Make sure account info was sent
		if($No == null OR $TCNo == '') {
			return false;
		}
		
		//Check against user table
		$this->CI->db->where('No', $No);
		$query = $this->CI->db->get_where($this->user_table);
		
		if ($query->num_rows() == 0){ // user don't exists
			return false;
		}
		
		//Update account into the database
		$data = array(
					'TCNo' => $TCNo,
					'user_modified' => date('c'),
				);
 
		$this->CI->db->where('No', $No);

		if(!$this->CI->db->update($this->user_table, $data)) //There was a problem! 
			return false;						
				
		if($auto_login){
			$user_data['TCNo'] = $TCNo;
			$user_data['user'] = $user_data['TCNo']; // for compatibility with Simplelogin
			
			$this->CI->session->set_userdata($user_data);
			}
		return true;
	}

	/**
	* Edit a user password
	* @author    Stéphane Bourzeix, Pixelmio <stephane[at]bourzeix.com>
	* @author    Diego Castro <castroc.diego[at]gmail.com>
	*
	* @access  public
	* @param  string
	* @param  string
	* @param  string
	* @return  bool
	*/
	function edit_password($EmailOrTCNo = '', $old_pass = '', $new_pass = '' , $needOldPass = true)
	{
		
		// Check if the password is the same as the old one
		$this->CI->db->select('Sifre');
		$query = $this->CI->db->get_where($this->user_table, array('Email' => $EmailOrTCNo));
		if ($query->num_rows() > 0) {
			$user_data = $query->row_array();
			return true;
		} else {
			$query = $this->CI->db->get_where($this->user_table, array('TCNo' => $EmailOrTCNo));
			if ($query->num_rows() > 0) {
				$user_data = $query->row_array();
				return true;
			} else {
				return false;
			}
		}

		if ($needOldPass == true) {
			$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);	
			if (!$hasher->CheckPassword($old_pass, $user_data['Sifre'])){ //old_pass isnt the same
				return FALSE;
			}
		}
		
		
		// Hash new_pass using phpass
		$Password_hashed = $hasher->HashPassword($new_pass);
		// Insert new password into the database
		$data = array(
			'Sifre' => $Password_hashed,
			'user_modified' => date('c')
		);
		
		$this->CI->db->set($data);
		$query = $this->CI->db->where('Email', $EmailOrTCNo);
		if ($query->num_rows() > 0) {
			if(!$this->CI->db->update($this->user_table, $data)){
				return FALSE;
			} else {
				return TRUE;
			}
		} else {
			$query = $this->CI->db->where('TCNo', $EmailOrTCNo);
			if ($query->num_rows() > 0) {
				if(!$this->CI->db->update($this->user_table, $data)){
					return FALSE;
				} else {
					return TRUE;
				}
			}
		}
	}

	/**
	 * Login and sets session variables
	 *
	 * @access	public
	 * @param	string
	 * @param	string
	 * @return	bool
	 */
	function login($EmailOrTCNo = '', $Sifre = '') 
	{

		if($EmailOrTCNo == '' OR  $Sifre == '')
			return false;


		//Check if already logged in
		if($this->CI->session->userdata('TCNo') == $EmailOrTCNo || $this->CI->session->userdata('Email') == $EmailOrTCNo) {
			return true;
			die;
		}
		
		$continueE = false;
		$continueT = false;
		//Check against user table
		$this->CI->db->where('Email', $EmailOrTCNo); 
		$query = $this->CI->db->get_where($this->user_table);

		
		if ($query->num_rows() > 0) 
		{
			$continueE = true;
		} 
		else 
		{
			$this->CI->db->where('TCNo', $EmailOrTCNo); 
			$query = $this->CI->db->get_where($this->user_table);
			if ($query->num_rows() > 0) {
				$continueT = true;
			} else {
				return false;
			}
		}

		if ($continueE == true) {

			$user_data = $query->row_array(); 

			$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);

			if(!$hasher->CheckPassword($Sifre, $user_data['Sifre'])) {
				return false;
				die;
			}

			//Create a fresh, brand new session
			if (CI_VERSION >= '3.0') {
				$this->CI->session->sess_regenerate(TRUE);
			} else {
				//Destroy old session
				$this->CI->session->sess_destroy();
				$this->CI->session->sess_create();
			}

			$this->CI->db->simple_query('UPDATE ' . $this->user_table  . ' SET user_last_login = "' . date('c') . '" WHERE No = ' . $user_data['No']);

			//Set session data
			unset($user_data['Sifre']);
			$user_data['user'] = $user_data['Email']; // for compatibility with Simplelogin
			$user_data['Ogrenci'] = $user_data['Ogrenci'];
			$user_data['Ogretmen'] = $user_data['Ogretmen'];
			$user_data['Rehberlik'] = $user_data['Rehberlik'];
			$user_data['Teknik'] = $user_data['Teknik'];
			$user_data['Yonetici'] = $user_data['Yonetici'];
			$user_data['Admin'] = $user_data['Admin'];
			$user_data['logged_in'] = true;
			$this->CI->session->set_userdata($user_data);
			return true;
		} else if ($continueT == true) {
			$user_data = $query->row_array(); 

			$hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);

			if(!$hasher->CheckPassword($Sifre, $user_data['Sifre'])) {
				return false;
				die;
			}

			//Create a fresh, brand new session
			if (CI_VERSION >= '3.0') {
				$this->CI->session->sess_regenerate(TRUE);
			} else {
				//Destroy old session
				$this->CI->session->sess_destroy();
				$this->CI->session->sess_create();
			}

			$this->CI->db->simple_query('UPDATE ' . $this->user_table  . ' SET user_last_login = "' . date('c') . '" WHERE No = ' . $user_data['No']);

			//Set session data
			unset($user_data['Sifre']);
			$user_data['user'] = $user_data['TCNo']; // for compatibility with Simplelogin
			$user_data['Ogrenci'] = $user_data['Ogrenci'];
			$user_data['Ogretmen'] = $user_data['Ogretmen'];
			$user_data['Rehberlik'] = $user_data['Rehberlik'];
			$user_data['Teknik'] = $user_data['Teknik'];
			$user_data['Yonetici'] = $user_data['Yonetici'];
			$user_data['Admin'] = $user_data['Admin'];
			$user_data['logged_in'] = true;
			$this->CI->session->set_userdata($user_data);
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Logout user
	 *
	 * @access	public
	 * @return	void
	 */
	function logout() {	
		$this->CI->session->sess_destroy();
	}

	/**
	 * Delete user
	 *
	 * @access	public
	 * @param integer
	 * @return	bool
	 */
	function delete($No) 
	{
		
		if(!is_numeric($No))
			return false;			

		return $this->CI->db->delete($this->user_table, array('No' => $No));
	}
	
	

	
}
?>
