

var xob = 100,yob = 12;
	
	circ1 = Bread.createThing({
		x:5,
		y:80,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	lin = Bread.createThing({
		x:0,
		y:310,
		'line':{/*Object containing each line*/
				0:[140 , 300],
				1:[190 , 310],
				2:[335 , 280],
				3:[520 , 320],
				4:[600 , 310],
				5:[750 , 310],
				6:[750 , 100]
		}
	});
	lin2 = Bread.createThing({
		x:100,
		y:310,
		'line':{/*Object containing each line*/
				0:[600 , 285],
		}
	});
	rec1 = Bread.createThing({
		x:200,
		y:160,
		'solid-rectangle':[170 , 70],
		//'solid-circle' : 3,
		'fill-color' : '#777'
	});
	rec5 = Bread.createThing({
		x:10,
		y:16,
		//'solid-rectangle':[170 , 70],
		'solid-circle' : 3,
		'fill-color' : '#FFF'
	});
	env = Bread.setEnvironment({

		'canvas' :'id:entorno',
		'width' : 800,
		'height' : 460,
		'set-gravity':[0 , 0.02]
	});

	env.mousedownCanvas(function ( evento ) {
		
        var recuadro= this.getBoundingClientRect();
        xob=(evento.clientX - Math.round(recuadro.left));
        yob=(evento.clientY - Math.round(recuadro.top));
		circ1.speed = 2;
        circ1.follow(xob , yob);
	});

	env.addIt(lin);
	env.addIt(circ1);
	//env.addIt(rec1);
	env.addIt(rec5);
	var colisions = []
	var angle = -40;
	directions = [];
	var xl = 335 , yl = 280;
	//circ1.setCloseness( 0.9 )
	env.animation( function() {

		lin.unSetGravity();
		//rec1.setRotationDeg(angle - 30)
		xl -= 0.05;
		yl -= 0.05;
		lin.setLinePoint([xl,yl],2)
		vel = circ1.getSpeed();
		colisions = lin.pointCollision([ circ1.x , circ1.y ]);
		if( colisions.length > 0 ){
			circ1.bounce( 0.5, -1)
		}
		angle += 0.7
		/*rec4.x = lin2.xtest;
		rec4.y = lin2.ytest;*/
		rec5.x = lin.xtest2;
		rec5.y = lin.ytest2;
		//angle = ( angle - 1 ) % 360;
		env.render();

	}, 1000/36)
