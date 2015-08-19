var particles = [],
    single_particle = {},
	background = Bread.createThing({
		x:0,
		y:0,
		'solid-rectangle':[850, 500],
		'fill-color':'#FFF'
	}),
	enviroment = Bread.setEnvironment({
		'canvas' : 'nth:1',
		'set-gravity': [0.0, 0.02],
		'width' : 850,
		'height' : 500
	});
enviroment.mousedownCanvas(function(event) {
    
	var c = document.getElementById('envir'),
		rect = c.getBoundingClientRect(),
		x = event.clientX - rect.left,
		y = event.clientY - rect.top;
	number_of_particles = Bread.random(130,145);

	for (var p = number_of_particles; p >= 0; p--) {
		single_particle = Bread.createThing({ x:x, y:y, 'solid-circle':5, 'fill-color':'#FFF' })
		particles.push(single_particle);
	    enviroment.addIt( single_particle );
	    single_particle.impulse( Bread.random(-5,5) , Bread.random(0,Math.PI) , 0 );

	};
});
enviroment.addIt( background )
enviroment.animation(function( env ) {
    
	background.unSetGravity()
	particleMovement(particles)
	env.render()

},1000/36);

function particleMovement (particles) {
	for(p in particles){
		particles[p].move()
        if(particles[p]['draw_object']['radius'] >= 0.025)
			particles[p].setSize( particles[p]['draw_object']['radius'] - 0.025 )
		else{
			enviroment.removeIt(particles[p])
			particles.splice(p, 1);
		}

	}
}