(function($) {

    $(document).ready(function() {
        respond();
        aboutButton();
        //instaFeed();
        lightBox();
        smoothScroll();
    });

    $(window).resize(function() {
        respond();
    });

    $(document).load(function() {

    });

    function respond() {
        $('.hero').height($(window).innerHeight());
        $('.leaves-container').height($('.gallery-title-container').height());
    }

    function instaFeed() {
        var feed = new Instafeed({
            get: 'tagged',
            tagName: 'lexvienrose',
            clientId: 'd037f1f338fc41dd9cdb2e196e2802ef',
            limit: '40',
            resolution: 'standard_resolution',
            template: '<a href="{{link}}" class="instapics"><img src="{{image}}" /></a>'
        });
        feed.run();
    }

    function aboutButton() {
        $('.the-groom button, .the-bride button').click(function() {
            $('section.about-us').removeClass('transition-delay');
            $(this).parents('.about-us').addClass('toTop');
        })

        $('.the-groom button').click(function() {
            $('.the-groom-info').removeClass('fadeOutRight');
            $('.the-groom-info').addClass('animated fadeInRight delay');
            $('.the-bride button').hide();
        })

        $('.the-bride button').click(function() {
            $('.the-bride-info').removeClass('fadeOutLeft');
            $('.the-bride-info').addClass('animated fadeInLeft delay');
            $('.the-groom button').hide();
        })

        $('.close').click(function() {
            $('section.about-us').removeClass('toTop');
            $('section.about-us').addClass('transition-delay');
        })

        $('.the-groom-info .close').click(function() {
            $('.the-groom-info').removeClass('fadeInRight delay');
            $('.the-groom-info').addClass('fadeOutRight');
            $('.the-bride button').show();
        })

        $('.the-bride-info .close').click(function() {
            $('.the-bride-info').removeClass('fadeInLeft delay');
            $('.the-bride-info').addClass('fadeOutLeft');
            $('.the-groom button').show();
        })
    }

    function lightBox() {
        lightbox.option({
            alwaysShowNavOnTouchDevices: true,
            positionFromTop: 100,
            showImageNumberLabel: false
        });
    }

    function smoothScroll() {
        $('#main-nav a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    }

    /* form validation plugin */
    $.fn.goValidate = function() {
        var $form = this,
            $inputs = $form.find('input:text');

        var validators = {
            name: {
                regex: /^[A-Za-z]{3,}$/
            },
            pass: {
                regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
            },
            email: {
                regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
            },
            phone: {
                regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
            }
        };
        var validate = function(klass, value) {
            var isValid = true,
                error = '';

            if (!value && /required/.test(klass)) {
                error = 'This field is required';
                isValid = false;
            } else {
                klass = klass.split(/\s/);
                $.each(klass, function(i, k) {
                    if (validators[k]) {
                        if (value && !validators[k].regex.test(value)) {
                            isValid = false;
                            error = validators[k].error;
                        }
                    }
                });
            }
            return {
                isValid: isValid,
                error: error
            }
        };
        var showError = function($input) {
            var klass = $input.attr('class'),
                value = $input.val(),
                test = validate(klass, value);

            $input.removeClass('invalid');
            $('#form-error').addClass('hide');

            if (!test.isValid) {
                $input.addClass('invalid');

                if (typeof $input.data("shown") == "undefined" || $input.data("shown") == false) {
                    $input.popover('show');
                }

            } else {
                $input.popover('hide');
            }
        };

        $inputs.keyup(function() {
            showError($(this));
        });

        $inputs.on('shown.bs.popover', function() {
            $(this).data("shown", true);
        });

        $inputs.on('hidden.bs.popover', function() {
            $(this).data("shown", false);
        });

        $form.submit(function(e) {

            $inputs.each(function() { /* test each input */
                if ($(this).is('.required') || $(this).hasClass('invalid')) {
                    showError($(this));
                }
            });
            if ($form.find('input.invalid').length) { /* form is not valid */
                e.preventDefault();
                $('#form-error').toggleClass('hide');
            }
        });
        return this;
    };
    $('form').goValidate();

    var $logo = $('.overlayStella');
    $(document).scroll(function() {
        $logo.css({ display: ($(this).scrollTop()/$(window).height()) > .7 ? "block" : "none" });
    });


}(jQuery));