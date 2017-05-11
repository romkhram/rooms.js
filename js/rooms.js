
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
roomsPlus.addEventListener("click", zoomIn);
roomsMinus.addEventListener("click", zoomOut);

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
			// if (elem.addEventListener) {
			// 	if ('onwheel' in document) {
			// 		// IE9+, FF17+
					elem.addEventListener("wheel", handler);
			// 	} else if ('onmousewheel' in document) {
			// 		// устаревший вариант события
			// 		elem.addEventListener("mousewheel", handler);
			// 	} else {
			// 		// 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
			// 		elem.addEventListener("MozMousePixelScroll", handler);
			// 	}
			// } else { // IE8-
			// 	text.attachEvent("onmousewheel", handler);
			// }
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

}


// document.getElementById("demo").onclick = function() {myFunction()};

// function myFunction() {
//     document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
// }


 // ontouchmove="move_object(event);"

// document.getElementById('floating').addEventListener("ontouchmove", move_object(event));
// // document.getElementById('floating').ontouchmove = function() {move_object(event)};
// // Перетаскивание элемента 
// function move_object(event) {
//     // Подавить событие 
//     event.preventDefault(); 
//     var left=event.touches[0].pageX; 
//     var top=event.touches[0].pageY; 
//     // Переместить элемент 
//     var el=document.getElementById('floating'); 
//     el.style.top=top+'px'; 
//     el.style.left=left+'px'; 
// }


document.getElementById("floating").ontouchmove = function(e) {
    event.preventDefault(); 
    var left=event.touches[0].pageX; 
    var top=event.touches[0].pageY; 
    // Переместить элемент 
    var el=document.getElementById('floating'); 
    el.style.top=top+'px'; 
    el.style.left=left+'px'; 
}