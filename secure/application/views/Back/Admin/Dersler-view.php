
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Dersler | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showDersler"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/genel-dersler.js"></script>
<?php $this->view('Back/back-footer.php'); ?>