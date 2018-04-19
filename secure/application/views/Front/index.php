
<!DOCTYPE html>
<html lang="tr">
<head>
  	<title>Anasayfa | AEK</title>
<?php $this->view('Front/front-navbar.php'); ?>


<div id="showBanner"></div>
<a target="_blank" href="http://www.aek.k12.tr/Sinav-Basvurusu"><div style="width: 100%; height: auto;">
	<img src="<?php echo base_url(); ?>resources/images/ort-img-movil.jpg" class="img-responsive hidden-md hidden-lg">
</div></a>
<a target="_blank" href="http://www.aek.k12.tr/Sinav-Basvurusu"><div style="width: 100%; height: auto;">
	<img src="<?php echo base_url(); ?>resources/images/ort-img.jpg" class="img-responsive hidden-sm hidden-xs">
</div></a>
<section id="duy_etk_hab">

  <div class="container-fluid">

    <div id="showHaberlerA"></div>

    <div id="showGalerilerA"></div>

    <div id="showDuyurularEtkinliklerA"></div>

  </div>
</section>

<div class="sectionArasiBosluk" style="margin: 20px 0px;"></div>

<div id="showA4x4"></div>
<a target="_blank" href="http://www.aek.k12.tr/Sinav-Basvurusu"><div style="width: 100%; height: auto;">
	<img src="<?php echo base_url(); ?>resources/images/ort-img.jpg" class="img-responsive hidden-sm hidden-xs">
</div></a>
<script src="<?php echo base_url(); ?>resources/js/Front/general-haberler.js"></script>

<script src="<?php echo base_url(); ?>resources/js/Front/general-galeriler.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-duyurularEtkinlikler.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-a4x4.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-banner.js"></script>

<?php $this->view('Front/front-footer.php'); ?>

