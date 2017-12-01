$(document).ready(function(){
  CreateHtml()
  $('#LoginSubmit').click(function(e){
    var $link = $(e.target);
    if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
      var Form = $('#login-form');

      var url = baseurl+'Portal/Login';
      var data = Form.serializeArray();
      data.push({name: 'English', value: String(en)});
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
            // reset the Form
            Form[0].reset();
            $(Form)[0].reset();
            if (en) {
              iziSuccess();
            } else {
              iziSuccess();
            }
            setTimeout(function() {
              window.location.href = "Portal/Check";
            }, 3050);
            
          }else{
            if(response.wrong) {
              iziToast.error({
                  title: 'Hata!',
                  message: 'TC No/Email veya şifre yanlış!',
              });
            } else if (response.messages) {
              var ajaxGroup;
              $.each(response.messages, function(key, value) {
                var element = $('#' + key);
                ajaxGroup = element.parents('.ajax-group:first');
                ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success')
                
                ajaxGroup.after(value);
              });
            }
            
          }
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
    $link.data('lockedAt', +new Date());
  });
});

function CreateHtml() {
  if (en) {
    var SifreTxt = 'Password';
    var TCNoTxt = 'TC No Or E-Mail';
    var LoginBtnTxt = 'Login';
    document.title = "Login | AEK";
  } else {
    var SifreTxt = 'Şifre';
    var TCNoTxt = 'TC No Veya E-Posta';
    var LoginBtnTxt = 'Giriş';
  }
  var html = '<div class="container padding0">'+
          '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center padding0">'+
          '<div id="theContainer">'+
          '<div id="theContainer2">'+
          '<h1><a href="'+baseurl+'"><img id="aek-logo" class="img-responsive img-center" src="'+baseurl+'resources/images/aek-logo.png"></a></h1>'+
          '<form action="'+baseurl+'Portal/Login" id="login-form" class="text-center" role="form" method="post">'+
          '<div class="paddingLR10">'+
          '<div class="input-group ajax-group marginB15">'+
          '<span class="input-group-addon"><i class="fa fa-user"></i></span>'+
          '<input type="text" class="form-control" placeholder="'+TCNoTxt+'" id="TCNoOrEmail" name="TCNoOrEmail">'+
          '</div>'+
          '<div class="input-group ajax-group marginB10">'+
          '<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+
          '<input type="password" class="form-control" placeholder="'+SifreTxt+'" id="Sifre" name="Sifre">'+
          '</div>'+
          '</div>'+
          '<button type="button" id="LoginSubmit" class="btn btn-lg btn-block btn-danger">'+LoginBtnTxt+'</button>'+
          '</form>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>';
  $('#showLoginForm').html(html);
}