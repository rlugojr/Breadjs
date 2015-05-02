/*Numeric values*/
var xv = 50, yv = 50, speed = 2, Pi = Math.PI, angle = Pi/3.1/*Bread.random( Pi / 6, Pi / 3)*/, frc_sense = 1, g = 0;
/*Environment*/
var enviroment = Bread.setEnvironment({
	'canvas' : 'id:presentacion',
	'width' : 750,
	'height' : 400
});
var nucleus = [] , electrons = [] , protons = []
var groupsx = {0:[220,240],1:[330,350],2:[520,550],3:[460,480],4:[220,240],5:[310,330],6:[650,670],7:[360,380],8:[600,620]},
	groupsy = {0:[120,140],1:[230,250],2:[260,290],3:[350,390],4:[320,340],5:[370,390],6:[120,130],7:[300,320],8:[100,120]};

for (var n = 0; n < 80 ; n++) {

	nucleus.push(Bread.createThing({
		x : xv,
		y : yv,
		//'solid-rectangle' : [30,15],
		'solid-circle' : 4,
		'fill-color' : '#000'
	}));
	//console.log(groupsx[g])
	xv = Bread.random( groupsx[g][0] , groupsx[g][1] );
	yv = Bread.random( groupsy[g][0] , groupsy[g][1] );
	enviroment.addIt(nucleus[n]);
	nucleus[n].impulse(speed,angle, - frc_sense * 0.0);
	angle = Bread.random(-Pi , Pi )
	speed = Bread.random(-0.03,0.03);
	g = ((( n + 1 )%10)==0) ? g + 1 : g
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
			ang = ( bodies[ e2 ].y - bodies[ e ].y ) / ( bodies[ e2 ].x - bodies[ e ].x );
			//bodies[e].setFillColor("#FF0000");
			//bodies[e2].setFillColor("#0000FF");
			speed = bodies[e].speed;
			if(speed >= 2){
				bodies[e].speed = -1 * bodies[e].speed
				bodies[e2].speed = speed;
			}else{
				speed = bodies[e2].speed;
				bodies[e2].speed = -1 * bodies[e2].speed
				bodies[e].speed = speed;
			}
			bodies[e].impulse(0 , Math.atan( -1 / ang), 0);
			bodies[e2].impulse(0 , Math.atan( ang ), 0);
		}
		collide = [];
	};
}

function boundingBox ( bodies ) {
	var dirs = [];
	for( b in bodies ){

		if ( bodies[b].x < 3 ) {
			ang = bodies[b].angle + ( Pi / 2 );
			bodies[b].x = 4;
			bodies[b].impulse(0 ,ang, 0);
		}else if ( bodies[b].x > 700 ) {
			ang = bodies[b].angle - ( Pi / 2 );
			bodies[b].x = 699;
			bodies[b].impulse(0 ,ang, 0);
		}
		if ( bodies[b].y < 3 ) {
			ang = bodies[b].angle - ( Pi / 2 );
			bodies[b].y = 4;
			bodies[b].impulse(0 ,ang, 0);

		}else if ( bodies[b].y > 400 ) {
			ang = bodies[b].angle + ( Pi / 2 );
			bodies[b].y = 399;
			bodies[b].impulse(0 ,ang, 0);
		}
	}
}