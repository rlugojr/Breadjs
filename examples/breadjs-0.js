/*!--------------------------------------------------!
 * BreadJS JavaScript HTML5 Canvas Library v - 0.0.1
 * Copyright (c) 2015 Juan Camilo Gutierrez Ruiz
 * Licensed MIT
 * Date: 2015-02-20
 *!--------------------------------------------------!
 */
 
Bread = (function(){
	/*Main Bread object*/
	/*Reference to check the selector*/
	var selexpr = /(^id:|^class:|^nth:)(?=\w)/;

	/*Main enviroment object*/
	var Environment = function ( elem, env ) {

		return new Environment.methods.init( elem, env );
	}

	/*Methods of the enviroment*/
	Environment.methods = Environment.prototype =  {
		init_object : {},
		/*The initialize function of the environment methods object*/
		init: function( elem, env ) {

			Environment.methods.init_object = new Environment.methods.outerObject();
			Environment.methods.init_object.enviroment_element = elem;

			for (var fun in env){
				/*Call the methods in the constructor*/
				switch (fun){
					case 'set-gravity':
					 Environment.methods.setGravity( env[fun] );
					 break;
					case 'width':
					 Environment.methods.setWidth( env[fun] );
					 break;
					case 'height':
					 Environment.methods.setHeight( env[fun] );
					 break;
					case 'canvas':
					 /*Nothing to do*/
					 break;
					default:
						console.error('There is an incorrect initialization of the enviroment!');
						return false;
				}
			}
			/*Return the convinient Environment object*/
			return Environment.methods.init_object;
		},
		setGravity : function( acce ) {
			/*Set a gravity for all the objects existing in the enviroment*/
			if (typeof acce != 'object'){
				console.error('Invalid type of argument in set-gravity!');
				return false;
			}

			Environment.methods.init_object.xgravity = acce[0];
			Environment.methods.init_object.ygravity = acce[1];
		},
		setWidth : function( wid ) {
			/*Set the width of the environment*/
			Environment.methods.init_object.enviroment_element.width = wid;
		},
		setHeight : function( hei ) {
			/*Set the height of the environment*/
			Environment.methods.init_object.enviroment_element.height =  hei;
		},
		fall : function( set ,accx, accy) {
			/*This method accelerates the 'Things' according to the environment gravity*/
			for( var ind in set){
				var thing = set[ind];
				thing.x += thing.xfallspeed, thing.xfallspeed += accx;
				thing.y += thing.yfallspeed, thing.yfallspeed += accy;
			}
			return set;
		},
		setFrameRate : function( frat ) {
			/*Set the frame rate of the animation*/
			Environment.methods.init_object.frate = frat;
		},
		stickLines : function( thi ) {
			/*Internal method for consolidating line objects*/
			if( thi.draw_object['figure'] == 'line' ){

				for(var lin in thi.draw_object['poi'] ){
					lcords = thi.draw_object['poi'][lin];
					lcords[0] += thi.xfallspeed; lcords[1] += thi.yfallspeed;
				}
			}
			return thi;
		},
		draw : function( context, draw_object, x, y ) {
			/*It draws evrything according to its type*/
			if( typeof draw_object != 'object' ||  typeof x != 'number' ||  typeof y != 'number'){
				console.error('Invalid input on render canvas!');
				return false;
			}
			var context = context,
				drawing = draw_object,
				lcords = [],
				figure = drawing['figure'],
				img = [],
				linew = drawing['line-width'] || 1,
				linecolor = draw_object['line-color'] || '#000';
			/*Numeric data type*/
			var radius = 0,
				//angle = 0,
				sangle = 0,
				eangle = 0,
				counterclock = false,
				width = drawing['width'],
				height = drawing['height'],
				swidth = drawing['swidth'],
				sheight = drawing['sheight'],
				angle = drawing['angle'] || 0;
				x = x,
				y = y,
				sx = drawing['sx'] || 0,
				sy = drawing['sy'] || 0,
				Pi = 2 * Math.PI;//Constant of Pi

			if(context == ''){
				console.error('Canvas context is not defined');
				return false;
			}	
			context.beginPath();
			context.lineWidth = linew;
			context.strokeStyle = linecolor;
			
			switch (figure){
				case 'solid-circle':
					radius = drawing['radius'];
					fillcolor = drawing['fill-color'] || '#000';
					context.arc( x, y, radius, 0, Pi);
					context.fillStyle = fillcolor;
					context.fill();
					break;
				case 'solid-rectangle':
					width = drawing['width'];
					height = drawing['height'];
					fillcolor = drawing['fill-color'] || '#000';
					context.fillStyle = fillcolor;
					context.save();
					context.beginPath();
					context.translate( x + ( width / 2 ) , y + ( height / 2 ) );
					context.rotate( angle );
					context.fillRect( -width / 2 , -height / 2, width, height);
					context.restore()
					break;
				case 'circle':
					radius = drawing['radius'];
					context.arc( x, y, radius, 0, Pi);
					break;
				case 'arc' :
					radius = drawing['radius'];
					sangle = drawing['sangle'];
					eangle = drawing['eangle'];
					counterclock = ( typeof drawing['counterclock'] == 'boolean' ) ? drawing['counterclock'] : counterclock ;
					context.arc( x, y, radius , sangle , eangle , counterclock )
					break;
				case 'rectangle':
					width = drawing['width'];
					height = drawing['height'];
					context.save();
					context.beginPath();
					context.translate( x + ( width / 2 ) , y + ( height / 2 ) );
					context.rotate( angle );
					context.rect( -width / 2 , -height / 2, width, height);
					context.restore()
					break;
				case 'line':
					context.moveTo(x, y);
					for ( var lin in drawing['poi'] ){
						lcords = drawing['poi'][lin];
						context.lineTo( lcords[0], lcords[1] );
					}
				 break;
				case 'image':
					img = drawing['img'];

					if ( width <= 0 && height <= 0 )
						context.drawImage( img, x, y );
					else{

						context.save();
						context.translate( x, y );
						context.rotate( angle )
						context.drawImage( img, sx, sy, swidth, sheight, -( width / 2 ), -( height / 2 ), width, height );
						context.restore();
					}
				 break;
				case 'sprite':
					img = drawing['img'];
					context.save();
					context.translate( x, y );
					context.rotate( angle )
					context.drawImage( img, sx, sy, swidth, sheight, -( swidth / 2 ), -( sheight / 2 ), swidth, sheight );
					context.restore();
				 break;
				default:
					console.error('A render error has been detected!');
					return false;

			}
			context.stroke();

		},
		outerObject: function() {
			var set_of_things = {},
				selfreference = this,
				id_ob = 0;
			/*Visible object*/
			this.frate = 1000/24,
			this.xgravity = 0,
			this.ygravity = 0,
			this.enviroment_element = '',
			this.life = '',
			this.context = '',
			this.addIt = function( thing ) {

				var env = this.enviroment_element;

				if( typeof thing != 'object' ) {

					console.error('Incorrect input argument in add-it!');
					return false;
				}
				var tagname = env.tagName;
				
				if( tagname == 'CANVAS' ){
					
					this.context = env.getContext( "2d" );
					thing.setContext( this.context );
				}

				for (var thi in set_of_things) {
					if(set_of_things[thi] == thing){
						console.error('Duplicate objects in enviromet!')
						return false;
					}
				}

				id_ob++;
				set_of_things[id_ob] = thing;
			},
			this.removeIt = function( thing ) {

				if( typeof thing != 'object' ) {

					console.error('Incorrect input argument in remove-it!');
					return false;
				}
				for (var thi in set_of_things) {
					if(set_of_things[thi] == thing)
						delete set_of_things[thi]
					
				}
			},
			this.render = function() {

				var set = set_of_things,
					thi = '';
				for( var ind in set ){

					thi = set[ind];
					/*Call of the internal methods*/
					Environment.methods.stickLines( thi );
					if( !thi.isVisible() )
						Environment.methods.draw( thi.context, thi.draw_object, thi.x, thi.y );
				}
			},
			this.animation = function( callback, frat ) {

				if( typeof callback != 'function' ) {
					console.error('Invalid input argument in animation!');
					return false;
				}
				var context = this.context,
					canvas = this.enviroment_element;
					set = set_of_things,
					accx = this.xgravity,
					accy = this.ygravity;
					frate = frat || this.frate;

				if( context == '' ){
					console.error('Canvas context is not set!');
					return false;
				}

				var reality = function() {

			        requestAnimationFrame(animate);
			        context.clearRect(0,0,canvas.width,canvas.height);
			        callback( selfreference );
			        set = Environment.methods.fall( set, accx, accy );
				},
				animate = function() {
					this.life = setTimeout( reality, frate );
				};
				/*The anime method is called*/
				animate();
			},
			this.mousedownCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.onmousedown = ev;
			},
			this.mouseoverCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.onmouseover = ev;
			},
			this.mousemoveCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.onmousemove = ev;
			},
			this.mouseupCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.onmouseup = ev;
			},
			this.clickCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.onclick = ev;
			},
			this.touchstartCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.addEventListener("touchstart", ev, false);
			},
			this.touchmoveCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.addEventListener("touchmove", ev, false);
			},
			this.touchendCanvas = function( ev ) {

					var env = this.enviroment_element;
					env.addEventListener("touchend", ev, false);
			}
		}
	};


	/*Main thing object*/
	var Thing = function ( thi ) {

		return new Thing.methods.init( thi );
	}
	
	/*Methods for the Thing object.*/
	Thing.methods = Thing.prototype = {

		init_object : {},
		init : function( thi ) {
			/*New instance of the outerObject*/
			Thing.methods.init_object = new Thing.methods.outerObject();

			for ( var fun in thi ){ 
				/*Call the methods in the constructor*/
				switch (fun) {
					case 'x':
					  Thing.methods.setX( thi[fun] );
					  break;
					case 'y':
					  Thing.methods.setY( thi[fun] );
					  break;
					case 'speed':
					  Thing.methods.setSpeed( thi[fun] );
					  break;
					case 'circle':
					  Thing.methods.circle( thi[fun], 'circle' );
					 break;
					case 'rectangle':
					  Thing.methods.rectangle( thi[fun], 'rectangle' );
					  break;
					case 'solid-circle':
					  Thing.methods.circle( thi[fun], 'solid-circle' );
					  break;
					case 'solid-rectangle':
					  Thing.methods.rectangle( thi[fun], 'solid-rectangle' );
					  break;
					case 'line':
					  Thing.methods.line( thi[fun] , 'line');
					  break;
					case 'arc':
					  Thing.methods.arc( thi[fun] , 'arc' );
					  break;
					case 'line-width':
					  Thing.methods.setLineWidth( thi[fun] );
					  break;
					case 'line-color':
					  Thing.methods.setLineColor( thi[fun] );
					  break;
					case 'fill-color':
					  Thing.methods.setFillColor( thi[fun] );
					  break;
					default:
						console.error('There is an incorrect initialization of the thing!');
						return false;
				}
			}
			/*Return the convinient Thing object*/
			return Thing.methods.init_object;
		},
		circle : function( rad , fig ) {

			if( typeof rad != 'number'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['figure'] = fig;
			Thing.methods.init_object.draw_object['radius'] = rad;

		},
		rectangle : function( dime ,fig ) {
			
			if( typeof dime != 'object'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['figure'] = fig;
			Thing.methods.init_object.draw_object['width'] = dime[0];
			Thing.methods.init_object.draw_object['height'] = dime[1];
		},
		line : function( poi , fig ) {

			if( typeof poi != 'object'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['figure'] = fig;
			Thing.methods.init_object.draw_object['poi'] = poi;
		},
		arc : function( args , fig ) {

			if( typeof args != 'object'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['figure'] = fig;
			Thing.methods.init_object.draw_object['radius'] = args[0];
			Thing.methods.init_object.draw_object['sangle'] = args[1];
			Thing.methods.init_object.draw_object['eangle'] = args[2];
			Thing.methods.init_object.draw_object['counterclock'] = args[3];
			
		},
		createImageObject : function( src ) {

			var img = new Image();
	        img.onload = function() {};
	        img.src= src;
	        return img;
		},
		setX : function( x ) {
			/*Set the value of x*/
			if( typeof x != 'number'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.x = x;
		},
		setY : function( y ) {
			/*Set the value of y*/
			if( typeof y != 'number'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.y = y;
		},
		setSpeed : function( sp ) {
			/*Set the value of y*/
			if( typeof sp != 'number'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.speed = sp;
		},
		setLineWidth: function( lw ) {
			/*Set the line width*/
			if( typeof lw != 'number'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['line-width'] = lw;
		},
		setLineColor: function( lc ) {
			/*Set the line color*/
			if( typeof lc != 'string'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['line-color'] = lc;
		},
		setFillColor: function( fc ) {
			/*Set the fill color*/
			if( typeof fc != 'string'){
				console.error('Incorrect data assignment');
				return false;
			}
			Thing.methods.init_object.draw_object['fill-color'] = fc;
		},
		outerObject: function() {
			/*Local variables*/
			var torad = Math.PI / 180,
				xspeed = 0,
				yspeed = 0,
				hidden = false,
				dodge = false,
				xgoes = 0,
				ygoes = 0,
				alfa = 0,
				dist = 0,
				dirx = 1,
				diry = 1,
				xobjective = 0,
				yobjective = 0,
				xtemporalobj = 0,
				ytemporalobj = 0,
				closeness = 0.9,
				closenessb = 0.9,
				sprframe = 0,
				initframe = 0,
				friction = 0,
				initfrx = 0,
				initfry = 0,
				queuevel = [];
			/*Visible object*/
			this.x  =  0,
			this.y  =  0,
			this.speed = 0,
			this.angle = 0,
			this.xfallspeed = 0,
			this.yfallspeed = 0,
			/*Coordenadas Depuraciones*/
			this.xtest = 0,
			this.ytest = 0,
			this.xtest2 = 0,
			this.ytest2 = 0,

			this.draw_object  =  {
				'figure':''
			},
			this.context = '',
			this.setContext = function( cont ) {
			    
			    this.context = cont;
			},
			this.isVisible = function() {
				return hidden;
			},
			this.setRotationRad = function( ang ) {

				this.angle = ang;
				this.draw_object['angle'] = ang ;
			},
			this.setRotationDeg = function( ang ) {

				this.angle = ang * torad;
				this.draw_object['angle'] = ang * torad;
			}, 
			this.dimGravity = function( accx, accy ) {

				this.xfallspeed -= accx;
				this.yfallspeed -= accy;
			},
			this.bounce = function ( bnx, bny ) {

				this.xfallspeed = bnx;
				this.yfallspeed = bny;
			},
			this.unSetGravity = function ( ) {

				this.xfallspeed = 0;
				this.yfallspeed = 0;
			},
			this.getDirection = function() {

				if ( queuedir.length <= 0 ){
					queuedir.push(this.x)
					queuedir.push(this.y)
				}else{
					dirx = ( this.x - queuedir[0] ) / Math.abs( this.x - queuedir[0] );
					diry = ( this.y - queuedir[1] ) / Math.abs( this.y - queuedir[1] );
					queuedir.pop() , queuedir.pop();
					queuedir.push(this.x) , queuedir.push(this.y);
				}
				return [ dirx , diry ];
			},
			this.setLinePoint = function( crds , pos ) {

				var new_coords = crds
				if(this.draw_object['figure']!='line'){
					console.error('Object is not a line in set-line-point!')
					return false;
				}
				if( new_coords.length < 2 ){
					console.error('Incorrect number of coordinates in set-line-point!')
					return false;
				}
				this.draw_object[ 'poi' ][ pos ] = new_coords;
			},
			this.setArcAttr = function( rad , sa , se ) {

				var	radius = rad || drawing['radius'];
					sangle = sa || drawing['sangle'];
					eangle = se || drawing['eangle'];

				if(this.draw_object['figure']!='arc'){
					console.error('Object is not a line in set-arc-attr!')
					return false;
				}
				drawing['radius'] = radius;
				drawing['sangle'] = sangle;
				drawing['eangle'] = eangle;

			},
			this.getSpeed = function( ) {

				var speed = 0;
				if ( queuevel.length <= 0 ){
					queuevel.push(this.x)
					queuevel.push(this.y)
				}else{
					speed = Math.sqrt( Math.pow( this.x - queuevel[ 0 ] , 2 ) + Math.pow( this.y - queuevel[ 1 ] , 2 ) ) ;
					queuevel.pop() , queuevel.pop();
					queuevel.push( this.x ) , queuevel.push( this.y );
				}
				return speed;
			},
			this.setSize = function( sz ) {

				if ( this.draw_object['figure'].indexOf( 'circle' ) != -1)
					this.draw_object['radius'] = sz;
				else if ( this.draw_object['figure'].indexOf( 'rectangle' ) != -1){
					
					if ( sz.length < 2 ) { console.error('Incorrect size in set-size!'); return false; }
					this.draw_object['width'] = sz[0]
					this.draw_object['height'] = sz[1]
				}
			},
			this.setFillColor = function( color ) {

				this.draw_object['fill-color'] = color;
			},
			this.getFillColor = function() {

				return this.draw_object['fill-color'];
			},
			this.impulse = function( spd, ang , frt ) {

				this.speed += spd;
				this.angle = ang;
				friction = frt;
				this.x += this.speed * Math.cos( this.angle );
				this.y += this.speed * Math.sin( this.angle );
			},
			this.getElementContext = function() {

				return this.context
			},
			this.locate = function( xob , yob ) {

				var dx = 0, 
					dy = 0;
	            dx = xob - this.x;
	            dy = yob - this.y;
	            xgoes = dx / Math.abs( dx ); 
	            ygoes = dy / Math.abs( dy );
	            this.angle = Math.atan( Math.abs( dy ) / Math.abs( dx ) )
	            dist = Math.sqrt( Math.pow( dx , 2 ) + Math.pow( dy , 2 ) );
	            alfa = ( Math.PI / 2 ) + ( ygoes * this.angle );
	            alfa = xgoes * alfa;
	            xobjective = xob;
	            yobjective = yob;
		        this.draw_object[ 'angle' ] = this.angle
			},
			this.move = function() {

				this.x += this.speed * Math.cos( this.angle );
				this.y += this.speed * Math.sin( this.angle );
				this.speed -= friction;
				this.draw_object[ 'angle' ] = this.angle
				
			},
			this.follow = function( objs , sz ) {

				var xcomp = -0.5, 
		            ycomp = -0.5, 
		            objectivechange = false, 
		            p = false,
		            q = false,
		            xcompobj = 1, 
		            ycompobj = 1,
		            cornerx1 = 0, 
		            cornerx2 = 0, 
		            cornery1 = 0, 
		            cornery2 = 0, 
		            xobject1 = 0,
					yobject1 = 0,
					xobject2 = 0,
					yobject2 = 0,
					beta = 0,
					xe1 = 0,
					ye1 = 0,
					xe2 = 0,
					ye2 = 0,
					xce1 = 0,
					xce2 = 0,
					yce1 = 0,
					yce2 = 0,
					ewidth = 0,
					eheight = 0,
					hypotenuse = 0,
					deterx = 0,
					detery = 0,
		            k1 = 1, 
		            k2 = 2,
		            size = sz || this.draw_object['radius'] || 0;
		            
		        xtemporalobj = xobjective;
		        ytemporalobj = yobjective;
		        	
					if( dist > 0 ) {

		               	xspeed = ( xgoes * Math.cos( this.angle ) * this.speed );
						yspeed = ( ygoes * Math.sin( this.angle ) * this.speed );
						
		                for ( ind in objs ) {

		                    xobject1 = objs[ ind ].x, yobject1 = objs[ ind ].y;
		                    
							ewidth = objs[ ind ].draw_object[ 'width' ] || 0;
							eheight = objs[ ind ].draw_object[ 'height' ] || 0;

		                    xcomp = this.x + ( xgoes * size );
		                    ycomp = this.y + ( ygoes * size );
							xobject2 = xobject1 + ewidth;
							yobject2 = yobject1 + eheight;
		                    this.xtest = xcomp
		                    this.ytest = ycomp

							p = ( xcomp - xobject1 ) * ( xobject2 - xcomp ) > 0;
							p = p && ( ycomp - yobject1 ) * ( yobject2 - ycomp ) > 0;
		                    if ( p ) {

	                            this.y -= ( ygoes * Math.sin( this.angle ) * this.speed );
	                            cornerx2 = ( Math.abs( xgoes + k1 ) / k2 ) * xobject2;
	                            cornerx1 = ( Math.abs( xgoes - k1 ) / k2 ) * xobject1;
	                            xcompobj = cornerx2 + cornerx1;
	                            ytemporalobj = this.y - ygoes;
	                            xtemporalobj = xcompobj + ( xgoes * size );
			                    xcomp = this.x + ( xgoes * size );
			                    ycomp = this.y + ( ygoes * size );
	                            dodge = objectivechange = true;
			                        
		                    }

		                    q = ( ycomp - yobject1 ) * ( yobject2 - ycomp ) > 0;
		                    q = q && ( xcomp - xobject1 ) * ( xobject2 - xcomp ) > 0;
		                    if ( q ) {

	                            this.x -= ( xgoes * Math.cos( this.angle ) * this.speed );
	                            cornery2 = ( Math.abs( ygoes + k1 ) / k2 ) * yobject2;
	                            cornery1 = ( Math.abs( ygoes - k1 ) / k2 ) * yobject1;
	                            ycompobj = cornery2 + cornery1;
	                            xtemporalobj = this.x - xgoes;
	                            ytemporalobj = ycompobj + ( ygoes * size );
	                            dodge = objectivechange = true;
					                
		                    }
		                }

		                if( objectivechange ) {
		                    this.dx = xtemporalobj - this.x;
		                    this.dy = ytemporalobj - this.y;
		                    dist = Math.sqrt( Math.pow( this.dx , 2 ) + Math.pow( this.dy , 2 ) );
		                    xgoes = this.dx / Math.abs( this.dx );
		                    ygoes = this.dy / Math.abs( this.dy );
		                    this.angle = Math.atan( Math.abs( this.dy ) / Math.abs( this.dx ) )
		                    alfa = ( Math.PI / 2 ) + ( ygoes * this.angle );
		                    alfa = xgoes * alfa;
		                }

		                dist -= this.speed;
		                this.x += ( xgoes * Math.cos( this.angle ) * this.speed );
		                this.y += ( ygoes * Math.sin( this.angle ) * this.speed );
		            }else{

		            	if( dodge ) {

			                    this.locate( xobjective , yobjective );
			                    dodge = false;
			            }
		            }
		            this.draw_object[ 'angle' ] = this.angle
		            
			},
			this.shapeCollision = function( objs ) {

				var fig = this.draw_object['figure'];
				var x1 = this.x, 
					y1 = this.y,
					spd = 0,
					x2 = 0,
					y2 = 0,
					xe1 = 0,
					ye1 = 0,
					xe2 = 0,
					ye2 = 0,
					xc1 = 0,
					xc2 = 0,
					yc1 = 0,
					yc2 = 0,
					xce1 = 0,
					xce2 = 0,
					yce1 = 0,
					yce2 = 0,
					xcor1 = 0,
					xcor2 = 0,
					ycor1 = 0,
					ycor2 = 0,
					xaux = 0,
					yaux = 0,
					m1 = 0,
					m2 = 0,
					ma = 0,
					mb = 0,
					mc = 0,
					md = 0,
					radius = 0,
					width = this.draw_object['width'] || this.draw_object['swidth'] || 0;
					height = this.draw_object['height'] || this.draw_object['sheight'] || 0;
					beta = 0,
					xspa = 0,
					yspa = 0,
					flag = false,
					p = false,
					q = false,
					r = false,
					s = false,
					hypotenuse = 0,
					deterx = 0,
					detery = 0,
					subang = 0,
					iscircl = this.draw_object['figure'].indexOf( 'circle' ) != -1,
					isrectl = this.draw_object['figure'].indexOf( 'rectangle' ) != -1,
					isline = this.draw_object['figure'].indexOf( 'line' ) != -1,
					touched = [],
					coords = [];

				for ( ind in objs ) {

					xe1 = objs[ ind ].x, ye1 = objs[ ind ].y;
					iscirce = objs[ ind ].draw_object[ 'figure' ].indexOf( 'circle' ) != -1;
					isrecte = objs[ ind ].draw_object[ 'figure' ].indexOf( 'rectangle' ) != -1;
					islinee = objs[ ind ].draw_object[ 'figure' ].indexOf( 'line' ) != -1;

					if ( iscircl && iscirce ){

						radius = this.draw_object['radius'];
						deterx = Math.abs( x1 - xe1 );
						detery = Math.abs( y1 - ye1 );
						beta = Math.atan( detery / deterx );
						xspa = ( x1 - xe1 ) / Math.abs( x1 - xe1 );
						yspa = ( y1 - ye1 ) / Math.abs( y1 - ye1 );
						x2 = x1 - ( xspa * ( radius * Math.cos( beta ) ) );
						y2 = y1 - ( yspa * ( radius * Math.sin( beta ) ) );
						radius = objs[ ind ].draw_object['radius'];
						hypotenuse = Math.sqrt( Math.pow( xe1 - x2 , 2 ) + Math.pow( ye1 - y2 , 2 ) );
						flag = hypotenuse <= radius;
						
					}else if ( isrectl && isrecte ){
						
						ewidth = objs[ind].draw_object['width'] || 0;
						eheight = objs[ind].draw_object['height'] || 0;

						deterx = xe1 + ( ewidth / 2 );
						detery = ye1 + ( eheight / 2 );

						beta = Math.atan( ( detery - ye1 ) / ( deterx - xe1 ) );
						hypotenuse = Math.sqrt( Math.pow( ewidth / 2 , 2 ) + Math.pow( eheight / 2 , 2 ) );

						xe1 = deterx - hypotenuse * Math.cos( objs[ind].angle + beta );
						ye1 = detery - hypotenuse * Math.sin( objs[ind].angle + beta );
						xe2 = deterx + hypotenuse * Math.cos( objs[ind].angle + beta );
						ye2 = detery + hypotenuse * Math.sin( objs[ind].angle + beta );

						xce1 = deterx + hypotenuse * Math.cos( beta - objs[ind].angle );
						yce1 = detery - hypotenuse * Math.sin( beta - objs[ind].angle );
						xce2 = deterx - hypotenuse * Math.cos( beta - objs[ind].angle );
						yce2 = detery + hypotenuse * Math.sin( beta - objs[ind].angle );

						ma = Math.atan( ( yce1 - ye2 ) / ( xce1 - xe2 ) );
						mb = Math.atan( ( yce1 - ye1 ) / ( xce1 - xe1 ) );
						mc = ma;
						md = mb;

						deterx = x1 + ( width / 2 );
						detery = y1 + ( height / 2 );
						beta = Math.atan( ( detery - y1 ) / ( deterx - x1 ) );
						hypotenuse = Math.sqrt( Math.pow( width / 2 , 2 ) + Math.pow( height / 2 , 2 ) );

						x1 = deterx - hypotenuse * Math.cos( this.angle + beta );
						y1 = detery - hypotenuse * Math.sin( this.angle + beta );
						x2 = deterx + hypotenuse * Math.cos( this.angle + beta );
						y2 = detery + hypotenuse * Math.sin( this.angle + beta );

						xc1 = deterx + hypotenuse * Math.cos( beta - this.angle );
						yc1 = detery - hypotenuse * Math.sin( beta - this.angle );
						xc2 = deterx - hypotenuse * Math.cos( beta - this.angle );
						yc2 = detery + hypotenuse * Math.sin( beta - this.angle );

						coords.push( [x1,y1], [x2,y2], [xc1,yc1], [xc2,yc2] )

						xcor1 = Math.abs( xe1 - xe2 ) >= Math.abs( xce1 - xce2 ) ? xe1 : xce1;
						xcor2 = Math.abs( xe1 - xe2 ) >= Math.abs( xce1 - xce2 ) ? xe2 : xce2;
						ycor1 = Math.abs( ye1 - ye2 ) >= Math.abs( yce1 - yce2 ) ? ye1 : yce1;
						ycor2 = Math.abs( ye1 - ye2 ) >= Math.abs( yce1 - yce2 ) ? ye2 : yce2;
						
						closeness = ( ma != 0 ) ? 1 - ( ( Math.PI / 2 ) / ma % ( Math.PI / 2 ) ) / 100 : 0.15;
						closenessb = ( mb != 0 ) ? 1 - ( ( Math.PI / 2 ) / mb % ( Math.PI / 2 ) ) / 100 : 0.15;
						closeness -= 0.041;
						closenessb -= 0.041;

						/*Correction for the comparison*/
						m1 += Number( ma == 0 ) + Number( mb == 0 );
						m2 += Number( ma == 0 ) + Number( mb == 0 );
						mb += Number( mb == 0 );
						ma += Number( ma == 0 );

						for( cr in coords ){

							xaux = coords[ cr ][ 0 ];
							yaux = coords[ cr ][ 1 ];
							
							m1 = Math.atan( ( yce1 - yaux ) / ( xce1 - xaux ) );
							m2 = Math.atan( ( yce2 - yaux ) / ( xce2 - xaux ) );
							r = ( yaux - ycor1 ) * ( ycor2 - yaux ) > 0;
							r = r && ( xaux - xcor1 ) * ( xcor2 - xaux ) > 0;

							if( r ) {

								p =  ( m1 / ma >= closeness && m1 / ma <= 1 ) || ma / m1 >= closeness && ma / m1 <= 1;
								p =  p || ( m1 / mb >= closenessb && m1 / mb <= 1 ) || mb / m1 >= closenessb && mb / m1 <= 1;
								q =  ( m2 / mb >= closenessb && m2 / mb <= 1 ) || mb / m2 >= closenessb && mb / m2 <= 1;
								q =  q || ( m2 / ma >= closeness && m2 / ma <= 1 ) || ma / m2 >= closeness && ma / m2 <= 1;
								flag = p || q;

								if( flag )
									break;
							}
						}

						coords = [];

						ma = Math.atan( ( yc1 - y2 ) / ( xc1 - x2 ) );
						mb = Math.atan( ( yc1 - y1 ) / ( xc1 - x1 ) );
						mc = ma;
						md = mb;

						coords.push( [xe1,ye1], [xe2,ye2], [xce1,yce1], [xce2,yce2] )

						xcor1 = Math.abs( x1 - x2 ) >= Math.abs( xc1 - xc2 ) ? x1 : xc1;
						xcor2 = Math.abs( x1 - x2 ) >= Math.abs( xc1 - xc2 ) ? x2 : xc2;
						ycor1 = Math.abs( y1 - y2 ) >= Math.abs( yc1 - yc2 ) ? y1 : yc1;
						ycor2 = Math.abs( y1 - y2 ) >= Math.abs( yc1 - yc2 ) ? y2 : yc2;
						
						closeness = ( ma != 0 ) ? 1 - ( ( Math.PI / 2 ) / ma % ( Math.PI / 2 ) ) / 100 : 0.15;
						closenessb = ( mb != 0 ) ? 1 - ( ( Math.PI / 2 ) / mb % ( Math.PI / 2 ) ) / 100 : 0.15;
						closeness -= 0.041;
						closenessb -= 0.041;

						/*Correction for the comparison*/
						m1 += Number( ma == 0 ) + Number( mb == 0 );
						m2 += Number( ma == 0 ) + Number( mb == 0 );
						mb += Number( mb == 0 );
						ma += Number( ma == 0 );

						for( cr in coords ){

							xaux = coords[ cr ][ 0 ];
							yaux = coords[ cr ][ 1 ];
							
							m1 = Math.atan( ( yc1 - yaux ) / ( xc1 - xaux ) );
							m2 = Math.atan( ( yc2 - yaux ) / ( xc2 - xaux ) );
							r = ( yaux - ycor1 ) * ( ycor2 - yaux ) > 0;
							r = r && ( xaux - xcor1 ) * ( xcor2 - xaux ) > 0;
							
							if( r ) {

								p =  ( m1 / ma >= closeness && m1 / ma <= 1 ) || ma / m1 >= closeness && ma / m1 <= 1;
								p =  p || ( m1 / mb >= closenessb && m1 / mb <= 1 ) || mb / m1 >= closenessb && mb / m1 <= 1;
								q =  ( m2 / mb >= closenessb && m2 / mb <= 1 ) || mb / m2 >= closenessb && mb / m2 <= 1;
								q =  q || ( m2 / ma >= closeness && m2 / ma <= 1 ) || ma / m2 >= closeness && ma / m2 <= 1;
								flag = flag || ( p || q );

								if( flag )
									break;
							}
						}
								
						coords = [];
						deterx = 0, detery = 0;
					}
					
					x1 = this.x , y1 = this.y ;

					if( flag )
						touched.push( parseInt( ind ) + 1 );
				}
				return touched;
			},
			this.pointCollision = function( ) {

				var fig = this.draw_object['figure'];
				var x1 = this.x,
					y1 = this.y,
					x2 = 0,
					y2 = 0,
					xc1 = 0,
					yc1 = 0,
					xc2 = 0,
					yc2 = 0,
					xcor1 = 0,
					ycor1 = 0,
					xe1 = 0,
					ye1 = 0,
					hypotenuse = 0,
				    radius = this.draw_object[ 'radius' ] || 0,
					width = this.draw_object[ 'width' ] || 0,
					height = this.draw_object[ 'height' ] || 0,
					angle = this.angle,
					beta = 0,
					m1 = 0,
					ma = 0,
					mb = 0,
					mc = 0,
					md = 0,
					p = false,
					q = false,
					r = false,
					s = false,
					flag = false,
					speed = 0,
					iscircl = this.draw_object['figure'].indexOf( 'circle' ) != -1,
					isrectl = this.draw_object['figure'].indexOf( 'rectangle' ) != -1,
					isline = this.draw_object['figure'].indexOf( 'line' ) != -1,
					touched = [],
					coords = this.draw_object['poi'] || [];

				for ( ind in arguments ){

					if( arguments[ind].length != 2){
						console.error('Invalid amount of coordinates!')
						return false;
					}
					xe1 = arguments[ ind ][0] , ye1 = arguments[ ind ][1];

					if ( iscircl ){

						deterx = Math.abs( x1 - xe1 );
						detery = Math.abs( y1 - ye1 );
						beta = Math.atan( detery / deterx );
						xspa = ( x1 - xe1 ) / Math.abs( x1 - xe1 );
						yspa = ( y1 - ye1 ) / Math.abs( y1 - ye1 );
						x2 = x1 - ( xspa * ( radius * Math.cos( beta ) ) );
						y2 = y1 - ( yspa * ( radius * Math.sin( beta ) ) );
						hypotenuse = Math.sqrt( Math.pow( xe1 - x2 , 2 ) + Math.pow( ye1 - y2 , 2 ) );
						spd = this.getSpeed();
						flag = hypotenuse <= 1;
							

					}else if( isrectl ){

						/*Calculate the points of the rectangle (for rotating)*/
						xcor1 = x1 + ( width / 2 );
						ycor1 = y1 + ( height / 2 );
						beta = Math.atan( ( ycor1 - y1 ) / ( xcor1 - x1 ) );
						hypotenuse = Math.sqrt( Math.pow( width / 2 , 2 ) + Math.pow( height / 2 , 2 ) );
						x1 = xcor1 - hypotenuse * Math.cos( angle + beta );
						y1 = ycor1 - hypotenuse * Math.sin( angle + beta );
						x2 = xcor1 + hypotenuse * Math.cos( angle + beta );
						y2 = ycor1 + hypotenuse * Math.sin( angle + beta );
						
						xc1 = xcor1 + hypotenuse * Math.cos( beta - angle );
						yc1 = ycor1 - hypotenuse * Math.sin( beta - angle );
						xc2 = xcor1 - hypotenuse * Math.cos( beta - angle );
						yc2 = ycor1 + hypotenuse * Math.sin( beta - angle );
						/*Find slopes*/
						ma =  Math.atan( ( yc1 - y1 ) / ( xc1 - x1 ) ) ;
						mb =  Math.atan( ( yc2 - y1 ) / ( xc2 - x1 ) ) ;
						mc = ma;
						md = mb;
						m1 =  Math.atan( ( yc1 - ye1 ) / ( xc1 - xe1 ) ) ;
						m2 =  Math.atan( ( yc2 - ye1 ) / ( xc2 - xe1 ) ) ;

						closeness = ( ma != 0 ) ? 1 - ( ( Math.PI / 2 ) / ma % ( Math.PI / 2 ) ) / 100 : 0.15;
						closenessb = ( mb != 0 ) ? 1 - ( ( Math.PI / 2 ) / mb % ( Math.PI / 2 ) ) / 100 : 0.15;
						closeness -= 0.04;
						closenessb -= 0.04;
						/*Correction for the comparison*/
						m1 += Number( ma == 0 ) + Number( mb == 0 );
						m2 += Number( ma == 0 ) + Number( mb == 0 );
						mb += Number( mb == 0 );
						ma += Number( ma == 0 );
						/*The slopes must be similar in a 90% or greater*/
						p =  ( m1 / ma >= closeness && m1 / ma <= 1 ) || ma / m1 >= closeness && ma / m1 <= 1;
						p =  p || ( m1 / mb >= closenessb && m1 / mb <= 1 ) || mb / m1 >= closenessb && mb / m1 <= 1;
						q =  ( m2 / mb >= closenessb && m2 / mb <= 1 ) || mb / m2 >= closenessb && mb / m2 <= 1;
						q =  q || ( m2 / ma >= closeness && m2 / ma <= 1 ) || ma / m2 >= closeness && ma / m2 <= 1;
						
						xc1 = Math.abs( x1 - x2 ) >= Math.abs( xc1 - xc2 ) ? x1 : xc1;
						xc2 = Math.abs( x1 - x2 ) >= Math.abs( xc1 - xc2 ) ? x2 : xc2;
						yc1 = Math.abs( y1 - y2 ) >= Math.abs( yc1 - yc2 ) ? y1 : yc1;
						yc2 = Math.abs( y1 - y2 ) >= Math.abs( yc1 - yc2 ) ? y2 : yc2;
							
						if ( p || q ){
							s = ( ye1 - yc1 ) * ( yc2 - ye1 ) > 0;
							s = s && ( xe1 - xc1 ) * ( xc2 - xe1 ) > 0;
							flag = s;
						}
					}
					else if ( isline ){

						for ( cr in coords ){
							
							x2 = coords[ cr ][ 0 ];
							y2 = coords[ cr ][ 1 ];

							ma = Math.abs( Math.atan( ( y2 - y1 ) / ( x2 - x1 ) ) );
							m1 = Math.abs( Math.atan( ( y2 - ye1 ) / ( x2 - xe1 ) ) );

							p = ( ye1 - y1 ) * ( y2 - ye1 ) > 0;
							p = p && ( xe1 - x1 ) * ( x2 - xe1 ) > 0;

							if( ma == 0 || ma == ( Math.PI / 2 ) ){

								p = ( ye1 - y1 ) * ( y2 - ye1 ) > 0;
								p = p || ( xe1 - x1 ) * ( x2 - xe1 ) > 0;

							}
							/*Correction for the comparison*/
							closeness = ( ma != 0 && ma != ( Math.PI / 2 ) ) ? 1 - ( ( Math.PI / 2 ) / ( ma % ( Math.PI / 2 ) ) ) / 100 : 1;
							closeness -= 0.03
							m1 += Number( ma == 0 );
							ma += Number( ma == 0 );

							if( p ) {

								flag = ( m1 / ma >= closeness && m1 / ma <= 1 ) || ( ma / m1 >= closeness && ma / m1 <= 1 );
								break;
							}

							x1 = coords[ cr ][ 0 ];
							y1 = coords[ cr ][ 1 ];
						}
					}

					if( flag )
						touched.push( parseInt( ind ) + 1 );

				}
				return touched;
			},
			this.setImage = function( obj ) {

				if( typeof obj != 'object'){
					console.error('Invalid input argument in set-image');
					return false;
				}
				if( typeof obj['src'] != 'string' || obj['src'] == 'undefined'){
					console.error('Invalid input argument in set-image');
					return false;
				}
				/*Constrution of the image object*/
				this.draw_object['figure'] = 'image';
				this.draw_object['img'] = Thing.methods.createImageObject( obj['src'] );
				this.draw_object['width'] = obj['width'];
				this.draw_object['height'] = obj['height'];
				this.draw_object['sx'] = obj['sx'] || 0;
				this.draw_object['sy'] = obj['sy'] || 0;
				this.draw_object['angle'] = obj['angle'] || obj['deg'] * torad || 0;
				this.draw_object['swidth'] = obj['swidth'] || obj['width'];
				this.draw_object['sheight'] = obj['sheight'] || obj['height'];
			},
			this.initialFrame = function( fr ) {

				if(this.draw_object['figure'] != 'sprite'){
					console.error('This is not a Sprite in display-row')
					return false
				}
				if(isNaN(fr)){
					console.error('This frame must be a number in display-row')
					return false
				}
				var columns = this.draw_object['width'] / this.draw_object['swidth'], 
					rows =  this.draw_object['height'] / this.draw_object['sheight'],
					sx = this.draw_object['sx'],
					sy = this.draw_object['sy'];

				initfrx = ( fr % columns ) * ( this.draw_object['swidth'] )
				initfry = Math.floor( fr / rows ) * ( this.draw_object['sheight'] )
				/*this.draw_object['sx'] = ( initfrx + 1 );
				this.draw_object['sy'] = initfry*/
				this.draw_object['sxi'] = ( initfrx );
				this.draw_object['syi'] = initfry
				sprframe = fr;
				initframe = fr;
				
			},
			this.endFrame = function( fr ) {

				if(this.draw_object['figure'] != 'sprite'){
					console.error('This is not a Sprite in display-row')
					return false
				}
				if(isNaN(fr)){
					console.error('This frame must be a number in display-row')
					return false
				}
				this.draw_object['frames'] = fr;
			},
			this.setSprite = function( obj ) {

				if( typeof obj != 'object'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				if( typeof obj['src'] != 'string' || obj['src'] == 'undefined'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				if( typeof obj['width'] != 'number' || obj['width'] == 'undefined'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				if( typeof obj['height'] != 'number' || obj['height'] == 'undefined'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				if( typeof obj['wcut'] != 'number' || obj['wcut'] == 'undefined'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				if( typeof obj['hcut'] != 'number' || obj['hcut'] == 'undefined'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				if( typeof obj['frames'] != 'number' || obj['frames'] == 'undefined'){
					console.error('Invalid input argument in set-sprite');
					return false;
				}
				/*Constrution of the image object*/
				this.draw_object['figure'] = 'sprite';
				this.draw_object['img'] = Thing.methods.createImageObject( obj['src'] );
				this.draw_object['width'] = obj['width'];
				this.draw_object['height'] = obj['height'];
				this.draw_object['swidth'] = obj['wcut'];
				this.draw_object['sheight'] = obj['hcut'];
				this.draw_object['columns'] = obj['columns'];
				this.draw_object['rows'] = obj['rows'];
				this.draw_object['frames'] = obj['frames'];
				this.draw_object['sx'] = obj['sx'] || obj['wcut'];
				this.draw_object['sy'] = obj['sy'] || obj['hcut'];
				this.draw_object['sxi'] = obj['sx'] || obj['wcut'];
				this.draw_object['syi'] = obj['sy'] || obj['hcut'];
				this.draw_object['angle'] = obj['angle'] || obj['deg'] * torad || 0;

			},
			this.animateSprite = function( anm ) {
				
				anm = (anm === undefined) ? true : anm;
				/*Set the coordinates and offset coordinates*/
				var sx = this.draw_object['sx'],
					sy = this.draw_object['sy'],
					wcut = this.draw_object['swidth'],
					hcut = this.draw_object['sheight'],
					width = this.draw_object['width'],
					height = this.draw_object['height'],
					columns = this.draw_object['columns'],
					rows = this.draw_object['rows'],
					frames = this.draw_object['frames'];
				
		        sx += wcut;
		        sy += ( Math.floor( sx / ( width - wcut ) ) * ( hcut ) );
		        
		        if ( sx >= ( width - wcut ) )
        			sx = this.draw_object['sxi'];
		        if ( sy >= ( height - hcut ) )
        			sy = this.draw_object['syi'];
        		if( sprframe >= frames ) { 
					sx = this.draw_object['sxi']; 
					sy = this.draw_object['syi']; 
					sprframe = initframe;
				}
			    if( anm ){
			        this.draw_object['sx'] = sx;
			        this.draw_object['sy'] = sy;
			    }
			    sprframe++;
			},
			this.hide = function() {
				hidden = true;
			},
			this.show = function() {
				hidden = false;
			}
		}
	};

	return {

			setEnvironment : function( env ) {

				var element = null,
					same = '',
					index = 'body',
					nth = 0;

				if ( typeof env !== 'object' ) {

					console.error('Incorrect data type sent in set-enviroment')
					return false;

				}
				
				if ( env['canvas'] != 'undefined' && env['canvas'] != '' ) {
					/*Must follow the structure of selection*/
					same = selexpr.exec( env['canvas'] );

					if ( same != null){
						/*Clean the selector*/
						env['canvas'] = env['canvas'].replace( /[|&;$%@"<>()=!?*{}+,\s]/g , "" );

						/*Update the enviroment object*/
						env['canvas'] = env['canvas'].split( ":" );

						switch ( env['canvas'][0] ){
							/*Determine the canvas selection*/
							case 'id':
								element = document.getElementById( env['canvas'][1] );
								break;
							case 'class':
								element = document.getElementsByClassName( env['canvas'][1] )[0];
								break;
							case 'nth':
								nth = parseInt(env['canvas'][1]);

								if(!isNaN(nth))
									element = document.getElementsByTagName( 'canvas' )[nth - 1];
								else
									console.error('The nth selector must be a number')
								break;
							default:
								console.error('Something is clearly wrong!');
								return false;
						}

						if ( element == null ) {

							console.error('Canvas element must exist!');
							return false;
						}

						index = env['canvas'][0]+"_"+env['canvas'][1];

					}else {
						/*This happens if the selector doesn't match the regular expression*/
						console.error('Invalid stynax selector in set-enviroment');
						return false;
					}	
				}
				return new Environment( element, env );				
			},
			createThing : function( thing ) {

				if( typeof thing !== 'object' ) {

					console.error('Incorrect data type sent in create-thing')
					return false;
				}

				return new Thing ( thing );
			},
			random : function( ini , fin ) {

				if( isNaN(ini) ){

					console.error('Incorrect data type sent in random')
					return false;
				}
				if( isNaN(fin) ){

					console.error('Incorrect data type sent in random')
					return false;
				}

				var number = Math.random();
				fin -= ini;
				fin *= number;
				return ini + fin;
			},
			randomInPortions : function( ini , fin ) {

				if( typeof ini !== 'object' ){

					console.error('Incorrect data type sent in random-in-portions')
					return false;
				}
				if( typeof fin !== 'object' ){

					console.error('Incorrect data type sent in random-in-portions')
					return false;
				}
				if( fin.length != ini.length ){

					console.error('Incorrect missmatch of array length in random-in-portions')
					return false;
				}
				var pos = Math.round( Math.random() * ( ini.length - 1 ) ),
					number = Math.random();
				fin[pos] -= ini[pos];
				fin[pos] *= number;
				return ini[pos] + fin[pos];
			},
			shuffle : function( arr ) {

				var elm = 0,
					stack = [];
				while ( arr.length > 0 ) {

					elm = Math.round( Math.random() * ( arr.length - 1 ) );
					stack.push( arr[ elm ] );
					arr.splice( elm , 1 );
				}
				return stack;
			}
	}

})();
//document.write('Thanks God')