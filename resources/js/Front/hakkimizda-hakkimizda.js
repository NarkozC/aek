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
        if (en) {
          if (data.en_Yazi == "") {
            html += data.tr_Yazi;
          } else {
            html += data.en_Yazi;
          }
        } else {
          html += data.tr_Yazi;
        }
          
        $('#showHakkimizda').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }


  $(function(){
    GetHakkimizda();
  });