
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Navbar | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showNavbarF"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/general-navbarF.js"></script>
<?php $this->view('Back/back-footer.php'); ?>