
function showHideJson(e) {
    var selectedID = $(e).attr("id");
    if (selectedID == "getrequest") {
        $(e).prop('checked', true);
        $("#postrequest").prop('checked', false);
        $("#maininput").attr("hidden", "hidden");
        $('#lbl-getrequest').css( "color", "#006699" );
        $('#lbl-postrequest').css( "color", "grey" );

    } else if (selectedID == "postrequest") {
        $(e).prop('checked', true);
        $("#getrequest").prop('checked', false);
        $("#maininput").removeAttr("hidden");
        $('#lbl-postrequest').css( "color", "#006699" );
        $('#lbl-getrequest').css( "color", "grey" );    }
}

function showCloseIcon(e) {
    $(e).find('span').show();
    $(e).find('p').css( "color", "#006699" );
}
function hideCloseIcon(e) {
    $(e).find('span').hide();
    $(e).find('p').css( "color", "#009999" );
}

function onReady() {

    (function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', onInputFocus );
            inputEl.addEventListener( 'blur', onInputBlur );
        } );

        function onInputFocus( ev ) {
            classie.add( ev.target.parentNode, 'input--filled' );
        }

        function onInputBlur( ev ) {
            if( ev.target.value.trim() === '' ) {
                classie.remove( ev.target.parentNode, 'input--filled' );
            }
        }
    })();

    $(function () {
        //----- OPEN
        $('[data-popup-open]').on('click', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-open');
            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

            e.preventDefault();
        });

        //----- CLOSE
        $('[data-popup-close]').on('click', function (e) {
            var targeted_popup_class = jQuery(this).attr('data-popup-close');
            $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

            e.preventDefault();
        });
    });

    $('#history').on('click', function () {
        $('#historytab').show();
        $('#projectstab').hide();
    });

    $('#projects').on('click', function () {
        $('#projectstab').show();
        $('#historytab').hide();
    });

    $('div.panel').mouseover(function() {

        $( this ).find( "span.fa-file" ).show();
        $( this ).find( "span.fa-bookmark" ).show();
        $( this ).find( "span.fa-close" ).show();
    })
        .mouseout(function() {
            $( this ).find( "span.fa-file" ).hide();
            $( this ).find( "span.fa-bookmark" ).hide();
            $( this ).find( "span.fa-close" ).hide();
        });

    $("#historytab").find('li')
        .each(function () {
            $(this).on("mouseover", function () {
                showCloseIcon(this);
            });
            $(this).on("mouseleave", function () {
                hideCloseIcon(this);
            });
        });

    $(".table").each(function () {
        $(this).find('td').each(function () {
            $(this).on("mouseover", function () {
                showCloseIcon(this);
            });
            $(this).on("mouseleave", function () {
                hideCloseIcon(this);
            });
        });
    });

    $('#getrequest').on("click", function () {
        showHideJson(this);
    });

    $('#postrequest').on("click", function () {
        showHideJson(this);
    });
}
$(document).ready(function () {
    onReady();
});

