
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sınav Takvimi | AEK</title>
  
  <!--<meta name="keywords" content="koçluk, öğrenci, yönetici, takım, ilişki">-->

<?php $this->view('Front/front-navbar.php'); ?>


<div id="showSinavTakvimi"></div>


<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/general-sinavTakvimi.js"></script>
<?php $this->view('Front/front-footer.php'); ?>