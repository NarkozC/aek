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
        $search = array('Ç','ç','Ğ','ğ','ı','İ','Ö','ö','Ş','ş','Ü','ü',' ','.','_','--','---',"'",'(',')');
        $replace = array('C','c','G','g','i','I','O','o','S','s','U','u','-','-','-','-','-','-','-','-');
        $new_text = str_replace($search,$replace,$string);
        $new_text = str_replace($search,$replace,$new_text);
        $new_text = str_replace($search,$replace,$new_text);
        return $new_text;
    }

}


if ( ! function_exists('exportExcel')) {
    function exportExcel($filename='ExportExcel',$columns=array(),$data=array(),$replaceDotCol=array()){
        header('Content-Encoding: UTF-8');
        header('Content-Type: text/plain; charset=utf-8'); 
        header("Content-disposition: attachment; filename=".$filename.".xls");
echo "\xEF\xBB\xBF"; // UTF-8 BOM

$say=count($columns);

echo '<table border="1"><tr>';
foreach($columns as $v){
    echo '<th style="background-color:#d8544f">'.trim($v).'</th>';
}
echo '</tr>';

foreach($data as $val){
    echo '<tr>';
    for($i=0; $i < $say; $i++){
        echo '<td>'.$val[$i].'</td>';
    }
    echo '</tr>';
}
}  
}


if ( ! function_exists('TarihToTr')) {  

    function TarihToTr($string){
        $curTarih = explode("-",$string);
        $curTarih = $curTarih[2].'-'.$curTarih[1].'-'.$curTarih[0];
        return $curTarih;
    }

}

if ( ! function_exists('DeleteCaches')) {  

    function DeleteCaches($cacheKeys = array(),$data){
         $CI =& get_instance();
        for ($i=0; $i < sizeof($cacheKeys); $i++) { 
            $cacheKeyTR = $data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
            $cacheKeyEN = $data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];

            $gotCacheTR = $CI->cache->get($cacheKeyTR);
            $gotCacheEN = $CI->cache->get($cacheKeyEN);

            if ($gotCacheTR) {
                $CI->cache->delete($cacheKeyTR);
            }
            if ($gotCacheEN) {
                $CI->cache->delete($cacheKeyEN);
            }
        }
    }

}

