<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
/*
$route['Portal'] = "Back/General-Duyurular";
$route['Portal/(:any)'] = "Back/$1";
$route['Portal/(:any)/(:any)'] = "Back/$1/$2";
$route['Portal/(:any)/(:any)/(:any)'] = "Back/$1/$2/$3";
*/

$counter = 0;
if ($counter == 0) {
	$KGs = array('Ogrenci', 'Ogretmen', 'Rehberlik', 'Teknik', 'Yonetici', 'Admin');
	$KGsLength = count($KGs);
	for ($i=0; $i < $KGsLength; $i++) {
		$route['Portal/'.$KGs[$i]] = "Back/".$KGs[$i]."/".$KGs[$i];
		$route['Portal/'.$KGs[$i].'/(:any)'] = "Back/".$KGs[$i]."/$1";
		$route['Portal/'.$KGs[$i].'/(:any)/(:any)'] = "Back/".$KGs[$i]."/$1/$2";
		$route['Portal/'.$KGs[$i].'/(:any)/(:any)/(:any)'] = "Back/".$KGs[$i]."/$1/$2/$3";
		$route['Portal/'.$KGs[$i].'/(:any)/(:any)/(:any)/(:any)'] = "Back/".$KGs[$i]."/$1/$2/$3/$4";

		$route['en/Portal/'.$KGs[$i]] = "Back/".$KGs[$i]."/".$KGs[$i];
		$route['en/Portal/'.$KGs[$i].'/(:any)'] = "Back/".$KGs[$i]."/$1";
		$route['en/Portal/'.$KGs[$i].'/(:any)/(:any)'] = "Back/".$KGs[$i]."/$1/$2";
		$route['en/Portal/'.$KGs[$i].'/(:any)/(:any)/(:any)'] = "Back/".$KGs[$i]."/$1/$2/$3";
		$route['en/Portal/'.$KGs[$i].'/(:any)/(:any)/(:any)/(:any)'] = "Back/".$KGs[$i]."/$1/$2/$3/$4";
	}
	$counter = 1;
}

$route['en'] = "Front/Anasayfa";
$route['en/Portal'] = "Front/Portal";
$route['en/(:any)'] = "Front/$1";
$route['en/(:any)/(:any)'] = "Front/$1/$2";
$route['en/(:any)/(:any)/(:any)'] = "Front/$1/$2/$3";

$route['(:any)'] = "Front/$1";
$route['(:any)/(:any)'] = "Front/$1/$2";
$route['(:any)/(:any)/(:any)'] = "Front/$1/$2/$3";

$route[''] = "Front/Anasayfa";



$route['default_controller'] = 'Anasayfa';
$route['404_override'] = 'Error_404';
$route['translate_uri_dashes'] = TRUE;
