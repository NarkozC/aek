$(function(){

  GetBannerSlider();

});

  //functions
  function GetBannerSlider(){
    var url = baseurl+'Anasayfa/GetBannerSlider';

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
        var Arkaplan;
        for(i=0; i<data.length; i++){
          if (en) {
            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }

            if (data[i].en_Arkaplan == "") {
              Arkaplan = data[i].tr_Arkaplan;
            } else {
              Arkaplan = data[i].en_Arkaplan;
            }
          } else {
            Resim = data[i].tr_Resim;
            Arkaplan = data[i].tr_Arkaplan;
          }
          html +='<div class="LGM" data-src="'+baseurl+'resources/images/'+Resim+'" data-pinterest-text="Morfill bir harika!" data-tweet-text="Morfill bir harika!" data-p="212.50">'+
                '<img data-u="image" data-src2="'+baseurl+'resources/images/'+Resim+'" />'+
                '<img data-u="caption" data-t="0" style="position:absolute;top:-180px;left:-360px;width:2000px;height:750px;z-index:0;" data-src2="'+baseurl+'resources/images/'+Arkaplan+'" />'+
                '</div>';
        }
        $('#bannerLG').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }