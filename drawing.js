let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
//격자무늬
for ( let x = 0.5; x < 1301; x += 20 ) {				
	ctx.moveTo(x, 0);
	ctx.lineTo(x, 1300);
}
for ( let y = 0.5; y < 801; y += 20 ) {
	ctx.moveTo(0, y);
	ctx.lineTo(1300, y);
}
ctx.strokeStyle = '#eee';
ctx.stroke();