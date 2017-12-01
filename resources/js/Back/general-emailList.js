var Form = $('#email-form');
var Modal = $('#email-modal');
  $(function(){

    RefreshData()

    //Add New
    $('#sendemailsModal').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        $('#sendEmails-form').attr('action', baseurl+'Ap/General-Email-List/SendEmails');

        // reset the form
        $('#sendEmails-form')[0].reset();
        $('.text-danger').remove();
        $('.ajax-group').removeClass('has-error').removeClass('has-success');

        $('#sendEmails-modal').modal('show');
      }
      $link.data('lockedAt', +new Date()); 
    });

    $('#SendEmailsSubmit').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        var form = $('#sendEmails-form');
        var modal = $('#sendEmails-modal');

        var url = form.attr('action');
        var data = form.serialize();
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

              RefreshData();

              $(modal).modal('hide');
              
              iziToast.success({
                  title: 'OK',
                  message: 'Email başarıyla gönderildi!',
              });
            }else{
              var ajaxGroup;
              $.each(response.messages, function(key, value) {
                var element = $('#' + key);
                ajaxGroup = element.parents('.ajax-group:first');
                ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success')
                
                ajaxGroup.after(value);
              });

            }
          },
          error: function(){
            $(modal).modal('hide');
            iziToast.error({
                title: 'Hata!',
                message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
            });
          }
        });
      }
      $link.data('lockedAt', +new Date()); 
    });

    //Add New
    $('#addemailModal').click(function(e){
      var $link = $(e.target);
        if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        $(Form).attr('action', baseurl+'Ap/General-Email-List/AddEmail');

        // reset the form
        $(Form)[0].reset();
        $('.text-danger').remove();
        $('.ajax-group').removeClass('has-error').removeClass('has-success');

        $(Modal).modal('show');
      }
      $link.data('lockedAt', +new Date()); 
    });

    $('#EmailListSubmit').click(function(e){
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

                $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside);  $(this).css('background-color', '#EDEDED').fadeIn(); });
              }

              iziToast.success({
                  title: 'OK',
                  message: 'Email başarıyla '+type,
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
      $(Form).attr('action', baseurl+'Ap/General-Email-List/UpdateEmail');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Email-List/EditEmail',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=Isim]').val(result.data.Isim);
            $('input[name=Email]').val(result.data.Email);

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
          url: baseurl+'Ap/General-Email-List/DeleteEmail',
          data:{No:No},
          dataType: 'json',
          success: function(result){
            if(result.success){
              $('#deleteModal').modal('hide');

              $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });

              iziToast.success({
                title: 'OK',
                message: 'Email başarıyla silindi!',
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





  var isGetEmailListFirst = true;
  //functions
  function GetEmailList(){
    var url = baseurl+'Ap/General-Email-List/GetEmailList';

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
          var trInside = GetHtmlTr(data[i]);
          html +='<tr>'+trInside+'</tr>';
        }
        $('#showdata').html(html);
        if (!isGetEmailListFirst) {
          CreateDataTables();
        }
        isGetEmailListFirst = false;
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }


  function GetEmailListNum(){
    var url = baseurl+'Ap/General-Email-List/GetEmailListNum';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = data;
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
    var Isim = data.Isim;
    var Email = data.Email;

    newHtml = '<td>'+Isim+'</td>'+
                '<td>'+Email+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners item-delete" data="'+No+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
                '</td>';
    return newHtml;
  }

  function RefreshData(){
    GetEmailList();
    GetEmailListNum();
  }