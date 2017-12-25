
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Anasayfa 4x4 | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showA4x4"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-a4x4.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-addResim.js"></script>
<?php $this->view('Back/back-footer.php'); ?>