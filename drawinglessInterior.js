const ctx = document.getElementById("canvas").getContext("2d");
const ctx1 = document.getElementById("bg").getContext("2d");
const ctx2 = document.getElementById("txt").getContext("2d");
const ctx3 = document.getElementById("floor1").getContext("2d");
const ctx4 = document.getElementById("floor2").getContext("2d");
const colors = document.getElementById("selcolors");
const flmode = document.getElementById("jsFloor");
const sqmode = document.getElementById("jsSquare");
const scmode = document.getElementById("jsCircle");
const stmode = document.getElementById("jsStraight");
const txmode = document.getElementById("jsText");
const flEraser = document.getElementById("floorEraser");
const sqEraser = document.getElementById("squareEraser");
const scEraser = document.getElementById("circleEraser");
const stEraser = document.getElementById("straightEraser");
const txEraser = document.getElementById("textEraser");

let arFloor = new Array();  //바닥 배열
let arSquare = new Array();  //사각형 배열
let arStraight = new Array();// 직선 배열
let arCircle = new Array();  // 원 배열
let arText = new Array();    // 텍스트 배열

let sx, sy;                  // 드래그 시작점
let ex, ey;                  // 드래그 끝점
let floor;					 // 현재 바닥
let color;                   // 현재 색상
let moving = -1;             // 이동중인 도형 첨자

let floordrawing;			 // 그리고 있는 중인가
let squaredrawing;
let circledrawing;
let straightdrawing;
let textdrawing = false;

let font = '14px sans-serif';

let fl = false;				//바닥
let sq = false;			 	//사각형
let st = false;				//직선
let sc = false;				//원
let tx = false;				//텍스트

//세팅
ctx.strokeStyle = "black";
ctx.lineWidth = 4;
color = "rgb(255, 255, 255)"
ctx.fillStyle = color;

ctx3.strokeStyle = "black";
ctx4.strokeStyle = "black";
ctx3.lineWidth = 0;
ctx4.lineWidth = 0;
floor = "rgb(255, 255, 255)";
ctx3.fillStyle = floor;
ctx4.fillStyle = floor;

bg();

//버튼
function flModeClick() {
	if (fl === true) {
		fl = false;
		flmode.innerText = "바닥";
	} else {
		fl = true;
		sq = false;
		st = false;
		sc = false;
		tx = false;
		flmode.innerText = "바닥중";
		sqmode.innerText = "사각형";
		stmode.innerText = "직선";
		scmode.innerText = "원";
		txmode.innerText = "텍스트";
	}
}

function sqModeClick() {
	if (sq === true) {
		sq = false;
		sqmode.innerText = "사각형";
	} else {
		fl = false;
		sq = true;
		st = false;
		sc = false;
		tx = false;
		sqmode.innerText = "사각형중";
		flmode.innerText = "바닥";
		stmode.innerText = "직선";
		scmode.innerText = "원";
		txmode.innerText = "텍스트";
	}
}

function scModeClick() {
	if (sc === true) {
		sc = false;
		scmode.innerText = "원";
	} else {
		fl = false;
		sc = true;
		st = false;
		sq = false;
		tx = false;
		scmode.innerText = "원중";
		flmode.innerText = "바닥";
		stmode.innerText = "직선";
		sqmode.innerText = "사각형";
		txmode.innerText = "텍스트";
	}
}

function stModeClick() {
	if (st === true) {
		st = false;
		stmode.innerText = "직선";
	} else {
		fl = false;
		st = true;
		sq = false;
		sc = false;
		tx = false;
		stmode.innerText = "직선중";
		flmode.innerText = "바닥";
		sqmode.innerText = "사각형";
		scmode.innerText = "원";
		txmode.innerText = "텍스트";
	}
}

