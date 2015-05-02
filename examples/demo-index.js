$(document).ready(function() {

	//$(".tab-home").css('display','none');
	$(".tab-guide").css('display','none');
	$(".tab-demos").css('display','none');
})
$(".menu-tp").mousedown(function() {
	var clase = $(this).attr('id')
	$(".tab-home").css('display','none');
	$(".tab-guide").css('display','none');
	$(".tab-demos").css('display','none');
	$(".menu-tp").removeClass('active');
	$(this).addClass('active');
	$("."+clase).css('display','block');
});
html_env = {
				'intro-entorno':{'titulo':'Environment Object',
								 'contenido':'The Environment object is where the reality of all the stuff you want to create (animations or games) occurs, '+
								 			'so after creating the html canvas tag, this is the first object you have to instantiate. '+
								 			'So first create the canvas tag in the html body.<br>'+
											'<code>&ltcanvas id="environment"&gt;&lt/canvas&gt;</code><br>'+
											'Then in your script tag or your included JavaScript file (controller) create a Bread Environment:<br>'+
											'<code>var env = Bread.setEnvironment({ \'canvas\' :\'id: environment\' , \'width\':800, \'height\':500, \'set-gravity\':[0.001,0.01] })</code><br>'+
											'In the first attribute we assign the reference (id, class or nth element) of the canvas were the environment will develop if you want to relate with the class the indicator would be class: '+
											'\'canvas-class-name\' and Bread will take the first canvas in the DOM with that class, if you want to select the first canvas, '+
											'the correct selector for that is \'nth:1\', you also must set the dimensions of the environment (which will be the canvas dimensions) and finally, if you want, you can set the gravity of the environment, it must be passed as an array of length 2, '+
											'this array will have the acceleration component of the x axis in its first position and the acceleration component of the y axis in the second position.<br>'+
											'Important Note: Once you create the environment object if you want to render or animate, you MUST first create a Thing object, otherwise the environment wont find something to draw or animate causing an exception.'},
				'agregar-objs':{'titulo':'Adding Objects',
								'contenido':'<h4>addIt( Thing )</h4>'+
											'The addIt method will add \'things\' to the environment, its argument is a Thing object, '+
											'once you add a thing to the environment, this Thing will be bound to this environment '+
											'and could be rendered, animated, affected by gravity, etc. If you pass the same object '+
											'two or more times the system will throw an error.<br>'+
											'<code>env.addIt( Instance_Of_Thing )</code>'},
				'animacion':{'titulo':'Animation',
						'contenido':'<h4>animation( callback, frame_rate )</h4>'+
									'The animation object allows us to re-draw frame by frame everything in the environment. '+
									'The input arguments are the callback function and the frame rate in milliseconds, for example if you want 27 '+
									'frames per second, the second argument value would be 1000/27, is not mandatory if you don\'t set it, the default '+
									'frame rate is 24 fps.'+
									'<code>env.animation(function(){ //Your code here },1000/36);</code>'},
				'click':{'titulo':'Click',
						'contenido':'<h4>clickCanvas( callback )</h4>'+
									'clickCanvas will trigger the onclick event over the canvas. Its only argument '+
									'is a callback function.<br>'+
									'<code>env.clickCanvas(function( event ){ //Your code here. });</code>'},
				'mdown':{'titulo':'Mouse Down',
						'contenido':'<h4>mousedownCanvas( callback )</h4>'+
									'BreadJS comes with canvas JS events; you can call them from the Environment object. '+
									'The first one of the list is mousdownCanvas, it will trigger the onmousedown event '+
									'over the canvas. Its only argument is a callback function.<br>'+
									'<code>env.mousedownCanvas(function( event ){ //Your code here. });</code>'
				},
				'mmove':{'titulo':'Mouse Move',
						'contenido':'<h4>mousemoveCanvas( callback )</h4>'+
									'mousemoveCanvas will fire the onmousemove event whenever it happens over the canvas. '+
									'Its only argument is a callback function.<br>'+
									'<code>env.mousemoveCanvas(function( event ){ //Your code here. });</code>'
				},
				'mover':{'titulo':'Mouse Over',
						'contenido':'<h4>mouseoverCanvas( callback )</h4>'+
									'mouseoverCanvas will fire the onmouseover event over the canvas. Its only argument '+
									'is a callback function.<br>'+
									'<code> env.mouseoverCanvas(function( event ){ //Your code here. });</code>'
				},
				'mup':{'titulo':'Mouse Up',
						'contenido':'<h4>mouseupCanvas ( callback )</h4>'+
								    'mouseupCanvas will trigger the onmouseup event whenever it happens over the canvas. '+
								    'Its only argument is a callback function.<br>'+
								    '<code env.mouseupCanvas(function( event ){ //Your code here. });</code>'
				},
				'tstart':{'titulo':'Touch Start',
						'contenido':'<h4>touchstartCanvas( callback )</h4>'+
									'touchstartCanvas will fire the touchstart event whenever it happens over the canvas, '+
									'remember all touch events offer the ability to interpret finger activity on touch '+
									'screens or trackpads (it could be usefull for mobile devices). '+
									'Its only argument is a callback function.<br>'+
									'<code>env.touchstartCanvas (function( event ){ //Your code here. });</code>'
				},
				'tend':{'titulo':'Touch End',
						'contenido':'<h4>touchendCanvas( callback )</h4>'+
									'touchendCanvas will trigger the touchend event over the canvas. Its only argument '+
									'is a callback function.<br>'+
									'<code>env.touchendCanvas (function( event ){ //Your code here. });</code>'
				},
				'tmove':{'titulo':'Touch Move',
						'contenido':'<h4>touchmoveCanvas( callback )</h4>'+
									'touchmoveCanvas will trigger the touchmove event over the canvas. Its only '+
									'argument is a callback function.'+
									'<code>env.touchmoveCanvas (function( event ){ //Your code here. });</code>'
				}
}
html_thing = {
					'intro-cosa':{'titulo':'Thing Object',
								  'contenido': 'The "Things" are objects like: circles, rectangles, lines, images, etc. '+
											   'Anything related to an element in the reality or environment of the canvas will be drawn from here, '+
											   'whenever you want to instantiate a Thing object, you must do it like this:<br>'+
											   '<h5>Important Note: Since there are several types of "Thing" objects, the way of initializing the \'Thing\' object varies depending of the type of it.</h5><br>'+
											   '<code>thing = Bread.createThing({ x:120, y:30, \'solid-rectangle\':[7 , 12], \'fill-color\':\'#777\' });</code><br>'+
											   'The "x" parameter set the position of the object in the x-axis, the "y" parameter do the same for the y-axis, the "solid-rectangle"<br>'+
											   'parameter sets the object type (this attributes will be listed down).'},
					'circulo':{'titulo':'Circle',
							   'contenido':'The Circle object is an empty circle. It receives a numeric value, '+
							   			   'which is the radius of the circle as shown in the next example: '+
							   			   'I.e. <code>"circle": 4</code> for solid circles you set <code>"solid-circle":4</code>'},
					'rect':{'titulo':'Rectangle',
						    'contenido':'The Rectangle object is an empty rectangle, since we already set'+
						    			'its position with the x and y values, the value that must be assigned to the'+ 
						    			'rectangle object is an array of length 2, in which the first position will contain '+ 
						    			'the width of the rectangle and the second position its height: I.e. <code>"rectangle":[7 , 12]</code>'+
						    			'for solid rectangles: <code>"solid-rectangle":[7 , 12]</code>'},
				    'arco':{'titulo':'Arc',
				    		'contenido' : 'The Arc object receives an array of length 4, which elements will be referred to: '+ 
				    					  'first element is the arc radius, the second one is the start angle of the arc, the third '+ 
				    					  'one is the end angle of the arc and the last one, which is optional, is whether the arc '+ 
				    					  'is clockwise (true) or not (false). I.e.<code> "arc":[ 30, 1, 2, false]</code><br>'+
				    					  '<h4>setArcAttr( radius , sangle , eangle )</h4><br>'+
				    					  'This function works similar to setLinePoint but will set new attributes to the arc object, '+
				    					  'the first argument corresponds to the new radius, the second argument corresponds to the '+
				    					  'new start angle of the arc and the third one corresponds to the end angle. The angles must '+
				    					  'be in radians.<br>'+
										  '<code>thing.setArcAttr( 2, 1.1 , 2.3 )</code>'},
					'linea' : {'titulo':'Line',
							   'contenido':'The Line object receives a JavaScript Object, which contains one or more arrays, each '+
							   			   'one of these arrays will have the x and y coordinates of a specific point of the polyline. <br>'+
							   			   'I.e. <code>"line":{ 0:[120 , 90], 1:[120 , 200], 3:[140, 230] }</code><br>'+
										   '<b>Important Note: The image and sprite types are presented in this section since they are '+
										   'types of objects, but the way of defining them as Image or Sprites is thru "Thing Methods" '+
										   'this section will be explained later in this guide.</b>'},
					'img' : {'titulo':'Image',
							 'contenido':'The Image object shows a specific image in the canvas; after initializing the \'Thing\', you must '+
										 'invoke the setImage internal method. The mandatory properties when creating an image object are: the route of the '+
										 'image, x coordinate and y coordinate. These are optional parameters: deg specifies the inclination angle of the '+
										 'image in degrees, rad specifies the same angle but in radians sx determines where to start clipping in x, sy determines '+
										 'where to start clipping in y, swidth is the width of the clipped image, sheight is the height of the clipped image, width '+
										 'is the width of the image, you can stretch or reduce it and height is the height of the image, you can also stretch or '+
										 'reduce it. For further information visit the W3Schools site and view the HTML5 Canvas tutorial: <a href="http://www.w3schools.com/html/html5_canvas.asp">(www.w3schools.com)</a> <br>'+
										 'I.e. <code>image = Bread.createThing({ x: 200, y: 120 }) image.setImage({ "src" : "magenes/nave.png", "swidth" : 555, "sheight" : 971, "width" : 55.5, "height": 97.1, "deg" : 30 })</code>'},
					'sprite':{'titulo':'Sprites',
							  'contenido':'The Sprite object animates images, so the image should be a spritesheet. Its initialization is similar to the Image object;' +
							  			  'once you have created a new "Thing" you invoke the setSprite Thing method, its attributes should be defined as follows: '+
							  			  'the route of the spritesheet (src) , the width of the whole spritesheet, the height of the spritesheet, sx is the initial '+
							  			  'x of the frame, sy is the initial y of the frame, wcut is the width of the frame, hcut is the height of the frame, frames '+
							  			  'are the number of frames contained in the spritesheet.<br>'+
										  '<h5>Important Note: Your spritesheet sequence must be from left to right and descending, in other words, once the internal '+
										  'algorithm scans all columns (from left to right) it will descend one row, then scans the columns of that row, and so on.</h5> <br>'+
										  'I.e. <code>sprite = Bread.createThing({ x: 200, y: 120 }); sprite.setSprite({ "src" : "img/bird.png", "width" : 918, "height" '+
										  ': 506, "sx":0, "sy":5, "wcut" : 182, "hcut" : 168, "frames" : 80, "deg" : 0 });</code><br>'+
										  '<h4>animateSprite( animate )</h4>'+
										  'Once you\'ve created the sprite object, you call this function to animate the sprite, passing the only argument as true or false if you don\'t want the sprite to be animated<br>'+
										  '<code>sprite.animateSprite( true )</code>'+
										  '<h4>initialFrame( frame )</h4>'+
										  'Sets the initial frame for the sprite, the number must be between 0 and the amount of frames in the spritesheet<br>'+
										  '<code>sprite.initialFrame( 3 )</code>'+
										  '<h4>endFrame( frame )</h4>'+
										  'Sets the final frame for the sprite, the number must be between 0 and the amount of frames in the spritesheet<br>'+
										  '<code>sprite.endFrame( 12 )</code>'
										  /*'After creating the Sprite object, as shown in the example above, if you want to animate you must call the Thing method '+
										  'animateSprite(), this method will be explained further.'*/},
					'contexto':{'titulo':'Context',
								'contenido':'<h4>setContext( context )</h4>You can pass the 2d canvas context of the "Thing" thru this method; it only takes one parameter, which is the canvas context.'+
											'<h4>getElementContext()</h4> Gets the context of the element. <code>var ctx = thing.getElementContext().</code>'

					},
					'visible':{'titulo':'Visible',
							  'contenido':'<h4>isVisible()</h4>'+
							  			  'This function allows you to know if an object is visible or not, it returns true if '+
							  			  'it is visible or false if not.<br> <code>var isvisible = thing.isVisible()</code>'+
							  			  '<h4>show()</h4>'+
										  'Contrary to hide(), this function set the current object visible and will be displayed or rendered in the canvas. '+
										  '<code>thing.show()</code>.'+
										  '<h4>hide()</h4>'+
										  'This function set the current object invisible, in other words it wont be rendered, but the object can still be affected by other function, like : pointCollision, shapeCollision, move, etc.'+
										  '<code>thing.hide()</code>'},
					'rotacion':{'titulo':'Rotation',
								'contenido':'<h4>setRotationDeg( ang )</h4>'+
											'You can also set the object rotation in degrees: its input argument is the value of angle rotation in degrees.'+
											'<code>thing.setRotationDeg( 90 )</code>'+
											'<h4>setRotationRad( ang )</h4>'+
											'You can set the rotation of an object in radians; its input argument is the value of angle rotation in radians.'+
											'<code>thing.setRotationRad( Math.Pi / 2 )</code>'},
					'gravedad':{'titulo':'Gravity',
								'contenido':'<h4>dimGravity( acceleration_x , acceleration_y )</h4>'+
											'Once you\'ve set a gravity value to the environment, all the objects bound to this environment'+
											'will be affected by this acceleration values, so, you can diminish the effect of this value with this function.'+
											'<code>thing.dimGravity(0.01,0.015)</code>'+
											'<h4>unSetGravity()</h4>'+
											'It removes completely the gravity effect over the object. '+
										    '<code>thing.unSetGravity()</code>'
						},
					'velocidad':{'titulo':'Speed and Direction',
								 'contenido':'<h4>getSpeed()</h4>'+
											 'Gets the speed of the object and returns it.'+
											 '<code>var speed = thing.getSpeed()</code><br>'+
											 '<h5>Important Note: The way of setting the object speed is by accessing the speed attribute directly from the object.<br> I.e. <code>var thing.speed = 5;</code><br></h5>'+
											 '<h4>getDirection()</h4>'+
											 'Depending on the current position, this function gets the direction in which '+
											 'the object is moving (if moving), the return value is an array containing the '+
											 'x direction in its first position and the y direction in the second one, this value '+
											 'only can be 1 or -1. For example if the object is moving from the center to the upper '+
											 'right corner; the return value will be [1,-1].'+
											 '<code>var direction = thing.getDirection()</code>'},
					'tamano':{'titulo':'Size',
							  'contenido':'<h4>setSize( size )</h4>'+
										  'Sets the size of the specific object, its input argument is a numeric value that '+
										  'corresponds to the new size of the object; if the object is a circle it will modify the '+
										  'radius, if it is a rectangle you need to pass an array of length two, in the '+
										  'first position will be stored the width and in the second one the height.<br>'+
										  '<code>thing.setSize( 8 ) //Circle thing.setSize( [10,15] ) //Rectangle</code>'

					},
					'color':{'titulo':'Color',
							 'contenido':'<h4>setFillColor( color )</h4>'+
										 'The fill color of an element can be set manually using this function.'+
										 '<code>thing.setFillColor( "#00FF00" )</code><br>'+
										 '<h4>getFillColor()</h4>'+
										 'You can also obtain the fill color using this function; it will return '+
										 'a string containing the color value.<br>'+
										 '<code>thing. getFillColor()</code>'

					},
					'impulso':{'titulo':'Impulse',
							   'contenido':'<h4>impulse( speed , angle , friction )</h4>'+
										   'The impulse method allows the developer to implement a "physic reaction" of a body, '+
										   'you must pass a numeric value for the impulse speed, the angle in radians and a value '+
										   'for the friction, this value will reduce the speed.'+
										   '<code>thing.impulse( 5 , 1.45 , 0.01 )</code>'+
										   '<h5>Important Note: the impulse function should be call only once after or inside the '+
										   'animation, otherwise if you use it inside the animation callback without conditions, '+
										   'it will impulse the body every iteration.</h5>'

					},
					'movimiento':{'titulo':'Movement',
								  'contenido':'<h4>move()</h4>'+
											  'This function will move the Thing to the point founded by the locate method.<br>'+
											  '<code>thing.move()</code>'+
											  '<h4>locate( x_objective, y_objective )</h4>'+
											  'The Thing object can aim to a specific coordinate by passing the coordinate '+
											  'value thru this method. It will modify its angle according to the objective.<br>'+
											  '<code>thing.locate( 100,200 )</code><br>'+
											  '<h4>follow( array_of_objects , size )</h4>'+
											  'Similar to the move function, but it provides an interesting feature, if a '+
											  'rectangular body stands in the path of the body in movement, this one will detour, '+
											  'trying to reach the objective. In the figure you can see the function performance;' +
											  'the dotted line represents the trajectory that the body would follow if the move '+
											  'function is called, the other line represents the trajectory when the follow function '+
											  'is called, if the body finds a rectangular obstacle in its path, he will detour and try '+
											  'to reach the objective. Its two input arguments are: 1) a list or array containing the '+
									          'rectangular objects and the 2) the size of the object, this is the range in which the '+
											  'object will \'touch\' the object and detour, this second argument is optional<br>'+
											  '<code>thing.follow( [obj1,obj2,obj3....,objn] , size )</code>'+
											  '<h5>Important Note: When calling this function the object ONLY recognizes rectangular shapes with 0 angle. I expect it will be improved; any help would be really appreciated.</h5><br>'+
											  '<img class="img-responsive" src=\'follow-exp.png\'>'

					},
					'colision':{'titulo':'Collision',
								'contenido':'<h4>pointCollision( array_of_points )</h4>'+
											'Similar to shapeCollision, but the accepted types in this method are points and lines, '+
											'the argument is an array of the points which the "Thing" will collide with, specifically '+
											'is an array of arrays ([[x1,y1] , [x2,y2] , [x3,y3],..., [xn,yn] ] ), you must call this '+
											'function from a line or a point, and it will perform collisions between point and points, '+
											'and line and points, the return value is similar to shapeCollision.<br>'+
											'<code>collisions = line. pointCollision ([[x1,y1] , [x2,y2] , [x3,y3]]);'+
											'//if rec1 collides with [x1,y1] and [x2,y2], the value of collisions shall be [1,3]</code>'+
											'<h4>shapeCollsion( array_of_bodies )</h4>'+
											'This function will perform collisions between two types of "Things": Rectangles and '+
											'Circles; once you call the function, you must pass as an argument an array of the "Things" '+
											'that will collide with the ‘Thing’ from you are calling the function. The return value shall be '+
											'a list containing the positions (according to the passed array of bodies) of the bodies or "Things"'+
											'that collide with the targeted "Thing".'+
											'Important Note: This method performs collisions between the same types of "Things", it only will collide '+
											'rectangles with rectangles and circles with circles, so if you want to collide a circle with a rectangle '+
											'this function won\'t do it. An image is a rectangular shape for this function.<br>'+
											'<code>collisions = rec1.shapeCollision([rec2,rec3,rec4,rec5]); //if rec1 collides with rec2 and rec4, the value of collisions shall be [1,3]</code>'
					},
					'rebote':{'titulo':'Bounce',
							  'contenido':'<h4>bounce( bounce_x , bounce_y )</h4>'+
										  'Bounces a specific object. The input arguments are the reaction speed '+
										  'that this object will have in x and y.<br>'+
										  '<code>thing.bounce(1,2)</code>'

					}

				};
