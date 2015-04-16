/*Numeric values*/
var xv = 0, yv = 0, speed = 2, angle = 0, Pi = Math.PI, frc_sense = 1;
/*Enviroment*/
var enviroment = Bread.setEnvironment({
	'canvas' : 'id:canvas-el',
	'width' : 850,
	'height' : 500
});
var nucleus = [] , electrons = [] , protons = []

for (var n = 0; n < 50 ; n++) {

	xv = Bread.random( 60 , 750 );
	yv = Bread.random( 60 , 400 );
	nucleus.push(Bread.createThing({
		x : xv,
		y : yv,
		//'solid-rectangle' : [30,15],
		'solid-circle' : 4,
		'fill-color' : '#0000E6'
	}));
	enviroment.addIt(nucleus[n]);
	speed = Bread.random(-10,10)
	angle = Bread.random(-Pi , Pi )
	frc_sense = (speed / Math.abs(speed));
	nucleus[n].impulse(speed,angle,- frc_sense * 0.001);
	speed = 0;
};
impulseBody ( nucleus );

enviroment.animation( function() {
	enviroment.render();
	moveAndcollide( nucleus );
	boundingBox( nucleus );
}, 1000/36 );

function impulseBody ( bodies ) {
	var l = bodies.length;
	
	for (var e = 0; e < l; e++)
		bodies[e].impulse(bodies[e].speed,bodies[e].angle, frc_sense* 0)
}
function moveAndcollide ( bodies ) {
	var copy = [], collide = [], dirs = [], dirs2 = [], ang = 0, ang2 = 0 , l = bodies.length;
	
	for (var e = 0, e2 = 0; e < l; e++) {

		bodies[e].move();
		copy = bodies.slice( ( e + 1 ) , l );
		collide = bodies[e].shapeCollision(copy);

		for( t in collide ) {

			e2 = collide[t] + e;
			ang = ( bodies[e2].y - bodies[e].y ) / ( bodies[e2].x - bodies[e].x );

			/*bodies[e].setFillColor("#FF0000");
			bodies[e2].setFillColor("#0000FF");*/
			speed = bodies[e].speed ;
			bodies[e].speed = -1 * bodies[e].speed
			bodies[e2].speed = ( speed > 0 ) ? speed : 2;
			bodies[e].impulse(0 , Math.atan(-1/ang), - frc_sense * 0.001);
			bodies[e2].impulse(0 , Math.atan(ang), - frc_sense * 0.001);
		}
		collide = [];
	};
}

function boundingBox ( bodies ) {
	var dirs = []
	for( b in bodies ){

		if ( bodies[b].x < 35 ) {
			ang = bodies[b].angle + (Pi/2);
			bodies[b].x = 36;
			bodies[b].impulse(0 ,ang, 0);
		}else if ( bodies[b].x > 750 ) {
			ang = bodies[b].angle - (Pi/2);
			bodies[b].x = 749;
			bodies[b].impulse(0 ,ang, 0);
		}
		if ( bodies[b].y < 35 ) {
			ang = bodies[b].angle - (Pi/2);
			bodies[b].y = 36;
			bodies[b].impulse(0 ,ang, 0);

		}else if ( bodies[b].y > 450 ) {
			ang = bodies[b].angle + (Pi/2);
			bodies[b].y = 449;
			bodies[b].impulse(0 ,ang, 0);
		}

	}
}