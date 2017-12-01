
$(function(){
  GetHakkimizda();
});

  //functions
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
        var i;
        var Ad;
        var Yazi;
        var SectionID;
        var Animation = 'bounceInUp';
        var TextAnimation = 'fadeIn';
        var TextAnimationDelay = (Number(wowDelayS)+0.8);
        html += '<div class="container wow bounceInDown" data-wow-delay="'+wowDelay+'">'+
                '<div class="col-lg-12 page-header paddingL0">'+
                '<h2 data-basliklar="GH">Hakkımızda</h2>'+
                '</div>'+
                '</div>';
        for(i=0; i<data.length; i++){
          if (i != 0) {
              html +='<div class="sectionArasiBosluk"></div>';
          }
          if (en) {
            if (data[i].en_Ad == "") {
              Ad = data[i].tr_Ad;
            } else {
              Ad = data[i].en_Ad;
            }

            if (data[i].en_Yazi == "") {
              Yazi = data[i].tr_Yazi;
            } else {
              Yazi = data[i].en_Yazi;
            }

            if (data[i].en_SectionID == "") {
              SectionID = data[i].tr_SectionID;
            } else {
              SectionID = data[i].en_SectionID;
            }
          } else {
            Ad = data[i].tr_Ad;
            Yazi = data[i].tr_Yazi;
            SectionID = data[i].tr_SectionID;
          }
          html +=
            '<section id="'+SectionID+'">'+
            '<div class="container dark-bg shadow borderRad25 wow '+Animation+'" data-wow-delay="'+wowDelay+'">'+
            '<div class="col-lg-12 page-header text-center wow '+TextAnimation+'" data-wow-delay="'+TextAnimationDelay+'s">'+
            '<h2>'+Ad+'</h2>'+
            '</div>'+
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow '+TextAnimation+'" data-wow-delay="'+TextAnimationDelay+'s">'+
            Yazi+
            '</div>'+
            '</div>'+
            '</section>';
        }
        $('#showHakkimizda').html(html);
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