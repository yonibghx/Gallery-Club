

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
    .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
        .join('0');
    }
    return s.join(dec);
}


(function() {
	window.inputNumbercart = function(el) {
		var min = el.attr('min') || false;
		var max = el.attr('max') || false;
		var idt = el.attr('data-id') || false;
		var prise = el.attr('data-prise') || false;
		var els = {};
		els.dec = el.prev();
		els.inc = el.next();
		el.each(function() {
			init($(this));
		});
		function init(el) {
			els.dec.on('click', decrement);
			els.inc.on('click', increment);
			function decrement() {
				var value = el[0].value;
				value--;
				if(!min || value >= min) {
					el[0].value = value;
					el.trigger('change');
					
	   var prise2 = prise.toString().replace(/[^,.0-9]/g, '');
	   var prise1 = parseFloat(prise2);
	   var id = '.t_summ_'+idt;
	   var count = parseInt(el[0].value);
       $(id).html(number_format(count*prise1, 0, '.', ' ')+' руб.');						
					
					
				}
			}
			function increment() {
				var value = el[0].value;
				value++;
				if(!max || value <= max) {
					el[0].value = value++;
					el.trigger('change');
					
	   var prise2 = prise.toString().replace(/[^,.0-9]/g, '');
	   var prise1 = parseFloat(prise2);
	   var id = '.t_summ_'+idt;
	   var count = parseInt(el[0].value);
       $(id).html(number_format(count*prise1, 0, '.', ' ')+' руб.');	
					
				}	
			}
			
		}
	}
	window.inputNumber = function(el) {
		var min = el.attr('min') || false;
		var max = el.attr('max') || false;
		var idt = el.attr('data-id') || false;
		var prise = el.attr('data-prise') || false;
		var els = {};
		els.dec = el.prev();
		els.inc = el.next();
		el.each(function() {
			init($(this));
		});
		function init(el) {
			els.dec.on('click', decrement);
			els.inc.on('click', increment);
			function decrement() {
				var value = el[0].value;
				value--;
				if(!min || value >= min) {
					el[0].value = value;
					el.trigger('change');
				}
			}
			function increment() {
				var value = el[0].value;
				value++;
				if(!max || value <= max) {
					el[0].value = value++;
					el.trigger('change');
				}	
			}
			
		}
	}
})();  
  $('.js-number').each(function() {
	inputNumbercart($(this));
});
  $('.js-number-def').each(function() {
	inputNumber($(this));
});  


//удаление error
$('#form_events [name=date]').change(function() {
    if($(this).val() !== "") {
        $(this).removeClass("error");
        $('.error_date').removeClass("error").html("");
    }
});
//+ и - в корзину
$(document)
    .on('click touchend', '.days-counter__btn', function (e) { // где btn-counter - кнопки плюс и минус
        e.preventDefault();
    
        var $container = $(this).closest('#form_events'),
        $count = $container.find('[name="days"]'),
        num = $count.val();
        if (isNaN(num) === false) { // страховочка от, например, пустого поля
            num = parseInt(num, 10);
            switch ($(this).data('count')) { // соответственно, у кнопок должен быть атрибут data-ms2-count="plus или minus"
                case 'plus':
                    if (num >= 9) return;
                    num = num + 1;
                    $('.counts_day').append("<div class='counts_day-item'><div class='row aic g-4'><div class='col-md-3'><label>День "+ num + "</label></div><div class='col-md-9'><div class='row gx-3'><div class='col-6'><input name='day_"+ num + "[]' type='text' value='10:00' placeholder='10:00' class='form-control form-time'></div><div class='col-6'><input name='day_"+ num + "[]' type='text' value='22:00' placeholder='22:00' class='form-control form-time'></div></div></div></div></div>");
                    $('.form-time').each(function(){
                        $(this).timepicker({
                        	uiLibrary: 'bootstrap5',
                        	locale: 'ru-ru',
                        	format: 'HH:MM',
                        	header: false,
                        	mode: '24hr'
                        });
                    });
                    $('.days-counter__input').html(num);
                    $count.val(num);
                    break;
                case 'minus':
                    if (num <= 1) return;
                    $('.counts_day-item:last').remove();
                    num = num - 1;
                    $count.val(num);
                    $('.days-counter__input').html(num);
                    break;
            }
        } else {
            return false;
        }
        $count.trigger('change'); // инициализируем отправку на сервер.
        
        /*if($container.find('.mini_count_btn').length>0){
            $container.find('.mini_count_btn').click();
        }*/
    })
    .on('change keypress keyup', '#form_events [name="days"]', function() {
        if ($(this).val().match(/\D/)) {
            this.value = $(this).val().replace(/\D/g,''); // следим на лету, чтобы в поле были только цифры
        }
        if (parseInt($(this).val(), 10) < 1) {
            this.value = 1; // следим на лету, чтобы в поле было не меньше единицы
        }
    });

