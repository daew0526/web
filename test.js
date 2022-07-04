const ctx = document.getElementById("canvas").getContext("2d");
const ctx1 = document.getElementById("bg").getContext("2d");
let font = '14px sans-serif';

let textdrawing = false;

let arText = new Array();

tx = true

bg();

function bg() {
	for ( let x = 0.5; x < 1301; x += 10 ) {				
		ctx1.moveTo(x, 0);
		ctx1.lineTo(x, 800);
	}
	for ( let y = 0.5; y < 801; y += 10 ) {
		ctx1.moveTo(0, y);
		ctx1.lineTo(1300, y);
	}
	ctx1.strokeStyle = '#eee';
	ctx1.stroke();
}

function Text(txt, x, y) {
	this.txt = txt;
	this.x = x;
	this.y = y;
}

canvas.onclick = function(e) {
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
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = font;
    ctx.fillText(txt, x - 448, y - 233);
    arText.push(new Text(txt, x - 448, y - 233));
    console.log(arText);
}

function drawRects() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let i, r;
	for (i = 0; i < arText.length; i++) {
		r = arText[i];
		ctx.textBaseline = 'top';
		ctx.textAlign = 'left';
		ctx.font = font;
		ctx.fillText(r.txt, r.x, r.y);
	}
}