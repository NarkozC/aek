
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bireysel Hizmetler | Morfill</title>
  
  <meta name="keywords" content="koçluk, öğrenci, yönetici, takım, ilişki">

<?php $this->view('Front/front-navbar.php'); ?>


<section id="bireyselHizmetler">
  <div class="container">
    <div class="col-lg-12 page-header paddingL0">
      <h2 data-basliklar="HB" id="bireyselHizmetlerBaslik">Bireysel Hizmetler</h2>
    </div>
  </div>

  <div id="showdata">
    
  </div>


</section>


<script type="text/javascript" src="<?php echo base_url(); ?>resources/js/Front/hizmetler-bireysel.js"></script>
<?php $this->view('Front/front-footer.php'); ?>