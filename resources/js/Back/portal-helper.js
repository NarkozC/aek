var linkLockedTime = 300;

function FunOpenModal(sBase, sButton, url, sForm, sModal, functions) {
	$('#' + sBase).on('click', '#' + sButton, function(e) {
        var $link = $(e.target); 
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var formAction = url;
            $(sForm).attr('action', formAction);
            ResetForm(sForm);
            if (functions != null) {
            	functions()
            }
            $('.nav-tabs a[href="#' + formTabs.Turkce + '"]').tab('show');
            $(sModal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });
}

function FunDelete(sBase, sButton, url, refreshFun, refreshPars) {
	$('#' + sBase).on('click', '.' + sButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var btn = $(this);
            var no = $(this).attr('data');

            iziToast.question({
                timeout: 15000,
                close: false,
                overlay: true,
                toastOnce: true,
                id: 'iziDelete',
                zindex: 999,
                title: formLang.delTitle,
                message: formLang.delMessage,
                position: 'center',
                buttons: [
                    ['<button><b>' + formLang.delEvetBtn + '</b></button>', function(instance, toast) {

                        furl = url
                        $.ajax({
                            type: 'ajax',
                            method: 'post',
                            async: false,
                            url: furl,
                            data: {
                                No: no
                            },
                            dataType: 'json',
                            success: function(result) {
                                if (result.success) {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');

                                    $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() {
                                        $(this).remove();
                                    });

                                    iziSuccess();
                                } else {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');
                                    iziError();
                                }
                            },
                            error: function() {
                                instance.hide(toast, {
                                    transitionOut: 'fadeOutDown'
                                }, 'button');
                                iziError();
                            },
                            complete: function() {
                                var sayfaID = $(btn).parents('tbody:first').attr('id');
                                var rowCount = $('#' + sayfaID + ' tr').length;
                                if (rowCount == 1) {
                                    refreshFun(refreshPars);
                                }
                            }
                        });

                    }, true],
                    ['<button>' + formLang.delHayirBtn + '</button>', function(instance, toast) {

                        instance.hide(toast, {
                            transitionOut: 'fadeOutDown'
                        }, 'button');

                    }]
                ],
            });
        }
        $link.data('lockedAt', +new Date());
    });

}