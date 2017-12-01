
$(function(){
  GetEgitimSistemi();
});

  //functions
  function GetEgitimSistemi(){
    var url = baseurl+'Egitim-Sistemimiz/GetEgitimSistemi';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var i;
        var Baslik;
        var Yazi;
        var Animation = 'bounceInUp';
        var TextAnimation = 'fadeIn';
        var TextAnimationDelay = (Number(wowDelayS)+0.8);
        html += '<div class="container wow bounceInDown" data-wow-delay="'+wowDelay+'">'+
                '<div class="col-lg-12 page-header paddingL0">'+
                '<h2 data-basliklar="GES">Eğitim Sistemimiz</h2>'+
                '</div>'+
                '</div>';
        for(i=0; i<data.length; i++){
          if (i != 0) {
              html +='<div class="sectionArasiBosluk"></div>';
          }
          if (en) {
            if (data[i].en_Baslik == "") {
              Baslik = data[i].tr_Baslik;
            } else {
              Baslik = data[i].en_Baslik;
            }

            if (data[i].en_Yazi == "") {
              Yazi = data[i].tr_Yazi;
            } else {
              Yazi = data[i].en_Yazi;
            }
          } else {
            Baslik = data[i].tr_Baslik;
            Yazi = data[i].tr_Yazi;
          }
          
          html +=
          	'<div class="container dark-bg shadow borderRad25 wow '+Animation+'" data-wow-delay="'+wowDelay+'">'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center page-header wow '+TextAnimation+'" data-wow-delay="'+TextAnimationDelay+'s">'+
            '<h2>'+Baslik+'</h2>'+
            '</div>'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow '+TextAnimation+'" data-wow-delay="'+TextAnimationDelay+'s">'+
            '<p>'+Yazi+'</p>'+
            '</div>'+
            '</div>';
        }
        $('#showEgitimSistemi').html(html);
      },
      error: function(){
        if (en) {
          iziError();
        } else {
          iziError();
        }
      }
    });
  }