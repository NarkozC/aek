
 $(document).ready(function(){
    GetYorumlar();

    
    if (en) {
      $('#YorumYapModal').html('Comment');
    }
  });

  function GetYorumlar(){
    var url = baseurl+'Anasayfa/GetActiveYorumlar';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var active = '';
        var i;
        var Yorum;
        var Isim;
        for(i=0; i<data.length; i++){
          if (en) {
            if (data[i].en_Yorum == "") {
              Yorum = data[i].tr_Yorum;
            } else {
              Yorum = data[i].en_Yorum;
            }

            if (data[i].en_Isim == "") {
              Isim = data[i].tr_Isim;
            } else {
              Isim = data[i].en_Isim;
            }
          } else {
            if (data[i].tr_Yorum == "") {
              Yorum = data[i].en_Yorum;
            } else {
              Yorum = data[i].tr_Yorum;
            }

            if (data[i].tr_Isim == "") {
              Isim = data[i].en_Isim;
            } else {
              Isim = data[i].tr_Isim;
            }
          }

          if (i==0) {
            active = 'active'
          } else {
            active = '';
          }
          html +=
            '<div class="item '+active+'">'+
            '<div class="col-sm-12 paddingLeft20">'+
            '<p>'+
            '<span class="shorten_content">'+Yorum+'</span>'+
            '<small style="font-weight: bold"><br>-'+Isim+'</small>'+
            '</p>'+
            '</div>'+
            '</div>';
          $('#showYorumlar').html(html);
        }
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }


    $('#YorumYapModal').click(function(){
      $('#yorumYap-form').attr('action', baseurl+'Anasayfa/AddYorum');

      // reset the form
      $('#yorumYap-form')[0].reset();
      $('.text-danger').remove();
      $('.ajax-group').removeClass('has-error').removeClass('has-success');

      if (en) {
        $('#yorumYap-form input[name=tr_Isim]').attr('placeholder','Your Name and Surname');
        $('#yorumYap-form input[name=tr_Email]').attr('placeholder','Your E-mail');
        $('#yorumYap-form textarea[name=tr_Yorum]').attr('placeholder','Your Comment');
        $('#yorumYap-form input[name=tr_Isim]').attr('id','en_Isim');
        $('#yorumYap-form input[name=tr_Email]').attr('id','en_Email');
        $('#yorumYap-form textarea[name=tr_Yorum]').attr('id','en_Yorum');
        $('#yorumYap-form input[name=tr_Isim]').attr('name','en_Isim');
        $('#yorumYap-form input[name=tr_Email]').attr('name','en_Email');
        $('#yorumYap-form textarea[name=tr_Yorum]').attr('name','en_Yorum');
        $('#yorumYap-form #YorumlarSubmit').html('Send');
        $('.morfillButton5').html('Cancel');
      } 
    
      $('#yorumYap-modal').modal('show');
    });


    $('#YorumlarSubmit').click(function(){

      var form = $('#yorumYap-form');
      var modal = $('#yorumYap-modal');     

      var url = form.attr('action');
      var data = form.serializeArray();
      data.push({name: 'English', value: String(en)});
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

            GetYorumlar();

            $(modal).modal('hide');
            if (en == true) {
              iziToast.success({
                  title: 'OK',
                  message: 'Comment successfully sent!',
              });
            } else {
              iziToast.success({
                  title: 'OK',
                  message: 'Yorum başarıyla gönderildi!',
              });
            }
            
          }else{
            var ajaxGroup;
            var captcha;
            if (response.captcha == false) {
              captcha = false
            } else {
              captcha = true
            }
            if (response.messages) {
              $.each(response.messages, function(key, value) {
                var element = $('#' + key);
                ajaxGroup = element.parents('.ajax-group:first');
                ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success');
                ajaxGroup.after(value);
              });
              if (captcha == false) {
                if (en) {
                  $('#yreCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> could not be verified!</p>');
                } else {
                  $('#yreCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> doğrulanamadı!</p>');
                }
              }
            } else {
              if (captcha == false) {
                if (en) {
                  $('#yreCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> could not be verified!</p>');
                } else {
                  $('#yreCaptcha').after('<p class="text-danger marginBot10"><strong>Captcha</strong> doğrulanamadı!</p>');
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