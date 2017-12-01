var Form;
var Modal;
$(function(){
  
  //Refresh Page
  RefreshHtmls();
  RefreshData();
  
  
  //Button that opens add/update modal
  $('#addHaberlerButton').click(function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      GetOkullar();
      GetResimler();
      $(Form).attr('action', baseurl+'Portal/Admin/Haberler/AddHaber');
      $(Form)[0].reset();
      $('.selectpicker').selectpicker('val', '');
      $('.text-danger').remove();
      $('.ajax-group').removeClass('has-error').removeClass('has-success');
      $('.nav-tabs a[href="#turkce-tab"]').tab('show');
      $(Modal).modal('show');
    }
    $link.data('lockedAt', +new Date());
  });
    
  //Button for posting data for add/update
  $('#HaberlerAddUpdateSubmit').click(function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      if ($('.selectpicker').selectpicker('val') == "0") {
        $('.selectpicker').selectpicker('val', '');
      }
      var url = Form.attr('action');
      var data = Form.serializeArray();
      data.push({name: 'English', value: String(en)});
      console.log(data);
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: data,
        async: false,
        dataType: 'json',
        success: function(response){
          console.log(response.deneme);
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(response.success){
            if(response.type=='add'){
              RefreshData(); 
              $(Modal).modal('hide');

            }else if(response.type=='update'){
              var No = response.data.No;
              var trInside = GetHtmlTr(response.data);
              RefreshSideData()
              $(Modal).modal('hide');
              $('tr .item-edit[data='+No+']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() { $('tr .item-edit[data='+No+']').parents('tr:first').html(trInside); RefreshSideData(); $(this).css('background-color', '#EDEDED').fadeIn(); });
            }

            if (en) {
              iziSuccessEN();
            } else {
              iziSuccessTR();
            }
          } else {
            var ajaxGroup;
            if (response.messages.length != 0) {
              $.each(response.messages, function(key, value) {
                var element = $('#' + key);
                ajaxGroup = element.parents('.ajax-group:first');
                ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success')
                
                ajaxGroup.after(value);
              });
            } else {
              RefreshData()

              $(Modal).modal('hide');
              if (en) {
                iziErrorEN();
              } else {
                iziErrorTR();
              }
            }
          }
        },
        error: function(){
          RefreshData()
          $(Modal).modal('hide');
          if (en) {
            iziErrorEN();
          } else {
            iziErrorTR();
          }
        }
      });

    }
    $link.data('lockedAt', +new Date()); 
  });

  //Button for editing
  $('#showHaberlerData').on('click', '.item-edit', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      var No = $(this).attr('data');
      $(Form).attr('action', baseurl+'Portal/Admin/Haberler/UpdateHaber');
      GetOkullar();
      GetResimler();
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Portal/Admin/Haberler/EditHaber',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $(Form)[0].reset();
          $('.selectpicker').selectpicker('val', '');
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            var Okullar = result.data.Okullar;
            var thearray = Okullar.split(',');
            $('input[name=No]').val(result.data.No);
            $('input[name=tr_Baslik]').val(result.data.tr_Baslik);
            $('input[name=en_Baslik]').val(result.data.en_Baslik);
            $('#tr_Resim').selectpicker('val', result.data.tr_Resim);
            $('#en_Resim').selectpicker('val', result.data.en_Resim);
            $('textarea[name=tr_Yazi]').val(result.data.tr_Yazi);
            $('textarea[name=en_Yazi]').val(result.data.en_Yazi);
            $('#Okullar').selectpicker('val', thearray);
            $('input[name=Tarih]').val(result.data.Tarih);

            $('.nav-tabs a[href="#turkce-tab"]').tab('show');
            $(Modal).modal('show');
          } else {
            RefreshData()
            if (en) {
              iziErrorEN();
            } else {
              iziErrorTR();
            }
          }
          
        },
        error: function(){
          RefreshData()
          if (en) {
            iziErrorEN();
          } else {
            iziErrorTR();
          }
        }
      });

    }
    $link.data('lockedAt', +new Date()); 
  });

  //Button for deleting
  $('#showHaberlerData').on('click', '.item-delete', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      var btn = $(this);
      var No = $(this).attr('data');

      iziToast.show({
          timeout: 15000,
          close: false,
          overlay: true,
          toastOnce: true,
          id: 'iziDelete',
          zindex: 999,
          title: 'Hey',
          message: 'Bundan emin misin?',
          position: 'center',
          backgroundColor:'rgba(255,249,178,.9)',
          
          buttons: [
              ['<button>Evet</button>', function (instance, toast) {
                url = baseurl+'Portal/Admin/Haberler/DeleteHaber';
                $.ajax({
                  type: 'ajax',
                  method: 'post',
                  async: false,
                  url: url,
                  data:{No:No},
                  dataType: 'json',
                  success: function(result){
                    if(result.success){
                      RefreshSideData()
                      instance.hide({ transitionOut: 'fadeOutDown' }, toast);

                      $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() { $(this).remove(); });

                      if (en) {
                        iziSuccessEN();
                      } else {
                        iziSuccessTR();
                      }
                    } else {
                      RefreshData()
                      instance.hide({ transitionOut: 'fadeOutDown' }, toast);
                      if (en) {
                        iziErrorEN();
                      } else {
                        iziErrorTR();
                      }
                    }
                  },
                  error: function(){
                    RefreshData()
                    instance.hide({ transitionOut: 'fadeOutDown' }, toast);
                    if (en) {
                      iziErrorEN();
                    } else {
                      iziErrorTR();
                    }
                  }
                });

              }, true],
              ['<button>Hayır</button>', function (instance, toast) {
                  instance.hide({ transitionOut: 'fadeOutDown' }, toast);
              }]
          ],
      });
    }
    $link.data('lockedAt', +new Date()); 
  });

  
  $('#addResimToTextButton').click(function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      var To = $(this).attr('data');
      $(Form).attr('action', baseurl+'Portal/Admin/Haberler/UpdateHaber');
      GetOkullar();
      GetResimler();
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Portal/Admin/Haberler/EditHaber',
        data: {No: No},
        async: false,
        dataType: 'json',
        success: function(result){
          $(Form)[0].reset();
          $('.selectpicker').selectpicker('val', '');
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
            var Okullar = result.data.Okullar;
            var thearray = Okullar.split(',');
            $('input[name=No]').val(result.data.No);
            $('input[name=tr_Baslik]').val(result.data.tr_Baslik);
            $('input[name=en_Baslik]').val(result.data.en_Baslik);
            $('#tr_Resim').selectpicker('val', result.data.tr_Resim);
            $('#en_Resim').selectpicker('val', result.data.en_Resim);
            $('textarea[name=tr_Yazi]').val(result.data.tr_Yazi);
            $('textarea[name=en_Yazi]').val(result.data.en_Yazi);
            $('#Okullar').selectpicker('val', thearray);
            $('input[name=Tarih]').val(result.data.Tarih);

            $('.nav-tabs a[href="#turkce-tab"]').tab('show');
            $(Modal).modal('show');
          } else {
            RefreshData()
            if (en) {
              iziErrorEN();
            } else {
              iziErrorTR();
            }
          }
          
        },
        error: function(){
          RefreshData()
          if (en) {
            iziErrorEN();
          } else {
            iziErrorTR();
          }
        }
      });

    }
    $link.data('lockedAt', +new Date()); 
  });
  
});
/*
function GetSiniflar(){
  var url = baseurl+'Portal/Admin/General-Siniflar/GetSiniflar';

  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      var i;
      var sinifCounter = 0;
      var siniflar = new Array();
      var TrSiniflarLang = new Array();
      var EnSiniflarLang = new Array();
      var okullar = new Array(11,12);
      okullar = GetOkullar();
      TrSiniflarLang = [
                      'Sınıf Seç...',
                    ];
      EnSiniflarLang = [
                      'Select Class...',
                    ];
      
      if (en) {
        var html = '<select class="form-control selectpicker" data-live-search="true" name="Siniflar" id="Siniflar" title="'+EnSiniflarLang[0]+'" data-liveSearchNormalize="true">'+
                    '<option data-tokens="All School" value="All School">All School</option>';
      } else {
        var html = '<select class="form-control selectpicker" data-live-search="true" name="Siniflar" id="Siniflar" title="'+TrSiniflarLang[0]+'" data-liveSearchNormalize="true">'+
                    '<option data-tokens="Tüm Okul" value="Tüm Okul">Tüm Okul</option>';
      }
      

      if (en) {
        var html = '<select class="form-control selectpicker" data-live-search="true" name="Siniflar[]" id="Siniflar" title="'+EnSiniflarLang[0]+'" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">'+
                    '<option data-tokens="All School" value="All School">All School</option>';
      } else {
        var html = '<select class="form-control selectpicker" data-live-search="true" name="Siniflar[]" id="Siniflar" title="'+TrSiniflarLang[0]+'" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">'+
                    '<option data-tokens="Tüm Okul" value="Tüm Okul">Tüm Okul</option>';
      }
      
      for (var i = 0; i < okullar.length; i++) {
        var Ad;
        if (en) {
          if (okullar[i][1] == "") {
            Ad = okullar[i][0];
          } else {
            Ad = okullar[i][1];
          }
          html += '<option data-tokens="All '+Ad+'" value="All '+okullar[i][0]+'">All '+Ad+'</option>';
        } else {
          Ad = okullar[i][0];
          html += '<option data-tokens="Tüm '+Ad+'" value="Tüm '+okullar[i][0]+'">Tüm '+Ad+'</option>';
        }
      }         
      
      for(i=0; i < data.length; i++){
        if (siniflar.indexOf(data[i].Sinif) == -1) {
          siniflar[sinifCounter] = data[i].Sinif;
          sinifCounter++;
        }
      }
      for (i = 0; i < siniflar.length; i++) {
        if (en) {
          html += '<option data-tokens="All '+siniflar[i]+'" value="All '+siniflar[i]+'">All '+siniflar[i]+'. Classes</option>';
        } else {
          html += '<option data-tokens="Tüm '+siniflar[i]+'" value="Tüm '+siniflar[i]+'">Tüm '+siniflar[i]+'. Sınıflar</option>';
        }
        
      }
      for (var i = 0; i < data.length; i++) {
        html += '<option data-tokens="'+data[i].Sinif+' '+data[i].Sube+' '+data[i].Okul+'" value="'+data[i].Sinif+'-'+data[i].Sube+'">'+data[i].Sinif+'-'+data[i].Sube+'</option>';
      }


      html += '</select>'
      $('#Sinif').html(html);
      $('.selectpicker').selectpicker('render');
      $('.selectpicker').selectpicker('refresh');
    },
    error: function(){
      if (en) {
        iziErrorEN();
      } else {
        iziErrorTR();
      }
    }
  });
}
*/

