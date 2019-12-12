$(document).ready(function () {
	// Маска для телефона
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 999-9999");

	// Закрыть окно по кнопке
	$('.js-close-popup').on('click', function(){
		$.fancybox.close();
	});

	// Формируем календарь
	var now = new Date();
	var thisDay = now.getDate();
	var thisMonth = now.getMonth();
	var thisYear  = now.getYear() + 1900;

	//----- Определяем текущий месяц и дату
	$('.js-select option[data-month='+thisMonth+']').attr('selected','selected');
	$('.js-input-date').val(thisDay);

	var opts = {
		month: thisMonth,
		year: thisYear
	};

	month = i = parseInt(opts.month);
	year = parseInt(opts.year);
	var m = 0;
	var calendarMonth = '';
	var days = getDaysInMonth(month,year);
	var firstDayDate=new Date(year,month,1);
	var firstDay=firstDayDate.getDay();

	firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;

	function getDaysInMonth(month,year)  {
		var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		if ((month==1)&&(year%4==0)&&((year%100!=0)||(year%400==0))){
		  return 29;
		}else{
		  return daysInMonth[month];
		}
	}

	for (item=0;item<12;item++){
		var curDay = 0;
		var dataItem = month + 1;

		if (item==0) {
			calendarMonth +='<div class="calendar__list js-calendar-list active" data-item="'+dataItem+'">';
		}else{
			calendarMonth +='<div class="calendar__list js-calendar-list" data-item="'+dataItem+'">';
		}
		

		for (var i=1;i<firstDay;i++){
			curDay = curDay == 7 ? 1 : curDay + 1;
			calendarMonth +='<div class="calendar__item calendar__item_empty"></div>'
		}

		for (var j=1;j<days+1;j++){
			curDay = curDay == 7 ? 1 : curDay + 1;

			if ((j==thisDay) && (month==thisMonth)){
				calendarMonth +='<div class="calendar__item js-calendar-item active" data-val='+j+'>'+j+'</div>'
			}else {
				calendarMonth +='<div class="calendar__item js-calendar-item" data-val='+j+'>'+j+'</div>'
			}
		}


		firstDay= curDay == 7 ? 1 : curDay+1;
		year = month == 11 ? year + 1 : year;
		month = month == 11 ? 0 : month+1;
		days = getDaysInMonth(month,year);

		calendarMonth +='</div>';
	}

	$('.js-calendar').append(calendarMonth);

	// Выбираем месяц календаря
	$('.js-select').on('change', function() {
		var idMonth = $(this).val();
		var $curMonth = $('.js-calendar-list[data-item='+idMonth+']');

		$('.js-calendar-list').removeClass('active');
		$('.js-calendar-item').removeClass('active');
		$curMonth.addClass('active');
		$curMonth.find('.js-calendar-item[data-val="1"]').addClass('active');
		$('.js-input-date').val('1');
	});

	// Выбираем значение календаря
	$('.js-calendar-item').on('click', function() {
		$('.js-calendar-item').removeClass('active');
		$(this).addClass('active');
		$('.js-input-date').val($(this).data('val'));
	});

	// Стилизация выпадающего списка
	if ($('.js-select').length) {
		$('.js-select').select2({
			minimumResultsForSearch: Infinity,
			placeholder: function(){
				$(this).attr('data-placeholder');
			},
		});
	}

	// Отправка письма
	$("#form").submit(function(e) {
		e.preventDefault() //устанавливаем событие отправки для формы с id=form
		var form_data = $(this).serialize(); //собераем все данные из формы
		$.fancybox.open({
					src  : '#msg-success',
					type : 'inline',
					opts : {
						
					}
				});
				$("#form")[0].reset();

		$.ajax({
		type: 'POST', //Метод отправки
		url: 'send.php', //путь до php фаила отправителя
		data: form_data,
			success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
				// $.fancybox.close();
				$.fancybox.open({
					src  : '#msg-success',
					type : 'inline',
					opts : {
						
					}
				});
				$("#form")[0].reset();
			}
		});
	});
});