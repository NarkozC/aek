
<!DOCTYPE html>
<html lang="tr">
<head>
  	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<title>Birimler | AEK</title>
  	<!-- <meta name=“description” content=“ ”> -->
    <!-- <meta name="keywords" content="morfill, koçluk, kurumsal koçluk, icf, nlp"> -->

<?php $this->view('Front/front-navbar.php'); ?>

	<div id="showBirimlerIdari"></div>

    <div class="sectionArasiBosluk"></div>

	<div id="showBirimlerLojistikHizmetler"></div>
	
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/general-birimler-idari.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/general-birimler-lojistik-hizmetler.js"></script>
<?php $this->view('Front/front-footer.php'); ?>

