/*Images took from: bird.png - http://www.xojo3d.com/tut015.php
				    blue_bird.png - http://www.wikitude.com/*/
var env = Bread.setEnvironment({
	'canvas' : 'id:canvas-el',
	'width' : 800,
	'height' : 480
});
var bird = Bread.createThing({
	'x' : 100,
	'y' : 250

});
bird.setSprite({
	'src' : 'img/blue_bird.png',
	'width' : 256,
	'height' : 256,
	'frames' : 16,
	'wcut' : 64,
	'hcut' : 64,
	'sx' : 1,
	'sy' : 1
});
/*var circle = Bread.createThing({
	'x' : 100,
	'y' : 250,
	'solid-circle' : 10,
	'fill-color':'#0000FF'
})*/

rects = [];

for (var i = 0,x = 0,y = 0,width = 0,height = 0; i < 12; i++) {

	x = Bread.random(0,700);
	y = Bread.random(0,440);
	width = Bread.random(0,170);
	height = Bread.random(0,120);

	rects.push(Bread.createThing({	
			'x' : x,
			'y' : y,
			'solid-rectangle':[width,height]
		})
	);
	env.addIt(rects[i])
};

bird.speed = 5;
env.addIt(bird);
env.mousedownCanvas(function (event) {

    var recuadro= this.getBoundingClientRect();
    xob=(event.clientX - Math.round(recuadro.left));
    yob=(event.clientY - Math.round(recuadro.top));
    if( xob < bird.x){
		bird.initialFrame( 0 )
		bird.endFrame( 3 )
    }else{

		bird.initialFrame( 4 )
		bird.endFrame( 7 )
    }

    bird.locate(xob,yob)

});
bird.initialFrame( 0 )
bird.endFrame( 3 )
env.animation(function() {

	bird.animateSprite();
	
	bird.follow(rects , 12)
	env.render();

},1000/20)
