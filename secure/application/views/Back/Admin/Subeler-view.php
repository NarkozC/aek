
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Şubeler | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showSubeler"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/genel-subeler.js"></script>
<?php $this->view('Back/back-footer.php'); ?>