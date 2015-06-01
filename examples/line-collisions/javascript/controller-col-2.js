

var xob = 100,yob = 12,num_circ = 7,circles=[];
	
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
	for (var n = 0,x = 5,y = 80; n < num_circ; n++) {

			x = Bread.random(0,80)
			y = Bread.random(0,130)
			circles.push(Bread.createThing({
				x:x,
				y:y,
				//'solid-rectangle':[45 , 132],
				'solid-circle':3,
				'fill-color' : '#777'
			}))
			env.addIt(circles[n])
	};
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

		for (var n = 0; n < num_circ; n++) {
			colisions = lin.pointCollision([circles[n].x , circles[n].y])

			if(colisions.length > 0)
				circles[n].bounce( 0.22, -0.7);

		};
		
		angle += 0.7
		env.render();

	}, 1000/36)