html_otras = {
	'aleatorio':{'titulo':'Random',
			  'contenido':'<h4>random(ini_n , fin_n)</h4>'+
						  'Random is a Bread function that receives as arguments two numbers; '+
						  'the first one is the lower limit for choosing a random number and '+
						  'the second one is the upper limit. It returns a random number between '+
						  'the first and the second input argument.<br>'+
						  '<code>random_m = Bread.random(-4,4)</code>'
			},
	'aleatorio-por':{'titulo':'Random by portions',
			  'contenido':'<h4>randomInPortions(arr1,arr2)</h4>'+
			  			  'Random in portions provides a functionality for getting a number randomly in some specific ranges,<br>Ie.'+
			  			  '<code>var n = Bread.randomInPortions([8,12],[10,14])</code><br>'+
			  			  'The example above will return a number chosen randomly between 8 - 10 and 12 - 14, for example it will <b>never</b> chose 11'
			},
	'barajar':{'titulo':'Shuffle',
			  'contenido':'<h4>shuffle( array )</h4>'+
						  'Shuffle will return a shuffled version of the array passed as argument<br>'+
						  '<code>disorganized = Bread.shuffle( [1,2,3,4,5,6,7])</code>'
			}
}
$("#iniciando").mousedown(function() {
	$(".contenedor-guia").html('<div class="panel panel-primary panel-lejos">'+
									'<h2 class="panel-heading">Getting Started</h2>'+
									'<div class="panel-body">'+
										'The library structure is based on two kinds of objects, one is the \'Environment\' Object and the other one is the \'Thing\' object, the idea is to always '+
										'work in function of this kind of objects, its important to highlight that this Library is intended to simplify the amount of work during '+
										'game developing. Let\'s begin; first of all you must include the breadjs-(version).js file in your html document then you can use '+
										'any of its components. You can start coding in the html document inside the script tag or do it in an external and included '+
										'JavaScript file, I Recommend to do it in an external file and place there all the logic of the application; this file will act like '+
										'a controller.'+
									'</div>'+
								'</div>')
})
$(".item-guia-entorno").mousedown(function() {
	var item  = $(this).attr('id')
	$(".contenedor-guia").html('<h2>'+html_env[item]['titulo']+'</h2>'+
							   '<div>'+html_env[item]['contenido']+'</div>')
})
$(".item-guia-cosa").mousedown(function() {
	var item  = $(this).attr('id')
	$(".contenedor-guia").html('<h2>'+html_thing[item]['titulo']+'</h2>'+
							   '<div>'+html_thing[item]['contenido']+'</div>')
})
$(".item-guia-otras").mousedown(function() {
	var item  = $(this).attr('id')
	$(".contenedor-guia").html('<h2>'+html_otras[item]['titulo']+'</h2>'+
							   '<div>'+html_otras[item]['contenido']+'</div>')

})
$(".demo-item").mousedown(function() {
	$(".demo-item").removeClass('active')
	$(this).addClass('active')
	var item = $(this).attr('id'),
		url = demos[item]["url"],
		instr = demos[item]["titulo"];
	$("iframe").attr("src",url)
	$("#titulo-instructivo").html(instr)
})
var demos = {

	"movimiento" : {"url":"examples/body-movement/body-movement.html",
					"titulo":"Click anywhere in the screen"},
	"cadena" : {"url":"examples/chain-reaction/chain-reaction.html",
					"titulo":"Wait till the reaction happens"},
	"colsion-linea" : {"url":"examples/line-collisions/line-colission2.html",
					"titulo":""},
	"particulas" : {"url":"examples/particles/particles.html",
					"titulo":""},
	"colision" : {"url":"examples/rectangles-colliding/rectangles-colliding.html",
					"titulo":""},
	"sprite" : {"url":"examples/sprite-demo/sprite-demo.html",
				"titulo":""}

}