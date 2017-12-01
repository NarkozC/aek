<!DOCTYPE html>
<html lang="tr">
<head>
  	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<title>404 | AEK</title>
  	<meta name="google-site-verification" content="SeUM2mT3_fRhRsmd_rP5hyx8nnSlLWog6QWXld4tkHU" />

	<!-- CSSs -->
	<link rel="stylesheet" href="<?php echo base_url(); ?>resources/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="<?php echo base_url(); ?>resources/css/style.css">
	<script src="<?php echo base_url(); ?>resources/js/jquery.min.js"></script>
  	<script src="<?php echo base_url(); ?>resources/js/headerscript.js"></script>

	<style type="text/css">
		html { 
		  background: url(<?php echo base_url(); ?>resources/images/Genel/mBG.jpg) no-repeat center center fixed; 
		  -webkit-background-size: cover;
		  -moz-background-size: cover;
		  -o-background-size: cover;
		  background-size: cover;
		}	
		body {
			background: none;
		}

		.col-md-12 {
			font-family: "Raleway", "Roboto" !important;
			color: #797979;
			font-weight: 900 !important; 
			font-size: 200%;
		}

		.col-sm-12 {
			font-family: "Raleway", "Roboto" !important;
			color: #797979;
			font-weight: 900 !important; 
			font-size: 150%;
		}
		.y404 {
			font-size: 500%;
			font-family: "Raleway", "Roboto" !important;
			color: #797979;
			font-weight: 900 !important; 
		}
	</style>

</head>
<body>

<div class="container text-center">
	<div id="the404Error"></div>
	
</div>


<script type="text/javascript">
	var html = '';
	if (en) {
		html = '<div class="col-md-12" style="padding-bottom: 20px;">'+
				'<div class="y404">404</div>'+
				'<div>Damn It! The 404 Thing</div>'+
				'</div>'+
				'<div class="col-sm-12">'+
				'The thing is not around here right now.'+
				'<p style="padding-top: 20px;">'+
				'<a href="<?php echo base_url(); ?>en/" class="btn btn-lg btn-danger" style="margin-right: 10px;">Back To Home</a>'+
				'<button class="btn btn-lg btn-danger" onclick="history.go(-1);">Go Back</button>'+
				'</p>'+
				'</div>';
	} else {
		html = '<div class="col-md-12" style="padding-bottom: 20px;">'+
				'<div class="y404">404</div>'+
				'<div>Kahretsin! 404 Şeysi</div>'+
				'</div>'+
				'<div class="col-sm-12">'+
				'Şu an aradığınız şey buralarda değil. Yerinde yeller esmekte.'+
				'<p style="padding-top: 20px;">'+
				'<a href="<?php echo base_url(); ?>" class="btn btn-lg btn-danger" style="margin-right: 10px;">Anasayfaya Dön</a>'+
				'<button class="btn btn-lg btn-danger" onclick="history.go(-1);">Geri Dön</button>'+
				'</p>'+
				'</div>';
	}
	$('#the404Error').html(html);
</script>
</body>
</html>