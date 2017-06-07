
function roomsJS(roomNum, maxPer, stepsNum) {

// У нас есть три значения: roomNum - id контейнера; maxPer - максимальный процент изображения, который будет виден на экране; stepsNum - количество шагов зуума

// Блок про перемещение

	var roomsContainer = document.getElementById(roomNum);
	var roomsContent = roomsContainer.querySelector(".roomsContent");

	var roomsPlus = roomsContainer.querySelector(".roomsPlus");
	var roomsMinus = roomsContainer.querySelector(".roomsMinus");

	// Если не заданы координаты схемы, размещаем её по центру
	if (roomsContent.style.left == 0) {
	roomsContent.style.left = (roomsContainer.offsetWidth / 2) - (roomsContent.offsetWidth / 2) + "px";
	roomsContent.style.top = (roomsContainer.offsetHeight / 2) - (roomsContent.offsetHeight / 2) + "px";
	}

	// ЗАПУСКАЕМ ФУНКЦИИ:
	// при нажати кнопки мыши;
roomsContent.addEventListener("mousedown", mapMoveDown);
	// при отпускании кнопки мыши;
roomsContent.addEventListener("mouseup", mapMoveOut);
	// при выходе за пределы блока
roomsContent.addEventListener("mouseout", mapMoveOut);


	// ПИШЕМ САМИ ФУНКЦИИ.
	// Функция для нажатия:
	function mapMoveDown(event) {
		// меняем вид курсора на перемещение
		roomsContent.style.cursor = "move";

		// вычисляем расстояние, которое надо отступить от левого верхнего угла элемента при нажатии
		var shiftX = event.clientX - roomsContent.offsetLeft;
		var shiftY = event.clientY - roomsContent.offsetTop;


		// запускаем функцию перемещения при движении
		roomsContainer.onmousemove = mapMove;
		
		// пишем функцию перемещения при движении
		function mapMove(event) {
			// присваиваем элементу координаты курсора, минус отступ shiftX/Y
			roomsContent.style.left = event.clientX - shiftX + "px";
			roomsContent.style.top = event.clientY - shiftY + "px";
		}

	}

	// Функция для отпускания и выхода за пределы блока:
	function mapMoveOut() {
		// меняем курсор на default
		roomsContent.style.cursor = "default";
		// функции перемещения при движении присваиваем значение null
		roomsContainer.onmousemove = null;
	}

		roomsContent.ondragstart = function() {
			return false;
		};

	// roomsContent.addEventListener('touchstart', function(event) {
	// 	event.preventDefault();
	// 	if (event.targetTouches.length == 1) {
	// 		var touch=event.targetTouches[0];
	// 		touchOffsetX = touch.pageX - roomsContent.offsetLeft;
	// 		touchOffsetY = touch.pageY - roomsContent.offsetTop;
	// 	}
	// }, false);
	// // Передвигаем объект
	// roomsContent.addEventListener('touchmove', function(event) {
	// 	event.preventDefault();
	// 	if (event.targetTouches.length == 1) {
	// 		var touch = event.targetTouches[0];
	// 		roomsContent.style.left = touch.pageX-touchOffsetX + 'px';
	// 		roomsContent.style.top = touch.pageY-touchOffsetY + 'px';
	// 	}
	// }, false);

// Блок про зууум

// Получаем значение ширины и высоты из css, так как при display:none; реальное значение будет 0 
	var roomsContentWidth = parseInt(getComputedStyle(roomsContent).width);
	var roomsContentHeight = parseInt(getComputedStyle(roomsContent).height);


// Запускаем функцию зума
	zoom(maxPer, stepsNum);

// Пишем функцию зума
	function zoom(maxPer, stepsNum) {
// Создаем массивы для ширины и высоты, добавляем в них первое значение минимального размера
		var stepsWidth = [];
		stepsWidth.push(roomsContentWidth);
		var stepsHeight = [];
		stepsHeight.push(roomsContentHeight);

		console.log(stepsWidth);

// Получаем максимальный размер изображения
		var maxZoomWidth = roomsContentWidth / maxPer * 100;
		var maxZoomHeight = roomsContentHeight / maxPer * 100;

// Вычисляем шаг зума в пикселях
		var stepWidth = (maxZoomWidth - roomsContentWidth) / (stepsNum - 1);
		var stepHeight = (maxZoomHeight - roomsContentHeight) / (stepsNum - 1);

// Вычисляем полшага для последующего центрирования изображения при зуммировании
		var halfStepWidth = stepWidth / 2;
		var halfStepHeight = stepHeight / 2;
		
// Присваиваем oneWidth/Height текущий размер
		var oneWidth =  roomsContentWidth;
		var oneHeight =  roomsContentHeight;

// Запускаем функцию создания массива со значениями шагов зуума в пикселях
		functionArrayPM(stepsNum);

// Пишем функцию: прибавляем каждый раз к текущему размеру шаг зума, присваиваем сумму текущему размеру, заносим в массив, пока не достигнем максимума
		function functionArrayPM(stepsNum) {
			for (var i = 0; i < stepsNum - 1; i++) {
				oneWidth = oneWidth + stepWidth;
				oneHeight = oneHeight + stepHeight;		
				stepsWidth.push(Math.ceil(oneWidth));	
				stepsHeight.push(Math.ceil(oneHeight));

			}
		}


// Запускаем функции увеличения и уменьшения при клике на кнопки
roomsPlus.addEventListener("click", function() {
			if (trueCalc < (stepsWidth.length - 1)) {
				roomsContent.style.left = (roomsContent.offsetLeft - (stepWidth * 0.5)) + "px";
				roomsContent.style.top = (roomsContent.offsetTop - (stepHeight *  0.5)) + "px";		
// увеличиваем номер элемента массива на 1, значение элемента массива присваиваем ширине и высоте изображения
				trueCalc = trueCalc + 1;
				roomsContent.style.width = stepsWidth[trueCalc] + "px";
				roomsContent.style.height = stepsHeight[trueCalc] + "px";



			} else {
				console.log(stepsWidth[trueCalc] + " это максимальное значение"); // Сообщаем в консоле, если достигнуто максимальное значение
			}
});
roomsMinus.addEventListener("click", function() {
			if (trueCalc > 0) {
				roomsContent.style.left = (roomsContent.offsetLeft + (stepWidth * 0.5)) + "px";
				roomsContent.style.top = (roomsContent.offsetTop + (stepHeight *  0.5)) + "px";		
// увеличиваем номер элемента массива на 1, значение элемента массива присваиваем ширине и высоте изображения
				trueCalc = trueCalc - 1;
				roomsContent.style.width = stepsWidth[trueCalc] + "px";
				roomsContent.style.height = stepsHeight[trueCalc] + "px";


			} else {
				console.log(stepsWidth[trueCalc] + " это максимальное значение"); // Сообщаем в консоле, если достигнуто максимальное значение
			}
});

// trueCalc - номер элемента массива
		var trueCalc = 0;

// Функция увеличения:
		function zoomIn(event) {
			if (trueCalc < (stepsWidth.length - 1)) {

				var roomsCursorX = event.clientX - (roomsContainer.offsetLeft - window.pageXOffset);
				var roomsCursorY = event.clientY - (roomsContainer.offsetTop - window.pageYOffset);

				var contentRight = roomsContent.offsetLeft + roomsContent.offsetWidth;
				var contentBottom = roomsContent.offsetTop + roomsContent.offsetHeight;

				var perStepWidth = (roomsCursorX - roomsContent.offsetLeft) / roomsContent.offsetWidth;
				var perStepHeight = (roomsCursorY - roomsContent.offsetTop) / roomsContent.offsetHeight;

// "Двигаем" изображение
				if (roomsCursorX < roomsContent.offsetLeft || roomsCursorX > contentRight || roomsCursorY < roomsContent.offsetTop || roomsCursorY > contentBottom) {
					roomsContent.style.left = (roomsContent.offsetLeft - (stepWidth * 0.5)) + "px";
					roomsContent.style.top = (roomsContent.offsetTop - (stepHeight *  0.5)) + "px";		
				} else {
					roomsContent.style.left = (roomsContent.offsetLeft - (stepWidth * perStepWidth)) + "px";
					roomsContent.style.top = (roomsContent.offsetTop - (stepHeight *  perStepHeight)) + "px";			
				}

// увеличиваем номер элемента массива на 1, значение элемента массива присваиваем ширине и высоте изображения
				trueCalc = trueCalc + 1;
				roomsContent.style.width = stepsWidth[trueCalc] + "px";
				roomsContent.style.height = stepsHeight[trueCalc] + "px";



			} else {
				console.log(stepsWidth[trueCalc] + " это максимальное значение"); // Сообщаем в консоле, если достигнуто максимальное значение
			}
		}

		function zoomOut(event) {
			if (trueCalc > 0) {

// Вычисляем значение на которое придется "подвинуться"

				var roomsCursorX = event.clientX - (roomsContainer.offsetLeft - window.pageXOffset);
				var roomsCursorY = event.clientY - (roomsContainer.offsetTop - window.pageYOffset);

				var contentRight = roomsContent.offsetLeft + roomsContent.offsetWidth;
				var contentBottom = roomsContent.offsetTop + roomsContent.offsetHeight;

				var perStepWidth = (roomsCursorX - roomsContent.offsetLeft) / roomsContent.offsetWidth;
				var perStepHeight = (roomsCursorY - roomsContent.offsetTop) / roomsContent.offsetHeight;

// "Двигаем" изображение
				if (roomsCursorX < roomsContent.offsetLeft || roomsCursorX > contentRight || roomsCursorY < roomsContent.offsetTop || roomsCursorY > contentBottom) {
					roomsContent.style.left = (roomsContent.offsetLeft + (stepWidth * 0.5)) + "px";
					roomsContent.style.top = (roomsContent.offsetTop + (stepHeight *  0.5)) + "px";	
				} else {
					roomsContent.style.left = (roomsContent.offsetLeft + (stepWidth * perStepWidth)) + "px";
					roomsContent.style.top = (roomsContent.offsetTop + (stepHeight *  perStepHeight)) + "px";				
				}

// уменьшаем номер элемента массива на 1, значение элемента массива присваиваем ширине и высоте изображения
				trueCalc = trueCalc - 1;
				roomsContent.style.width = stepsWidth[trueCalc] + "px";
				roomsContent.style.height = stepsHeight[trueCalc] + "px";




			} else {
				console.log(stepsWidth[trueCalc] + " это минимальное значение"); // Сообщаем в консоле, если достигнуто минимальное значение
			}
		}

// Заставляем работать зум при скролинге колесом мыши
		function addOnWheel(elem, handler) {
			if (elem.addEventListener) {
				if ('onwheel' in document) {
					// IE9+, FF17+
					elem.addEventListener("wheel", handler);
				} else if ('onmousewheel' in document) {
					// устаревший вариант события
					elem.addEventListener("mousewheel", handler);
				} else {
					// 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
					elem.addEventListener("MozMousePixelScroll", handler);
				}
			} else { // IE8-
				text.attachEvent("onmousewheel", handler);
			}
		}

		// var scale = 1;

		addOnWheel(roomsContainer, function(e) {

		var delta = e.deltaY || e.detail || e.wheelDelta;

			// отмасштабируем при помощи функций zoomIn/Out
			if (delta > 0) {
				zoomOut(e);

			} else {
				zoomIn(e);

			}
			// отменим прокрутку
			e.preventDefault();
		});
	}


var scaling = false;
var dist = 0;
var scale_factor = 1.0;
var curr_scale = 1.0;
var max_zoom = 100 / maxPer;
console.log(maxPer + " maxWidth " + max_zoom);
var min_zoom = 1.0;

/*Пишем функцию, которая определяет расстояние меж пальцами*/
function distance (p1, p2) {
	return (Math.sqrt(Math.pow((p1.clientX - p2.clientX), 2) + Math.pow((p1.clientY - p2.clientY), 2)));
}
/*Ловим начало косания*/
roomsContent.addEventListener('touchstart', function(evt) {
	evt.preventDefault();
	var tt = evt.targetTouches;
	if (tt.length >= 2) {
		dist = distance(tt[0], tt[1]);
		scaling = true;
	} else {
		scaling = false;
		touchOffsetX = tt[0].pageX - roomsContent.offsetLeft;
		touchOffsetY = tt[0].pageY - roomsContent.offsetTop;
	}
}, false);

/*Ловим зумирование*/
roomsContent.addEventListener('touchmove', function(evt) {
	evt.preventDefault();
	var tt = evt.targetTouches;
	if (scaling) {
		curr_scale = distance(tt[0], tt[1]) / dist * scale_factor;
		roomsContent.style.WebkitTransform = "scale(" + curr_scale + ", " + curr_scale + ")";
	} else {
			roomsContent.style.left = tt[0].pageX - touchOffsetX + 'px';
			roomsContent.style.top = tt[0].pageY - touchOffsetY + 'px';
	}
}, false);

/*Ловим конец косания*/
roomsContent.addEventListener('touchend', function(evt) {
	var tt = evt.targetTouches;
	if (tt.length < 2) {
		scaling = false;
		if (curr_scale < min_zoom) {
			scale_factor = min_zoom;
		} else {
			if (curr_scale > max_zoom) {
				scale_factor = max_zoom;
			} else {
				scale_factor = curr_scale;
			}
		}
		roomsContent.style.WebkitTransform = "scale(" + scale_factor + ", " + scale_factor + ")";
		
	} else {
		scaling = true;
	}
}, false);

function selectLayer() {
if (scale_factor > 2.5) {
	alert("jab " + stepsWidth[3]);
} else {
	alert("pyst kak ranshe");
}


}

}


console.log(stepsWidth);