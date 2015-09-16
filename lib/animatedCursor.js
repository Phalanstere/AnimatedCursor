/*
 * ©2015 Phalanstere
 */

/**
 * @parameter     AnimatedCursor
  *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 */

var AnimatedCursor = function AnimatedCursor(params)
	{
	"use strict";
	var self = this;
	
	// adds a canvas if there is none
  // this function takes the div and creates a canvas inside
  this.create_canvas = function() {
    
		var w,h, node, cv, x;   
      
		w = self.div.scrollWidth;
		h = self.div.scrollHeight;   
		node = self.div;
		cv = document.createElement("canvas");
		cv.width	= params.width;
		cv.height	= params.height;
		
		if (!node.id)  cv.id = "body_canvas";
		else cv.id     = node.id + "_canvas";
         
       x = document.getElementById(cv.id);
       if (! x) {    
           node.appendChild(cv);        
           self.canvas = document.getElementById(cv.id);
           if (self.canvas) {
            self.context = self.canvas.getContext('2d');       
            }
        }
        else {
           self.canvas = x; 
           self.context = self.canvas.getContext('2d'); 
        }
            
	};
	
	

	
	

	// sets the default values for the crosshair obects
	this.defaultConfig = function defaultConfig(params) {
		var el,x,y;
		
		params.type				= params.type || "crosshair";
		params.width			= params.width || 50;
		params.height			= params.height || 50;
		params.gap				= params.gap || 8;
		params.strokeWidth		= params.strokeWidth || 2;
		params.color			= params.color || "green";
		params.centered			= true;
		params.x				= params.x || parseInt( (self.canvas.width / 2) - (params.width/2), 10);
		params.y				= params.y || parseInt( self.canvas.height / 2  - (params.height/2), 10);
		params.following		= params.following || false;		
		
		params.id				= params.div + "_canvas";
		
		if (params.following === true) {
			
			params.el = document.getElementById(params.id);		
			
			el = document.getElementById(params.div);
			if ( !el) { el = document.body; }
			
			params.el.style.position = "absolute";
			params.el.style.cursor 	 = "none";
			
			el.onmousemove=function(ev){ 
					x = ev.clientX - params.width*0.5 -8;
					y = ev.clientY - params.height*0.5 - 8;
					
					params.el.style.left	= x + "px";				 				  
					params.el.style.top		= y + "px";
		
				  };			
		}
		
		if (params.callback) {

			params.el = document.getElementById(params.id);		
			params.el.onclick=function(){ 
				  params.callback.call();

				  };
			
			}
				
		return params;
		
	};


	this.scale	= function scale(factor) {
		var ctx = self.context;
		ctx.scale(factor,factor);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	};


	this.paint = function() {
		
		var ctx				= self.context, obj = self.obj, matrix, gap = params.gap, tmp1, tmp2, size;
		
		
		switch(self.obj.type)
			{
			case "cross":			
				ctx.fillStyle	= obj.color;
				tmp1			= obj.x+obj.width/2 - obj.size/2;
				tmp2			= obj.y;
				ctx.fillRect(tmp1, tmp2, obj.size, obj.height);
				
				tmp1	= obj.x;
				tmp2    = obj.y + obj.height/2 - obj.size/2;
				ctx.fillRect(tmp1, tmp2, obj.width, obj.size);
				
			break;	
				
			case "search":				
				ctx.fillStyle	= obj.color;
				ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
				ctx.clearRect(obj.x + obj.strokeWidth, obj.y + obj.strokeWidth, obj.width - obj.strokeWidth*2, obj.height - obj.strokeWidth*2);
				
				tmp1	= obj.x+obj.width/2-obj.gap/2;
				tmp2    = obj.y;
				size	= obj.gap;
				ctx.clearRect(tmp1, tmp2, size, obj.height);				
				
				tmp1	= obj.x;
				tmp2	= obj.y + obj.height/2 - obj.gap/2;
				ctx.clearRect(tmp1, tmp2, obj.width, size);					
			break;	
			
			case "crosshair":
				
				ctx.fillStyle	= obj.color;
				ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
				ctx.clearRect(obj.x + obj.strokeWidth, obj.y + obj.strokeWidth, obj.width - obj.strokeWidth*2, obj.height - obj.strokeWidth*2);
				
				tmp1	= obj.x;
				tmp2    = obj.y;
				size	= obj.gap;
				ctx.clearRect(tmp1, tmp2, size, size);


				tmp1	= obj.x + obj.width - obj.gap;
				tmp2    = obj.y;
				size	= obj.gap;
				ctx.clearRect(tmp1, tmp2, size, size);
				

				tmp1	= obj.x + obj.width - obj.gap;
				tmp2    = obj.y + obj.height - obj.gap;
				size	= obj.gap;
				ctx.clearRect(tmp1, tmp2, size, size);



				tmp1	= obj.x;
				tmp2    = obj.y + obj.height - obj.gap;
				size	= obj.gap;
				ctx.clearRect(tmp1, tmp2, size, size);	
			break;
			
			
			case "lens":
				ctx.beginPath();
				ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI, false);
				ctx.stroke();	
				ctx.closePath();
				
				ctx.beginPath();
				ctx.arc(obj.x, obj.y, obj.innerRadius, 0, 2 * Math.PI, false);
				ctx.stroke();		
				ctx.closePath();					    
			break;	
		}		
	};
	
	
	this.init = function init() {	
		if (! params){ params = {}; }	
		
		if (! params.div)  {
			self.div = document.body; 
			params.div = "body"; 
			}
	
		self.create_canvas();	
		self.defaultConfig(params);
		
		self.obj = params;
		self.paint();
	

		
		};
		
	self.init();	
	};
