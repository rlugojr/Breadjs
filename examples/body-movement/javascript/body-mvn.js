/*Images took from: bird.png - http://www.xojo3d.com/tut015.php
				    blue_bird.png - http://www.wikitude.com/*/
var env = Bread.setEnvironment({
	'canvas' : 'id:canvas-el',
	'width' : 800,
	'height' : 480
});
var bird = Bread.createThing({
	'x' : 150,
	'y' : 150

});
/*
var circle = Bread.createThing({
	'x' : 5,
	'y' : 5,
	'solid-circle' : 10,
	'fill-color':'#0000FF'
})*/
spacecrft = Bread.createThing({
	'x':5,
	'y':5
})
spacecrft.setImage({

	'src' : 'img/nave.png', 
	'swidth' : 555, 
	'sheight' : 971, 
	'width' : 35.5, 
	'height': 77.1, 
	'deg' : 0
})
rects = [];
for (var i = 0,x = 0,y = 0, rx = 0, ry = 0, width = 0,height = 0; i < 12; i++) {

	x = Bread.random(20,770);
	y = Bread.random(20,440);
	width = Bread.random(20,170);
	height = Bread.random(20,120);

	rects.push(Bread.createThing({	
			'x' : x,
			'y' : y,
			'solid-rectangle':[width,height]
		})
	);
	//rects[i].setRotationDeg(23)
	env.addIt(rects[i])
};

spacecrft.speed = 5;
env.addIt(spacecrft);
env.mousedownCanvas(function (event) {

    var recuadro= this.getBoundingClientRect();
    xob=(event.clientX - Math.round(recuadro.left));
    yob=(event.clientY - Math.round(recuadro.top));
   
    spacecrft.locate(xob,yob)

});
//bird.initialFrame( 0 )
//bird.endFrame( 3 )
env.animation(function() {

	spacecrft.follow(rects , 12)
	env.render();

},1000/20)
