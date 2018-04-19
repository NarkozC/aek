<!--
20.09.17 14:28 notu
giriş sayfasının görünüşü html olarak tamamlandı
giriş sayfası js leştirilecek (en,tr olması için)
general-login düzenlenecek
-->
<!DOCTYPE html>
<html>
<head>
	<title>Giriş | AEK</title>
	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url(); ?>resources/images/aek-logo.png" />
	<?php $this->view('Front/front-css.php'); ?>
	<script src="<?php echo base_url(); ?>resources/js/jquery.min.js"></script>
	<script type="text/javascript">
		var baseurl = '<?php echo base_url(); ?>';
	</script>
	<script src="<?php echo base_url(); ?>resources/js/headerscript.js"></script>

	<style type="text/css">
		body {
			background-color: lightblue;
		}
		#theContainer {
			max-width: 400px;
			margin: 0 auto;
			margin-top:50px;
		}

		#theContainer2 {
			background-color: rgba(0,0,0,0.1);
			border-top-left-radius: 50%;
			border-top-right-radius: 50%;
			margin: 0px 10px;
		}
		#aek-logo {
			height: 150px;
			padding:5px;
		}

		#LoginSubmit {
			border-top-right-radius: 0px;
			border-top-left-radius: 0px;
		}

		.input-group-addon {
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			border:none;
		}


		.text-danger {
			margin: 5px 0px;
		}

	</style>
</head>

<body style="padding: 0px;">
	<div id="loader-container">
	  <div id="loader">
	    <div id="top"></div>
	    <div id="bottom"></div>
	    <div id="line"></div>
	  </div>
	</div>

	<div id="showLoginForm"></div>

	<?php $this->view('Front/front-js.php'); ?>
	<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/portal.js"></script>
</body>
</html>
