$(function(){
	RefreshFooter();
});

function RefreshFooter() {
	var html = '';
	var Animation = 'fadeIn';
	var CreatorAnimation = 'fadeIn';
	var CreatorAnimationDelay = (Number(wowDelayS)+0.8);
	var d = new Date();
	var dateY = d.getFullYear();

  	html += '<footer class="text-center">'+
  			'<div class="container">'+
  			'<div class="row">';

        if (page == "Kadro") {
          html += '<div id="footer" class="col-xs-12 text-center dark-bg shadow borderRad25">';
        } else {
          html += '<div id="footer" class="col-xs-12 text-center dark-bg shadow borderRad25 wow '+Animation+'" data-wow-delay="'+wowDelay+'">';
        }
        html += 
  			'<p class="co">Copyright © '+dateY+' AEK. <i class="fa fa-lg fa-paint-brush" aria-hidden="true"></i> + <i class="fa fa-lg fa-code" aria-hidden="true"></i> by <b class="hvr-wobble-skew">Doğucan Şaşıoğlu</b></p>'+
  			'</div>'+
  			'</div>'+
  			'</div>'+
  			'</footer>';
  	$('#showFooter').html(html);
}