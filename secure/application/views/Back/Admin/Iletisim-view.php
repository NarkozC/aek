
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>İletişim | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showIletisim"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-iletisim.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-settings-baslik.js"></script>
<?php $this->view('Back/back-footer.php'); ?>