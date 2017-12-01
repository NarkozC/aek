function GetBannerYazi(){
  var url = baseurl+'Anasayfa/GetBannerYazi';

  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      var html = '';
      var i;
      var Yazi;
      var BtnYazi;
      var Link;
      for(i=0; i<data.length; i++){
        if (en) {
          if (data[i].en_Yazi == "") {
            Yazi = data[i].tr_Yazi;
          } else {
            Yazi = data[i].en_Yazi;
          }

          if (data[i].en_BtnYazi == "") {
            BtnYazi = data[i].tr_BtnYazi;
          } else {
            BtnYazi = data[i].en_BtnYazi;
          }

          if (data[i].en_Link == "") {
            Link = data[i].tr_Link;
          } else {
            Link = data[i].en_Link;
          }
        } else {
          Yazi = data[i].tr_Yazi;
          BtnYazi = data[i].tr_BtnYazi;
          Link = data[i].tr_Link;
        }
        html += Yazi+
                '<br>'+
                '<br>'+
                '<a href="'+Link+'" class="btn btn-md morfillButton3">'+BtnYazi+'</a>'+
                '<br>';
      }
      $('#showbannerYazi').html(html);
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
  GetBannerYazi();
});