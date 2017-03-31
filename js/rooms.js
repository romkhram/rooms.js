function roomsJS(roomNum, stepsNum) {

	var roomsContainer = document.getElementsByClassName("roomsContainer")[roomNum - 1];
	var roomsContent = document.getElementsByClassName("roomsContent")[roomNum - 1];

	var roomsPlus = document.getElementsByClassName("roomsPlus")[roomNum - 1];
	var roomsMinus = document.getElementsByClassName("roomsMinus")[roomNum - 1];

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
	function mapMoveDown() {
		// меняем вид курсора на перемещение
		roomsContent.style.cursor = "move";

		// вычисляем расстояние, которое надо отступить от левого верхнего угла элемента при нажатии
		var shiftX = event.clientX - roomsContent.offsetLeft;
		var shiftY = event.clientY - roomsContent.offsetTop;

		// запускаем функцию перемещения при движении
		roomsContainer.onmousemove = mapMove;
		
		// пишем функцию перемещения при движении
		function mapMove() {
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



	var roomsContentHeight = roomsContent.offsetHeight;
	var roomsContentWidth = roomsContent.offsetWidth;
	var step = 0.1;
	console.log(roomsContentWidth);

	zoom(stepsNum);

	function zoom(stepsNum) {

		var steps = [];
		var one = 0.9 - (stepsNum * step);

		roomsPlus.onclick = zoomIn;
		roomsMinus.onclick = zoomOut;	
		
		functionArrayPM();
		
		var one = 1;
		steps.push((one*roomsContentWidth).toFixed(1));

		functionArrayPM();

		function functionArrayPM() {
			for (var i = 0; i < stepsNum; i++) {
				one = one + step;
				steps.push((one*roomsContentWidth).toFixed(1));
			}
		}

		roomsContent.style.width = steps[stepsNum] + "px";

		var trueWidth = stepsNum;

		function zoomIn() {
			if (trueWidth < (steps.length - 1)) {
				trueWidth = trueWidth + 1;
				roomsContent.style.width = steps[trueWidth] + "px";		
			} else {
				trueWidth = trueWidth;
				console.log("хуй! " + trueWidth + " это максимальное значение");
			}
		}

		function zoomOut() {
			if (trueWidth > 0) {
				trueWidth = trueWidth - 1;
				roomsContent.style.width = steps[trueWidth] + "px";		
			} else {
				trueWidth = trueWidth;
				console.log("хуй! " + trueWidth + " это минимальное значение");
			}
		}
	}
}