function txModeClick() {
	if (tx === true) {
		tx = false;
		txmode.innerText = "텍스트";
	} else {
		fl = false;
		tx = true;
		st = false;
		sq = false;
		sc = false;
		txmode.innerText = "텍스트중";
		flmode.innerText = "바닥";
		stmode.innerText = "직선";
		sqmode.innerText = "사각형";
		scmode.innerText = "원";
	}
}
//되돌리기 버튼
function flEraserClick() {
	arFloor.pop();
	drawRects();
}
function sqEraserClick() {
	arSquare.pop();
	drawRects();
}
function scEraserClick() {
	arCircle.pop();
	drawRects();
}
function stEraserClick() {
	arStraight.pop();
	drawRects();
}
function txEraserClick() {
	arText.pop();
	drawRects();
}
//바닥 생성자
function Floor(sx, sy, ex, ey, color) {
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.color = floor;
}
//사각형 생성자
function Square(sx, sy, ex, ey, color) {
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.color = color;
}
//원 생성자
function Circle(sx, sy, ex, ey, color) {
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.color = color;
}
//직선 생성자
function Straight(sx, sy, ex, ey, color) {
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.color = color;
}
//텍스트 생성자
function Text(txt, x, y) {
	this.txt = txt;
	this.x = x;
	this.y = y;
}
//격자무늬
function bg() {
	for (let x = 0.5; x < 1301; x += 10) {
		ctx1.moveTo(x, 0);
		ctx1.lineTo(x, 800);
	}
	for (let y = 0.5; y < 801; y += 10) {
		ctx1.moveTo(0, y);
		ctx1.lineTo(1300, y);
	}
	ctx1.strokeStyle = '#eee';
	ctx1.stroke();
}
//바닥
function draw1() {
	let img = new Image();
	img.src = "장판.jpg";
	img.onload = function () {
		ctx3.fillStyle = ctx3.createPattern(img, "repeat");
	}
}
function draw2() {
	let img = new Image();
	img.src = "대리석.jpg";
	img.onload = function () {
		ctx4.fillStyle = ctx4.createPattern(img, "repeat");
	}
}
// 텍스트
canvas.onclick = function (e) {
	if (tx) {
		drawRects();
		if (textdrawing) return;
		addInput(e.clientX, e.clientY);
	}
}
function addInput(x, y) {
	const input = document.createElement('input');

	input.type = 'text';
	input.style.position = 'fixed';
	input.style.left = (x - 4) + 'px';
	input.style.top = (y - 4) + 'px';

	input.onkeydown = handleEnter;

	document.body.appendChild(input);

	input.focus();

	textdrawing = true;
}
function handleEnter(e) {
	let keyCode = e.keyCode;
	if (keyCode === 13) {
		drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
		document.body.removeChild(this);
		textdrawing = false;
	}
}
function drawText(txt, x, y) {
	ctx2.textBaseline = 'top';
	ctx2.textAlign = 'left';
	ctx2.font = font;
	ctx2.fillText(txt, x - 449, y - 233);
	arText.push(new Text(txt, x - 449, y - 233));
}
// x, y 위치의 사각형 찾음. 없으면 -1
function getFloor(x, y) {
	for (let i = 0; i < arFloor.length; i++) {
		let r = arFloor[i];
		if (x > r.sx && x < r.ex && y > r.sy && y < r.ey) {
			return i;
		}
	}
	return -1;
}
function getSquare(x, y) {
	for (let i = 0; i < arSquare.length; i++) {
		let r = arSquare[i];
		if (x > r.sx && x < r.ex && y > r.sy && y < r.ey) {
			return i;
		}
	}
	return -1;
}
function getCircle(x, y) {
	for (let i = 0; i < arCircle.length; i++) {
		let r = arCircle[i];
		if (r.ex >= r.sx) {
			if (x < r.ex && x > r.sx - (r.ex - r.sx) && y < r.sy + (r.ex - r.sx) && y > r.sy - (r.ex - r.sx)) {
				return i;
			}
		}
		else if (r.ex < r.sx) {
			if (x > r.ex && x < r.sx - (r.ex - r.sx) && y > r.sy + (r.ex - r.sx) && y < r.sy - (r.ex - r.sx)) {
				return i;
			}
		}
	}
	return -1;
}
// 화면 지우고 모든 도형을 순서대로 다 그림
function drawRects() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
	ctx3.clearRect(0, 0, canvas.width, canvas.height);
	ctx4.clearRect(0, 0, canvas.width, canvas.height);
	let i, r;
	for (i = 0; i < arFloor.length; i++) {
		r = arFloor[i];
		if (r.color == 1) {
			draw1();
			ctx3.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
			ctx3.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
		}
		else if (r.color == 2) {
			draw2();
			ctx4.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
			ctx4.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
		}	
	}
	for (i = 0; i < arSquare.length; i++) {
		r = arSquare[i];
		ctx.fillStyle = r.color;
		ctx.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
		ctx.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
	}
	for (i = 0; i < arCircle.length; i++) {
		r = arCircle[i];
		ctx.beginPath();
		if (r.ex >= r.sx) {
			ctx.arc(r.sx, r.sy, r.ex - r.sx, 0, 360);
		}
		else if (r.ex < r.sx) {
			ctx.arc(r.sx, r.sy, r.sx - r.ex, 0, 360);
		}
		ctx.fillStyle = r.color;
		ctx.fill();
		ctx.stroke();
	}
	for (i = 0; i < arStraight.length; i++) {
		r = arStraight[i];
		ctx.beginPath();
		ctx.moveTo(r.sx, r.sy);
		ctx.lineTo(r.ex, r.ey);
		ctx.stroke();
	}
	for (i = 0; i < arText.length; i++) {
		r = arText[i];
		ctx2.textBaseline = 'top';
		ctx2.textAlign = 'left';
		ctx2.font = font;
		ctx2.fillText(r.txt, r.x, r.y);
	}
}

