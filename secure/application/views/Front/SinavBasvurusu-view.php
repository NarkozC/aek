
<!DOCTYPE html>
<html lang="tr">
<head>
	<title>Sınav Başvurusu | AEK</title>
<?php $this->view('Front/front-navbar.php'); ?>

<style type="text/css">
	#showSinavBasvurusu .row{
		margin: 0px;
	}
</style>


<div id="showSinavBasvurusu"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/general-sinavBasvurusu.js"></script>
<?php $this->view('Front/front-footer.php'); ?>
