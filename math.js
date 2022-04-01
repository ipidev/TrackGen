"use strict";

//-----------------------------------------------------------------------------
// Vector
//-----------------------------------------------------------------------------

let debugAssert = console.assert;

class Vector2D
{
	constructor(x, y)
	{
		this.x = x ? x : 0.0;
		this.y = y ? y : 0.0;
	}
	
	//Mutators
	Set(x, y)
	{
		debugAssert(typeof x === "number", "x must be a number");
		debugAssert(typeof y === "number", "x must be a number");
		this.x = x;
		this.y = y;
	}
	
	Copy(other)
	{
		debugAssert(other instanceof Vector2D, "other must be a Vector2D");
		this.x = other.x;
		this.y = other.y;
	}
	
	Add(other)
	{
		debugAssert(other instanceof Vector2D, "other must be a Vector2D");
		this.x += other.x;
		this.y += other.y;
	}
	
	Subtract(other)
	{
		debugAssert(other instanceof Vector2D, "other must be a Vector2D");
		this.x -= other.x;
		this.y -= other.y;
	}
	
	Multiply(scalar)
	{
		debugAssert(typeof scalar === "number", "scalar must be a number");
		this.x *= scalar;
		this.y *= scalar;
	}
	
	ComponentwiseMultiply(other)
	{
		debugAssert(other instanceof Vector2D, "other must be a Vector2D");
		this.x *= other.x;
		this.y *= other.y;
	}
	
	Divide(divisor)
	{
		debugAssert(typeof divisor === "number", "divisor must be a number");
		this.x /= divisor;
		this.y /= divisor;
	}
	
	Normalize()
	{
		this.Divide(this.GetLength());
	}
	
	Rotate(rotation)
	{
		debugAssert(typeof rotation === "number", "rotation must be a number");
		let cachedX = this.x;
		this.x = (cachedX * Math.cos(rotation)) - (this.y * Math.sin(rotation));
		this.y = (cachedX * Math.sin(rotation)) + (this.y * Math.cos(rotation));
	}
	
	Reflect(normal)
	{
		debugAssert(normal instanceof Vector2D, "normal must be a Vector2D");
		const dot = Vector2DStatic.DotProduct(this, normal);
		this.x -= 2.0 * dot * normal.x;
		this.y -= 2.0 * dot * normal.y;
	}
	
	ProjectOnto(normal)
	{
		debugAssert(normal instanceof Vector2D, "normal must be a Vector2D");
		const dot = Vector2DStatic.DotProduct(this, normal);
		this.x = normal.x * dot;
		this.y = normal.y * dot;
	}
	
	//Accessors/calculations
	GetLength()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	
	GetLengthSquared()
	{
		return (this.x * this.x) + (this.y * this.y);
	}
	
	toString()
	{
		return "{" + this.x + ", " + this.y + "}";
	}
}

//"Static" accessor for convinience.
//I learned too late that static wasn't supported in Safari... whoops!
const Vector2DStatic = Vector2D.prototype;

Vector2D.prototype.CreateZeroVector = function()
{
	return new Vector2D(0.0, 0.0);
}

Vector2D.prototype.CreateOneVector = function()
{
	return new Vector2D(1.0, 1.0);
}

Vector2D.prototype.CreateCopy = function(other)
{
	debugAssert(other instanceof Vector2D, "other must be a Vector2D");
	return new Vector2D(other.x, other.y);
}

Vector2D.prototype.CreateAddition = function(a, b)
{
	debugAssert(a instanceof Vector2D, "a must be a Vector2D");
	debugAssert(b instanceof Vector2D, "b must be a Vector2D");
	return new Vector2D(a.x + b.x, a.y + b.y);
}

Vector2D.prototype.CreateSubtraction = function(a, b)
{
	debugAssert(a instanceof Vector2D, "a must be a Vector2D");
	debugAssert(b instanceof Vector2D, "b must be a Vector2D");
	return new Vector2D(a.x - b.x, a.y - b.y);
}

Vector2D.prototype.CreateMultiplication = function(v, scalar)
{
	debugAssert(v instanceof Vector2D, "v must be a Vector2D");
	debugAssert(typeof scalar === "number", "scalar must be a number");
	return new Vector2D(v.x * scalar, v.y * scalar);
}

Vector2D.prototype.CreateDivision = function(v, divisor)
{
	debugAssert(v instanceof Vector2D, "v must be a Vector2D");
	debugAssert(typeof divisor === "number", "divisor must be a number");
	return new Vector2D(v.x / divisor, v.y / divisor);
}

Vector2D.prototype.CreatePerpendicular = function(v)
{
	debugAssert(v instanceof Vector2D, "v must be a Vector2D");
	return new Vector2D(-v.y, v.x);
}
	
Vector2D.prototype.DotProduct = function(a, b)
{
	debugAssert(a instanceof Vector2D, "a must be a Vector2D");
	debugAssert(b instanceof Vector2D, "b must be a Vector2D");
	return (a.x * b.x) + (a.y * b.y);
}
	
Vector2D.prototype.CrossProduct = function(a, b)
{
	debugAssert(a instanceof Vector2D, "a must be a Vector2D");
	debugAssert(b instanceof Vector2D, "b must be a Vector2D");
	return (a.x * b.y) - (a.y * b.x);
}

//-----------------------------------------------------------------------------
// PRNG
//-----------------------------------------------------------------------------

function mulberry32(a) {
	return function() {
	  var t = a += 0x6D2B79F5;
	  t = Math.imul(t ^ t >>> 15, t | 1);
	  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	  return ((t ^ t >>> 14) >>> 0) / 4294967296;
	}
}

//-----------------------------------------------------------------------------
// PRNG
//-----------------------------------------------------------------------------

var makeCRCTable = function(){
	var c;
	var crcTable = [];
	for(var n =0; n < 256; n++){
		c = n;
		for(var k =0; k < 8; k++){
			c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
		}
		crcTable[n] = c;
	}
	return crcTable;
}

var crc32 = function(str) {
	var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
	var crc = 0 ^ (-1);

	for (var i = 0; i < str.length; i++ ) {
		crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
	}

	return (crc ^ (-1)) >>> 0;
};