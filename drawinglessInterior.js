const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementById("selcolors");
const sqmode = document.getElementById("jsSquare");
const scmode = document.getElementById("jsCircle");
const stmode = document.getElementById("jsStraight");
const sqEraser = document.getElementById("squareEraser");
const scEraser = document.getElementById("circleEraser");
const stEraser = document.getElementById("straightEraser");

let arSquare = new Array();  //사각형 배열
let arStraight = new Array();// 직선 배열
let arCircle = new Array();  // 원 배열

let sx, sy;                  // 드래그 시작점
let ex, ey;                  // 드래그 끝점
let color;                   // 현재 색상
let moving = -1;             // 이동중인 도형 첨자

let squaredrawing;           // 그리고 있는 중인가
let circledrawing;
let straightdrawing;

let sq = false;			 	//사각형
let st = false;				//직선
let sc = false;				//원

//버튼
function sqModeClick() {
	if (sq === true) {
		sq = false;
		sqmode.innerText = "사각형";
	} else {
		sq = true;
		st = false;
		sc = false;
		sqmode.innerText = "사각형중";
		stmode.innerText = "직선";
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
		sq = false;
		scmode.innerText = "원중";
		stmode.innerText = "직선";
		sqmode.innerText = "사각형";
	}
}

function stModeClick() {
	if (st === true) {
		st = false;
		stmode.innerText = "직선";
	} else {
		st = true;
		sq = false;
		sc = false;
		stmode.innerText = "직선중";
		sqmode.innerText = "사각형";
		scmode.innerText = "원";
	}
}
//되돌리기 버튼
function sqEraserClick() {
	arSquare.pop();
	drawRects();
	console.log(arSquare);
}
function scEraserClick() {
	arCircle.pop();
	drawRects();
	console.log(arCircle);
}
function stEraserClick() {
	arStraight.pop();
	drawRects();
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
// x, y 위치의 사각형 찾음. 없으면 -1
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
	let i, r;
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
		else if (r.ex < r.sx){
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

}

ctx.strokeStyle = "black";
ctx.lineWidth = 4;
color = "rgba(255, 255, 255, 0)"
ctx.fillStyle = color;
//액션
canvas.onmousedown = function (e) {
	e.preventDefault();
	// 클릭한 좌표 구하기
	sx = canvasX(e.clientX);
	sy = canvasY(e.clientY);
	// 도형을 클릭한 것이 아니면 그리기 시작
	if (sq) {
		if (moving == -1) {
			squaredrawing = true;
		}
		//그 위치에 도형이 있는지 조사
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
		else if (ex < sx){
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
	arSquare.length = 0;
	arStraight.length = 0;
	arCircle.length = 0;
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
//색상
selcolor.onchange = function (e) {
	color = selcolor.value;
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

if (sqEraser) {
	sqEraser.addEventListener("click", sqEraserClick);
}

if (scEraser) {
	scEraser.addEventListener("click", scEraserClick);
}

if (stEraser) {
	stEraser.addEventListener("click", stEraserClick);
}