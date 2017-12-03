
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Uluslararası Projeler | AEK</title>
  
  <!--<meta name="keywords" content="koçluk, öğrenci, yönetici, takım, ilişki">-->

<?php $this->view('Front/front-navbar.php'); ?>


<section id="UluslararasiProjeler">
  <div class="container wow bounceInDown">
    <div class="col-lg-12 page-header paddingL0">
      <h2 data-basliklar="GUAP">Uluslararası Projeler</h2>
    </div>
  </div>
  <div class="container wow bounceInUp dark-bg shadow borderRad10">
	  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <p>
        <div id="GUAP" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">
    
          <img alt="Resim 1 Başlık" 
              src="<?php echo base_url(); ?>resources/images/Genel/SSK-2.png"
              data-description="Resim 1 Açıklaması"
              data-longdescription="Resim 1 Uzun Açıklama">

        </div>
      </p>
  </div>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT20">
    <p id="showLongDescription"></p>
  </div>
  </div>
</section>


<script type="text/javascript">
  jQuery(document).ready(function(){ 

      GetGUAP()

  });

  function GetGUAP() {
    var GUAPHtml = '';
    var html = '';

    for (var i = 1; i < 16; i++) {
      GUAPHtml += '<img alt="Resim '+i+' Başlık"'+
            'src="'+baseurl+'resources/images/Genel/UAP-'+(i+1)+'.png"'+
            'data-longdescription="Resim '+i+' Uzun Açıklama">';
    }
    $('#GUAP').html(GUAPHtml);


    var GUAP = jQuery("#GUAP").unitegallery({
        thumb_fixed_size:false,
        thumb_image_overlay_effect:true,
        thumb_image_overlay_type: "blur",
        slider_scale_mode: "fit",
        gallery_autoplay:true,
        gallery_width:1300, 
      gallery_height:650,
      });

      html = GUAP.getItem(0)['longdescription'];
    $('#showLongDescription').html(html);

      GUAP.on("item_change",function(num, data){    //on item change, get item number and item data
      html = GUAP.getItem(num)['longdescription'];
      $('#showLongDescription').html(html);
    });
  }
</script>
<?php $this->view('Front/front-footer.php'); ?>