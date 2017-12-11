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
                  FHtml: new Array(),
                  BHtml: '',
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
              fData = vars.sectionDatas.Popup.FHtml,
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
          vars.sectionDatas.Popup = {
              Data: new Array(),
              FHtml: new Array(),
              BHtml: '',
              Num: 0,
          }
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
                      var data = result.data,
                          length = data.length,
                          html = '',
                          fHtml = '';
                      var i, curData, trInside, trArray;

                      for (i = 0; i < length; i++) {
                          curData = data[i];
                          curData.BasSaat = curData.BasSaat.split(':')
                          curData.BitSaat = curData.BitSaat.split(':')
                          curData.BasSaat = curData.BasSaat[0] + ':' + curData.BasSaat[1];
                          curData.BitSaat = curData.BitSaat[0] + ':' + curData.BitSaat[1];

                          trArray = new Array('BasSaat', 'BitSaat');
                          trInside = GetHtmlTr(curData, trArray);
                          html += '<tr>' + trInside + '</tr>';



                          curData = data[i]
                          curData.BasSaat = curData.BasSaat.split(':')
                          curData.BitSaat = curData.BitSaat.split(':')
                          curData.BasSaat = new Array(curData.BasSaat[0], curData.BasSaat[1]);
                          curData.BitSaat = new Array(curData.BitSaat[0], curData.BitSaat[1]);
                          curData.BasSaat[1] = (curData.BasSaat[0] * 10) + curData.BasSaat[1];
                          curData.BitSaat[1] = (curData.BitSaat[0] * 10) + curData.BitSaat[1];

                          fHtml = '<div class="modal fade ajax-modal" id="' + vars.sectionNames.Lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
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
                          vars.sectionDatas.Popup.FHtml[i] = fHtml;
                      }

                      vars.sectionDatas.Popup.BHtml = html;
                      vars.sectionDatas.Popup.Num = length;
                      var theCacheData = {
                          Popup: vars.sectionDatas.Popup,
                      }
                      setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                  }
              },
              error: function() {
                  iziError();
              }
          });
      }

      function GetHtmlTr(data, trArray) {
          var i;
          var newHtml = '';
          var length = trArray.length;
          var no = data.No;

          for (i = 0; i < length; i++) {
              newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
          }
          newHtml +=
              '<td>' +
              '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
              '</td>' +
              '<td>' +
              '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
              '</td>';

          return newHtml;
      }



  }



  $(function() {
      GetAllPopup()
  });