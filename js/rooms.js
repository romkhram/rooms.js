
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
	// roomsContent.onmousedown = mapMoveDown;
roomsContent.addEventListener("mousedown", mapMoveDown);
	// при отпускании кнопки мыши;
	// roomsContent.onmouseup = mapMoveOut;
roomsContent.addEventListener("mouseup", mapMoveOut);
	// при выходе за пределы блока
	// roomsContainer.onmouseout = mapMoveOut;
roomsContent.addEventListener("mouseout", mapMoveOut);

	// roomsPlus.onclick = zoomIn;
	// roomsMinus.onclick = zoomOut;


	// ПИШЕМ САМИ ФУНКЦИИ.
	// Функция для нажатия:
	function mapMoveDown(event) {
		// меняем вид курсора на перемещение
		roomsContent.style.cursor = "move";

		// вычисляем расстояние, которое надо отступить от левого верхнего угла элемента при нажатии
		var shiftX = event.clientX - roomsContent.offsetLeft;
		var shiftY = event.clientY - roomsContent.offsetTop;

		console.log(shiftX + " " + shiftY);

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
				stepsWidth.push(oneWidth);	
				stepsHeight.push(oneHeight);

			}
		}


// Запускаем функции увеличения и уменьшения при клике на кнопки
		// roomsPlus.onclick = zoomIn;
		// roomsMinus.onclick = zoomOut;

roomsPlus.addEventListener("click", zoomIn);
roomsMinus.addEventListener("click", zoomOut);

// trueCalc - номер элемента массива
		var trueCalc = 0;

// Функция увеличения:
		function zoomIn() {
			if (trueCalc < (stepsWidth.length - 1)) {
// Вычисляем значение на которое придется "подвинуться"
				var zoomLeft = roomsContent.offsetLeft - halfStepWidth;
				var zoomTop = roomsContent.offsetTop - halfStepHeight;

// увеличиваем номер элемента массива на 1, значение элемента массива присваиваем ширине и высоте изображения
				trueCalc = trueCalc + 1;
				roomsContent.style.width = stepsWidth[trueCalc] + "px";
				roomsContent.style.height = stepsHeight[trueCalc] + "px";

// "Двигаем" изображение, чтобы при зуме он оставался в центре				
				roomsContent.style.left = zoomLeft + "px";
				roomsContent.style.top = zoomTop + "px";

			} else {
				console.log("хуй! " + trueCalc + " это максимальное значение"); // Сообщаем в консоле, если достигнуто максимальное значение
			}
		}

		function zoomOut() {
			if (trueCalc > 0) {
// Вычисляем значение на которое придется "подвинуться"
				var zoomLeft = roomsContent.offsetLeft + halfStepWidth;
				var zoomTop = roomsContent.offsetTop + halfStepHeight;

// уменьшаем номер элемента массива на 1, значение элемента массива присваиваем ширине и высоте изображения
				trueCalc = trueCalc - 1;
				roomsContent.style.width = stepsWidth[trueCalc] + "px";
				roomsContent.style.height = stepsHeight[trueCalc] + "px";

// "Двигаем" изображение, чтобы при зуме он оставался в центре				
				roomsContent.style.left = zoomLeft + "px";
				roomsContent.style.top = zoomTop + "px";	
			} else {
				console.log("хуй! " + trueCalc + " это минимальное значение"); // Сообщаем в консоле, если достигнуто минимальное значение
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
				zoomOut();
			} else {
				zoomIn();
			}
			// отменим прокрутку
			e.preventDefault();
		});
	}

}