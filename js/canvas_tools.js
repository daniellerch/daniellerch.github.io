
function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}


/* EXAMPLE
<canvas id="c" width="500" height="500"></canvas>

<script>
ctx = document.getElementById("c").getContext("2d");
ctx.beginPath();
ctx.font = '20px serif';

ctx.fillText('00', 10, 30);
ctx.fillText('01', 10, 60);
ctx.fillText('10', 10, 90);
ctx.fillText('11', 10, 120);


// Primera fila
ctx.fillText('0', 80, 30);
ctx.fillText('1', 140, 30);
ctx.fillText('1', 200, 30);

canvas_arrow(ctx, 80+15, 30-6, 140-5, 30-6);

//canvas_arrow(ctx, 100, 200, 400, 50);
//canvas_arrow(ctx, 200, 30, 10, 150);
//canvas_arrow(ctx, 400, 200, 100, 50);

ctx.stroke();

</script>
*/

