
<!DOCTYPE html>
<html lang="tr">
<head>
  <title>Basında Biz | AEK</title>
<?php $this->view('Front/front-navbar.php'); ?>


<section id="internationalPremierCollege">
  <div class="container wow bounceInDown">
    <div class="col-lg-12 page-header paddingL0">
      <h2 data-basliklar="GBB">Basında Biz</h2>
    </div>
  </div>
  <div class="container wow bounceInUp dark-bg shadow borderRad10">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	  	<p>
	  		<div id="GBB" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">
    
		    	<img alt="Resim 1 Başlık" 
		      		src="<?php echo base_url(); ?>resources/images/Genel/Bas-2.png"
		        	data-description="Resim 1 Açıklaması"
		        	data-longdescription="Resim 1 Uzun Açıklama">

		    </div>
	  	</p>
	</div>
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT20">
		<p id="showGBBLongDescription"></p>
	</div>
  </div>

  <div class="sectionArasiBosluk"></div>

  <div class="container wow bounceInUp dark-bg shadow borderRad10">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	  	<p>
	  		<div id="GBBV" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">
        
		        <img alt="Youtube Video 1"
		         data-type="youtube"   
		         data-videoid="f5hLmLmNbrU">
		      
		    </div>

	  	</p>
	</div>
  </div>
</section>


<script type="text/javascript">
	jQuery(document).ready(function(){ 

	    GetGBB();
	    GetGBBV();

	});

	function GetGBB() {
		var GBBHtml = '';
		var html = '';

		for (var i = 1; i < 8; i++) {
			GBBHtml += '<img alt="Resim '+i+' Başlık"'+
						'src="'+baseurl+'resources/images/Basinda-Biz/BB-'+i+'.png"'+
						'data-longdescription="Resim '+i+' Uzun Açıklama">';
		}
		$('#GBB').html(GBBHtml);


		var GBB = jQuery("#GBB").unitegallery({
	      thumb_fixed_size:false,
	      thumb_image_overlay_effect:true,
	      thumb_image_overlay_type: "blur",
	      slider_scale_mode: "fit",
	      gallery_autoplay:true,
	      gallery_width:1300,	
		  gallery_height:650,
	    });

	    html = GBB.getItem(0)['longdescription'];
		$('#showGBBLongDescription').html(html);

	    GBB.on("item_change",function(num, data){		//on item change, get item number and item data
			html = GBB.getItem(num)['longdescription'];
			$('#showGBBLongDescription').html(html);
		});
	}

	function GetGBBV() {
		var GBBVHtml = '';
		var html = '';

		for (var i = 1; i < 2; i++) {
			GBBVHtml += '<img alt="Youtube Video'+i+'"'+
						'data-type="youtube"'+
						'data-videoid="f5hLmLmNbrU"'+
						'data-longdescription="Video '+i+' Uzun Açıklama">';
		}
		$('#GBBV').html(GBBVHtml);


		var GBBV = jQuery("#GBBV").unitegallery({
		  gallery_theme: "video",
	      gallery_width:1300,	
		  gallery_height:650,
	    });
	}
</script>
<?php $this->view('Front/front-footer.php'); ?>