//액션
canvas.onmousedown = function (e) {
	e.preventDefault();
	// 클릭한 좌표 구하기
	sx = canvasX(e.clientX);
	sy = canvasY(e.clientY);
	// 도형을 클릭한 것이 아니면 그리기 시작
	if (fl) {
		if (moving == -1) {
			floordrawing = true;
		}
		//그 위치에 도형이 있는지 조사
		moving = getFloor(sx, sy);
	}
	if (sq) {
		if (moving == -1) {
			squaredrawing = true;
		}
		moving = getSquare(sx, sy);
	}
	if (sc) {
		if (moving == -1) {
			circledrawing = true;
		}
		moving = getCircle(sx, sy);
	}
	if (st) {
		straightdrawing = true;
	}
}
canvas.onmousemove = function (e) {
	e.preventDefault();
	//마우스 좌표 구하기
	ex = canvasX(e.clientX);
	ey = canvasY(e.clientY);
	// 화면 다시 그리고 현재 도형 그림
	if (floordrawing) {
		drawRects();
		if (floor == 1) {
			draw1();
			ctx3.fillRect(sx, sy, ex - sx, ey - sy);
			ctx3.strokeRect(sx, sy, ex - sx, ey - sy);
		}
		else if (floor == 2) {
			draw2();
			ctx4.fillRect(sx, sy, ex - sx, ey - sy);
			ctx4.strokeRect(sx, sy, ex - sx, ey - sy);
		}
		if (moving != -1) {
			let r = arFloor[moving];
			r.sx += (ex - sx);
			r.sy += (ey - sy);
			r.ex += (ex - sx);
			r.ey += (ey - sy);
			sx = ex;
			sy = ey;
			drawRects();
		}
	}
	if (squaredrawing) {
		drawRects();
		ctx.fillStyle = color;
		ctx.fillRect(sx, sy, ex - sx, ey - sy);
		ctx.strokeRect(sx, sy, ex - sx, ey - sy);
		if (moving != -1) {
			let r = arSquare[moving];
			r.sx += (ex - sx);
			r.sy += (ey - sy);
			r.ex += (ex - sx);
			r.ey += (ey - sy);
			sx = ex;
			sy = ey;
			drawRects();
		}
	}
	if (circledrawing) {
		drawRects();
		ctx.beginPath();
		if (ex >= sx) {
			ctx.arc(sx, sy, ex - sx, 0, 360);
		}
		else if (ex < sx) {
			ctx.arc(sx, sy, sx - ex, 0, 360);
		}
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		if (moving != -1) {
			let r = arCircle[moving];
			r.sx += (ex - sx);
			r.sy += (ey - sy);
			r.ex += (ex - sx);
			r.ey += (ey - sy);
			sx = ex;
			sy = ey;
			drawRects();
		}
	}
	if (straightdrawing) {
		drawRects();
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(ex, ey);
		ctx.stroke();
	}
	// 상대적인 마우스 이동 거리만큼 도형 이동

}

