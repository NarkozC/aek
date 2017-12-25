
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Banner | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showBannerP"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-banner.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/function-addResim.js"></script>
<?php $this->view('Back/back-footer.php'); ?>