
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Kadro | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showKadro"></div>
<div class="sectionArasiBosluk"></div>
<div id="showKadroGrup"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-kadro.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-addResim.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-refresh.js"></script>
<?php $this->view('Back/back-footer.php'); ?>