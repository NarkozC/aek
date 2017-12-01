 var YaziForm =  $('#bannerYazi-form');
 var YaziModal = $('#bannerYazi-modal');
  $(function(){

    $('#editbannerYaziButton').click(function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = 1;
      $(YaziForm).attr('action', baseurl+'Ap/Anasayfa-Banner/UpdateBannerYazi');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/Anasayfa-Banner/EditBannerYazi',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          console.log('success')
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=tr_BtnYazi]').val(result.data.tr_BtnYazi);
            $('input[name=en_BtnYazi]').val(result.data.en_BtnYazi);
            $('input[name=tr_Link]').val(result.data.tr_Link);
            $('input[name=en_Link]').val(result.data.en_Link);
            $('textarea[name=tr_Yazi]').val(result.data.tr_Yazi);
            $('textarea[name=en_Yazi]').val(result.data.en_Yazi);

            $('.nav-tabs a[href="#Yturkce-tab"]').tab('show');
            $(YaziModal).modal('show');
          } else {
            iziToast.error({
                title: 'Hata!',
                message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
            });
          }
          
        },
        error: function(){

          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
          });
        }
      });

    }
    $link.data('lockedAt', +new Date()); 
  });

    $('#BannerYaziSubmit').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

        var url = YaziForm.attr('action');
        var data = YaziForm.serialize();
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
              if(response.type=='add'){
                var type = 'eklendi!'
              }else if(response.type=='update'){
                var type ="güncellendi!"
              }

              $(YaziModal).modal('hide');

              iziToast.success({
                  title: 'OK',
                  message: 'Banner Yazısı başarıyla '+type,
              });
            } else {
              
              var ajaxGroup;
              if (response.NoV == true) {

                $(YaziModal).modal('hide');

                iziToast.error({
                    title: 'Hata!',
                    message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
                });
              } else {

                $.each(response.messages, function(key, value) {
                  var element = $('#' + key);
                  ajaxGroup = element.parents('.ajax-group:first');
                  ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success')
                  
                  ajaxGroup.after(value);
                });

              }
              
            }
          },
          error: function(){

            $(YaziModal).modal('hide');

            iziToast.error({
                title: 'Hata!',
                message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
            });
          }
        });

      }
      $link.data('lockedAt', +new Date()); 
    });

  });
