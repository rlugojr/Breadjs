
var xob = 100,yob = 12;
	
	rec1 = Bread.createThing({
		x:678,
		y:10,
		'solid-rectangle':[45 , 132],
		//'solid-circle':50,
		'fill-color' : '#777'
	});
	rec2 = Bread.createThing({
		x:620,
		y:100,
		'solid-rectangle':[50 , 110]
		//'solid-circle' : 100
	});
	rec3 = Bread.createThing({
		x:570,
		y:300,
		'solid-rectangle':[100 , 40],
		//'solid-circle' : 3,
		'fill-color' : '#000'
	});
	rec4 = Bread.createThing({
		x:500,
		y:16,
		'solid-rectangle' : [100 , 70],
		'fill-color' : '#777'
	});
	rec5 = Bread.createThing({
		x:510,
		y:120,
		'solid-rectangle' : [30 , 100],
		'fill-color' : '#000'
	});
	env = Bread.setEnvironment({

		'canvas' :'id:entorno',
		'width' : 800,
		'height' : 460,
		'set-gravity':[-0.01 , 0.01]
	});
	env.mousedownCanvas(function ( evento ) {
		
        var recuadro= this.getBoundingClientRect();
        xob=(evento.clientX - Math.round(recuadro.left));
        yob=(evento.clientY - Math.round(recuadro.top));
		rec1.speed = 2;
        rec1.follow(xob , yob);
	});

	env.addIt(rec2);
	env.addIt(rec1);
	env.addIt(rec3);
	env.addIt(rec4);
	env.addIt(rec5);

	var colisions = []
	var angle = -45,
		angle2 = 0;

	//rec1.setCloseness( 0.9 )
	env.animation( function() {

		rec1.setRotationDeg(angle2 - 30)
		rec2.setRotationDeg(angle)
		rec3.setRotationDeg(45 - angle);
		rec4.setRotationDeg(45 + angle2);
		rec5.setRotationDeg(45 - angle);
		colisions = rec1.shapeCollision([rec2,rec3,rec4,rec5]);
		if( colisions.length > 0 )
			rec1.bounce( 1.15, -0.35 )
		colisions = rec2.shapeCollision([rec3,rec4,rec5]);
		if( colisions.length > 0 )
			rec2.bounce( 1.15, -0.35 )
		colisions = rec3.shapeCollision([rec4,rec5]);
		if( colisions.length > 0 )
			rec3.bounce( 1.15, -0.35 )
		colisions = rec4.shapeCollision([rec5]);
		if( colisions.length > 0 ){
			rec4.bounce( 1.15, -0.35 )
			rec5.bounce( 1.15, -0.35 )
		}
		ground([rec1,rec2,rec3,rec4,rec5])
		angle += 0.1
		angle2 += 0.2
		//angle = ( angle - 1 ) % 360;
		env.render();

	}, 1000/36);
	function ground ( bodies ) {
		for (b in bodies) {
			if(bodies[b].y >= 440){
				bodies[b].y = 439;
				bodies[b].bounce(0.01,-0.09)
			}
		};
	}