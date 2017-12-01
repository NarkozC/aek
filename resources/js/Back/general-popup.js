 var Form =  $('#popup-form');
 var Modal = $('#popup-modal');
  $(function(){

    RefreshData()

    $('#showdata').on('click', '#viewPopup', function(e){

      GetViewPopup();
      maxHeight = ($(window).height()-200)+'px';
      $('#popup-img').css('max-height', maxHeight);
      $('#popup-modal').modal('show');
      
    });

    $('#PopupSubmit').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        if ($('#en_Resim').selectpicker('val') == "0") {
          $('#en_Resim').selectpicker('val', '');
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
                  message: 'Popup başarıyla '+type,
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
      $(Form).attr('action', baseurl+'Ap/General-Popup/UpdatePopup');
      GetResimler();
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Popup/EditPopup',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          console.log('success')
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=tr_Baslik]').val(result.data.tr_Baslik);
            $('input[name=en_Baslik]').val(result.data.en_Baslik);
            $('#tr_Resim').selectpicker('val', result.data.tr_Resim);
            $('#en_Resim').selectpicker('val', result.data.en_Resim);
            $('input[name=tr_Link]').val(result.data.tr_Link);
            $('input[name=en_Link]').val(result.data.en_Link);

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


  //functions
  function GetPopup(){
    var url = baseurl+'Popup/GetPopup';

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

  function GetViewPopup(){
    var url = baseurl+'Popup/GetPopup';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var i;
        var en_Baslik;
        var en_Resim;
        var en_Link;
        if (data.en_Baslik == "") {
          en_Baslik = data.tr_Baslik;
        } else {
          en_Baslik = data.en_Baslik;
        }
        if (data.en_Resim == "") {
          en_Resim = data.tr_Resim;
        } else {
          en_Resim = data.en_Resim;
        }
        if (data.en_Link == "") {
          en_Link = data.tr_Link;
        } else {
          en_Link = data.en_Link;
        }
        html += '<div class="modal fade" id="popup-modal" tabindex="-1" role="dialog">'+
              '<div class="modal-dialog" role="document">'+
              '<div class="modal-content">'+
              '<ul class="nav nav-tabs marginTop5 marginL5" role="tablist"> <!-- Nav tabs -->'+
              '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#Pturkce-tab" aria-controls="Pturkce-tab" role="tab" data-toggle="tab">Türkçe</a></li>'+
              '<li role="presentation"><a class="hvr-wobble-top" href="#Pingilizce-tab" aria-controls="Pingilizce-tab" role="tab" data-toggle="tab">İngilizce</a></li>'+
              '</ul>'+
              '<div class="tab-content"><!-- Tab panes -->'+
              '<div role="tabpanel" class="tab-pane active" id="Pturkce-tab">'+
            
              '<div class="modal-header">'+
              '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>'+
              '<h4 class="modal-title hvr-grow-rotate">'+data.tr_Baslik+'</h4>'+
              '</div>'+
              '<div class="modal-body" align="center">'+
              '<a href="'+baseurl+data.tr_Link+'">'+
              '<img src="'+baseurl+'resources/images/'+data.tr_Resim+'" id="popup-img" class="img-responsive hvr-glow" style="max-height">'+
              '</a>'+
              '</div>'+
              '<div class="modal-footer">'+
              '<button type="button" class="btn btn-danger hvr-buzz-out" data-dismiss="modal">Kapat</button>'+
              '<a href="'+baseurl+data.tr_Link+'" id="popupBtn" class="btn btn-info hvr-push">Hakkında bilgi al</a>'+
              '</div>'+

              '</div>'+

              '<div role="tabpanel" class="tab-pane" id="Pingilizce-tab">'+
            
              '<div class="modal-header">'+
              '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>'+
              '<h4 class="modal-title hvr-grow-rotate">'+en_Baslik+'</h4>'+
              '</div>'+
              '<div class="modal-body" align="center">'+
              '<a href="'+baseurl+en_Link+'">'+
              '<img src="'+baseurl+'resources/images/'+en_Resim+'" id="popup-img" class="img-responsive hvr-glow" style="max-height">'+
              '</a>'+
              '</div>'+
              '<div class="modal-footer">'+
              '<button type="button" class="btn btn-danger hvr-buzz-out" data-dismiss="modal">Kapat</button>'+
              '<a href="'+baseurl+en_Link+'" id="popupBtn" class="btn btn-info hvr-push">Hakkında bilgi al</a>'+
              '</div>'+

              '</div>'+



              '</div>'+
              '</div>'+
              '</div>';
        $('#thePopup').html(html);
        
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
    var Link;

    var TRBaslik = data.tr_Baslik;
    var TRResim = data.tr_Resim;
    var TRLink = data.tr_Link;

    var ENBaslik = data.en_Baslik;
    var ENResim = data.en_Resim;
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
    if (ENLink == "") {
      Link = TRLink;
    } else {
      Link = TRLink+' | '+ENLink;
    }

    newHtml = '<td class="shorten_content6" id="viewPopup">'+Baslik+'</td>'+
                '<td class="shorten_content6">'+Resim+'</td>'+
                '<td class="shorten_content6">'+Link+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a> '+
                '</td>';
    return newHtml;
  }

  function RefreshData(){
    GetPopup();
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
    });
  }

  