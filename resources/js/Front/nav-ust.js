    $(function(){
      GetNav();
    });

    function GetNav() {
      var navUstData = GetNavUst();
      var navUstSubData = GetNavUstSub();
      var navUstSubSubData = GetNavUstSubSub();
      var Counter1 = 0;
      var Counter2 = 0;
      var html = '';


      var navUstShowIDs = new Array();
      var navUstAds = new Array();
      for (var i = 0; i < navUstData.length; i++) {
        if (navUstData[i]['IsLink'] == 1) {
          if (navUstData[i]['Link'] == "#iletisim") {
            html += '<li><a class="ajax" href="'+navUstData[i]['Link']+'">'+navUstData[i]['Ad']+'</a></li>'
          } else {
            html += '<li><a class="ajax" href="'+navUstData[i]['Link']+'">'+navUstData[i]['Ad']+'</a></li>'
          }
          
        } else {
          html += '<li id="show'+navUstData[i]['ShowID']+'" class="dropdown"></li>'
          navUstShowIDs[Counter1] = 'show'+navUstData[i]['ShowID'];
          navUstAds[Counter1] = navUstData[i]['Ad'];

          Counter1++;
        }
      }
      $('#showNavUst').html(html);
      Counter1 = 0;
      html = '';

      for (var i = 0; i < navUstShowIDs.length; i++) {
        var break_on = 4;
        var subHtmlH =  '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+navUstAds[i]+'<span class="caret"></span></a>'+
                '<ul class="dropdown-menu" role="menu">'; 
        var subHtmlM =  '';
        var subHtmlF =  '</ul>';

        var howMuchSub = 0;
        for (var k = 0; k < navUstSubData.length; k++) {
          var indexOfHowMuch = navUstSubData[k].ShowID.indexOf(navUstShowIDs[i]);
          if(indexOfHowMuch != -1) {
            howMuchSub++; 
          }
        }
        console.log(howMuchSub);
        
        
        for (var j = 0; j < howMuchSub; j++) {
          var indexOfQ = navUstSubData[Counter1].ShowID.indexOf(navUstShowIDs[i]);
          var subHtml = '';

          
          if(indexOfQ !== -1) {
            var subNo = navUstSubData[Counter1]['No'];
            var subAd = navUstSubData[Counter1]['Ad'];
            var subLink = navUstSubData[Counter1]['Link'];
            var subShowID = navUstSubData[Counter1]['ShowID'];
            var subIsLink = navUstSubData[Counter1]['IsLink'];
            var subIsLinkShowID = navUstSubData[Counter1]['IsLinkShowID'];
            var ShowMore = "Daha Fazla Göster";
            if (en) {
              ShowMore = "Show More";
            }

            if (j <= break_on-1) {
              if (subLink == "http://localhost/doktorlar-koleji/http://ankaraegitimkurumlari.k12net.com/" || subLink == "http://www.aek.k12.tr/http://ankaraegitimkurumlari.k12net.com/") {
                subLink = "http://ankaraegitimkurumlari.k12net.com/";
              }
              if (subIsLink == 1) {
                subHtml +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+subLink+'">'+subAd+'</a></li>';
              } else {
                subHtml +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+subLink+'">'+subAd+'</a></li>';
              }
              console.log(subLink);
            } else {
              if (j == break_on && j != howMuchSub-1) {
                subHtml += '<li class="dropdown-center-onclick">'+
                        '<a href="javascript:;" data-toggle="collapse" data-target="#id_c0b19b9524501'+subNo+subIsLink+'" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> '+ShowMore+'</a>'+
                        '<ul class="dropdown-menu collapse" id="#id_c0b19b9524501'+subNo+subIsLink+'">'+
                        '<li>'+
                        '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+subLink+'">'+subAd+'</a>';
              } else if (j == break_on) {
                subHtml +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+subLink+'">'+subAd+'</a></li>';
              } else {
                subHtml += '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+subLink+'">'+subAd+'</a>';

                if (j == howMuchSub-1) {
                  subHtml += '</li>';
                }
              }
            }



            console.log(subHtml);
            
            subHtmlM += subHtml;
            if (j == howMuchSub-1) {
              var oldHtml = $('#'+subShowID).html();
              $('#'+subShowID).html(oldHtml+subHtmlH+subHtmlM+subHtmlF);
            }
            
          }

          Counter1++;
          
        }
        

        
      }
      

    }

    function GetNavUst(){
      var url = baseurl+'Nav-Ust/GetNavUst';
      /*var navUstShowIDs = new Array();
      var navUstCounter = 0;
      var navUstAds = new Array();*/
      var navUstDataFinal = new Array();

      $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data){
          var html = '';
          var i;
          var No;
          var Ad;
          var Link;
          var IsLink;
          var ShowID;
          
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
              if (Link == "#iletisim") {
                Link = baseurl+'en/'+page+Link;
              } else {
                Link = baseurl+'en/'+Link;
              }
            } else {
              Ad = data[i].tr_Ad;
              Link = data[i].tr_Link;
              if (Link == "#iletisim") {
                Link = baseurl+page+Link;
              } else {
                Link = baseurl+Link;
              }
            }
            IsLink = data[i].IsLink;
            ShowID = data[i].ShowID;
            No = data[i].No;

            var navUstData = {No:No, Ad:Ad, Link:Link, IsLink:IsLink, ShowID:ShowID};
            navUstDataFinal[i] = navUstData;
	          
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
      return navUstDataFinal;
      /*
      var finalSubData = GetNavUstSub();
      var subCounter = 0;
      for (var i = 0; i < navUstShowIDs.length; i++) {
      	var break_on = 4;
      	var subHtmlH =  '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+navUstAds[i]+'<span class="caret"></span></a>'+
      					'<ul class="dropdown-menu" role="menu">'; 
      	var subHtmlM =  '';
      	var subHtmlF =  '</ul>';

      	var howMuchSub = 0;
      	for (var k = 0; k < finalSubData.length; k++) {
      		var inArrayHowMuch = jQuery.inArray(navUstShowIDs[i], finalSubData[k]);
      		if(inArrayHowMuch !== -1) {
      			howMuchSub++;
      		}
      	}
      	
      	
      	for (var j = 0; j < howMuchSub; j++) {
      		var inArrayQ = jQuery.inArray(navUstShowIDs[i], finalSubData[subCounter]);
      		var subHtml = '';

      		
      		if(inArrayQ !== -1) {
      			var subNo = finalSubData[subCounter][0];
      			var subAd = finalSubData[subCounter][1];
      			var subLink = finalSubData[subCounter][2];
      			var subShowID = finalSubData[subCounter][3];
      			var ShowMore = "Daha Fazla Göster";
      			if (en) {
      				ShowMore = "Show More";
      			}

	        	if (j <= break_on-1) {
	                subHtml +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+subLink+'">'+subAd+'</a></li>';
	              } else {
	                  if (j == break_on && j != howMuchSub-1) {
	                    subHtml += '<li class="dropdown-center-onclick">'+
	                            '<a href="javascript:;" data-toggle="collapse" data-target="#id_c0b19b9524501'+subNo+'" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> '+ShowMore+'</a>'+
	                            '<ul class="dropdown-menu collapse" id="#id_c0b19b9524501'+subNo+'">'+
	                            '<li>'+
	                            '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+subLink+'">'+subAd+'</a>';
	                  } else if (j == break_on) {
	                    subHtml +='<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+subLink+'">'+subAd+'</a></li>';
	                  } else {
	                    subHtml += '<a data-toggle="collapse" data-target="#AekNavbar" class="ajax" href="'+subLink+'">'+subAd+'</a>';

	                    if (j == howMuchSub-1) {
	                      subHtml += '</li>';
	                    }
	                  }
	              }

	        	subHtmlM += subHtml;
	        	if (j == howMuchSub-1) {
		        	var oldHtml = $('#'+subShowID).html();
	    			$('#'+subShowID).html(oldHtml+subHtmlH+subHtmlM+subHtmlF);
		        }
		    }

	        subCounter++;

	        
      	}

      	
      }
      */

      // 18.09.17 notu
      // üst navbarda subu olmayanları direk yazdık subu olanlar içinde show id oluşturduk bu show id leri kaydettik
      // şimdi sub tablosunda sırayla bu showid leri arayacağız(where) ardındanda gelen sonuçları show id nin içine yazacağız.

    }

    function GetNavUstSub() {
    	  var url = baseurl+'Nav-Ust-Sub/GetNavUstSub';
    	  var navUstSubDataFinal = new Array();
	      $.ajax({
	        type: 'ajax',
	        method: 'post',
	        url: url,
	        async: false,
	        dataType: 'json',
	        success: function(data){
	          var html = '';
	          var i;
	          var No;
	          var Ad;
	          var Link;
	          var ShowID;
            var IsLink;
            var IsLinkShowID;
	          
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
              IsLink = data[i].IsLink;
              IsLinkShowID = data[i].IsLinkShowID;
	            ShowID = data[i].ShowID;
	            No = data[i].No


	            var subData = {No:No, Ad:Ad, Link:Link, ShowID:ShowID, IsLink:IsLink, IsLinkShowID:IsLinkShowID};
	            navUstSubDataFinal[i] = subData;
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
	      return navUstSubDataFinal;
    }

    function GetNavUstSubSub() {
        var url = baseurl+'Nav-Ust-Sub-Sub/GetNavUstSubSub';
        var navUstSubSubDataFinal = new Array();
        $.ajax({
          type: 'ajax',
          method: 'post',
          url: url,
          async: false,
          dataType: 'json',
          success: function(data){
            var html = '';
            var i;
            var No;
            var Ad;
            var Link;
            var ShowID;
            var IsLink;
            var IsLinkShowID;
            
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
              IsLink = data[i].IsLink;
              IsLinkShowID = data[i].IsLinkShowID;
              ShowID = data[i].ShowID;
              No = data[i].No


              var subData = {No:No, Ad:Ad, Link:Link, ShowID:ShowID, IsLink:IsLink, IsLinkShowID:IsLinkShowID};
              navUstSubSubDataFinal[i] = subData;
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
        return navUstSubSubDataFinal;
    }