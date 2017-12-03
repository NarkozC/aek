
$(function(){
  if (cfunction == "Haber") {
    if (cparam1 != undefined) {
      GetHaber();
    } else {
      window.location.replace(baseurl+page);
    }
  } else {
    if (page == "" || page == "Anasayfa") {
      GetHaberlerA();
    } else {
      GetHaberler();
    }
  }

});

  //functions
  function GetHaberler(){
    var url = baseurl+'Haberler/GetHaberler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      data:{
        English:en,
        NeedData: "true"
      },
      async: false,
      dataType: 'json',
      success: function(result){
        var data = result.data;
        var html = '';
        var i;
        var Baslik;
        var AnaResim;
        var DigerResimler;
        var Yazi;
        var SectionID;
        var Tarih;
        var Link;
        var Rmore = 'Devamını Oku';

        html += '<section id="haberler">'+
                '<div class="container">'+
                '<div class="col-lg-12 page-header wow '+AnimationHeader+' paddingL0" data-wow-delay="'+wowDelay+'">'+
                '<h2 data-basliklar="GH">Haberler</h2>'+
                '</div>';
                console.log(data);
        for(i=0; i<data.length; i++){
          if (en) {
            Rmore = "Read More";
            if (data[i].en_AnaResim == "") {
              AnaResim = data[i].tr_AnaResim;
            } else {
              AnaResim = data[i].en_AnaResim;
            }

            if (data[i].en_DigerResimler == "") {
              DigerResimler = data[i].tr_DigerResimler;
            } else {
              DigerResimler = data[i].en_DigerResimler;
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
            Link = baseurl+'en/Haberler/Haber/'+SectionID;

          } else {
            AnaResim = data[i].tr_AnaResim;
            DigerResimler = data[i].tr_DigerResimler;
            Baslik = data[i].tr_Baslik;
            Yazi = data[i].tr_Yazi;
            SectionID = data[i].tr_SectionID;
            Link = baseurl+'Haberler/Haber/'+SectionID;
          }
          Tarih = data[i].Tarih;
          var dateAr = Tarih.split('-');
          var Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];

          html +=
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad25 marginB35 wow '+Animation+'" data-wow-delay="'+wowDelay+'">'+
            '<div class="row hidden-md hidden-sm hidden-xs marginTop20 wow '+AnimationText+'" data-wow-delay="'+wowDelayText+'s"> <!-- hidden-xs-sm-md -->'+
            '<div class="col-lg-4">'+
            '<a href="'+Link+'"><img alt="'+Baslik+'" class="img-responsive img-center w400 hvr-bob" style="max-height:300px;" src="'+baseurl+'resources/images/'+AnaResim+'"></a>'+
            '</div>'+
            '<div class="col-lg-8">'+
            '<h3><a href="'+Link+'">'+Baslik+' <span class="fSize65per">('+Tarih+')</span></a></h3>'+
            '<p class="shorten_content8">'+Yazi+'</p>'+
            '<br>'+
            '</div>'+
            '<a href="'+Link+'" class="btn btn-sm btn-danger borderRad10" style="position:absolute;bottom:20px;right:20px">'+Rmore+'</a>'+
            '</div>'+
            '<div class="row visible-md visible-sm visible-xs marginTop20 wow '+AnimationText+'" data-wow-delay="'+wowDelayText+'s"> <!-- visible-xs-sm-md -->'+
            '<div class="col-xs-12 col-sm-12 col-md-12">'+
            '<h3 class="text-center"><a href="'+Link+'">'+Baslik+' <span class="fSize65per">('+Tarih+')</span></a></h3>'+
            '<a href="'+Link+'"><img alt="'+Baslik+'" class="img-responsive img-center w400 hvr-bob" style="max-height:300px;" src="'+baseurl+'resources/images/'+AnaResim+'"></a>'+
            '</div>'+
            '<div class="col-xs-12 col-sm-12 col-md-12 marginTop10">'+
            '<p class="shorten_content8">'+Yazi+'</p>'+
            '<br><a href="'+Link+'" style="position:absolute;bottom:0;"><span class="btn btn-sm btn-danger pull-right marginR15 borderRad10">'+Rmore+'</span></a>'+
            '</div>'+
            '</div>'+
            '</div>';
        }
        html += '</div><!-- End container --></section>';
        $('#showHaberler').html(html);
      },
      error: function(){
        iziError();
      }
    });
  }

  function GetHaber(){
    var url = baseurl+'Haberler/GetHaber';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      async: false,
      data: {SectionID: cparam1, English: en},
      dataType: 'json',
      success: function(data){
        
        var html = '';
        var Baslik;
        var AnaResim;
        var DigerResimler;
        var DigerResimlerHtml = '';
        var Yazi;
        var SectionID;
        var Tarih;
        var Animation = 'bounceInUp';
        var AnimationText = 'fadeIn';
        var wowDelayText = (Number(wowDelayS)+0.8);
        if (en) {
          if (data.en_AnaResim == "") {
            AnaResim = data.tr_AnaResim;
          } else {
            AnaResim = data.en_AnaResim;
          }

          if (data.en_DigerResimler == "") {
            DigerResimler = data.tr_DigerResimler;
          } else {
            DigerResimler = data.en_DigerResimler;
          }

          if (data.en_Baslik == "") {
            Baslik = data.tr_Baslik;
          } else {
            Baslik = data.en_Baslik;
          }

          if (data.en_Yazi == "") {
            Yazi = data.tr_Yazi;
          } else {
            Yazi = data.en_Yazi;
          }

          if (data.en_SectionID == "") {
            SectionID = data.tr_SectionID;
          } else {
            SectionID = data.en_SectionID;
          }

        } else {
          AnaResim = data.tr_AnaResim;
          DigerResimler = data.tr_DigerResimler;
          Baslik = data.tr_Baslik;
          Yazi = data.tr_Yazi;
          SectionID = data.tr_SectionID;
        }
        Tarih = data.Tarih;
        var dateAr = Tarih.split('-');
        var Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
        document.title = Baslik + " | AEK";
        
        var digerResimlerArray = DigerResimler.split(',');

        DigerResimlerHtml += '<img src="'+baseurl+'resources/images/'+AnaResim+'">';
        for (var i = 0; i < digerResimlerArray.length; i++) {
          DigerResimlerHtml = DigerResimlerHtml+'<img src="'+baseurl+'resources/images/'+digerResimlerArray[i]+'">';
        }
        

        html += '<section id="haber">'+
                '<div class="container">'+
                '<div class="col-lg-12 page-header wow bounceInDown paddingL0" data-wow-delay="'+wowDelay+'">'+
                '<h2>'+Baslik+' <span class="fSize65per">('+Tarih+')</span></h2>'+
                '</div>'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow '+AnimationText+'" data-wow-delay="'+wowDelayText+'s">'+
                '<div id="GH" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">'+
                DigerResimlerHtml+
                '</div>'+
                '</div>'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow '+AnimationText+'" data-wow-delay="'+wowDelayText+'s">'+
                '<p>'+Yazi+'</p>'+
                '</div>'+
                '</div>'+
                '</section>';
        $('#showHaber').html(html);
        $(function(){
          GetGH()
        });
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

  function GetGH() {
        var GH = jQuery("#GH").unitegallery({
          thumb_fixed_size:false,
          thumb_image_overlay_effect:true,
          thumb_image_overlay_type: "blur",
          slider_scale_mode: "fit",
          gallery_autoplay:true,
          gallery_width:1400,   
          gallery_height:650,
        });
    }

  function GetHaberlerA(){
    var url = baseurl+'Haberler/GetHaberler';

    $.ajax({
      type: 'ajax',
      method: 'post',
      url: url,
      data: {
        NeedData: "true",
        English: en
      },
      async: false,
      dataType: 'json',
      success: function(result){
        data = result.data;
        var html = '';
        var i;
        var Baslik;
        var AnaResim;
        var Yazi;
        var SectionID;
        var Tarih;
        var Link;
        var btnTum = "Tüm";

        html += '<section id="haberlerA">'+
                '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 marginTop15 wow '+Animation+'" data-wow-delay="'+wowDelay+'">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad10 paddingLR5">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
                '<a href="'+baseurl+'Haberler"><h3 data-basliklar="GH" class="page-header">Haberler</h3></a>'+
                '</div>';

        for(i=0; i<=2; i++){
          if (en) {
            btnTum = "All";
            if (data[i].en_AnaResim == "") {
              AnaResim = data[i].tr_AnaResim;
            } else {
              AnaResim = data[i].en_AnaResim;
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
            Link = baseurl+'en/Haberler/Haber/'+SectionID;

          } else {
            AnaResim = data[i].tr_AnaResim;
            Baslik = data[i].tr_Baslik;
            Yazi = data[i].tr_Yazi;
            SectionID = data[i].tr_SectionID;
            Link = baseurl+'Haberler/Haber/'+SectionID;
          }

          Tarih = data[i].Tarih;
          var dateAr = Tarih.split('-');
          var Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];

          html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 paddingTB5 wow '+AnimationText+'" data-wow-delay="'+wowDelayText+'s">'+
                  '<div class="col-lg-4 visible-lg padding0">'+
                  '<a href="'+Link+'"><img src="'+baseurl+'resources/images/'+AnaResim+'" style="max-height:70px;max-width:170px;" class="img-responsive" alt="'+Baslik+'"></a>'+
                  '</div>'+
                  '<div class="col-xs-12 col-sm-12 col-md-12 hidden-lg padding0">'+
                  '<a href="'+Link+'"><img src="'+baseurl+'resources/images/'+AnaResim+'" class="img-responsive img-center" style="max-height:80px;max-width:200px;" alt="'+Baslik+'"></a>'+
                  '</div>'+
                  '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 text-center paddingR0">'+
                  '<h4 class="fSize16"><a href="'+Link+'"><span class="shorten_content9">'+Baslik+'</span><br><span class="fSize85per">('+Tarih+')</span></a></h4>'+
                  '</div>'+
                  '</div>';

        }
        html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">'+
                '<div class="page-header"></div>'+
                '<a href="'+baseurl+'Haberler"><button type="button" class="btn btn-danger btn-md">'+btnTum+' <span data-basliklar="GH">Haberler</span></button></a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</section>';
        $('#showHaberlerA').html(html);
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