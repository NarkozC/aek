
<!DOCTYPE html>
<html lang="tr">
<head>
  	<title>Anasayfa | AEK</title>
<?php $this->view('Front/front-navbar.php'); ?>


<div id="showBanner"></div>

<section id="duy_etk_hab">

  <div class="container-fluid">

    <div id="showHaberlerA"></div>

    <div id="showGalerilerA"></div>

    <div id="showDuyurularEtkinliklerA"></div>

  </div>
</section>

<div class="sectionArasiBosluk"></div>

<div id="showA4x4"></div>

<script src="<?php echo base_url(); ?>resources/js/Front/general-haberler.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-galeriler.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-duyurularEtkinlikler.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-a4x4.js"></script>
<script src="<?php echo base_url(); ?>resources/js/Front/general-banner.js"></script>

<?php $this->view('Front/front-footer.php'); ?>

