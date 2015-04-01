var projectiles = [],
	background = Bread.createThing({
		x:0,
		y:0,
		'solid-rectangle':[850, 500],
		'fill-color':'#000099'
	})
/*Environment*/
var enviroment = Bread.setEnvironment({
	'canvas' : 'nth:1',
	'set-gravity': [0.0, 0.01],
	'width' : 850,
	'height' : 500
});
enviroment.mousedownCanvas(function( event ) {
	var c = document.getElementById('envir'),
		rect = c.getBoundingClientRect(),
		x = event.clientX - rect.left,
		y = event.clientY - rect.top,
		angle = Math.atan( ( 495 - y ) / ( 240 - x )),
		p = 0;
		
	projectiles.push(Bread.createThing({
		x:240,
		y:495,
	    'solid-circle':3,
	    'fill-color':'#FFF'
	}))
	p = projectiles.length
	enviroment.addIt( projectiles[ p -1 ] )
	projectiles[ p -1 ].impulse( 3 , angle , 0.0 )
})
enviroment.addIt( background )
enviroment.animation(function() {
	background.unSetGravity()
	bodyMovement( projectiles )
	enviroment.render()

},1000/36)
function bodyMovement (bodies) {
	for(b in bodies){
		
		bodies[b].move()
	}
}