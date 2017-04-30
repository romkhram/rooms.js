

		roomsJS(1, 9);
		roomsJS(2, 5);
		roomsJS(3, 5);

function roomsJS(roomNum, stepsNum) {

	var roomsContainer = document.getElementsByClassName("roomsContainer")[roomNum - 1];
	var roomsContent = document.getElementsByClassName("roomsContent")[roomNum - 1];

	var roomsPlus = document.getElementsByClassName("roomsPlus")[roomNum - 1];
	var roomsMinus = document.getElementsByClassName("roomsMinus")[roomNum - 1];

roomsContent.style.left = (roomsContainer.offsetWidth / 2) - (roomsContent.offsetWidth / 2) + "px";
roomsContent.style.top = (roomsContainer.offsetHeight / 2) - (roomsContent.offsetHeight / 2) + "px";


	// ЗАПУСКАЕМ ФУНКЦИИ:
	// при нажати кнопки мыши;
	roomsContent.onmousedown = mapMoveDown;
	// при отпускании кнопки мыши;
	roomsContent.onmouseup = mapMoveOut;
	// при выходе за пределы блока
	roomsContainer.onmouseout = mapMoveOut;

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



	var roomsContentWidth = roomsContent.offsetWidth;
	var roomsContentHeight = roomsContent.offsetHeight;
	var step = 0.1;
	var halfStepWidth = (roomsContentWidth * step) / 2;
	var halfStepHeight = (roomsContentHeight * step) / 2;



	zoom(stepsNum);

	function zoom(stepsNum) {
		var stepsWidth = [];
		var stepsHeight = [];
		var one = 0.9 - (stepsNum * step);

		roomsPlus.onclick = zoomIn;
		roomsMinus.onclick = zoomOut;	
		
		functionArrayPM();
		
		var one = 1;
		stepsWidth.push((one*roomsContentWidth).toFixed(1));
		stepsHeight.push((one*roomsContentHeight).toFixed(1));

		functionArrayPM();

		function functionArrayPM() {
			for (var i = 0; i < stepsNum; i++) {
				one = one + step;
				stepsWidth.push((one*roomsContentWidth).toFixed(1));
				stepsHeight.push((one*roomsContentHeight).toFixed(1));
			}
		}

		roomsContent.style.width = stepsWidth[stepsNum] + "px";

		var trueWidth = stepsNum;

		function zoomIn() {
			if (trueWidth < (stepsWidth.length - 1)) {
				var zoomLeft = roomsContent.offsetLeft - halfStepWidth;
				var zoomTop = roomsContent.offsetTop - halfStepHeight;

				trueWidth = trueWidth + 1;
				roomsContent.style.width = stepsWidth[trueWidth] + "px";
				roomsContent.style.height = stepsHeight[trueWidth] + "px";
				
				roomsContent.style.left = zoomLeft + "px";
				roomsContent.style.top = zoomTop + "px";
			} else {
				console.log("хуй! " + trueWidth + " это максимальное значение");
			}
		}

		function zoomOut() {
			if (trueWidth > 0) {
				var zoomLeft = roomsContent.offsetLeft + halfStepWidth;
				var zoomTop = roomsContent.offsetTop + halfStepHeight;

	console.log(roomsContentHeight);

				trueWidth = trueWidth - 1;
				roomsContent.style.width = stepsWidth[trueWidth] + "px";
				roomsContent.style.height = stepsHeight[trueWidth] + "px";
				
				roomsContent.style.left = zoomLeft + "px";
				roomsContent.style.top = zoomTop + "px";	
			} else {
				trueWidth = trueWidth;
				console.log("хуй! " + trueWidth + " это минимальное значение");
			}
		}

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
				zoomOut();
			} else {
				zoomIn();
			}
			// отменим прокрутку
			e.preventDefault();
		});
	}

}