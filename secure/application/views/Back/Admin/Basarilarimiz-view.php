
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Başarılarımız | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showBasarilarimiz"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-basarilarimiz.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-addResim.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-settings-baslik.js"></script>
<?php $this->view('Back/back-footer.php'); ?>