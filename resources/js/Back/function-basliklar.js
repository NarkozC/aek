
$(function(){

	var basliklarForm = '#basliklar-form';
  var basliklarModal = '#basliklar-modal';
  GetBasliklarBaslik();
	$('.Basliklar').click(function(e){

    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
  		var VerifyKey = $(this).attr('data');
  		GetBasliklarHtml();
      
  		$.ajax({
        type: 'ajax',
        method: 'post',
        url: baseurl+'Ap/General-Basliklar/EditBasliklar',
        data: {VerifyKey: VerifyKey},
        async: false,
        dataType: 'json',
        success: function(result){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(result.success){
      			$('input[name=No]').attr("id","TempNo");
      			$('input[name=tr_Baslik]').attr("id","Temptr_Baslik");
      			$('input[name=en_Baslik]').attr("id","Tempen_Baslik");
      			$('input[name=No]').attr("name","TempNo");
      			$('input[name=tr_Baslik]').attr("name","Temptr_Baslik");
      			$('input[name=en_Baslik]').attr("name","Tempen_Baslik");

      			$('input[name=BNo]').attr("id","No");
      			$('input[name=Btr_Baslik]').attr("id","tr_Baslik");
      			$('input[name=Ben_Baslik]').attr("id","en_Baslik");
      			$('input[name=BNo]').attr("name","No");
      			$('input[name=Btr_Baslik]').attr("name","tr_Baslik");
      			$('input[name=Ben_Baslik]').attr("name","en_Baslik");

      			$('input[name=No]').val(result.data.No);
      			$('input[name=tr_Baslik]').val(result.data.tr_Baslik);
      			$('input[name=en_Baslik]').val(result.data.en_Baslik);
          	$(basliklarModal).modal('show');
          } else {
      			iziToast.error({
      			  title: 'Hata!',
      			  message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
      			});
          }
        },
        error: function(){
          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
          });
        }
      });
    }
    $link.data('lockedAt', +new Date());
	});

  $('#ShowBasliklarModal').on('hidden.bs.modal', basliklarModal, function(e){
    $('input[name=Temptr_Baslik]').attr("id","tr_Baslik");
    $('input[name=Tempen_Baslik]').attr("id","en_Baslik");
    $('input[name=Temptr_Baslik]').attr("name","tr_Baslik");
    $('input[name=Tempen_Baslik]').attr("name","en_Baslik");
  });

	$('#ShowBasliklarModal').on('click', '#BasliklarSubmit', function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
  	  var Baslik = $('.Basliklar').attr('data');
      var url = $(basliklarForm).attr('action');
      var data = $(basliklarForm).serialize();
      $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: data,
        async: false,
        dataType: 'json',
        success: function(response){
          $('.text-danger').remove();
          $('.ajax-group').removeClass('has-error').removeClass('has-success');
          if(response.success){
          	$('input[name=Temptr_Baslik]').attr("id","tr_Baslik");
            $('input[name=Tempen_Baslik]').attr("id","en_Baslik");
            $('input[name=Temptr_Baslik]').attr("name","tr_Baslik");
            $('input[name=Tempen_Baslik]').attr("name","en_Baslik");

            GetBasliklarBaslik();
            $(basliklarModal).modal('hide');
            iziToast.success({
                title: 'OK',
                message: 'Başlıklar güncellendi!',
            });

          } else {
            
            if (response.NoV == true) {
            	$('input[name=Temptr_Baslik]').attr("id","tr_Baslik");
              $('input[name=Tempen_Baslik]').attr("id","en_Baslik");
              $('input[name=Temptr_Baslik]').attr("name","tr_Baslik");
              $('input[name=Tempen_Baslik]').attr("name","en_Baslik");

              GetBasliklarBaslik();
              $(basliklarModal).modal('hide');

              iziToast.error({
                  title: 'Hata!',
                  message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
              });
            } else {
              var ajaxGroup;
              $.each(response.messages, function(key, value) {
                var element = $('#' + key);
                ajaxGroup = element.parents('.ajax-group:first');
                ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success');

                ajaxGroup.after(value);
              });
            } 
          }
        },
        error: function(){
        	$('input[name=Temptr_Baslik]').attr("id","tr_Baslik");
          $('input[name=Tempen_Baslik]').attr("id","en_Baslik");
          $('input[name=Temptr_Baslik]').attr("name","tr_Baslik");
          $('input[name=Tempen_Baslik]').attr("name","en_Baslik");

          GetBasliklarBaslik();
          $(basliklarModal).modal('hide');

          iziToast.error({
              title: 'Hata!',
              message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
          });
        }
      });
    }
    $link.data('lockedAt', +new Date());
  });

});



function GetBasliklarHtml(){
  
  var basliklarModal = '<div class="modal fade ajax-modal" id="basliklar-modal" tabindex="-1" role="dialog" aria-hidden="true"> <!-- Basliklar Modal -->'+
  					'<div class="modal-dialog">'+
  					'<div class="modal-content">'+
  					'<div class="modal-header" align="center">'+
  					'<img id="img_logo" src="'+baseurl+'resources/images/Morfill-Coaching-RY.png">'+
  					'<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>'+
  					'</div>'+
  					'<div id="div-forms"> <!-- Begin # DIV Form -->'+
  					'<form id="basliklar-form" class="form-horizontal" role="form" method="post" action="'+baseurl+'Ap/General-Basliklar/UpdateBaslik">'+
  					'<input type="hidden" name="BNo" id="BNo" class="form-control" value="0">'+
  					'<div class="modal-body">'+
  					'<div class="ajax-group col-sm-12 paddingLR0">'+
  					'<label>Türkçe Başlık</label>'+
  					'<input name="Btr_Baslik" id="Btr_Baslik" class="form-control" type="text" placeholder="Türkçe Başlık">'+
  					'</div>'+
  					'<div class="ajax-group col-sm-12 paddingLR0">'+
  					'<label>İngilizce Başlık</label>'+
  					'<input name="Ben_Baslik" id="Ben_Baslik" class="form-control" type="text" placeholder="İngilizce Başlık">'+
  					'</div>'+
  					'</div>'+
  					'<div class="modal-footer">'+
  					'<button type="button" id="BasliklarSubmit" class="btn morfillButton4 btn-lg btn-block">Kaydet</button>'+
  					'<button data-dismiss="modal" class="btn morfillButton5 hvr-buzz-out btn-lg btn-block">İptal</button>'+
  					'</div>'+
  					'</form>'+
  					'</div>'+
  					'</div>'+
  					'</div>'+
  					'</div> <!-- END MODAL -->';

  $('#ShowBasliklarModal').html(basliklarModal);
}

function GetBasliklarBaslik(){
  var VerifyKey = $('.Basliklar').attr('data');
  $.ajax({
      type: 'ajax',
      method: 'post',
      url: baseurl+'Ap/General-Basliklar/EditBasliklar',
      data: {VerifyKey: VerifyKey},
      async: false,
      dataType: 'json',
      success: function(result){
        if(result.success){
          var Baslik;
          Baslik = result.data.tr_Baslik;
          $('.Basliklar').html(Baslik);
        } else {
          iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
          });
        }
      },
      error: function(){
        iziToast.error({
            title: 'Hata!',
            message: 'Bir sorun oluştu! Lütfen daha sonra tekrar deneyiniz.',
        });
      }
  });
}



    
