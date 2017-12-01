   <!--  <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url(); ?>resources/images/aek-logo.png" />
<?php $this->view('Back/back-css.php'); ?>
<script type="text/javascript">
  var baseurl = '<?php echo base_url(); ?>';
      var ajaxLoader = '#ajax-loader-container';
</script>
<script src="<?php echo base_url(); ?>resources/js/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>resources/js/jssor.slider.min.js"></script>
<script src="<?php echo base_url(); ?>resources/js/headerscript.js"></script>
</head>

<body>
  <div id="loader-container">
    <div id="loader">
      <div id="top"></div>
      <div id="bottom"></div>
      <div id="line"></div>
    </div>
  </div>
  <div id="ajax-loader-container">
    <div id="ajax-loader">
      <img src="<?php echo base_url(); ?>resources/images/Genel/ajax-loader.gif" class="img-responsive">
    </div>
  </div>
  <div id="back-menu" style="margin-top: -100px;">
    <nav>
      <h2><i class="fa fa-reorder"></i>&nbsp;</h2>
      <ul>
        <li> <a href="<?php echo base_url(); ?>Portal">Portal Anasayfa</a> 
        </li>
        <li> <a href="#"><i class="fa fa-desktop"></i>Web</a>
          <h2><i class="fa fa-desktop"></i>Web</h2>
          <ul>
            <li> <a href="#"><i class="fa fa-phone"></i>Genel</a>
              <h2><i class="fa fa-phone"></i>Genel</h2>
              <ul>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Resimler">Resimler</a> 
                </li>
              </ul>
            </li>
            <li> <a href="#"><i class="fa fa-desktop"></i>Web Anasayfa</a>
              <h2><i class="fa fa-desktop"></i>Web Anasayfa</h2>
              <ul>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Haberler">Haberler</a> 
                </li>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Duyurular-Etkinlikler">Duyurular-Etkinlikler</a> 
                </li>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Galeriler">Galeriler</a> 
                </li>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Aylik-Yemek-Listesi">Aylık Yemek Listesi</a> 
                </li>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Sinav-Takvimi">Sınav Takvimi</a> 
                </li>
                <li> <a href="<?php echo base_url(); ?>Portal/Admin/Etkinlik-Takvimi">Etkinlik Takvimi</a> 
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
  <div id="pushobj"> -->