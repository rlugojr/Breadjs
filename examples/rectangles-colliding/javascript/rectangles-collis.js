var rectanlges = [],
	x = 70,
	y = 80,
	n = 20,
	env = Bread.setEnvironment({

		'canvas' :'id:entorno',
		'width' : 800,
		'height' : 460,
		'set-gravity':[0.01 , 0.01]
	});
for (var i = 0; i < n; i++) {

	rectanlges.push(
		Bread.createThing({
			x : x ,
			y : y ,
			'solid-rectangle':[Bread.random( 25, 40 ),Bread.random( 25, 40 )]
		})
	);

	env.addIt(rectanlges[i])
	rectanlges[i].setRotationDeg(Bread.random( 0, 180 ))
	x = ( x + 70 ) % 350;
	y = ( y + Number( x >= 280 ) * 70 )
	
};
env.animation( function() {

		moveAndcollide(rectanlges)
		ground ( rectanlges )
		env.render();

} , 1000/36)

function moveAndcollide ( bodies ) {

	var copy = [], collide = [], dirs = [], dirs2 = [], ang = 0, ang2 = 0 , l = bodies.length;
	
	for (var e = 0, e2 = 0; e < l; e++) {

		copy = bodies.slice( ( e + 1 ) , l );
		collide = bodies[e].shapeCollision(copy);
		//ang = bodies[e].angle;
		//bodies[e].setRotationRad( ang + 0.07)

		for( t in collide ) {

			e2 = collide[t] + e;
			yb = Bread.random(-0.345,-0.045)
			bodies[e].bounce( 0.05, yb )
			//bodies[e2].bounce( -1.15, 0.035 )
		}
		collide = [];
	};
}
function ground ( bodies ) {
	for (b in bodies) {
		if(bodies[b].y >= 440){
			bodies[b].y = 439;
			//bodies[b].bounce(0.01,-0.09)
			bodies[b].bounce( 0.05, -0.09 )
		}
	};
}