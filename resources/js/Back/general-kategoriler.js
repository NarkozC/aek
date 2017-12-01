 var Form =  $('#kategoriler-form');
 var Modal = $('#kategoriler-modal');
  $(function(){

    RefreshData()

    $('#addkategorilerButton').click(function(e){
      var $link = $(e.target);
      if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
          $(Form).attr('action', baseurl+'Ap/General-Kategoriler/AddKategori');
          // reset the Form
          $(Form)[0].reset();
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');

          $(Modal).modal('show');
      }
      $link.data('lockedAt', +new Date());
    });

    $('#KategorilerSubmit').click(function(e){
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
                  message: 'Kategori başarıyla '+type,
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
      $(Form).attr('action', baseurl+'Ap/General-Kategoriler/UpdateKategori');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Kategoriler/EditKategori',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            $('input[name=No]').val(result.data.No);
            $('input[name=Isim]').val(result.data.Isim);

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
        url: baseurl+'Ap/General-Kategoriler/UpKategori',
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
            tr.css('background-color', '#ccc').fadeOut('normal', function() { upbtn.attr('data2', TargetListOrder); downbtn.attr('data2', TargetListOrder); $(tr).after(targettr);  $(this).css('background-color', '#EDEDED').fadeIn(); });

            iziToast.success({
                title: 'OK',
                message: 'Kategori başarıyla güncellendi!',
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
        url: baseurl+'Ap/General-Kategoriler/DownKategori',
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
            tr.css('background-color', '#ccc').fadeOut('normal', function() { upbtn.attr('data2', TargetListOrder); downbtn.attr('data2', TargetListOrder); $(targettr).after(tr);  $(this).css('background-color', '#EDEDED').fadeIn(); });

            iziToast.success({
                title: 'OK',
                message: 'Kategori başarıyla güncellendi!',
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
      var Isim = $(this).attr('data2');
       
      $('#deleteModal').modal('show');
      //prevent previous handler - unbind()
      $('#btnDelete').unbind().click(function(){
        $.ajax({
          type: 'ajax',
          method: 'post',
          async: false,
          url: baseurl+'Ap/General-Kategoriler/DeleteKategori',
          data:{No:No, Isim:Isim},
          dataType: 'json',
          success: function(result){
            if(result.success){
              if (result.isFolderHasFiles) {
                var html;
                if ( $.fn.DataTable.isDataTable('.datatable2') ) {
                  $('.datatable2').DataTable().destroy();
                }
                for(var i=0; i<result.data.length; i++){
                  var trInside = GetDelResimHtmlTr(result.data[i], No);
                  html +='<tr>'+trInside+'</tr>';
                }
                $('#DelResimSubmit').html(Isim+"'i Sil");
                $('#DelResimSubmit').addClass('disabled');
                $('#delResim-table').html(html);

                $('.datatable2').DataTable( {
                    "language":
                    {
                        "emptyTable":     "Tabloda kayıt bulunamadı",
                        "info":           "Gösterilen kayıtlar: _START_ / _END_",
                        "infoEmpty":      "Hiçbir kayıt bulunamadı",
                        "infoFiltered":   "(Toplam _MAX_ kayıt arasından filtrelendi)",
                        "infoPostFix":    "",
                        "thousands":      ",",
                        "lengthMenu":     "Sayfa başına _MENU_ kayıt göster",
                        "loadingRecords": "Yükleniyor...",
                        "processing":     "İşleniyor...",
                        "search":         "Ara:",
                        "zeroRecords":    "Hiçbir şey bulunamadı - üzgünüm",
                        "paginate": {
                            "first":      '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>',
                            "last":       '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>',
                            "next":       '<i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>',
                            "previous":   '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>'
                        },
                    },
                    "aLengthMenu": [[5, 10, 25, -1], [5, 10, 25, "Hepsi"]],
                    "iDisplayLength": 5,
                    ordering:  false,
                    info: false,
                    searching: false,
                });

                $('#deleteModal').modal('hide');
                $('#delResim-modal').modal('show');
                iziToast.warning({
                  timeout: 10000,
                  title: 'Dikkat!',
                  message: 'Kategorinin silinebilmesi için içinin boş olması gerek! Kategorinin içindekiler silindiğinde otomatik olarak silinecektir.',
                });

              } else if (!result.isFolderHasFiles) {
                $('#deleteModal').modal('hide');

                $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });

                iziToast.success({
                  title: 'OK',
                  message: 'Kategori başarıyla silindi!',
                });
              }
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

  //delete
  $('#delResim-table').on('click', '.resim-delete', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      var btn = $(this);
      var No = $(this).attr('data');
      var Kategori = $(this).attr('data2');
      var Dosya = $(this).attr('data3');
      var KategoriNo = $(this).attr('data4');
      var FileToRemove = 'resources/images/'+Kategori+'/'+Dosya;
      iziToast.destroy();
      iziToast.info({
          title: 'Bu kaydı silmek istediğinize emin misiniz?',
          position: 'bottomCenter',
          buttons: [
              ['<button>Sil</button>', function (instance, toast) {
                

                $.ajax({
                  type: 'ajax',
                  method: 'post',
                  async: false,
                  url: baseurl+'Ap/Resimler/AddResimUpload',
                  data:{No:No, file_to_remove:FileToRemove},
                  dataType: 'json',
                  success: function(response){
                    if(response.success){

                      $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });
                      iziToast.success({
                          title: 'OK',
                          message: 'Resim başarıyla silindi!',
                      });

                    }else{
                      RefreshData();
                      $('#delResim-modal').modal('hide');
                      iziToast.error({
                      title: 'Hata!',
                      message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.', 
                  });
                    }
                  },
                  error: function(){
                    RefreshData();
                    $('#delResim-modal').modal('hide');
                    iziToast.error({
                        title: 'Hata!',
                        message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
                    });
                  }
                });

                
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    async: false,
                    url: baseurl+'Ap/General-Kategoriler/DeleteKategori',
                    data:{No:KategoriNo, Isim:Kategori},
                    dataType: 'json',
                    success: function(result){
                      if(result.success){
                        if (result.isFolderHasFiles) {
                          $('#DelResimSubmit').removeClass('disabled');
                          $('#DelResimSubmit').addClass('disabled');
                        } else if (!result.isFolderHasFiles) {
                          $('#delResim-modal').modal('hide');
                          $('#DelResimSubmit').removeClass('disabled');
                          iziToast.success({
                            title: 'OK',
                            message: 'Kategori başarıyla silindi!',
                          });

                        }
                      } else {
                        RefreshData()

                        $('#delResim-modal').modal('hide');

                        iziToast.error({
                            title: 'Hata!',
                            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
                        });
                      }
                  },
                  error: function(){
                    RefreshData()

                    $('#delResim-modal').modal('hide');

                    iziToast.error({
                        title: 'Hata!',
                        message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
                    });
                  }
                });

              }],
              ['<button>İptal</button>', function (instance, toast) {
                  instance.hide({
                      transitionOut: 'fadeOutUp',
                  }, toast);
              }]
          ],
      });
      //prevent previous handler - unbind()
      $('#btnDelete').unbind().click(function(){
        

      });

    }
    $link.data('lockedAt', +new Date()); 
  });




  var isGetKategorilerFirst = true;
  //functions
  function GetKategoriler(){
    var url = baseurl+'Ap/General-Kategoriler/GetKategoriler';

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
        if (!isGetKategorilerFirst) {
          CreateDataTables();
        }
        isGetKategorilerFirst = false;
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
    });
  }

  function GetKategorilerNum(){
    var url = baseurl+'Ap/General-Kategoriler/GetKategorilerNum';

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
    var Isim = data.Isim;
    
    newHtml = '<td>'+Isim+'</td>'+
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
                  '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners item-delete" data="'+No+'" data2="'+Isim+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
                '</td>';
    return newHtml;
  }

  function GetDelResimHtmlTr(data, kategoriNo){
    var No = data.No;
    var Isim = data.Isim;
    var Kategori = data.Kategori;
    var Dosya = data.Dosya;
    var KategoriNo = kategoriNo;

    newHtml = '<td>'+Isim+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners resim-delete" data="'+No+'" data2="'+Kategori+'" data3="'+Dosya+'" data4="'+KategoriNo+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
                '</td>';
    return newHtml;
  }

  function RefreshData(){
    GetKategoriler();
    GetKategorilerNum();
  }

  