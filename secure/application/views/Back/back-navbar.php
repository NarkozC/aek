  <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url(); ?>resources/images/aek-logo.png" />
  <!-- CSSs -->
  <?php $this->view('Back/back-css.php'); ?>

  <script type="text/javascript">
    var baseurl = '<?php echo base_url(); ?>';
    var ajaxLoader = '#ajax-loader-container';
  </script>
  <script src="<?php echo base_url(); ?>resources/js/jquery.min.js"></script>
  <script src="<?php echo base_url(); ?>resources/js/jssor.slider.min.js"></script>
  <script src="<?php echo base_url(); ?>resources/js/headerscript.js"></script>
  <script src="<?php echo base_url(); ?>resources/js/Back/portal-helper.js"></script>
  <!--<script src="<?php echo base_url(); ?>resources/js/Back/nav-ust.js"></script>-->

</head>
<body>

<div id="loader-container">
  <div id="loader">
    <div id="top"></div>
    <div id="bottom"></div>
    <div id="line"></div>
  </div>
</div>

<!-- <div class="cssload-container">
  <div class="cssload-zenith"></div>
</div> -->

  <div id="page">


  <div id="ajax-loader-container">
    <div id="ajax-loader">
      <img src="<?php echo base_url(); ?>resources/images/Genel/ajax-loader.gif" class="img-responsive">
    </div>
  </div>
  
  <!-- begin AekNavbar           -->
  <nav class="navbar navbar-custom-dek no-active-arrow navbar-fixed-top xs-height75 dropdown-onhover no-fix" role="navigation">
    <div class="container-fluid padding0" id="nav-banner">
      <div class="row text-center">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <a class="navbar-brand" href="<?php echo base_url(); ?>"><img class="img-responsive" src="<?php echo base_url(); ?>resources/images/aek-logo.png" alt="LOGO"></a>
        </div>
      </div>
    </div>
    <div class="container-fluid">

      <!-- for full width layout or use class="container" for boxed layout -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#AekNavbar">
        <span class="sr-only">Toggle navigation</span>
        <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
        </button>
        
        <a class="navbar-brand showAfterScroll" href="<?php echo base_url(); ?>"><img class="img-responsive" src="<?php echo base_url(); ?>resources/images/aek-logo.png" alt="LOGO"></a>
        <ul class="nav navbar-nav navbar-left">
          <!-- All links, or menu items placed below, will not be hidden on small devices-->
        </ul>

      </div>
      <div class="collapse navbar-collapse" id="AekNavbar">
        <!-- All links, or menu items placed below, will be hidden on small devices-->
        
        
        <!--
        HingeUpToDown
        ScaleTopToBottom
        -->
        <ul class="nav navbar-nav navbar-left HingeUpToDown" id="showNavUst">
          <!-- Left side navigation-->


          <li><a data-basliklar="GH" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Haberler">Haberler</a></li>
          <li><a data-basliklar="GD" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Duyurular-Etkinlikler">Duyurular-Etkinlikler</a></li>
          <li><a data-basliklar="GG" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Galeriler">Galeriler</a></li>
          <li><a data-basliklar="GAYT" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Aylik-Yemek-Listesi">Aylık Yemek Listesi</a></li>
          <li><a data-basliklar="GET" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Sinav-Takvimi">Sınav Takvimi</a></li>
          <li><a data-basliklar="GET" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Etkinlik-Takvimi">Etkinlik Takvimi</a></li>
          <li><a data-basliklar="GET" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Genel-Resimler">Resimler</a></li>
          <li><a data-basliklar="GET" class="ajax" href="<?php echo base_url(); ?>Portal/Admin/Kadro">Kadro</a></li>
          <!--<li><a data-basliklar="A" class="ajax" id="anasayfa-nav" href="<?php echo base_url(); ?>Portal/Admin/Resimler">Resimler</a></li>-->

<!-- GOOD ANIMATIONS
BounceRightToLeft
RotateRightTopFixedDown

 -->
        </ul>
        <ul class="nav navbar-nav navbar-right HingeUpToDown navbar-rightt">
          <!-- Right side navigation-->
          
        </ul>
      </div>
    </div>
  </nav>
  <!-- end AekNavbar-->
