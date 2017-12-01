
$(function(){
	GetNavYan();
	CreateNavYan();
});

  //functions
  function GetNavYan(){
    var url = baseurl+'Nav-Yan/GetNavYan';

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
        var Link;

        html += '<section id="nav-yan">'+
                '<div id="dek-side-navbar">'+
                '<nav class="nav">'+
                '<ul>';
        for(i=0; i<data.length; i++){
          if (en) {
            if (data[i].en_Ad == "") {
              Ad = data[i].tr_Ad;
            } else {
              Ad = data[i].en_Ad;
            }

            if (data[i].en_Link == "") {
              Link = data[i].tr_Link;
            } else {
              Link = data[i].en_Link;
            }
            Link = baseurl+'en/'+Link;
          } else {
          	Ad = data[i].tr_Ad;
          	Link = data[i].tr_Link;
            Link = baseurl+Link;
          }
          html += '<li><a href="'+Link+'">'+Ad+'</a></li>';
        }
        html += '</ul>'+
        		'</nav>'+
        		'</div>'+
        		'</section>';
        $('#showNavYan').html(html);
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

  function CreateNavYan() {
    $('#dek-side-navbar-button').sidr({
      name: 'sidr-main',
      source: '#dek-side-navbar',
      side:'right',
      onOpen: function() {
        var sidrWidth = $('#sidr-main').width();
        $('#dek-side-navbar-button').animate({
          right: (sidrWidth+'px')
        }, 10,'linear');
      },
      onClose: function() {
        $('#dek-side-navbar-button').animate({
          right: '0px'
        }, 10,'linear');
      }
    });
  }