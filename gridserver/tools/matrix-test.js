/*
var sylvester = require('sylvester'),  
	Matrix = sylvester.Matrix,  
	Vector = sylvester.Vector;  

var deg2rad = 2*Math.PI/360;


var a=$V([
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0],
	[0,0,1,0,0]
	]
);

var angleDEG=45;
var rad=deg2rad * (angleDEG-90);

//console.log(a);

var rot=Matrix.Rotation(rad);

console.log(a.multiply(rot));

c=a.dot(rot);

console.log(c);
*/

var deg2rad = Math.PI/180;
/*
x1=90;
y1=100;

angleDEG=0;
rad=deg2rad * (angleDEG);

px=100;
py=100;

x2 = px + (x1 - px) * Math.cos(rad) + (y1 - py) * Math.sin(rad);
y2 = py + (y1 - py) * Math.sin(rad) - (x1 - px) * Math.cos(rad); 

console.log(x1,y1);
console.log(x2,y2);
*/

console.log(rotatePoints(-1,0,180));


function rotatePoints(x,y,angle){
   angle=angle*deg2rad;
   var point={};
   point.x = Math.round(x*Math.cos(angle) - y*Math.sin(angle));
   point.y = Math.round(x*Math.sin(angle) + y*Math.cos(angle));
   return point;
}



/*

p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox

p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy

*/