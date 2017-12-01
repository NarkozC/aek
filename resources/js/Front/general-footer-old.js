$(document).ready(function(){
  GetFooter();
  if (en) {
    $('#iletisim-form input[name=Isim]').attr('placeholder','Your Name and Surname');
    $('#iletisim-form input[name=Email]').attr('placeholder','Your E-mail');
    $('#iletisim-form textarea[name=Mesaj]').attr('placeholder','Your Message');
    $('#iletisim-form #IletisimSubmit').html('Submit');
  }
  
  $('#IletisimSubmit').click(function(){

    var form = $('#iletisim-form');

    var url = baseurl+'Iletisim/MesajIletisim';
    var data = form.serializeArray();
    data.push({name: 'English', value: String(en)});
    data.push({name: 'ReCaptcha', value: recaptchaResponses['ireCaptcha']});
    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      data: data,
      async: false,
      dataType: 'json',
      success: function(response){
        $('.text-danger').remove();
        $('.ajax-group').removeClass('has-error').removeClass('has-success');
        if(response.success){
          // reset the form
          form[0].reset();
          $(form)[0].reset();

          iziToast.success({
              title: 'OK',
              message: 'Mesaj başarıyla gönderildi!',
          });
        }else{
          var ajaxGroup;
          var captcha;
          if (response.captcha != undefined) {
            if (response.captcha == true) {
              captcha = true
            } else {
              captcha = false
            }
          }
          if (response.messages) {
            $.each(response.messages, function(key, value) {
              var element = $('#' + key);
              ajaxGroup = element.parents('.ajax-group:first');
              ajaxGroup.removeClass('has-error')
              .addClass(value.length > 0 ? 'has-error' : 'has-success')

              ajaxGroup.after(value);
            });
            if (captcha == false) {
              if (en) {
                $('#ireCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> could not be verified!</p>');
              } else {
                $('#ireCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> doğrulanamadı!</p>');
              }
            }
          } else {
            if (captcha == false) {
              if (en) {
                $('#ireCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> could not be verified!</p>');
              } else {
                $('#ireCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> doğrulanamadı!</p>');
              }
            } else {
              iziToast.error({
                  title: 'Hata!',
                  message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
              });
            }
          }
          

        }
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  });



});


function GetFooter(){
  var url = baseurl+'Footer/GetFooter';

  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      var html = '';
      var i;
      var Tel1;
      var Tel2;
      var Email;
      var Adres;
      var Facebook;
      var Twitter;
      var Youtube;
      var Instagram;
      var YolTarifi;
      var Animation = 'fadeIn';
      var dteNow = new Date();
      var intYear = dteNow.getFullYear();
      html += '<section id="iletisim" class="wow '+Animation+'" data-wow-delay="'+wowDelay+'">';
      if (en) {
        if (data.en_Tel1 == "") {
          Tel1 = data.tr_Tel1;
        } else {
          Tel1 = data.en_Tel1;
        }

        if (data.en_Tel2 == "") {
          Tel2 = data.tr_Tel2;
        } else {
          Tel2 = data.en_Tel2;
        }

        if (data.en_Email == "") {
          Email = data.tr_Email;
        } else {
          Email = data.en_Email;
        }

        if (data.en_Adres == "") {
          Adres = data.tr_Adres;
        } else {
          Adres = data.en_Adres;
        }

        if (data.en_Facebook == "") {
          Facebook = data.tr_Facebook;
        } else {
          Facebook = data.en_Facebook;
        }

        if (data.en_Twitter == "") {
          Twitter = data.tr_Twitter;
        } else {
          Twitter = data.en_Twitter;
        }

        if (data.en_Youtube == "") {
          Youtube = data.tr_Youtube;
        } else {
          Youtube = data.en_Youtube;
        }

        if (data.en_Instagram == "") {
          Instagram = data.tr_Instagram;
        } else {
          Instagram = data.en_Instagram;
        }
        YolTarifi = "Directions";
      } else {
        Tel1 = data.tr_Tel1;
        Tel2 = data.tr_Tel2;
        Email = data.tr_Email;
        Adres = data.tr_Adres;
        Facebook = data.tr_Facebook;
        Twitter = data.tr_Twitter;
        Youtube = data.tr_Youtube;
        Instagram = data.tr_Instagram;
        YolTarifi = "Yol Tarifi";
      }

      html += '<div class="container-fluid dark-bg shadow">'+
              '<div class="row">'+
              '<div class="col-lg-12 text-center">'+
              '<h2 data-baslik="GF" class="wow fadeIn" data-wow-delay="'+(Number(wowDelayS)+0.2)+'s">İletişim</h2>'+
              '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header wow fadeIn" data-wow-delay="'+(Number(wowDelayS)+0.2)+'s">'+
              '<ul class="social">'+
              '<li class="facebook"><a href="'+Facebook+'"><i class="fa fa-facebook fa-2x"></i></a></li>'+
              '<li class="twitter"><a href="'+Twitter+'"><i class="fa fa-twitter fa-2x"></i></a></li>'+
              '<li class="youtube"><a href="'+Youtube+'"><i class="fa fa-youtube fa-2x"></i></a></li>'+
              '<li class="instagram"><a href="'+Instagram+'"><i class="fa fa-instagram fa-2x"></i></a></li>'+
              '</ul>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '<div class="row margin0">'+
              '<div class="text-center col-lg-3 col-md-5 col-xs-5 col-sm-5 marginBot10 wow fadeIn" data-wow-delay="'+(Number(wowDelayS)+0.4)+'s">'+
              '<div id="iletisimBilgiler">'+
              '<p>'+
              '<a class="btn-danger btn btn-md btn-block" href="https://www.google.com/maps/dir//%C3%9Cmitk%C3%B6y+-+Alacaatl%C4%B1+K%C3%B6y%C3%BC+Yolu+No:32,+Prof.+Dr.+Ahmet+Taner+K%C4%B1%C5%9Flal%C4%B1+Mahallesi,+06810+Yenimahalle%2FAnkara,+T%C3%BCrkiye/@39.8768056,32.685151,17z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x14d338c460c1eb4d:0x3765ffef349aedc3!2m2!1d32.6873397!2d39.8768056?hl=tr-TR" target="_blank">'+
              '<i class="fa fa-map-marker fa-2x"></i><br>'+YolTarifi+
              '</a>'+
              '</p>'+
              '<div class="marginTop20"></div>'+
              '<p>'+
              '<a class="btn-danger btn btn-md btn-block" href="tel:+90'+Tel1+'">'+
              '<i class="fa fa-phone fa-2x"></i><br>İlkokul-Ortaokul<br>'+Tel1+
              '</a>'+
              '</p>'+
              '<div class="marginTop20"></div>'+
              '<p>'+
              '<a class="btn-danger btn btn-md btn-block" href="tel:+90'+Tel2+'">'+
              '<i class="fa fa-phone fa-2x"></i><br>Lise<br>'+Tel2+
              '</a>'+
              '</p>'+
              '<div class="marginTop20"></div>'+
              '<p>'+
              '<span>'+Adres+'</span>'+
              '<br> <br>'+
              '<a id="iletisim_mail" href="mailto:'+Email+'">'+Email+'</a>'+
              '</p>'+
              '</div>'+
              '</div>'+
              '<div class="text-center col-lg-4 col-md-7 col-xs-7 col-sm-7 marginBot10 wow fadeIn" data-wow-delay="'+(Number(wowDelayS)+0.7)+'s">'+
              '<form id="iletisim-form" class="text-center" role="form" method="post" action="'+baseurl+'Iletisim/MesajIletisim">'+
              '<div class="ajax-group first">'+
              '<input name="Isim" id="Isim" class="form-control" type="text" placeholder="Adınız ve Soyadınız">'+
              '</div>'+
              '<div class="ajax-group">'+
              '<input name="Email" id="Email" class="form-control" type="text" placeholder="E-mailiniz">'+
              '</div>'+
              '<div class="ajax-group">'+
              '<textarea rows="7" class="form-control" id="Mesaj" name="Mesaj" placeholder="Mesajınız"></textarea>'+
              '</div>'+
              '<div class="ajax-group">'+
              '<div id="ireCaptcha"></div>'+
              '</div>'+
              '<button type="button" id="IletisimSubmit" class="btn-danger btn btn-lg btn-block">Gönder</button>'+
              '</form>'+
              '</div> '+
              '<div class="text-center col-lg-5 col-md-12 col-xs-12 col-sm-12 marginBot10 wow fadeIn" data-wow-delay="'+(Number(wowDelayS)+1)+'s">'+
              '<iframe class="iltGM" frameborder="0" style="border:0" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12249.712162523172!2d32.683031!3d39.864649!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8718bc35e6adb3f1!2sDEK+Doktorlar+E%C4%9Fitim+Kurumlar%C4%B1!5e0!3m2!1str!2str!4v1502438849349" allowfullscreen></iframe>'+
              '</div>'+
              '</div>'+
              '</div>';

      html += '<footer class="text-center">'+
              '<div class="container>'+
              '<div class="row">'+
              '<div class="col-xs-12 text-center shadow dark-bg" id="footer">'+
              '<p class="co">Copyright © '+intYear+' AEK. <i class="fa fa-lg fa-paint-brush" aria-hidden="true"></i> + <i class="fa fa-lg fa-code" aria-hidden="true"></i> by <b class="hvr-wobble-skew">Doğucan Şaşıoğlu</b></p>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '</footer>'+
              '</section>';
      $('#showFooter').html(html);
    },
    error: function(){
      iziToast.error({
          title: 'Hata!',
          message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
      });
    }
  });
}

/*


*/