
<!DOCTYPE html>
<html lang="tr">
<head>
  	<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<title>Anasayfa | Admin Paneli</title>


<?php $this->view('Back/back-navbar.php'); ?>


<section id="duyuruVeResim">
  <div class="container marginTB25 dark-bg">


    <section id="enyakinduyuru" class="marginTop15">
      <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
        
        <div class="col-lg-12 page-header text-center">
          <h2>En Yakın Duyuru <span class="badge" style="float: right;font-size: 50%;"><?php echo $duyurular['num']; ?></span></h2>

          <div style="display: <?php echo $duyurular['feedback']['display']; ?>" class="alert alert-<?php echo $duyurular['feedback']['alert'] ?>">
            <strong><?php echo $duyurular['feedback']['mesaj'] ?></strong>
          </div>

        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          
          <img src="<?php echo base_url(); ?>uploads/<?php echo $duyurular['duyurular']->Resim; ?>" class="img-responsive" alt="Image">
          <h4><?php echo $duyurular['duyurular']->Baslik; ?> </h4> 
          
          <p>
            <?php echo "Başlangıç Tarihi: ".$duyurular['duyurular']->Bas_Tarihi."<br> Bitiş Tarihi: ".$duyurular['duyurular']->Bit_Tarihi;  ?>
          </p>
          <div class="caption">
            <br>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 padding0">
              <?php $formAttributes = array(
                      'role' => 'form',
                      'method' => 'post',
                  ); ?>
              <?php echo form_open('Ap/General-Duyurular/DuyuruDuzenle', $formAttributes); ?> <!-- Duyuru Duzenle FORM-->
                <input type="hidden" name="No" value="<?php echo $duyurular['duyurular']->No; ?>">
                <button type="submit" class="btn btn-sm btn-success btn-block">Düzenle</button>
              <?php echo form_close(); ?>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 padding0">
              <?php echo form_open('Ap/General-Duyurular/DuyuruSil', $formAttributes); ?> <!-- Duyuru Sil FORM-->
                <input type="hidden" name="No" value="<?php echo $duyurular['duyurular']->No; ?>">
                <button type="submit" class="btn btn-sm btn-danger btn-block">Sil</button>
              <?php echo form_close(); ?>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0">
              <a href="<?php echo base_url(); ?>Ap-Duyurular" class="btn btn-sm btn-block morfillButton3">Tüm Duyuruları Gör</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="sonResim" class="marginTop15">
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
        
        <div class="col-lg-12 page-header text-center">
          <h2>Son Eklenen Resim <span class="badge" style="float: right;font-size: 50%;"><?php echo $resimler['num']; ?></span></h2>

          <div style="display: <?php echo $resimler['feedback']['display']; ?>" class="alert alert-<?php echo $resimler['feedback']['alert'] ?>">
            <strong><?php echo $resimler['feedback']['mesaj'] ?></strong>
          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          
          <div class="secrow">
            <img src="<?php echo base_url(); ?>/uploads/<?php echo $resimler['resimler']->DosyaYolu; ?>" class="img-responsive">
          </div>  
          <div class="thirdrow">
            <textarea name="type" rows="2" class="form-control" readonly="readonly">Resim ismi: <?php echo $resimler['resimler']->Isim; ?></textarea>
          </div>

          <div class="frow">
            
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0">
          <br>
              <?php $formAttributes = array(
                  'role' => 'form',
                  'method' => 'post',
              ); ?>

              <?php echo form_open('Ap/General-Resimler/ResimSil', $formAttributes); ?> <!-- Resim Sil FORM-->
                <input type="hidden" name="No" value="<?php echo $resimler['resimler']->No; ?>">
                <input type="hidden" name="DosyaYolu" value="<?php echo $resimler['resimler']->DosyaYolu; ?>">
                <button type="submit" class="btn btn-lg btn-danger btn-block">Sil</button>
              <?php echo form_close(); ?>
              <a href="<?php echo base_url(); ?>Ap-Resimler" class="btn btn-lg btn-block morfillButton3">Tüm Resimleri Gör</a>
          </div>

        </div>
      </div>
    </section>
    

  </div>
</section>

<section id="duyuruVeResim">
  <div class="container marginTB25 dark-bg">


    <section id="enyakinduyuru" class="marginTop15">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        
        <div class="col-lg-12 page-header text-center">
          <h2>Pasif Yorumlar <span class="badge" style="float: right;font-size: 50%;"><?php echo $yorumlar['num']; ?></span></h2>

          <div style="display: <?php echo $yorumlar['feedback']['display']; ?>" class="alert alert-<?php echo $yorumlar['feedback']['alert'] ?>">
            <strong><?php echo $yorumlar['feedback']['mesaj'] ?></strong>
          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          
          <div class="table-responsive">
            <table class="table table-bordered table-hover" style="width: 100%">
              <thead class="text-center">
                <th class="text-center">Yorum</th>
                <th class="text-center">İsim</th>
                <th class="text-center">Durum</th>
                <th class="text-center">Aktif Et</th>
                <th class="text-center">Sil</th>
              </thead>
              <tbody>
                <?php foreach ($yorumlar['yorumlar'] as $yorum) { ?>

                  <tr>
                    <td style="word-break:break-all;"><?php echo $yorum->Yorum; ?></td>
                    <td><?php echo $yorum->Isim; ?></td>
                    <td>
                      <?php if ($yorum->Durum == 0) { 
                        echo "Pasif";
                       } else { 
                        echo "Aktif";
                       } ?>
                    </td>
                    <td>
                      <?php if ($yorum->Durum == 0) { ?>
                        <?php $formAttributes = array(
                            'role' => 'form',
                            'method' => 'post',
                        ); ?>

                        <?php echo form_open('Ap/Anasayfa-Yorumlar/YorumAktifEtA', $formAttributes); ?> <!-- Yorum Aktif Et FORM-->
                          <input type="hidden" name="No" value="<?php echo $yorum->No; ?>">
                          <button type="submit" class="btn btn-sm btn-success btn-block">Aktif Et</button>
                        <?php echo form_close(); ?>
                      <?php }  ?>
                    </td>
                    <td>
                      <?php echo form_open('Ap/Anasayfa-Yorumlar/YorumSilA', $formAttributes); ?>
                        <input type="hidden" name="No" value="<?php echo $yorum->No; ?>">
                        <button type="submit" class="btn btn-sm btn-danger btn-block">Sil</button>
                      <?php echo form_close(); ?>
                    </td>
                  </tr>
                  
                <?php } ?>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </section>
    

  </div>
</section>

<script type="text/javascript">
  window.setTimeout(function() {
      window.location.href = '<?php echo base_url(); ?>Ap/Dashboard';
  }, 20000);
</script>
<?php $this->view('Back/back-footer.php'); ?>