    $(function(){
      /*GetNavKurumsal();
      GetNavHakkimizda()
      //GetSections();
      GetBasliklar();
      /*
      if (en) {
        $('#anasayfa-nav').attr('href', baseurl+'en/');
        $('.GD-nav').attr('href', baseurl+'en/Duyurular');
      }
      */
    });

    function GetNavKurumsal(){
      var url = baseurl+'Kurumsal/GetKurumsal';

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
          var Baslik;
          var SectionID;
          var Ebeveyn;
          var link = '';
          if (en) {
            link = 'en/';
          }
          for(i=0; i<data.length; i++){
            if (en) {
              if (data[i].en_Baslik == "") {
                Baslik = data[i].tr_Baslik;
              } else {
                Baslik = data[i].en_Baslik;
              }

              if (data[i].en_SectionID == "") {
                SectionID = data[i].tr_SectionID;
              } else {
                SectionID = data[i].en_SectionID;
              }

              if (data[i].en_SectionID == "") {
                Ebeveyn = data[i].tr_Ebeveyn;
              } else {
                Ebeveyn = data[i].en_Ebeveyn;
              }
              //$('#EB-nav').attr('href', baseurl+'en/Kurumsal#page');
            } else {
              SectionID = data[i].tr_SectionID;
              Baslik = data[i].tr_Baslik;
            }
            if (i <= break_on-1) {
                html +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+baseurl+link+'Kurumsal#'+SectionID+'">'+Baslik+'</a></li>';
              } else {
                  if (i == break_on && i != data.length-1) {
                    html += '<li class="dropdown-center-onclick">'+
                            '<a href="javascript:;" data-toggle="collapse" data-target="#id_c0b19b9524501c5be" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> Daha Fazlası ...</a>'+
                            '<ul class="dropdown-menu collapse" id="id_c0b19b9524501c5be">'+
                            '<li>'+
                            '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+baseurl+link+'Kurumsal#'+SectionID+'">'+Baslik+'</a>';
                  } else if (i == break_on) {
                    html +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+baseurl+link+'Kurumsal#'+SectionID+'">'+Baslik+'</a></li>';
                  } else {
                    html += '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+baseurl+link+'Kurumsal#'+SectionID+'">'+Baslik+'</a>';

                    if (i == data.length-1) {
                      html += '</li>';
                    }
                  }
              }
          }
          $('#kurumsal-navbar').html(html);
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

    function GetNavNedenDek(){
      var url = baseurl+'Neden-Dek/GetNedenDek';

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
          var Baslik;
          var SectionID;
          var link = '';
          if (en) {
            link = 'en/';
          }
          for(i=0; i<data.length; i++){
            if (en) {
              if (data[i].en_Baslik == "") {
                Baslik = data[i].tr_Baslik;
              } else {
                Baslik = data[i].en_Baslik;
              }
            if (data[i].en_SectionID == "") {
                SectionID = data[i].tr_SectionID;
              } else {
                SectionID = data[i].en_SectionID;
              }
              //$('#EK-nav').attr('href', baseurl+'en/Neden-Dek#page');
            } else {
              SectionID = data[i].tr_SectionID;
              Baslik = data[i].tr_Baslik;
            }
            if (i <= break_on-1) {
                html +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+baseurl+link+'Neden-Dek#'+SectionID+'">'+Baslik+'</a></li>';
              } else {
                  if (i == break_on && i != data.length-1) {
                    html += '<li class="dropdown-center-onclick">'+
                            '<a href="javascript:;" data-toggle="collapse" data-target="#id_c1b19b9524501c5be" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> Daha Fazlası ...</a>'+
                            '<ul class="dropdown-menu collapse" id="id_c1b19b9524501c5be">'+
                            '<li>'+
                            '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+baseurl+link+'Neden-Dek#'+SectionID+'">'+Baslik+'</a>';
                  } else if (i == break_on) {
                    html +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+baseurl+link+'Neden-Dek#'+SectionID+'">'+Baslik+'</a></li>';
                  } else {
                    html += '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+baseurl+link+'Neden-Dek#'+SectionID+'">'+Baslik+'</a>';

                    if (i == data.length-1) {
                      html += '</li>';
                    }
                  }
              }
          }
          $('#nedenDek-navbar').html(html);
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

    function GetNavKurumlar(){
      var url = baseurl+'Kurumlar/GetKurumlar';

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
          var Baslik;
          var SectionID;
          var link = '';
          if (en) {
            link = 'en/';
          }
          for(i=0; i<data.length; i++){
            if (en) {
              if (data[i].en_Baslik == "") {
                Baslik = data[i].tr_Baslik;
              } else {
                Baslik = data[i].en_Baslik;
              }
            if (data[i].en_SectionID == "") {
                SectionID = data[i].tr_SectionID;
              } else {
                SectionID = data[i].en_SectionID;
              }
              //$('#HB-nav').attr('href', baseurl+'en/Kurumlar#page');
            } else {
              SectionID = data[i].tr_SectionID;
              Baslik = data[i].tr_Baslik;
            }
            if (i <= break_on-1) {
                html +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+baseurl+link+'Kurumlar#'+SectionID+'">'+Baslik+'</a></li>';
              } else {
                  if (i == break_on && i != data.length-1) {
                    html += '<li class="dropdown-center-onclick">'+
                            '<a href="javascript:;" data-toggle="collapse" data-target="#id_c0b29b9524501c5be" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> Daha Fazlası ...</a>'+
                            '<ul class="dropdown-menu collapse" id="id_c0b29b9524501c5be">'+
                            '<li>'+
                            '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+baseurl+link+'Kurumlar#'+SectionID+'">'+Baslik+'</a>';
                  } else if (i == break_on) {
                    html +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+baseurl+link+'Kurumlar#'+SectionID+'">'+Baslik+'</a></li>';
                  } else {
                    html += '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+baseurl+link+'Kurumlar#'+SectionID+'">'+Baslik+'</a>';

                    if (i == data.length-1) {
                      html += '</li>';
                    }
                  }
              }
          }
          $('#birHizmet-navbar').html(html);
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

    function GetSections(){
      var url = baseurl+'Navbar/GetSections';

      $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data){
          $('#yorumlar').css('display', data.sections['Yorumlar']);
          $('#popup').css('display', data.sections['Popup']);
          $('#galeri').css('display', data.sections['Galeri']);
          $('#galeriNav').css('display', data.sections['Galeri']);
        },
        error: function(){
          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
          });
        }
      });
    }

    function GetBasliklar(){
      var url = baseurl+'Basliklar/GetBasliklar';

      $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data){
          var i;
          var Baslik;
          for(i=0; i<data.length; i++){
            if (en) {
              if (data[i].en_Baslik == "") {
                Baslik = data[i].tr_Baslik;
              } else {
                Baslik = data[i].en_Baslik;
              }
            } else {
              Baslik = data[i].tr_Baslik;
            }
            if ($('[data-basliklar="'+data[i].VerifyKey+'"]').length != 0) {
              if ($(document).attr('title') == data[i].tr_Baslik+" | Morfill") {
                $(document).attr('title', Baslik + " | Morfill");
              }

              if ($('a[data-basliklar="'+data[i].VerifyKey+'"]').hasClass('dropdown-toggle')) {
                Baslik += '<span class="caret"></span>';
                $(this).html(Baslik);
              } else {
                $('[data-basliklar="'+data[i].VerifyKey+'"]').html(Baslik);
              }
              
              
              
              
            }
          }
        },
        error: function(){
          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
          });
        }
      });
    }

    