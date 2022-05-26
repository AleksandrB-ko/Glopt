const hamburger = document.querySelector('.hamburger'),
    overlay = document.querySelector('.menu__overlay'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});
overlay.addEventListener('click', () => {
    menu.classList.remove('active');
});
window.addEventListener("keydown", (e) => {
    if (e.key == 'Escape') {
        menu.classList.remove('active');
    }
});
$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/caruosel/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/caruosel/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    dotsClass: "my-dots",
                    arrows: false,

                }
            }
        ]

    });
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя!",
                    minlength: jQuery.validator.format("Введите  {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер! ",
                text: {
                    required: "Пожалуйста, введите текст!",
                },
                email: {
                    required: "Пожалуйста, введите свою почту!",
                    email: "Неправильно введен адресс почты!"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#price-form');
    validateForms('.contacts__form');

    $('[data-model=thanks]').on('click', function () {
        $('.overlay, #thanks').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #thanks').fadeOut('slow');
    });

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
});