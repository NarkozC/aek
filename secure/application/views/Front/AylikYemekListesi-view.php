
<!DOCTYPE html>
<html lang="tr">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Aylık Yemek Listesi | AEK</title>
	<!-- <meta name=“description” content=“ ”> 
	<meta name="keywords" content="koçluk, öğrenci, yönetici, takım, nlp" />-->

<?php $this->view('Front/front-navbar.php'); ?>


<div id="showAylikYemekListesi"></div>


<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/general-aylikYemekListesi.js"></script>
<?php $this->view('Front/front-footer.php'); ?>