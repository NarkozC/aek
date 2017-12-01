  function GetPopup(){
    var url = baseurl+'Popup/GetPopup';

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
        var Resim;
        var Link;
        for(i=0; i<data.length; i++){
          if (en) {
            if (data[i].en_Baslik == null || data[i].en_Baslik == "") {
              Baslik = data[i].tr_Baslik;
            } else {
              Baslik = data[i].en_Baslik;
            }

            if (data[i].en_Link == null || data[i].en_Link == "") {
              Link = data[i].tr_Link;
            } else {
              Link = data[i].en_Link;
            }

            if (data[i].en_Resim == null || data[i].en_Resim == "") {
              Resim = data[i].tr_Resim;
            } else {
              Resim = data[i].en_Resim;
            }
          } else {
            Link = data[i].tr_Link;
            Resim = data[i].tr_Resim;
            Baslik = data[i].tr_Baslik;
          }
          html += '<div class="modal fade" id="popup-modal" tabindex="-1" role="dialog">'+
                '<div class="modal-dialog" role="document">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>'+
                '<h4 class="modal-title hvr-grow-rotate">'+Baslik+'</h4>'+
                '</div>'+
                '<div class="modal-body" align="center">'+
                '<a href="'+baseurl+Link+'">'+
                '<img src="'+baseurl+'resources/images/'+Resim+'" id="popup-img" class="img-responsive hvr-glow" style="max-height">'+
                '</a>'+
                '</div>'+
                '<div class="modal-footer">'+
                '<button type="button" class="btn btn-danger hvr-buzz-out" data-dismiss="modal">Kapat</button>'+
                '<a href="'+baseurl+Link+'" id="popupBtn" class="btn btn-info hvr-push">Hakkında bilgi al</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
        }
        $('#popup').html(html);
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
	    GetPopup();
      
	    if ($('#popup').css('display') == 'block') {
	        
        $.ajax({
          type: 'ajax',
          method: 'post',
          url: baseurl+'Popup/PopupSession',
          async: false,
          dataType: 'json',
          success: function(data){
            if (data.success) {
              maxHeight = ($(window).height()-200)+'px';
              $('#popup-img').css('max-height', maxHeight);
              $('#popup-modal').modal('show');
            } else {
              $('#popup-modal').modal('hide');
            }
          },
          error: function(){
            iziToast.error({
                title: 'Hata!',
                message: 'Bir sorun oluştu! Lütfen sayfayı yenileyiniz.',
            });
          }
        });
	    } else {
	        $('#popup-modal').modal('hide');
	    }
      $('#popupBtn').click(function(){
        $('#popup-modal').modal('hide');
      });
	});