//popover
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
        trigger : 'hover',
        html : true,
    }
));
/*КВИЗ*/
$(document).ready(function(){
    
    if($('.header.fixed-top').length>0){
        $('.minimal_header').css({ 'height':$('.header.fixed-top').outerHeight() });
    }
    
    var current_fs, next_fs, previous_fs;
    var opacity;
    $(".end").click(function(){
        current_fs = $(this).parents("fieldset");
        next_fs = $("fieldset.first");
		next_fs.show();
		current_fs.animate({opacity: 0}, {
			step: function(now) {
			opacity = 1 - now;
			current_fs.css({
			'display': 'none',
			'position': 'relative'
			});
			next_fs.css({'opacity': opacity});
			},
			duration: 600
		});
    });
    $(".next").click(function(){
        current_fs = $(this).parents("fieldset");
        next_fs = $(this).parents("fieldset").next();
		var v_name = $('#form_events [name=name]').val();
        var v_date = $('#form_events [name=date]').val();
        var v_count = $('#form_events [name=count]').val();
        var v_org_face = $('#form_events [name=org_face]').val();
        var v_phone = $('#form_events [name=phone]').val();
        if ($("fieldset").index(current_fs) === 0) {
        	if(v_name.length !== 0 && v_date.length !== 0 && v_count.length !== 0) {
        		next_fs.show();
        		current_fs.animate({opacity: 0}, {
        			step: function(now) {
        			opacity = 1 - now;
        			current_fs.css({
        			'display': 'none',
        			'position': 'relative'
        			});
        			next_fs.css({'opacity': opacity});
        			},
        			duration: 600
        		});
        	}
        	else {
        		if(v_name.length === 0) {
        		    $('#form_events [name=name]').addClass("error");
        		    $('.error_name').addClass("error").html("Поле обязательно для заполнения");
        		}
        		if(v_date.length === 0) {
        		    $('#form_events [name=date]').addClass("error");
        		    $('.error_date').addClass("error").html("Поле обязательно для заполнения");
        		}
        		if(v_count.length === 0) {
        		    $('#form_events [name=count]').addClass("error");
        		    $('.error_count').addClass("error").html("Поле обязательно для заполнения");
        		}
        	}
        }
        else if ($("fieldset").index(current_fs) === 1) {
        	if(v_org_face.length !== 0 && v_phone.length !== 0) {
        		next_fs.show();
        		current_fs.animate({opacity: 0}, {
        			step: function(now) {
        			opacity = 1 - now;
        			current_fs.css({
        			'display': 'none',
        			'position': 'relative'
        			});
        			next_fs.css({'opacity': opacity});
        			},
        			duration: 600
        		});
        	}
        	else {
        		if(v_org_face.length === 0) {
        		    $('#form_events [name=org_face]').addClass("error");
        		    $('.error_org_face').addClass("error").html("Поле обязательно для заполнения");
        		}
        		if(v_phone.length === 0) {
        		    $('#form_events [name=phone]').addClass("error");
        		    $('.error_phone').addClass("error").html("Поле обязательно для заполнения");
        		}
        	}
        }
        else {
        	next_fs.show();
        	current_fs.animate({opacity: 0}, {
        		step: function(now) {
        		opacity = 1 - now;
        		current_fs.css({
        		'display': 'none',
        		'position': 'relative'
        		});
        		next_fs.css({'opacity': opacity});
        		},
        		duration: 600
        	});
        }
    });
    $(".prev").click(function(){
        current_fs = $(this).parents("fieldset");
        previous_fs = $(this).parents("fieldset").prev();
        previous_fs.show();
        current_fs.animate({opacity: 0}, {
        step: function(now) {
        opacity = 1 - now;
        current_fs.css({
        'display': 'none',
        'position': 'relative'
        });
        previous_fs.css({'opacity': opacity});
        },
        duration: 600
        });
    });
});
// прокрутка к якорю и значение мероприятия по клику кнопки
$(document).ready(function(){
    $("[data-link='quick']").on("click", function(e){
        var fixed_offset = 150;
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 100);
        e.preventDefault();
    });
});
$(document).ready(function(){
    $(".restevents-item__link").on("click", function(e){
        var fixed_offset = 150;
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 100);
        e.preventDefault();
        var newtext = $(this).attr('data-bs-whatever');
        $('#form-event').val(newtext);
        return false;
    });
    
    $(".chek_banitype").on("click", function(e){
        if($('select#form_banitype').length>0){
            var name = $(this).data('name');
            $('select#form_banitype option:contains("'+name+'")').prop('selected', true);
        }
    });
});