function GetOkullar(){
  var url = baseurl+'Portal/Admin/General-Okullar/GetOkullar';
  var okullar = new Array();
  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){   
      var i;
      var TrOkullarLang = new Array();
      var EnOkullarLang = new Array();
      TrOkullarLang = [
                      'Okul Seç...',
                    ];
      EnOkullarLang = [
                      'Select School...',
                    ];
      for(i=0; i<data.length; i++){
        var tr = data[i].tr_Ad;
        var en = data[i].en_Ad;
        var okul = [tr,en];
        okullar[i] = okul;
      }

      if (en) {
        var html = '<select class="form-control selectpicker" data-live-search="true" name="Okullar[]" id="Okullar" title="'+EnOkullarLang[0]+'" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">'+
                    '<option data-tokens="All School" value="All School">All School</option>';
      } else {
        var html = '<select class="form-control selectpicker" data-live-search="true" name="Okullar[]" id="Okullar" title="'+TrOkullarLang[0]+'" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">'+
                    '<option data-tokens="Tüm Okul" value="Tüm Okul">Tüm Okul</option>';
      }

      for (var i = 0; i < okullar.length; i++) {
        var Ad;
        if (en) {
          if (okullar[i][1] == "") {
            Ad = okullar[i][0];
          } else {
            Ad = okullar[i][1];
          }
          html += '<option data-tokens="All '+Ad+'" value="All '+okullar[i][0]+'">All '+Ad+'</option>';
        } else {
          Ad = okullar[i][0];
          html += '<option data-tokens="Tüm '+Ad+'" value="Tüm '+okullar[i][0]+'">Tüm '+Ad+'</option>';
        }
      }
      html += '</select>'
      $('#Okul').html(html);
      $('.selectpicker').selectpicker('render');
      $('.selectpicker').selectpicker('refresh');
      
    },
    error: function(){
      if (en) {
        iziErrorEN();
      } else {
        iziErrorTR();
      }
    }
  });
  return okullar;
}

function GetResimler(){
  var url = baseurl+'Portal/Admin/Resimler/GetResimler';

  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      var TrResimLang = new Array();
      var EnResimLang = new Array();
      
      TrResimLang = [
                      'Resim Seç...',
                      'Boş Sil Türkçe Resmi Kullan',
                      'Türkçe Resmi Kullan'
                    ];
      EnResimLang = [
                      'Select Image...',
                      'Empty Delete Use Turkish Image',
                      'Use Turkish Image'
                    ];

      if (en) {
        var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="tr_Resim" id="tr_Resim" title="'+EnResimLang[0]+'" data-liveSearchNormalize="true">';
        var en_html = '<select class="form-control selectpicker" data-live-search="true" name="en_Resim" id="en_Resim" title="'+EnResimLang[0]+'" data-liveSearchNormalize="true">'+'<option data-tokens="'+EnResimLang[1]+'" value="0">'+EnResimLang[2]+'</option>';
      } else {
        var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="tr_Resim" id="tr_Resim" title="'+TrResimLang[0]+'" data-liveSearchNormalize="true">';
        var en_html = '<select class="form-control selectpicker" data-live-search="true" name="en_Resim" id="en_Resim" title="'+TrResimLang[0]+'" data-liveSearchNormalize="true">'+'<option data-tokens="'+TrResimLang[1]+'" value="0">'+TrResimLang[2]+'</option>';
      }
      var i;

      for(i=0; i<data.length; i++){
        tr_html += '<option data-tokens="'+data[i].Kategori+'/'+data[i].Dosya+' '+data[i].Isim+' '+data[i].Kategori+'" value="'+data[i].Kategori+'/'+data[i].Dosya+'">'+data[i].Isim+' ('+data[i].Kategori+')</option>';
        en_html += '<option data-tokens="'+data[i].Kategori+'/'+data[i].Dosya+' '+data[i].Isim+' '+data[i].Kategori+'" value="'+data[i].Kategori+'/'+data[i].Dosya+'">'+data[i].Isim+' ('+data[i].Kategori+')</option>';
      }
      tr_html += '</select>'
      en_html += '</select>'
      $('#tr_Resimler').html(tr_html);
      $('#en_Resimler').html(en_html);
      $('.selectpicker').selectpicker('render');
      $('.selectpicker').selectpicker('refresh');
    },
    error: function(){
      if (en) {
        iziErrorEN();
      } else {
        iziErrorTR();
      }
    }
  });
}

function GetHaberlerNum(){
  var url = baseurl+'Haberler/GetHaberlerNum';

  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){
      var html = data;
      $('#num').html(html);
    },
    error: function(){
      if (en) {
        iziErrorEN();
      } else {
        iziErrorTR();
      }
    }
  });
}

var isGetHaberlerFirst = true;
//functions

function GetHaberler(){
  var url = baseurl+'Haberler/GetHaberler';
  $.ajax({
    type: 'ajax',
    method: 'post',
    url: url,
    async: false,
    dataType: 'json',
    success: function(data){

      if ( $.fn.DataTable.isDataTable('.datatable') ) {
        $('.datatable').DataTable().destroy();
      }
      
      var html = '';
      var i;
      for(i=0; i<data.length; i++){
        var trInside = GetHtmlTr(data[i]);
        html +='<tr>'+trInside+'</tr>';
      }
      $('#showHaberlerData').html(html);
      if (!isGetHaberlerFirst) {
        CreateDataTables();
      }
      isGetHaberlerFirst = false;
    },
    error: function(){
      if (en) {
        iziErrorEN();
      } else {
        iziErrorTR();
      }
    }
  });
}

function GetHtmlTr(data){
  var No = data.No;
  var Okullar = data.Okullar;
  var Tarih = data.Tarih;

  var dateAr = Tarih.split('-');
  var Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];

  var Baslik;
  var Resim;
  var Yazi;
  var SectionID;

  var TRBaslik = data.tr_Baslik;
  var TRResim = data.tr_Resim;
  var TRYazi = data.tr_Yazi;
  var TRSectionID = data.tr_SectionID;

  var ENBaslik = data.en_Baslik;
  var ENResim = data.en_Resim;
  var ENYazi = data.en_Yazi;
  var ENSectionID = data.en_SectionID;

  if (ENBaslik == "") {
    Baslik = TRBaslik;
  } else {
    Baslik = TRBaslik+' | '+ENBaslik;
  }
  if (ENResim == "") {
    Resim = TRResim;
  } else {
    Resim = TRResim+' | '+ENResim;
  }
  if (ENYazi == "") {
    Yazi = TRYazi;
  } else {
    Yazi = TRYazi+' | '+ENYazi;
  }
  if (ENSectionID == "") {
    SectionID = TRSectionID;
  } else {
    SectionID = TRSectionID+' | '+ENSectionID;
  }

  newHtml = 
              '<td class="shorten_content6">'+Baslik+'</td>'+
              '<td class="shorten_content6">'+Resim+'</td>'+
              '<td class="shorten_content6">'+Okullar+'</td>'+
              '<td class="shorten_content6">'+Tarih+'</td>'+
              '<td>'+
                '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners item-edit" data="'+No+'"><i class="fa fa-pencil" aria-hidden="true"></i></a> '+
              '</td>'+
              '<td>'+
                '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners item-delete" data="'+No+'"><i class="fa fa-trash" aria-hidden="true"></i></a>'+
              '</td>';
  return newHtml;
}

function GetAddUpdateModalHtml() {
  var tabTurkceLang = new Array();
  var tabIngilizceLang = new Array();
  var tabGenelLang = new Array();
  if (en) {
    tabTurkceLang = [
                'Turkish',
                'Header',
                'Image',
                'Text'
                ];

    tabIngilizceLang = [
                'English',
                'Header',
                'Image',
                'Text'
                ];

    tabGenelLang = [
                'Schools',
                'Date',
                "Share On Facebook",
                "Share On Twitter"
                ];             
  } else {
    tabTurkceLang = [
                'Türkçe',
                'Başlık',
                'Resim',
                'Yazı'
                ];

    tabIngilizceLang = [
                'İngilizce',
                'Başlık',
                'Resim',
                'Yazı'
                ];

    tabGenelLang = [
                'Okullar',
                'Tarih',
                "Facebook'da Paylaş",
                "Twitter'da Paylaş"
                ];            
  }
  var html = '<div class="modal fade ajax-modal" id="haberler-modal" tabindex="-1" role="dialog" aria-hidden="true">'+
              '<div class="modal-dialog">'+
              '<div class="modal-content">'+
              '<div class="modal-header" align="center">'+
              '<img class="maxW150" src="'+baseurl+'resources/images/aek-logo.png">'+
              '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>'+
              '</div>'+
              '<form role="form" method="post" id="haberler-form" class="form-horizontal" action="'+baseurl+'Portal/Haberler/AddHaber">'+
              '<div class="modal-body">'+
              '<ul class="nav nav-tabs" role="tablist">'+
              '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#turkce-tab" aria-controls="turkce-tab" role="tab" data-toggle="tab">'+tabTurkceLang[0]+'</a></li>'+
              '<li role="presentation"><a class="hvr-wobble-top" href="#ingilizce-tab" aria-controls="ingilizce-tab" role="tab" data-toggle="tab">'+tabIngilizceLang[0]+'</a></li>'+
              '</ul>'+
              '<div class="tab-content">'+
              '<input type="hidden" name="No" id="No" class="form-control" value="0">'+
              '<div role="tabpanel" class="tab-pane active" id="turkce-tab">'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabTurkceLang[1]+'</label>'+
              '<input name="tr_Baslik" id="tr_Baslik" class="form-control" type="text" placeholder="'+tabTurkceLang[1]+'">'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabTurkceLang[2]+'</label>'+
              '<div id="tr_Resimler"></div>'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabTurkceLang[3]+'</label> <br>'+
              '<button id="addResimToTextButton" style="float: left;" class="btn btn-info hvr-float-shadow" data="tr_Yazi"><i class="fa fa-picture-o" aria-hidden="true"></i></button>'+
              '<textarea name="tr_Yazi" id="tr_Yazi" class="form-control" placeholder="'+tabTurkceLang[3]+'" rows="5"></textarea>'+
              '</div>'+
              '</div>'+
              '<div role="tabpanel" class="tab-pane" id="ingilizce-tab">'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabIngilizceLang[1]+'</label>'+
              '<input name="en_Baslik" id="en_Baslik" class="form-control" type="text" placeholder="'+tabIngilizceLang[1]+'">'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabIngilizceLang[2]+'</label>'+
              '<div id="en_Resimler"></div>'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabIngilizceLang[3]+'</label>'+
              '<textarea name="en_Yazi" id="en_Yazi" class="form-control" placeholder="'+tabIngilizceLang[3]+'" rows="5"></textarea>'+
              '</div>'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabGenelLang[0]+'</label>'+
              '<div id="Okul"></div>'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabGenelLang[1]+'</label>'+
              '<input name="Tarih" id="Tarih" class="form-control" type="date" placeholder="'+tabGenelLang[1]+'">'+
              '</div>'+
              '<div class="ajax-group col-sm-12 paddingLR0">'+
              '<label>'+tabGenelLang[2]+'</label> '+
              '<input name="SFacebook" id="SFacebook" type="checkbox" value="SFacebook"><br>'+
              '<label>'+tabGenelLang[3]+'</label> '+
              '<input name="STwitter" id="STwitter" type="checkbox" value="STwitter"><br>'+
              '</div>'+
              '</div>'+
              '</div>'+
              '<div class="modal-footer">'+
              '<button type="button" id="HaberlerAddUpdateSubmit" class="btn btn-info btn-lg btn-block">Kaydet</button>'+
              '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">İptal</button>'+
              '</div>'+
              '</form> '+
              '</div>'+
              '</div>'+
              '</div>';
  $('#showAddUpdateModal').html(html);
  Form =  $('#haberler-form');
  Modal = $('#haberler-modal');
}

function GetHaberlerHtml() {
  var html = '';
  var Animation = 'bounceInUp';
  var HaberlerAnimation = 'fadeIn';
  var HaberlerAnimationDelay = (Number(wowDelayS)+0.8);

  html += '<section id="haberler" class="marginTB25">'+
          '<div class="container dark-bg shadow borderRad25 wow '+Animation+'" data-wow-delay="'+wowDelay+'">'+
          '<div class="col-lg-12 page-header text-center wow '+HaberlerAnimation+'" data-wow-delay="'+HaberlerAnimationDelay+'s">'+
          '<h2>'+
          '<button id="addHaberlerButton" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="fa fa-plus" aria-hidden="true"></i></button>'+
          '<button id="addResimButton" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="fa fa-picture-o" aria-hidden="true"></i></button>'+
          'Haberler<!--<span class="Basliklar" data="GH" style="position: relative;left: -20px;">Haberler</span>-->'+
          '<span id="num" class="badge"></span>'+
          '</h2>'+
          '</div>'+
          '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow '+HaberlerAnimation+'" data-wow-delay="'+HaberlerAnimationDelay+'s">'+
          '<div class="table-responsive">'+
          '<table class="table table-bordered table-hover datatable LGMC">'+
          '<thead class="text-center">'+
          '<th class="text-center">Başlık</th>'+
          '<th class="text-center">Resim</th>'+
          '<th class="text-center">Sınıflar</th>'+
          '<th class="text-center">Tarih</th>'+
          '<th class="text-center">Düzenle</th>'+
          '<th class="text-center">Sil</th>'+
          '</thead>'+
          '<tbody id="showHaberlerData">'+
          '</tbody>'+
          '</table>'+
          '</div>'+
          '<div id="showAddUpdateModal"></div>'+
          '<div id="ShowBasliklarModal"></div>'+
          '<div id="ShowAddResimModal"></div>'+
          '</div>'+
          '</section>';

  $('#showHaberler').html(html);
}

function RefreshData(){
  GetHaberler();
  RefreshSideData()
}

function RefreshSideData(){
  GetHaberlerNum();
}

function RefreshHtmls(){
  GetHaberlerHtml()
  GetAddUpdateModalHtml()
}

