
$(function(){

  GetBireyselEgitimler();

});

  //functions
  function GetBireyselEgitimler(){
    var url = baseurl+'Bireysel-Egitimler/GetBireyselEgitimler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var animation;
        var i;
        var Yazi;
        var Baslik;
        var Resim;
        var SectionID;
        for(i=0; i<data.length; i++){
          animation = 'fadeInLeft';
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

            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }

            if (data[i].en_SectionID == "") {
              SectionID = data[i].tr_SectionID;
            } else {
              SectionID = data[i].en_SectionID;
            }
          } else {
            Resim = data[i].tr_Resim;
            Baslik = data[i].tr_Baslik;
            Yazi = data[i].tr_Yazi;
            SectionID = data[i].tr_SectionID;
          }
          html +=
            '<section id="'+SectionID+'">'+
            '<div class="container dark-bg shadow wow '+animation+' borderRad25">'+
            '<div class="row hidden-md hidden-sm hidden-xs marginTop20"> <!-- hidden-xs-sm-md -->'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">'+
            '<img alt="'+Baslik+'" class="img-responsive img-center w400 hvr-bob" src="'+baseurl+'resources/images/'+Resim+'">'+
            '</div>'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">'+
            '<h3>'+Baslik+'</h3>'+
            Yazi+
            '</div>'+
            '</div>'+
            '<div class="row visible-md visible-sm visible-xs marginTop20"> <!-- visible-xs-sm-md -->'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">'+
            '<h3 class="text-center">'+Baslik+'</h3>'+
            '<img alt='+Baslik+'" class="img-responsive img-center w400 hvr-bob" src="'+baseurl+'resources/images/'+Resim+'">'+
            '</div>'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 marginTop10">'+
            Yazi+
            '</div>'+
            '</div>'+
            '</div>'+
            '</section>';
        }
        $('#showdata').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }