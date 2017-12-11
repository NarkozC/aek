  function GetAllPopup() {
      var vars = {
          sectionObjects: {
              Modal: 'modal',
              Img: 'img',
          },
          sectionNames: {
              Normal: 'Popup',
              Upper: 'Popup',
              Lower: 'popup',
          },
          sectionControllers: {
              Normal: baseurl + 'Popup/',
          },
          sectionShowBases: {
              Sections: 'showPopup',
          },
          sectionFunctions: {
              Get: 'GetPopup',
              Session: 'SessionPopup'
          },

          sectionDatas: {
              Popup: {
                  Data: new Array(),
                  FData: new Array(),
                  Num: 0,
              },
          },
      };

      $(function() {
          GetPopupData()
          CheckPopup()
      });

      function CheckPopup() {
          var data = vars.sectionDatas.Popup.Data,
              fData = vars.sectionDatas.Popup.FData,
              length = data.length,
              todayZaman = new Date($.now()),
              url = vars.sectionControllers.Normal + vars.sectionFunctions.Session;
          var i, curData, curHtml;

          todayZaman = todayZaman.getHours() + ':' + todayZaman.getMinutes();
          todayZaman = todayZaman.split(':');
          todayZaman[1] = (todayZaman[0] * 10) + todayZaman[1];

          for (i = 0; i < length; i++) {
              curData = data[i];
              curHtml = fData[i];

              if (todayZaman[0] >= curData.BasSaat[0] && todayZaman[0] <= curData.BitSaat[0]) {
                  if (todayZaman[1] >= curData.BasSaat[1] && todayZaman[1] <= curData.BitSaat[1]) {
                      $('body').append('<div id="' + vars.sectionNames.Lower + '"></div>');
                      $('#' + vars.sectionNames.Lower).html(curHtml)
                      vars.sectionObjects.Modal = $('#' + vars.sectionNames.Lower + '-modal')
                      vars.sectionObjects.Img = $('#' + vars.sectionNames.Lower + '-img')
                  }
              }
          }
          setTimeout(function() {
              $.ajax({
                  type: 'ajax',
                  method: 'post',
                  url: url,
                  async: false,
                  dataType: 'json',
                  success: function(result) {
                      if (result.success) {
                          maxHeight = ($(window).height() - 200) + 'px';
                          $(vars.sectionObjects.Img).css('max-height', maxHeight);
                          $(vars.sectionObjects.Modal).modal('show');
                      } else {
                          $(vars.sectionObjects.Modal).modal('hide');
                      }
                  },
                  error: function() {
                      iziError();
                  }
              });
          }, 5);
      }

      function GetPopupData() {
          var url = vars.sectionControllers.Normal + vars.sectionFunctions.Get;

          $.ajax({
              type: 'ajax',
              method: 'post',
              url: url,
              data: {
                  English: en,
              },
              async: false,
              dataType: 'json',
              success: function(result) {
                  if (en && result.cachedataEN != "") {
                      var cache = result.cachedataEN.Popup;
                      vars.sectionDatas.Popup = cache;
                  } else if (!en && result.cachedataTR != "") {
                      var cache = result.cachedataTR.Popup;
                      vars.sectionDatas.Popup = cache;
                  } else {
                      var i, curData, html;
                      var data = result.data,
                          length = data.length;

                      for (i = 0; i < length; i++) {
                          curData = data[i]
                          curData.BasSaat = curData.BasSaat.split(':')
                          curData.BitSaat = curData.BitSaat.split(':')
                          curData.BasSaat[1] = (curData.BasSaat[0] * 10) + curData.BasSaat[1];
                          curData.BitSaat[1] = (curData.BitSaat[0] * 10) + curData.BitSaat[1];

                          html = '<div class="modal fade ajax-modal" id="' + vars.sectionNames.Lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
                              '<div class="modal-dialog">' +
                              '<div class="modal-content">' +
                              '<div class="modal-header" align="center">' +
                              '<img class="maxW150" src="' + logoUrl + '">' +
                              modalOpts.ModalCloseButton +
                              '</div>' +
                              '<div class="modal-body">' +
                              '<img src="' + imagesDir + curData.Resim + '" id="' + vars.sectionNames.Lower + '-img" class="img-responsive img-center hvr-border-fade" style="position:relative; left:50%;transform:translate(-50%,0)">' +
                              '</div>' +
                              '<div class="modal-footer">' +
                              // '<a href="" class="btn btn-info btn-lg btn-block">' + formLang.ReadMore + '</a>' +
                              '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Kapat + '</button>' +
                              '</div>' +
                              '</div>' +
                              '</div>' +
                              '</div>';

                          vars.sectionDatas.Popup.Data[i] = curData;
                          vars.sectionDatas.Popup.FData[i] = html;


                      }
                      var theCacheData = {
                          Popup: vars.sectionDatas.Popup,
                      }
                      setTimeout(Cache('GetPopupData', url, theCacheData), 1);
                  }
              },
              error: function() {
                  iziError();
              }
          });
      }



  }



  $(function() {
      GetAllPopup()
  });