
<!DOCTYPE html>
<html lang="tr">
<head>
    <title>Pdfler | Admin AEK</title>

<?php $formAttributes = array(
    'role' => 'form',
    'method' => 'post',
); ?>
<?php $this->view('Back/back-navbar.php'); ?>

<div id="showPdfler"></div>

<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Back/Admin/genel-pdfler.js"></script>
<?php $this->view('Back/back-footer.php'); ?>