canvas.onmouseup = function (e) {
	// 좌표 정규화해서 새로운 도형을 배열에 추가
	if (floordrawing) {
		let x1 = Math.min(sx, ex);
		let y1 = Math.min(sy, ey);
		let x2 = Math.max(sx, ex);
		let y2 = Math.max(sy, ey);
		arFloor.push(new Floor(x1, y1, x2, y2, color));
		floordrawing = false;
		console.log(arFloor);
	}
	if (squaredrawing) {
		let x1 = Math.min(sx, ex);
		let y1 = Math.min(sy, ey);
		let x2 = Math.max(sx, ex);
		let y2 = Math.max(sy, ey);
		arSquare.push(new Square(x1, y1, x2, y2, color));
		squaredrawing = false;
		console.log(arSquare);
	}
	if (circledrawing) {
		let x1 = sx;
		let y1 = sy;
		let x2 = ex;
		let y2 = ey;
		arCircle.push(new Circle(x1, y1, x2, y2, color));
		circledrawing = false;
		console.log(arCircle);
	}
	if (straightdrawing) {
		let x1 = sx;
		let y1 = sy;
		let x2 = ex;
		let y2 = ey;
		arStraight.push(new Straight(x1, y1, x2, y2, color));
		straightdrawing = false;
	}
	moving = -1;
}
//초기화
let 초기화 = document.getElementById("clear");
초기화.onclick = function (e) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
	ctx3.clearRect(0, 0, canvas.width, canvas.height);
	ctx4.clearRect(0, 0, canvas.width, canvas.height);
	arFloor.length = 0;
	arSquare.length = 0;
	arStraight.length = 0;
	arCircle.length = 0;
	arText.length = 0;
}
//마우스 좌표 구하기
function canvasX(clientX) {
	let bound = canvas.getBoundingClientRect();
	let bw = 5;
	return (clientX - bound.left - bw) * (canvas.width / (bound.width - bw * 2));
}
function canvasY(clientY) {
	let bound = canvas.getBoundingClientRect();
	let bw = 5;
	return (clientY - bound.top - bw) * (canvas.height / (bound.height - bw * 2));
}
//바닥
selfloor.onchange = function (e) {
	floor = selfloor.value;
}
//색상
selcolor.onchange = function (e) {
	color = selcolor.value;
}

if (flmode) {
	flmode.addEventListener("click", flModeClick);
}

if (sqmode) {
	sqmode.addEventListener("click", sqModeClick);
}

if (scmode) {
	scmode.addEventListener("click", scModeClick);
}

if (stmode) {
	stmode.addEventListener("click", stModeClick);
}

if (txmode) {
	txmode.addEventListener("click", txModeClick);
}

if (flEraser) {
	flEraser.addEventListener("click", flEraserClick);
}

if (sqEraser) {
	sqEraser.addEventListener("click", sqEraserClick);
}

if (scEraser) {
	scEraser.addEventListener("click", scEraserClick);
}

if (stEraser) {
	stEraser.addEventListener("click", stEraserClick);
}

if (txEraser) {
	txEraser.addEventListener("click", txEraserClick);
}
