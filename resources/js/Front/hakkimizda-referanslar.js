function GetReferanslar(){
    var url = baseurl+'Hakkimizda/GetReferanslar';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var break_on = 4;
        var i;
        var counter = 0;
        var Isim;
        var Resim;
        for(i=0; i<data.length; i++){

          if (en) {
            if (data[i].en_Isim == "") {
              Isim = data[i].tr_Isim;
            } else {
              Isim = data[i].en_Isim;
            }

            if (data[i].en_Isim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }
          } else {
            Resim = data[i].tr_Resim;
            Isim = data[i].tr_Isim;
          }
          if (counter % break_on == 0) {
            html += '<div class="row">';
          }

          if (break_on == 4) {
            html += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 text-center marginB10">'+
                '<h5>'+Isim+'</h5>'+
                '<img alt="'+Isim+'" class="img-responsive img-center w100 hvr-grow-shadow" src="'+baseurl+'resources/images/'+Resim+'">'+
                '</div>';            
          }
          
          counter++;
          if (counter % break_on == 0) {
            html += '</div>';
          }
            
        }

        if (counter % break_on != 0) {
          html += '</div>';
        }
        $('#showReferanslar').html(html);
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
    GetReferanslar();
  });