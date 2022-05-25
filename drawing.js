var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
//격자무늬
for ( var x = 0.5; x < 1301; x += 10 ) {				
	ctx.moveTo(x, 0);
	ctx.lineTo(x, 800);
}
for ( var y = 0.5; y < 801; y += 10 ) {
	ctx.moveTo(0, y);
	ctx.lineTo(1300, y);
}
ctx.strokeStyle = '#eee';
ctx.stroke();