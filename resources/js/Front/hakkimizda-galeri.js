function GetGaleri(){
    var url = baseurl+'Hakkimizda/GetGaleri';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var i;
        var Resim;
        for(i=0; i<data.length; i++){
          if (en) {
            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim
            } else {
              Resim = data[i].en_Resim
            }
          } else {
            Resim = data[i].tr_Resim
          }
          html += 
          		'<div class="LGM" data-src="'+baseurl+'resources/images/'+Resim+'" data-pinterest-text="Morfill bir harika!" data-tweet-text="Morfill bir harika!">'+
              '<img data-u="image" data-src2="'+baseurl+'resources/images/'+Resim+'" />'+
              '<img data-u="thumb" src="'+baseurl+'resources/images/'+Resim+'" />'+
              '</div>';
        }
        $('#MGaleriLG').html(html);
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
    GetGaleri();
  });