// Datetimepicker
$('.form-date').each(function(){
    $(this).datetimepicker({
        format: 'dd.mm.yyyy, HH:MM',
    	uiLibrary: 'bootstrap5',
    	footer: true,
    	modal: true,
    	locale: 'ru-ru'
    });
});
$('.form-time').each(function(){
    $(this).timepicker({
    	uiLibrary: 'bootstrap5',
    	locale: 'ru-ru',
    	format: 'HH:MM',
    	header: false,
    	mode: '24hr'
    });
});
/*Сброс фокуса fancybox*/
$.fancybox.defaults.backFocus = false;
//ФОРМА
$(document).ready(function() {
    if (typeof AjaxForm !== "undefined") {
        AjaxForm.Message.success = function() { };
        $(document).on('af_complete', function(event, response) { 
            var form = response.form;
            if (response.success) { 
                form.parents('.modal').modal('hide');
                $('#success .modal-body').html(response.message);
                $('#success').modal('show');
            }
        });
    }
});
//Слайдеры
var swiper = new Swiper('[data-slider="slider-events"]', {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
        992: {
            spaceBetween: 14,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
        1200: {
            spaceBetween: 14,
            watchSlidesProgress: true,
            //centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
        }
    }
});
var swiper_club = new Swiper('[data-slider="slider-club-events"]', {
    slidesPerView: "4",
    spaceBetween: 20,
    breakpoints: {
        1200: {
            spaceBetween: 14,
            watchSlidesProgress: true,
            //centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
        },    
        992: {
            slidesPerView: "3",
            spaceBetween: 14,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },        
        768: {
            slidesPerView: "2",
            spaceBetween: 14,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },   
        500: {
            slidesPerView: "2",
            spaceBetween: 14,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },         
        0: {
            slidesPerView: "1",
            spaceBetween: 14,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
});
var swiper2 = new Swiper('[data-slider="slider-promo"]', {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
        992: {
            spaceBetween: 24,
            watchSlidesProgress: true,
            //centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
});
var swiper3 = new Swiper('[data-slider="slider-about"]', {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
        992: {
            spaceBetween: 30,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
});
var swiper4 = new Swiper('[data-slider="slider-main"]', {
    slidesPerView: 1,
    pagination: {
        clickable: true,
        el: '.swiper-pagination-main',
        type: 'bullets',
    },
    autoplay: {
       delay: 3000,
    },
    effect: 'fade',
});
var swiper5 = new Swiper('[data-slider="slider-gallery"]', {
    slidesPerView: "auto",
    spaceBetween: 24,
    watchOverflow: true,
    breakpoints: {
        992: {
            watchSlidesProgress: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
});
var swiper6 = new Swiper('[data-slider="slider-infrastructure"]', {
    slidesPerView: "auto",
    spaceBetween: 20,
    preventClicks: false,
    breakpoints: {
        992: {
            spaceBetween: 24,
            watchSlidesProgress: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
});
var swiper7 = new Swiper('[data-slider="slider-dop"]', {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
        992: {
            spaceBetween: 24,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }
    }
});
var swiper8 = new Swiper('[data-slider="slider-installation"]', {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        992: {
            watchSlidesProgress: true,
            loop: true,
            
        }
    }
});
$.fancybox.defaults.thumbs.autoStart = true;
//Init fancybox, skip cloned elements
$().fancybox({
    selector : '[data-slider="slider-gallery"] .swiper-slide:not(.swiper-slide-duplicate)',
    backFocus : false,
    buttons: [
        "thumbs",
        "close"
    ],
});
$().fancybox({
    selector : '[data-slider="slider-about"]:not([data-slider2="slider-about2"]) .swiper-slide:not(.swiper-slide-duplicate)',
    backFocus : false,
    buttons: [
        "thumbs",
        "close"
    ],
});
// Custom click event on cloned elements,
$(document).on('click', '.swiper-slide-duplicate', function(e) {
    var $slides = $(this)
        .parent()
        .children('.swiper-slide:not(.swiper-slide-duplicate)');
    $slides
        .eq( ( $(this).attr("data-swiper-slide-index") || 0) % $slides.length )
        .trigger("click.fb-start", { $trigger: $(this) });
    return false;
});

/*МАСКА ТЕЛЕФОНА*/
$(function(){
  $(".form-phone").mask("8 (999) 999-99-99");
});

$( ".more-btn" ).on( "click", function() {
    $( ".more" ).slideToggle( "slow" );
});