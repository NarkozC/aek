$(function(){
  GetBirimlerIdari();
});

function GetBirimlerIdari(){
    var url = baseurl+'Birimler/GetBirimlerIdari';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var break_on = 2;
        var size = data.length;
        var oneLeft = false;
        var i;
        var counter = 0;
        var Baslik;
        var Aciklama;
        var Animation;
        var AnimationDelay = (Number(wowDelayS)+0.1);
    		if(size % 2 == 0) {
    			break_on = 2;
    		} else if(size % 2 == 1) {
    			oneLeft = true;
    			break_on = 2;
    		}

        html += '<section id="idari-birimler">'+
        		'<div class="container wow bounceInDown" data-wow-delay="'+wowDelay+'">'+
                '<div class="col-lg-12 page-header paddingL0">'+
                '<h2 data-basliklar="GBI">İdari Birimler</h2>'+
                '</div>'+
                '</div>'+
                '<div class="container">';

        for(i=0; i<size; i++){
          if (en) {
            if (data[i].en_Baslik == "") {
              Baslik = data[i].tr_Baslik
            } else {
              Baslik = data[i].en_Baslik
            }

            if (data[i].en_Aciklama == "") {
              Aciklama = data[i].tr_Aciklama
            } else {
              Aciklama = data[i].en_Aciklama
            }

          } else {
            Baslik = data[i].tr_Baslik;
            Aciklama = data[i].tr_Aciklama;
          }

          if (counter % break_on == 0) {
          	html += '<div class="row">';
          }
          if (oneLeft == true && (i+1) != data.length) {
          	html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginT20">';
          } else if (oneLeft == true && (i+1) == data.length) {
          	html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center marginT20">';
          } else if (break_on == 2) {
            html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginT20">';
          } 

          if (oneLeft == true && (i+1) == data.length) {
          	Animation = 'bounceInUp';
          } else if ((i+1) % 2 == 0) {
          	Animation = 'bounceInRight';
          } else {
          	Animation = 'bounceInLeft';
          }
          html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg borderRad25 shadow wow '+Animation+'" data-wow-delay="'+AnimationDelay+'s">'+
                  '<h3 class="page-header">'+Baslik+'</h3>'+
                  '<p>'+Aciklama+'</p>'+
                  '</div>'+
                  '</div>';
          counter++;
          if ((i+1) % 2 == 0) {
          	AnimationDelay += 0.3;
          }
          if (counter % break_on == 0) {
          	html += '</div>';
          }
          	
        }

        if (counter % break_on != 0) {
        	html += '</div>';
        }
        html += '</div>';
        $('#showBirimlerIdari').html(html);
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


  