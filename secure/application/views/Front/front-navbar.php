  <meta name="description" content="Özel Ankara Eğitim Kurumları, 1994 de Okul Öncesi ile başladığı eğitim hayatına, daha sonra diğer okullarını da ekleyerek eğitim öğretim hayatına devam ediyor.">
  <link rel="alternate" hreflang="tr" href="<?php echo base_url(); ?>" />
  <link rel="alternate" hreflang="en" href="<?php echo base_url(); ?>en" />
  <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url(); ?>resources/images/aek-logo.png" />
  <!-- CSSs -->
  <?php $this->view('Front/front-css.php'); ?>
  <script type="text/javascript">
    var baseurl = '<?php echo base_url(); ?>';
  </script>
  <script src="<?php echo base_url(); ?>resources/js/jquery.min.js"></script>
  <script src="<?php echo base_url(); ?>resources/js/jssor.slider.min.js"></script>
  <script src="<?php echo base_url(); ?>resources/js/headerscript.js"></script>
  <script src="<?php echo base_url(); ?>resources/js/Front/nav-ust.js"></script>
</head>
<body>
<div id="loader-container">
  <div id="loader">
    <div id="top"></div>
    <div id="bottom"></div>
    <div id="line"></div>
  </div>
</div>

  <div id="page">

  
  <!-- begin AekNavbar           -->
  <nav class="navbar navbar-custom-dek no-active-arrow navbar-fixed-top xs-height75 dropdown-onhover no-fix" role="navigation">
    <div class="container-fluid padding0" id="nav-banner">
      <div class="row text-center">
        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <a class="navbar-brand" href="<?php echo base_url(); ?>"><img class="img-responsive" src="<?php echo base_url(); ?>resources/images/aek-logo.png" alt="LOGO"></a>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <h3 class="paddingB0 paddingT25">Özel Ankara Eğitim Kurumları</h3>
          <!--<h3 class="paddingB0 paddingT0">AEK DOKTORLAR INTERNATIONAL PREMIER COLLAGE</h3>-->
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

  <br>
  <section id="popup">

  </section>
<!--
  <div id="showNavYan"></div>
  <script src="<?php echo base_url(); ?>resources/js/Front/nav-yan.js"></script>
  <div style="position: relative;z-index: 99999999;background-color: red;">
    <a id="dek-side-navbar-button" href="#dek-side-navbar" style="position: fixed;z-index: 99;background-color: #e6e6e6; right: 0;bottom: 50%;margin-right: 0px;border-top-left-radius: 15px;border-bottom-left-radius: 15px;padding: 10px;"><i class="fa fa-lg fa-arrow-left" aria-hidden="true"></i></a>
  </div>
--> 