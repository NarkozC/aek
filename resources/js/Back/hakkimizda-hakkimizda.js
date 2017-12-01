 var Form =  $('#hakkimizda-form');
 var Modal = $('#hakkimizda-modal');
  $(function(){

    RefreshData()

    $('#HakkimizdaSubmit').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

        var url = Form.attr('action');
        var data = Form.serialize();
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
              var No = response.data.No;
              var trInside = GetHtmlTr(response.data);

              $(Modal).modal('hide');

              $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });

              iziToast.success({
                  title: 'OK',
                  message: 'Hakkimizda başarıyla güncellendi!',
              });
            } else {
              
              var ajaxGroup;
              if (response.NoV == true) {
                RefreshData()

                $(Modal).modal('hide');

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
            RefreshData()

            $(Modal).modal('hide');

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

  //edit
  $('#showdata').on('click', '.item-edit', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      $(Form).attr('action', baseurl+'Ap/Hakkimizda-Hakkimizda/UpdateHakkimizda');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/Hakkimizda-Hakkimizda/EditHakkimizda',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('textarea[name=tr_Yazi]').val(result.data.tr_Yazi);
            $('textarea[name=en_Yazi]').val(result.data.en_Yazi);

            $('.nav-tabs a[href="#turkce-tab"]').tab('show');
            $(Modal).modal('show');
          } else {
            RefreshData()
            iziToast.error({
                title: 'Hata!',
                message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
            });
          }
          
        },
        error: function(){
          RefreshData()
          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
          });
        }
      });

    }
    $link.data('lockedAt', +new Date()); 
  });

  var isGetHakkimizdaFirst = true;
  //functions
  function GetHakkimizda(){
    var url = baseurl+'Hakkimizda/GetHakkimizda';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var i;
        var trInside = GetHtmlTr(data);
        html +='<tr>'+trInside+'</tr>';
        
        $('#showdata').html(html);
        if (isGetHakkimizdaFirst == false) {
          ShortenContent8();
        }
        isGetHakkimizdaFirst = false;
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetHtmlTr(data){
    var No = data.No;
    var TRYazi = data.tr_Yazi;
    var ENYazi = data.en_Yazi;

    newHtml = '<td class="shorten_content8">'+TRYazi+'</td>'+
              '<td class="shorten_content8">'+ENYazi+'</td>'+
              '<td>'+
                '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a>'+
              '</td>';
    return newHtml;
  }

  


  function RefreshData(){
    GetHakkimizda();
    $(function(){
      RefreshSideData();
    });
  }

  var isFirst = true;
  function RefreshSideData(){
    $(function(){
      if (!isFirst) {
        ShortenContent8();
      }
      isFirst = false;
    });
  }