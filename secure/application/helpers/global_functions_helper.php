<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('ArrayToComma')) {  

    function ArrayToComma($value='') {
    	$valueF;
    	if(isset($value)){
        $k = 0;
        foreach ($value as $val){
          $valueF[$k] = $val;
          $k++;
        }
        $k = 0;
        foreach ($valueF as $val){
          $valueS = $valueS."$val,";
          $k++;
        }
        $valueF = preg_replace('/,[^,]*$/', '', $valueS);
      }
      return $valueF;
    }
    	
}

if ( ! function_exists('TurkceToIngilizce')) {  

  function TurkceToIngilizce($string){
    $string = trim($string);
    $string = preg_replace('!\s+!', ' ', $string);
    $search = array('Ç','ç','Ğ','ğ','ı','İ','Ö','ö','Ş','ş','Ü','ü',' ','.','_','--','---',"'");
    $replace = array('C','c','G','g','i','I','O','o','S','s','U','u','-','-','-','-','-','-');
    $new_text = str_replace($search,$replace,$string);
    $new_text = str_replace($search,$replace,$new_text);
    $new_text = str_replace($search,$replace,$new_text);
    return $new_text;
  }
      
}



