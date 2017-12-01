 $(document).ready(function()
  {
    GetTabBireyselEgitimler();
    GetTabKurumsalEgitimler();
    GetTabBireyselHizmetler();
    GetTabKurumsalHizmetler();
  });

  function GetTabBireyselEgitimler(){
    var url = baseurl+'Bireysel-Egitimler/GetBireyselEgitimler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var active = '';
        var readMore;
        var i;
        var Resim;
        var Baslik;
        var Yazi;
        var SectionID;
        for(i=0; i<data.length; i++){

          if (en) {
            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }

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

          if (i==0) {
            active = 'active'
          } else {
            active = '';
          }
          
          if (en == true) {
            readMore = "Read More...";
          } else {
            readMore = "Devamını Oku..."
          }
          html +=
            '<div class="item '+active+'">'+
            '<div class="row">'+
            '<div class="col-sm-3 text-center">'+
            '<a class="LGM" href="'+baseurl+'resources/images/'+Resim+'" data-sub-html="<strong>'+Baslik+'</strong>" data-pinterest-text="Morfill bir harika!" data-tweet-text="Morfill bir harika!">'+
            '<img src="'+baseurl+'resources/images/'+Resim+'">'+
            '</a>'+
            '</div>'+
            '<div class="col-sm-8 col-sm-offset-1 col-lg-offset-0 col-lg-9">'+
            '<h4>'+Baslik+'</h4>'+
            '<div class="shorten_content3 paddingRight10"'+Yazi+'</div>'+
            '<p><br><a href="'+baseurl+'Bireysel-Egitimler#'+SectionID+'" class="btn btn-sm morfillButton3">'+readMore+'</a></p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        }
        $('#birEgitimler-tab').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }

  function GetTabKurumsalEgitimler(){
    var url = baseurl+'Kurumsal-Egitimler/GetKurumsalEgitimler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var active = '';
        var i;
        var Resim;
        var Baslik;
        var Yazi;
        var SectionID;
        var readMore;
        for(i=0; i<data.length; i++){

          if (en) {
            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }

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

          if (i==0) {
            active = 'active'
          } else {
            active = '';
          }
          if (en == true) {
            readMore = "Read More...";
          } else {
            readMore = "Devamını Oku..."
          }
          html +=
            '<div class="item '+active+'">'+
            '<div class="row">'+
            '<div class="col-sm-3 text-center">'+
            '<a class="LGM" href="'+baseurl+'resources/images/'+Resim+'" data-sub-html="<strong>'+Baslik+'</strong>" data-pinterest-text="Morfill bir harika!" data-tweet-text="Morfill bir harika!">'+
            '<img src="'+baseurl+'resources/images/'+Resim+'">'+
            '</a>'+
            '</div>'+
            '<div class="col-sm-8 col-sm-offset-1 col-lg-offset-0 col-lg-9">'+
            '<h4>'+Baslik+'</h4>'+
            '<div class="shorten_content3 paddingRight10"'+Yazi+'</div>'+
            '<p><br><a href="'+baseurl+'Kurumsal-Egitimler#'+SectionID+'" class="btn btn-sm morfillButton3">'+readMore+'</a></p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        }
        $('#kurEgitimler-tab').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }

  function GetTabBireyselHizmetler(){
    var url = baseurl+'Bireysel-Hizmetler/GetBireyselHizmetler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var active = '';
        var readMore;
        var i;
        var Resim;
        var Baslik;
        var Yazi;
        var SectionID;
        for(i=0; i<data.length; i++){

          if (en) {
            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }

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

          if (i==0) {
            active = 'active'
          } else {
            active = '';
          }

          if (en == true) {
            readMore = "Read More...";
          } else {
            readMore = "Devamını Oku..."
          }
          html +=
            '<div class="item '+active+'">'+
            '<div class="row">'+
            '<div class="col-sm-3 text-center">'+
            '<a class="LGM" href="'+baseurl+'resources/images/'+Resim+'" data-sub-html="<strong>'+Baslik+'</strong>" data-pinterest-text="Morfill bir harika!" data-tweet-text="Morfill bir harika!">'+
            '<img src="'+baseurl+'resources/images/'+Resim+'">'+
            '</a>'+
            '</div>'+
            '<div class="col-sm-8 col-sm-offset-1 col-lg-offset-0 col-lg-9">'+
            '<h4>'+Baslik+'</h4>'+
            '<div class="shorten_content3 paddingRight10"'+Yazi+'</div>'+
            '<p><br><a href="'+baseurl+'Bireysel-Hizmetler#'+SectionID+'" class="btn btn-sm morfillButton3">'+readMore+'</a></p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        }
        $('#birHizmetler-tab').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }

  function GetTabKurumsalHizmetler(){
    var url = baseurl+'Kurumsal-Hizmetler/GetKurumsalHizmetler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      dataType: 'json',
      success: function(data){
        var html = '';
        var active = '';
        var readMore;
        var i;
        var Resim;
        var Baslik;
        var Yazi;
        var SectionID;
        for(i=0; i<data.length; i++){

          if (en) {
            if (data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }

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

          if (i==0) {
            active = 'active'
          } else {
            active = '';
          }

          if (en == true) {
            readMore = "Read More...";
          } else {
            readMore = "Devamını Oku..."
          }
          html +=
            '<div class="item '+active+'">'+
            '<div class="row">'+
            '<div class="col-sm-3 text-center">'+
            '<a class="LGM" href="'+baseurl+'resources/images/'+Resim+'" data-sub-html="<strong>'+Baslik+'</strong>" data-pinterest-text="Morfill bir harika!" data-tweet-text="Morfill bir harika!">'+
            '<img src="'+baseurl+'resources/images/'+Resim+'">'+
            '</a>'+
            '</div>'+
            '<div class="col-sm-8 col-sm-offset-1 col-lg-offset-0 col-lg-9">'+
            '<h4>'+Baslik+'</h4>'+
            '<div class="shorten_content3 paddingRight10"'+Yazi+'</div>'+
            '<p><br><a href="'+baseurl+'Kurumsal-Hizmetler#'+SectionID+'" class="btn btn-sm morfillButton3">'+readMore+'</a></p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        }
        $('#kurHizmetler-tab').html(html);
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
        });
      }
    });
  }