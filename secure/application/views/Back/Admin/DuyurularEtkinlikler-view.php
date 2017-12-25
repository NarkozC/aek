
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Duyurular-Etkinlikler | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showDuyurularEtkinlikler"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-duyurularEtkinlikler.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-addResim.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-settings-baslik.js"></script>
<?php $this->view('Back/back-footer.php'); ?>