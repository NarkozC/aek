
  $(function(){

    RefreshData()

    var resimForm = '#addResim-form';
    var resimModal = '#addResim-modal';
    $('#addResimButton').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        GetAddResimHtml();
        GetKategoriler(); 
        $('.selectpicker').selectpicker('render');
        $('.selectpicker').selectpicker('refresh');

        $('input[name=RDosya]').attr("id","Dosya");
        $('input[name=RIsim]').attr("id","Isim");
        $('select[name=RKategori]').attr("id","Kategori");
        $('input[name=RDosya]').attr("name","Dosya");
        $('input[name=RIsim]').attr("name","Isim");
        $('select[name=RKategori]').attr("name","Kategori");

        $('#Kategori').selectpicker('val', '');

        $(resimModal).modal('show');

      }
      $link.data('lockedAt', +new Date());
    });

    $('#ShowAddResimModal').on('click', '#AddResimSubmit', function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
        var url = $(resimForm).attr('action');
        var data = $(resimForm).serialize();
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
                var type = 'eklendi!';
                var Isim = $('input[name=Isim]').val();
                var Kategori = $('select[name=Kategori]').val();

                var uploadURI = baseurl+'Ap/Resimler/AddResimUpload';

                var inputFile = $('input[name=Dosya]');
                var fileToUpload = inputFile[0].files[0];
                // make sure there is file to upload
                if (inputFile.get(0).files.length === 0) {
                    var ajaxGroup;
                    var element = $('input[name=Dosya]');
                    ajaxGroup = element.parents('.ajax-group:first');
                    $('.text-danger').remove();
                    $('.ajax-group').removeClass('has-error').removeClass('has-success');

                    ajaxGroup.addClass('has-error');
                    ajaxGroup.after('<p class="text-danger"><strong>Dosya</strong> alanını doldurmanız gerekmektedir!</p>');
                } else {
                  // provide the form data
                  // that would be sent to sever through ajax
                  var formData = new FormData();
                  formData.append("Dosya", fileToUpload);
                  formData.append("Isim", Isim);
                  formData.append("Kategori", Kategori);
                  // now upload the file using $.ajax
                  $.ajax({
                    url: uploadURI,
                    type: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function() {
                      $('input[name=TempDosya]').attr("id","Dosya");
                      $('input[name=TempIsim]').attr("id","Isim");
                      $('select[name=TempKategori]').attr("id","Kategori");
                      $('input[name=TempDosya]').attr("name","Dosya");
                      $('input[name=TempIsim]').attr("name","Isim");
                      $('select[name=TempKategori]').attr("name","Kategori");

                      RefreshData()
                      
                      $(resimModal).modal('hide');

                      iziToast.success({
                          title: 'OK',
                          message: 'Resim başarıyla '+type,
                      });
                    },
                    error: function(){
                      $('input[name=TempDosya]').attr("id","Dosya");
                      $('input[name=TempIsim]').attr("id","Isim");
                      $('select[name=TempKategori]').attr("id","Kategori");
                      $('input[name=TempDosya]').attr("name","Dosya");
                      $('input[name=TempIsim]').attr("name","Isim");
                      $('select[name=TempKategori]').attr("name","Kategori");

                      $(resimModal).modal('hide');

                      iziToast.error({
                          title: 'Hata!',
                          message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
                      });
                    }
                  });
                }
              } else if(response.type=='update') {
                var type = 'güncellendi!';

                $(resimModal).modal('hide');

                var trInside = GetHtmlTr(response.data);
                $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });
                
                iziToast.success({
                    title: 'OK',
                    message: 'Resim başarıyla '+type,
                });

              }
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
            $('input[name=TempDosya]').attr("id","Dosya");
            $('input[name=TempIsim]').attr("id","Isim");
            $('select[name=TempKategori]').attr("id","Kategori");
            $('input[name=TempDosya]').attr("name","Dosya");
            $('input[name=TempIsim]').attr("name","Isim");
            $('select[name=TempKategori]').attr("name","Kategori");
            RefreshData();
            $(resimModal).modal('hide');

            iziToast.error({
                title: 'Hata!',
                message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
            });
          }
        });
      }
      $link.data('lockedAt', +new Date());
  });




  //edit
  $('#showdata').on('click', '.item-edit', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      GetAddResimHtml();
      GetKategoriler();
      var No = $(this).attr('data');
      
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/Resimler/EditResim',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          if(result.success){
            $(resimForm).attr('action', baseurl+'Ap/Resimler/UpdateResim');
            $('input[name=RDosya]').attr("id","Dosya");
            $('input[name=RIsim]').attr("id","Isim");
            $('select[name=RKategori]').attr("id","Kategori");
            $('input[name=RDosya]').attr("name","Dosya");
            $('input[name=RIsim]').attr("name","Isim");
            $('select[name=RKategori]').attr("name","Kategori");

            $('input[name=Dosya]').css('display','none');
            $('input[name=Dosya]').attr("id","TempDosya");
            $('input[name=Dosya]').attr("name","TempDosya");
            $('#dosyaLabel').css('display','none');
            
            $('input[name=No]').val(result.data.No);
            $('input[name=Isim]').val(result.data.Isim);
            $('#Kategori').selectpicker('val', result.data.Kategori);

            $(resimModal).modal('show');
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
    var Dosya = $(this).attr('data2');
    var Kategori = $(this).attr('data3');
    var FileToRemove = 'resources/images/'+Kategori+'/'+Dosya;
    $('#deleteModal').modal('show');
    //prevent previous handler - unbind()
    $('#btnDelete').unbind().click(function(){
      $.ajax({
        type: 'ajax',
        method: 'post',
        async: false,
        url: baseurl+'Ap/Resimler/AddResimUpload',
        data:{No:No, file_to_remove:FileToRemove},
        dataType: 'json',
        success: function(response){
          if(response.success){
          
            $('#deleteModal').modal('hide');

            iziToast.success({
                title: 'OK',
                message: 'Resim başarıyla silindi!',
            });

            $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });
            GetResimlerNum();
          }else{
            
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

});

  var isGetResimlerFirst = true;
  function GetResimler(){
    var url = baseurl+'Ap/Resimler/GetResimler';


    
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

        if (!isGetResimlerFirst) {
          CreateDataTables();
        }
        isGetResimlerFirst = false;
        
      },
      error: function(){
        
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetResimlerNum(){
    var url = baseurl+'Ap/Resimler/GetResimlerNum';

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

  function GetKategoriler(){
    var url = baseurl+'Ap/General-Kategoriler/GetKategoriler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '<select class="form-control selectpicker" data-live-search="true" name="RKategori" id="RKategori" title="Kategori Seç..." data-liveSearchNormalize="true">';
        var i;

        for(i=0; i<data.length; i++){
          html += '<option data-tokens="'+data[i].Isim+'" value="'+data[i].Isim+'">'+data[i].Isim+'</option>';
        }
        html += '</select>'
        $('#RKategoriler').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetAddResimHtml(){
    
    var addResimModal = '<div class="modal fade ajax-modal" id="addResim-modal" tabindex="-1" role="dialog" aria-hidden="true"> <!-- Add Resim Modal -->'+
              '<div class="modal-dialog">'+
              '<div class="modal-content">'+
              '<div class="modal-header" align="center">'+
              '<img id="img_logo" src="'+baseurl+'resources/images/Morfill-Coaching-RY.png">'+
              '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>'+
              '</div>'+
              '<div id="div-forms">'+
              '<form id="addResim-form" class="form-horizontal" role="form" method="post" action="'+baseurl+'Ap/Resimler/AddResim">'+
              '<div class="modal-body">'+
              '<input type="hidden" name="No" id="No" class="form-control" value="0">'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>İsim</label>'+
              '<input name="RIsim" id="RIsim" class="form-control" type="text" placeholder="İsim">'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>Kategori</label>'+
              '<div id="RKategoriler"></div>'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label id="dosyaLabel">Dosya</label>'+
              '<input type="file" name="RDosya" class="form-control" id="Dosya" placeholder="Dosya">'+
              '</div>'+
              '</div>'+
              '<div class="modal-footer">'+
              '<button type="button" id="AddResimSubmit" class="btn morfillButton4 btn-lg btn-block">Kaydet</button>'+
              '<button type="button" data-dismiss="modal" class="btn morfillButton5 hvr-buzz-out btn-lg btn-block">İptal</button>'+
              '</div>'+
              '</form>'+
              '</div> <!-- END div-forms -->'+
              '</div> <!-- END modal-content -->'+
              '</div> <!-- END modal-dialog -->'+
              '</div> <!-- END MODAL -->';

    $('#ShowAddResimModal').html(addResimModal);
  }

  function GetHtmlTr(data){
    var No = data.No;
    var Isim = data.Isim;
    var Kategori = data.Kategori;
    var Dosya = data.Dosya;

    newHtml = '<td>'+
                '<a class="LGM" href="'+baseurl+'resources/images/'+Kategori+'/'+Dosya+'" data-sub-html="'+Isim+' ('+Kategori+')" >'+
                  '<span style="color:black;">'+Isim+'</span>'+
                '</a>'+
                '</td>'+
                '<td>'+Kategori+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners item-delete" data="'+No+'" data2="'+Dosya+'" data3="'+Kategori+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
                '</td>';
    return newHtml;
  }

  

  function RefreshData(){
    GetResimler();
    GetResimlerNum();
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

  