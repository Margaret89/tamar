<?
$arrMonth = array('января','февраля','марта','апреля','мая','июня','июля','августа','сеентября','октября','ноября','декабря');

if((isset($_POST['time'])&&$_POST['time']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
		$to = 'match14@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
		$subject = 'Забронировать стол'; //Загаловок сообщения
		$message = '
				<html>
					<head>
						<title>'.$subject.'</title>
					</head>
					<body>
						<p>ФИО: '.$_POST['name'].'</p>
						<p>Телефон: '.$_POST['phone'].'</p>
						<p>Дата: '.$_POST['date'].' '.$arrMonth[$_POST['month']+1].'</p>
						<p>Время: '.$_POST['phone'].'</p>
					</body>
				</html>'; //Текст нащего сообщения можно использовать HTML теги
		$headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
		$headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя
		mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
// }
?>