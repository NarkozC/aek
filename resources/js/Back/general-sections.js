 var Form =  $('#sections-form');
 var Modal = $('#sections-modal');
  $(function(){

    RefreshData()

  });

  $('#showdata').on('click', '.item-passive', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Sections/PassiveSection',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(response){
          if(response.success){
            var trInside = GetHtmlTr(response.data);

            $('tr .item-passive[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-passive[data='+No+']').parents('tr:first').html(trInside); $(this).css('background-color', '#EDEDED').fadeIn(); });

            iziToast.success({
                title: 'OK',
                message: 'Section başarıyla pasifleştirildi!',
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

  $('#showdata').on('click', '.item-active', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Sections/ActiveSection',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(response){
          if(response.success){
            var trInside = GetHtmlTr(response.data);

            $('tr .item-active[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-active[data='+No+']').parents('tr:first').html(trInside); $(this).css('background-color', '#EDEDED').fadeIn(); });

            iziToast.success({
                title: 'OK',
                message: 'Section başarıyla aktifleştirildi!',
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

  $('#showdata').on('click', '.item-up', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

      var No = $(this).attr('data');
      var ListOrder = $(this).attr('data2');
       
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Sections/UpSection',
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
                message: 'Section başarıyla güncellendi!',
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
        url: baseurl+'Ap/General-Sections/DownSection',
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
                message: 'Section başarıyla güncellendi!',
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




  //functions
  function GetSections(){
    var url = baseurl+'Ap/General-Sections/GetSections';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        
        var html = '';
        var i;
        for(i=0; i<data.length; i++){
          var trInside = GetHtmlTr(data[i]);
          html +='<tr>'+trInside+'</tr>';
        }
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

  function GetSectionsNum(){
    var url = baseurl+'Ap/General-Sections/GetSectionsNum';

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
    var TDurum = data.Display;
    var Durum;
    var AktifPasif;

    if (TDurum == "block") {
      Durum = 'Aktif';
    } else {
      Durum = 'Pasif';
    }
    if (Durum == 'Aktif') {
      AktifPasif = '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-passive" data="'+No+'"><i class="fa fa-lock" aria-hidden="true"></i></a>';
    } else {
      AktifPasif = '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-active" data="'+No+'"><i class="fa fa-unlock" aria-hidden="true"></i></a>';
    }

    newHtml = '<td>'+Isim+'</td>'+
                '<td>'+Durum+'</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners item-up" data="'+No+'" data2="'+ListOrder+'"><i class="fa fa-lg fa-arrow-up" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners item-down" data="'+No+'" data2="'+ListOrder+'"><i class="fa fa-lg fa-arrow-down" aria-hidden="true"></i></a> '+
                '</td>'+
                '<td>'+
                  AktifPasif+
                '</td>';
    return newHtml;

  }

  function RefreshData(){
    GetSections();
    GetSectionsNum();
  }

