
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Sosyal Sorumluluk Projeleri | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showSsp"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-ssp.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-addResim.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-settings-baslik.js"></script>
<?php $this->view('Back/back-footer.php'); ?>