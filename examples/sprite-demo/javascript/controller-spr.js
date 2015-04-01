var environment = Bread.setEnvironment({
	'canvas' :'id:entorno',
	'width' : 800,
	'height' : 460
})
var sprite = Bread.createThing({
	x: 200,
	y: 120
})
var sprite2 = Bread.createThing({
	x: 300,
	y: 320
})
var sprite3 = Bread.createThing({
	x: 100,
	y: 320
})
sprite.setSprite({
		'src' : 'img/running-grant.png',
		'width' : 2048,
		'height' : 2048,
		'sy':30,
		'wcut' : 165,
		'hcut' : 282,
		'frames' : 59,
		'deg' : 0
	})
sprite2.setSprite({
		'src' : 'img/dance.png',
		'width' : 880,
		'height' : 1280,
		'sx':122,
		'wcut' : 107,
		'hcut' : 128,
		'frames' : 80,
		'deg' : 0
	})
sprite3.setSprite({
		'src' : 'img/bird.png',
		'width' : 918,
		'height' : 506,
		'sy':5,
		'wcut' : 182,
		'hcut' : 168,
		'frames' : 80,
		'deg' : 0
	})

environment.addIt(sprite)
environment.addIt(sprite2)
environment.addIt(sprite3)

environment.animation(function() {
	
	sprite.animateSprite();
	sprite2.animateSprite();
	sprite3.animateSprite();
	sprite.setRotationDeg(55)
	environment.render();

},1000/26)