
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Seminer Söyleşi Konferanslar | AEK</title>
  
  <!--<meta name="keywords" content="koçluk, öğrenci, yönetici, takım, ilişki">-->

<?php $this->view('Front/front-navbar.php'); ?>


<section id="seminerSoylesiKonferanslar">
  <div class="container wow bounceInDown">
    <div class="col-lg-12 page-header paddingL0">
      <h2 data-basliklar="GSSK">Seminer Söyleşi Konferanslar</h2>
    </div>
  </div>
  <div class="container wow bounceInUp dark-bg shadow borderRad10">
	<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	  	<p>
	  		<div id="GSSK" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">
    
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
	<div class="col-md-6">
            <div class="panel with-nav-tabs panel-default">
                <div class="panel-heading">
                        <ul class="nav nav-tabs">
                            <li class="dropdown active">
                                <a href="#" data-toggle="dropdown">İlkokul <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#ilkokul1" data-toggle="tab">1</a></li>
                                    <li><a href="#ilkokul2" data-toggle="tab">2</a></li>
                                    <li><a href="#ilkokul3" data-toggle="tab">3</a></li>
                                    <li><a href="#ilkokul4" data-toggle="tab">4</a></li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#" data-toggle="dropdown">Ortaokul <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                	<li><a href="#ortaokul5" data-toggle="tab">5</a></li>
                                	<li><a href="#ortaokul6" data-toggle="tab">6</a></li>
                                	<li><a href="#ortaokul7" data-toggle="tab">7</a></li>
                                	<li><a href="#ortaokul8" data-toggle="tab">8</a></li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#" data-toggle="dropdown">Lise <span class="caret"></span></a>
                                <ul class="dropdown-menu" role="menu">
                                	<li><a href="#lise9" data-toggle="tab">9</a></li>
                                	<li><a href="#lise10" data-toggle="tab">10</a></li>
                                	<li><a href="#lise11" data-toggle="tab">11</a></li>
                                	<li><a href="#lise12" data-toggle="tab">12</a></li>
                                </ul>
                            </li>
                        </ul>
                </div>
                <div class="panel-body">
                    <div class="tab-content">
                        <div class="tab-pane fade in active" id="ilkokul1">1</div>
                        <div class="tab-pane fade" id="ilkokul2">2</div>
                        <div class="tab-pane fade" id="ilkokul3">3</div>
                        <div class="tab-pane fade" id="ilkokul4">4</div>
                        <div class="tab-pane fade" id="ortaokul5">5</div>
                        <div class="tab-pane fade" id="ortaokul6">6</div>
                        <div class="tab-pane fade" id="ortaokul7">7</div>
                        <div class="tab-pane fade" id="ortaokul8">8</div>
                        <div class="tab-pane fade" id="lise9">9</div>
                        <div class="tab-pane fade" id="lise10">10</div>
                        <div class="tab-pane fade" id="lise11">11</div>
                        <div class="tab-pane fade" id="lise12">12</div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</section>


<script type="text/javascript">
	jQuery(document).ready(function(){ 

	    GetGSSK()

	});

	function GetGSSK() {
		var GSSKHtml = '';
		var html = '';

		for (var i = 1; i < 20; i++) {
			GSSKHtml += '<img alt="Resim '+i+' Başlık"'+
						'src="'+baseurl+'resources/images/Genel/SSK-'+(i+1)+'.png"'+
						'data-longdescription="Resim '+i+' Uzun Açıklama">';
		}
		$('#GSSK').html(GSSKHtml);


		var GSSK = jQuery("#GSSK").unitegallery({
	      thumb_fixed_size:false,
	      thumb_image_overlay_effect:true,
	      thumb_image_overlay_type: "blur",
	      slider_scale_mode: "fit",
	      gallery_autoplay:true,
	      gallery_width:1300,	
		  gallery_height:650,
	    });

	    html = GSSK.getItem(0)['longdescription'];
		$('#showLongDescription').html(html);

	    GSSK.on("item_change",function(num, data){		//on item change, get item number and item data
			html = GSSK.getItem(num)['longdescription'];
			$('#showLongDescription').html(html);
		});
	}
</script>
<?php $this->view('Front/front-footer.php'); ?>