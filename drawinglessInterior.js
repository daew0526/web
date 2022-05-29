const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementById("selcolors");
const smode = document.getElementById("jsSquare");
const stmode = document.getElementById("jsStraight");
const scmode = document.getElementById("jsCircle");

let arSquare = new Array();  //사각형 배열
let arStraight = new Array();// 직선 배열
let arCircle = new Array();  // 원 배열
let sx, sy;                  // 드래그 시작점
let ex, ey;                  // 드래그 끝점
let color;                   // 현재 색상

let moving = -1;             // 이동중인 도형 첨자

let backup;

let squaredrawing;           // 그리고 있는 중인가
let straightdrawing;
let circledrawing;

let s = false;			 	//사각형
let st = false;				//직선
let sc = false;				//원
//버튼
function sModeClick() {
	if (s === true) {
		s = false;
		smode.innerText = "사각형";
	} else {
		s = true;
		st = false;
		sc = false;
		smode.innerText = "사각형중";
		stmode.innerText = "직선";
		scmode.innerText = "원";
	}
}

function stModeClick() {
	if (st === true) {
		st = false;
		stmode.innerText = "직선";
	} else {
		st = true;
		s = false;
		sc = false;
		stmode.innerText = "직선중";
		smode.innerText = "사각형";
		scmode.innerText = "원";
	}
}

function scModeClick() {
	if (sc === true) {
		sc = false;
		scmode.innerText = "원";
	} else {
		sc = true;
		st = false;
		s = false;
		scmode.innerText = "원중";
		stmode.innerText = "직선";
		smode.innerText = "사각형";
	}
}
//사각형 생성자
function Square(sx, sy, ex, ey, color) {
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
//원 생성자
function Circle(sx, sy, ex, ey, color) {
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.color = color;
}
// x, y 위치의 사각형 찾음. 없으면 -1
function getSquare(x, y) {
	for (let i = 0; i < arSquare.length; i++) {
		let rect = arSquare[i];
		if (x > rect.sx && x < rect.ex && y > rect.sy && y < rect.ey) {
			return i;
		}
	}
	return -1;
}function getCircle(x, y) {
	for (let i = 0; i < arCircle.length; i++) {
		let rect = arCircle[i];
		if (x > rect.sx && x < rect.ex && y > rect.sy && y < rect.ey) {
			return i;
		}
	}
	return -1;
}
// 화면 지우고 모든 도형을 순서대로 다 그림
function drawRects() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let i, r;
	for (i = 0; i < arSquare.length; i++) {
		r = arSquare[i];
		ctx.fillStyle = r.color;
		ctx.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
		ctx.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
	}
	for (i = 0; i < arStraight.length; i++) {
		r = arStraight[i];
		ctx.beginPath();
		ctx.moveTo(r.sx, r.sy);
		ctx.lineTo(r.ex, r.ey);
		ctx.stroke();
	}
	for (i = 0; i < arCircle.length; i++) {
		r = arCircle[i];
		ctx.beginPath();
		if (ex >= sx){
			ctx.arc(sx, sy, ex - sx, 0, 2 * Math.PI);
		}
		else{
			ctx.arc(sx, sy, sx - ex, 0, 2 * Math.PI);
		}
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
	}
}

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
color = "rgba(255, 255, 255, 0)"
ctx.fillStyle = color;
//액션
canvas.onmousedown = function (e) {
	e.preventDefault();
	// 클릭한 좌표 구하고 그 위치에 도형이 있는지 조사
	sx = canvasX(e.clientX);
	sy = canvasY(e.clientY);
	// 도형을 클릭한 것이 아니면 그리기 시작
	if (s == true) {
		if (moving == -1) {
			moving = getSquare(sx, sy);
			squaredrawing = true;
		}
	}
	if (st == true) {
		backup = ctx.getImageData(0, 0, canvas.width, canvas.height);
		straightdrawing = true;
	}
	if (sc == true) {
		if (moving == -1) {
			moving = getCircle(sx, sy);
			circledrawing = true;
		}
	}
}

canvas.onmousemove = function (e) {
	e.preventDefault();
	// 화면 다시 그리고 현재 도형 그림
	ex = canvasX(e.clientX);
	ey = canvasY(e.clientY);
	if (squaredrawing) {
		drawRects();
		ctx.fillStyle = color;
		ctx.fillRect(sx, sy, ex - sx, ey - sy);
		ctx.strokeRect(sx, sy, ex - sx, ey - sy);
	}

	if (straightdrawing) {
		ctx.putImageData(backup, 0, 0);
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.lineTo(ex, ey);
		ctx.stroke();
	}

	if (circledrawing) {
		drawRects();
		ctx.beginPath();
		if (ex >= sx){
			ctx.arc(sx, sy, ex - sx, 0, 2 * Math.PI);
		}
		else{
			ctx.arc(sx, sy, sx - ex, 0, 2 * Math.PI);
		}
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
	}

	// 상대적인 마우스 이동 거리만큼 도형 이동
	if (moving != -1) {
		let r = arSquare[moving];
		r = arCircle[moving];
		r.sx += (ex - sx);
		r.sy += (ey - sy);
		r.ex += (ex - sx);
		r.ey += (ey - sy);
		sx = ex;
		sy = ey;
		drawRects();
	}
}

canvas.onmouseup = function (e) {
	// 좌표 정규화해서 새로운 도형을 배열에 추가
	if (squaredrawing) {
		let x1 = Math.min(sx, ex);
		let y1 = Math.min(sy, ey);
		let x2 = Math.max(sx, ex);
		let y2 = Math.max(sy, ey);
		arSquare.push(new Square(x1, y1, x2, y2, color));
	}
	if (straightdrawing) {
		let x1 = sx;
		let y1 = sy;
		let x2 = ex;
		let y2 = ey;
		arStraight.push(new Straight(x1, y1, x2, y2, color));
	}
	if (circledrawing) {
		let x1 = sx;
		let y1 = sy;
		let x2 = ex;
		let y2 = ey;s
		arCircle.push(new Circle(x1, y1, x2, y2, color));
	}
	squaredrawing = false;
	straightdrawing = false;
	circledrawing = false;
	moving = -1;
}
//초기화
let 초기화 = document.getElementById("clear");
초기화.onclick = function (e) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	arSquare.length = 0;
	arStraight.length = 0;
	arCircle.length = 0;
}

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
//색상
selcolor.onchange = function(e) {
	color = selcolor.value;
}

if (smode) {
	smode.addEventListener("click", sModeClick);
}

if (stmode) {
	stmode.addEventListener("click", stModeClick);
}

if (scmode) {
	scmode.addEventListener("click", scModeClick);
}