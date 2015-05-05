

var xob = 100,yob = 12;
	
	circ1 = Bread.createThing({
		x:5,
		y:80,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	circ2 = Bread.createThing({
		x:20,
		y:100,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	circ3 = Bread.createThing({
		x:35,
		y:90,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	circ4 = Bread.createThing({
		x:50,
		y:105,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	circ5 = Bread.createThing({
		x:45,
		y:90,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});

	circ6 = Bread.createThing({
		x:10,
		y:115,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	circ7 = Bread.createThing({
		x:0,
		y:125,
		//'solid-rectangle':[45 , 132],
		'solid-circle':3,
		'fill-color' : '#777'
	});
	circles = [circ1,circ2,circ3,circ4,circ5,circ6,circ7]
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
	env.addIt(circles[0]);
	env.addIt(circles[1]);
	env.addIt(circles[2]);
	env.addIt(circles[3]);
	env.addIt(circles[4]);
	env.addIt(circles[5]);
	env.addIt(circles[6]);
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
		colisions = lin.pointCollision([ circles[0].x , circles[0].y ],
									   [ circles[1].x , circles[1].y ],
									   [ circles[2].x , circles[2].y ],
									   [ circles[3].x , circles[3].y ],
									   [ circles[4].x , circles[4].y ],
									   [ circles[5].x , circles[5].y ],
									   [ circles[6].x , circles[6].y ]);
		//xl+=1;
		//yl+=1;
		//lin.setLinePoint( [xl,yl] , 2 )
		//if( colisions.length > 0 ){
			//circ1.bounce( 0.22, -0.78)
		
		for(b in colisions){
			cr = colisions[b] - 1;
			//console.log('cr '+cr)
			circles[cr].bounce( 0.22, -0.78)
		}
		angle += 0.7
		/*rec4.x = lin2.xtest;
		rec4.y = lin2.ytest;*/
		rec5.x = lin.xtest2;
		rec5.y = lin.ytest2;
		//angle = ( angle - 1 ) % 360;
		env.render();

	}, 1000/36)
