 var Form =  $('#footer-form');
 var Modal = $('#footer-modal');
  $(function(){

    RefreshData()

    $('#FooterSubmit').click(function(e){
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
              if(response.type=='add'){
                var type = 'eklendi!'

                RefreshData() 

                $(Modal).modal('hide');

              }else if(response.type=='update'){
                var type ="güncellendi!"
                var No = response.data.No;
                
                var trInside = GetHtmlTr(response.data);
                $(Modal).modal('hide');

                $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });
              }

              iziToast.success({
                  title: 'OK',
                  message: 'Footer başarıyla '+type,
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
      $(Form).attr('action', baseurl+'Ap/General-Footer/UpdateFooter');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Footer/EditFooter',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=tr_Tel1]').val(result.data.tr_Tel1);
            $('input[name=en_Tel1]').val(result.data.en_Tel1);
            $('input[name=tr_Tel2]').val(result.data.tr_Tel2);
            $('input[name=en_Tel2]').val(result.data.en_Tel2);
            $('input[name=tr_Email]').val(result.data.tr_Email);
            $('input[name=en_Email]').val(result.data.en_Email);
            $('textarea[name=tr_Adres]').val(result.data.tr_Adres);
            $('textarea[name=en_Adres]').val(result.data.en_Adres);
            $('input[name=tr_Facebook]').val(result.data.tr_Facebook);
            $('input[name=en_Facebook]').val(result.data.en_Facebook);
            $('input[name=tr_Twitter]').val(result.data.tr_Twitter);
            $('input[name=en_Twitter]').val(result.data.en_Twitter);
            $('input[name=tr_Youtube]').val(result.data.tr_Youtube);
            $('input[name=en_Youtube]').val(result.data.en_Youtube);
            $('input[name=tr_Instagram]').val(result.data.tr_Instagram);

            $('.nav-tabs a[href="#turkce-tab"]').tab('show');
            $(Modal).modal('show');
          } else {
          	console.log('error')
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


  //functions
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

      	var trInside = GetHtmlTr(data);
      	html +='<tr>'+trInside+'</tr>';
        
        $('#showdata').html(html);
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
    var Tel1;
    var Tel2;
    var Email;
    var Adres;
    var Facebook;
    var Twitter;
    var Youtube;
    var Instagram;

    var TRTel1 = data.tr_Tel1;
    var TRTel2 = data.tr_Tel2;
    var TREmail = data.tr_Email;
    var TRAdres = data.tr_Adres;
    var TRFacebook = data.tr_Facebook;
    var TRTwitter = data.tr_Twitter;
    var TRYoutube = data.tr_Youtube;
    var TRInstagram = data.tr_Instagram;

    var ENTel1 = data.en_Tel1;
    var ENTel2 = data.en_Tel2;
    var ENEmail = data.en_Email;
    var ENAdres = data.en_Adres;
    var ENFacebook = data.en_Facebook;
    var ENTwitter = data.en_Twitter;
    var ENYoutube = data.en_Youtube;
    var ENInstagram = data.en_Instagram;

    if (ENTel1 == "") {
      Tel1 = TRTel1;
    } else {
      Tel1 = TRTel1+' | '+ENTel1;
    }
    if (ENTel2 == "") {
      Tel2 = TRTel2;
    } else {
      Tel2 = TRTel2+' | '+ENTel2;
    }
    if (ENEmail == "") {
      Email = TREmail;
    } else {
      Email = TREmail+' | '+ENEmail;
    }
    if (ENAdres == "") {
      Adres = TRAdres;
    } else {
      Adres = TRAdres+' | '+ENAdres;
    }
    if (ENFacebook == "") {
      Facebook = TRFacebook;
    } else {
      Facebook = TRFacebook+' | '+ENFacebook;
    }
    if (ENTwitter == "") {
      Twitter = TRTwitter;
    } else {
      Twitter = TRTwitter+' | '+ENTwitter;
    }
    if (ENYoutube == "") {
      Youtube = TRYoutube;
    } else {
      Youtube = TRYoutube+' | '+ENYoutube;
    }
    if (ENInstagram == "") {
      Instagram = TRInstagram;
    } else {
      Instagram = TRInstagram+' | '+ENInstagram;
    }

    newHtml = '<td class="shorten_content4">'+Tel1+'</td>'+
    			'<td class="shorten_content4">'+Tel2+'</td>'+
    			'<td class="shorten_content4">'+Email+'</td>'+
    			'<td class="shorten_content4">'+Adres+'</td>'+
    			'<td class="shorten_content4">'+Facebook+'</td>'+
    			'<td class="shorten_content4">'+Twitter+'</td>'+
    			'<td class="shorten_content4">'+Youtube+'</td>'+
    			'<td class="shorten_content4">'+Instagram+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a> '+
                '</td>';
    return newHtml;
  }

  function RefreshData(){
    GetFooter();
    $(function(){
      RefreshSideData();
    });
  }

  var isFirst = true;
  function RefreshSideData(){
    $(function(){
      if (!isFirst) {
        ShortenContent4();
      }
      isFirst = false;
    });
  }

  