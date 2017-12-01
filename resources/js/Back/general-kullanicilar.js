 var Form =  $('#kullanicilar-form');
 var Modal = $('#kullanicilar-modal');
  $(function(){

    RefreshData()

    $('#addkullanicilarButton').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
          $('input[name=Email]').closest('.ajax-group').show();
          $('input[name=Password]').closest('.ajax-group').show();

          $('input[name=OldPass]').closest('.ajax-group').hide();
          $('input[name=NewEmail]').closest('.ajax-group').hide();
          $('input[name=NewPass]').closest('.ajax-group').hide();
          $(Form).attr('action', baseurl+'Ap/General-Kullanicilar/AddKullanici');
          // reset the Form
          $(Form)[0].reset();
          $('#tr_Resim').selectpicker('val', '');
          $('#en_Resim').selectpicker('val', '');
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');

          $('.nav-tabs a[href="#turkce-tab"]').tab('show');
          $(Modal).modal('show');
      }
      $link.data('lockedAt', +new Date());
    });

    $('#KullanicilarSubmit').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        if ($('#en_Resim').selectpicker('val') == "0") {
          $('#en_Resim').selectpicker('val', '');
        }
        if ($('#tr_Resim').selectpicker('val') == "0") {
          $('#tr_Resim').selectpicker('val', '');
        }
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

                $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside);  $(this).css('background-color', '#EDEDED').fadeIn(); });
              }

              iziToast.success({
                  title: 'OK',
                  message: 'Kullanıcı başarıyla '+type,
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

  $('#showdata').on('click', '.item-password', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      $(Form).attr('action', baseurl+'Ap/General-Kullanicilar/UpdatePassword');

      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Kullanicilar/EditKullanici',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=Email]').val(result.data.Email);
            $('input[name=Email]').closest('.ajax-group').hide();
            $('input[name=NewEmail]').closest('.ajax-group').hide();
            $('input[name=Password]').closest('.ajax-group').hide();

            $('input[name=OldPass]').closest('.ajax-group').show();
            $('input[name=NewPass]').closest('.ajax-group').show();
            
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


  //delete
  $('#showdata').on('click', '.item-delete', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      var btn = $(this);
      var No = $(this).attr('data');
       
      $('#deleteModal').modal('show');
      //prevent previous handler - unbind()
      $('#btnDelete').unbind().click(function(){
        $.ajax({
          type: 'ajax',
          method: 'post',
          async: false,
          url: baseurl+'Ap/General-Kullanicilar/DeleteKullanici',
          data:{No:No},
          dataType: 'json',
          success: function(result){
            if(result.success){
              $('#deleteModal').modal('hide');

              $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });

              iziToast.success({
                title: 'OK',
                message: 'Kullanıcı başarıyla silindi!',
              });
            } else {
              RefreshData()

              $('#deleteModal').modal('hide');

              iziToast.error({
                  title: 'Hata!',
                  message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
              });
            }
        },
        error: function(){
          RefreshData()

          $('#deleteModal').modal('hide');

          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
          });
        }
        });

      });

    }
    $link.data('lockedAt', +new Date()); 
  });




  var isGetKullanicilarFirst = true;
  //functions
  function GetKullanicilar(){
    var url = baseurl+'Ap/General-Kullanicilar/GetKullanicilar';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){

        if ( $.fn.DataTable.isDataTable('.datatable') ) {
          $('.datatable').DataTable().destroy();
        }
        
        var html = '';
        var i;
        for(i=0; i<data.length; i++){
          if (data[i].Email != "sasiogludogucan@gmail.com") {
            var trInside = GetHtmlTr(data[i]);
            html +='<tr>'+trInside+'</tr>';
          }
        }
        $('#showdata').html(html);
        if (!isGetKullanicilarFirst) {
          CreateDataTables();
        }
        isGetKullanicilarFirst = false;
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetKullanicilarNum(){
    var url = baseurl+'Ap/General-Kullanicilar/GetKullanicilarNum';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = (Number(data)-1);
        $('#num').html(html);
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
    var Email = data.Email;
    var SonOturum = data.user_last_login;

    newHtml = '<td>'+Email+'</td>'+
                '<td>'+SonOturum+'</td>'+ 
                '<td>'+
                  '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-password" data="'+No+'"><i class="fa fa-key" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners item-delete" data="'+No+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
                '</td>';
    return newHtml;
  }

  function RefreshData(){
    GetKullanicilar();
    GetKullanicilarNum();
  }