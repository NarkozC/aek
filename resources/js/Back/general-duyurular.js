 var Form =  $('#duyurular-form');
 var Modal = $('#duyurular-modal');
  $(function(){

    RefreshData()

    $('#addduyurularButton').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
          GetResimler();
          $(Form).attr('action', baseurl+'Ap/General-Duyurular/AddDuyuru');
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

    $('#DuyurularSubmit').click(function(e){
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

                $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });
              }

              iziToast.success({
                  title: 'OK',
                  message: 'Duyuru başarıyla '+type,
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
      $(Form).attr('action', baseurl+'Ap/General-Duyurular/UpdateDuyuru');
      GetResimler();
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Duyurular/EditDuyuru',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=tr_Baslik]').val(result.data.tr_Baslik);
            $('input[name=en_Baslik]').val(result.data.en_Baslik);
            $('#tr_Resim').selectpicker('val', result.data.tr_Resim);
            $('#en_Resim').selectpicker('val', result.data.en_Resim);
            $('input[name=tr_Bas_Tarihi]').val(result.data.tr_Bas_Tarihi);
            $('input[name=en_Bas_Tarihi]').val(result.data.en_Bas_Tarihi);
            $('input[name=tr_Bit_Tarihi]').val(result.data.tr_Bit_Tarihi);
            $('input[name=en_Bit_Tarihi]').val(result.data.en_Bit_Tarihi);
            $('input[name=tr_Link]').val(result.data.tr_Link);
            $('input[name=en_Baslik]').val(result.data.en_Baslik);

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

  $('#showdata').on('click', '.item-up', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      var ListOrder = $(this).attr('data2');
       
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Duyurular/UpDuyuru',
        data: {No: No, ListOrder: ListOrder},
        async: false,
        dataType: 'json',
        success: function(result){
          if(result.success){
            TargetListOrder = Number(ListOrder)-1;
            var upbtn = $('tr .item-up[data2='+ListOrder+']')
            var downbtn = $('tr .item-down[data2='+ListOrder+']')
            var tr = upbtn.parents('tr:first');
            var targetupbtn = $('tr .item-up[data2='+TargetListOrder+']')
            var targetdownbtn = $('tr .item-down[data2='+TargetListOrder+']')
            var targettr = targetupbtn.parents('tr:first');

            targettr.css('background-color', '#ccc').fadeOut('normal', function() { targetupbtn.attr('data2', ListOrder); targetdownbtn.attr('data2', ListOrder); $(this).css('background-color', '#EDEDED').fadeIn(); });
            tr.css('background-color', '#ccc').fadeOut('normal', function() { upbtn.attr('data2', TargetListOrder); downbtn.attr('data2', TargetListOrder); $(tr).after(targettr); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });

            iziToast.success({
                title: 'OK',
                message: 'Duyuru başarıyla güncellendi!',
            });
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

  $('#showdata').on('click', '.item-down', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      var ListOrder = $(this).attr('data2');

      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Duyurular/DownDuyuru',
        data: {No: No, ListOrder: ListOrder},
        async: false,
        dataType: 'json',
        success: function(result){
          if(result.success){
            TargetListOrder = Number(ListOrder)+1;
            var upbtn = $('tr .item-up[data2='+ListOrder+']')
            var downbtn = $('tr .item-down[data2='+ListOrder+']')
            var tr = upbtn.parents('tr:first');
            var targetupbtn = $('tr .item-up[data2='+TargetListOrder+']')
            var targetdownbtn = $('tr .item-down[data2='+TargetListOrder+']')
            var targettr = targetupbtn.parents('tr:first');

            targettr.css('background-color', '#ccc').fadeOut('normal', function() { targetupbtn.attr('data2', ListOrder); targetdownbtn.attr('data2', ListOrder); $(this).css('background-color', '#EDEDED').fadeIn(); });
            tr.css('background-color', '#ccc').fadeOut('normal', function() { upbtn.attr('data2', TargetListOrder); downbtn.attr('data2', TargetListOrder); $(targettr).after(tr); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });

            iziToast.success({
                title: 'OK',
                message: 'Duyuru başarıyla güncellendi!',
            });
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
          url: baseurl+'Ap/General-Duyurular/DeleteDuyuru',
          data:{No:No},
          dataType: 'json',
          success: function(result){
            if(result.success){
              $('#deleteModal').modal('hide');

              $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });

              iziToast.success({
                title: 'OK',
                message: 'Duyuru başarıyla silindi!',
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




  var isGetDuyurularFirst = true;
  //functions
  function GetDuyurular(){
    var url = baseurl+'Duyurular/GetDuyurular';

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
        if (!isGetDuyurularFirst) {
          CreateDataTables();
        }
        isGetDuyurularFirst = false;
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetResimler(){
    var url = baseurl+'Ap/Resimler/GetResimler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="tr_Resim" id="tr_Resim" title="Resim Seç..." data-liveSearchNormalize="true">';
        var en_html = '<select class="form-control selectpicker" data-live-search="true" name="en_Resim" id="en_Resim" title="Resim Seç..." data-liveSearchNormalize="true">'+'<option data-tokens="Boş Sil" value="0">Türkçe Resmi Kullan</option>';
        var i;

        for(i=0; i<data.length; i++){
          tr_html += '<option data-tokens="'+data[i].Kategori+'/'+data[i].Dosya+' '+data[i].Isim+' '+data[i].Kategori+'" value="'+data[i].Kategori+'/'+data[i].Dosya+'">'+data[i].Isim+' ('+data[i].Kategori+')</option>';
          en_html += '<option data-tokens="'+data[i].Kategori+'/'+data[i].Dosya+' '+data[i].Isim+' '+data[i].Kategori+'" value="'+data[i].Kategori+'/'+data[i].Dosya+'">'+data[i].Isim+' ('+data[i].Kategori+')</option>';
        }
        tr_html += '</select>'
        en_html += '</select>'
        $('#tr_Resimler').html(tr_html);
        $('#en_Resimler').html(en_html);
        $('.selectpicker').selectpicker('render');
        $('.selectpicker').selectpicker('refresh');
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetDuyurularNum(){
    var url = baseurl+'Duyurular/GetDuyurularNum';

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
    var ListOrder = data.ListOrder;
    var Baslik;
    var Resim;
    var Bas_Tarihi;
    var Bit_Tarihi;
    var Link;

    var TRBaslik = data.tr_Baslik;
    var TRResim = data.tr_Resim;
    var TRBas_Tarihi = data.tr_Bas_Tarihi;
    var TRBit_Tarihi = data.tr_Bit_Tarihi;
    var TRLink = data.tr_Link;

    var ENBaslik = data.en_Baslik;
    var ENResim = data.en_Resim;
    var ENBas_Tarihi = data.en_Bas_Tarihi;
    var ENBit_Tarihi = data.en_Bit_Tarihi;
    var ENLink = data.en_Link;

    if (ENBaslik == "") {
      Baslik = TRBaslik;
    } else {
      Baslik = TRBaslik+' | '+ENBaslik;
    }
    if (ENResim == "") {
      Resim = TRResim;
    } else {
      Resim = TRResim+' | '+ENResim;
    }
    if (ENBas_Tarihi == "") {
      Bas_Tarihi = TRBas_Tarihi;
    } else {
      Bas_Tarihi = TRBas_Tarihi+' | '+ENBas_Tarihi;
    }
    if (ENBit_Tarihi == "") {
      Bit_Tarihi = TRBit_Tarihi;
    } else {
      Bit_Tarihi = TRBit_Tarihi+' | '+ENBit_Tarihi;
    }
    if (ENLink == "") {
      Link = TRLink;
    } else {
      Link = TRLink+' | '+ENLink;
    }

    newHtml = '<td>'+
                '<a class="LGM" href="'+baseurl+'resources/images/'+Resim+'" data-sub-html="<strong>'+Baslik+'</strong><br>Başlangıç Tarihi: '+Bas_Tarihi+'<br>Bitiş Tarihi: '+Bit_Tarihi+'">'+
                '<span style="color:black" class="shorten_content6">'+Baslik+'</span>'+
                '</a>'+
                '</td>'+
                '<td class="shorten_content6">'+Resim+'</td>'+
                '<td class="shorten_content6">'+Bas_Tarihi+'</td>'+
                '<td class="shorten_content6">'+Bit_Tarihi+'</td>'+
                '<td class="shorten_content6">'+Link+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners item-up" data="'+No+'" data2="'+ListOrder+'"><i class="fa fa-lg fa-arrow-up" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners item-down" data="'+No+'" data2="'+ListOrder+'"><i class="fa fa-lg fa-arrow-down" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners item-delete" data="'+No+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
                '</td>';
    return newHtml;
  }

  function RefreshData(){
    GetDuyurular();
    GetDuyurularNum();
    $(function(){
      RefreshSideData();
    });
  }

  var isFirst = true;
  function RefreshSideData(){
    $(function(){
      if (!isFirst) {
        ShortenContent6();
      }
      isFirst = false;
      $('.LGMC').data('lightGallery').destroy(true);
      CreteLGM();
    });
  }

  