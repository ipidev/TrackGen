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
// 3D Vector
//-----------------------------------------------------------------------------

class Vector3D
{
	constructor(x, y, z)
	{
		this.x = x ? x : 0.0;
		this.y = y ? y : 0.0;
		this.z = z ? z : 0.0;
	}
	
	//Mutators
	Set(x, y, z)
	{
		debugAssert(typeof x === "number", "x must be a number");
		debugAssert(typeof y === "number", "x must be a number");
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	Copy(other)
	{
		debugAssert(other instanceof Vector3D, "other must be a Vector3D");
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
	}
	
	Add(other)
	{
		debugAssert(other instanceof Vector3D, "other must be a Vector3D");
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
	}
	
	Subtract(other)
	{
		debugAssert(other instanceof Vector3D, "other must be a Vector3D");
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
	}
	
	Multiply(scalar)
	{
		debugAssert(typeof scalar === "number", "scalar must be a number");
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
	}
	
	ComponentwiseMultiply(other)
	{
		debugAssert(other instanceof Vector3D, "other must be a Vector3D");
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
	}
	
	Divide(divisor)
	{
		debugAssert(typeof divisor === "number", "divisor must be a number");
		this.x /= divisor;
		this.y /= divisor;
		this.z /= divisor;
	}
	
	Normalize()
	{
		this.Divide(this.GetLength());
	}
	
	RotateYaw(rotation)
	{
		debugAssert(typeof rotation === "number", "rotation must be a number");
		let cachedX = this.x;
		this.x = (cachedX * Math.cos(rotation)) - (this.y * Math.sin(rotation));
		this.y = (cachedX * Math.sin(rotation)) + (this.y * Math.cos(rotation));
	}
	
	Reflect(normal)
	{
		debugAssert(normal instanceof Vector3D, "normal must be a Vector3D");
		const dot = Vector3DStatic.DotProduct(this, normal);
		this.x -= 2.0 * dot * normal.x;
		this.y -= 2.0 * dot * normal.y;
		this.z -= 2.0 * dot * normal.z;
	}
	
	ProjectOnto(normal)
	{
		debugAssert(normal instanceof Vector3D, "normal must be a Vector3D");
		const dot = Vector3DStatic.DotProduct(this, normal);
		this.x = normal.x * dot;
		this.y = normal.y * dot;
		this.z = normal.z * dot;
	}
	
	//Accessors/calculations
	GetLength()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	}
	
	GetLengthSquared()
	{
		return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
	}
	
	toString()
	{
		return "{" + this.x + ", " + this.y + ", " + this.z + "}";
	}
}

//"Static" accessor for convinience.
//I learned too late that static wasn't supported in Safari... whoops!
const Vector3DStatic = Vector3D.prototype;

Vector3D.prototype.CreateZeroVector = function()
{
	return new Vector3D(0.0, 0.0, 0.0);
}

Vector3D.prototype.CreateOneVector = function()
{
	return new Vector3D(1.0, 1.0, 1.0);
}

Vector3D.prototype.CreateCopy = function(other)
{
	debugAssert(other instanceof Vector3D, "other must be a Vector3D");
	return new Vector3D(other.x, other.y, other.z);
}

Vector3D.prototype.CreateAddition = function(a, b)
{
	debugAssert(a instanceof Vector3D, "a must be a Vector3D");
	debugAssert(b instanceof Vector3D, "b must be a Vector3D");
	return new Vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
}

Vector3D.prototype.CreateSubtraction = function(a, b)
{
	debugAssert(a instanceof Vector3D, "a must be a Vector3D");
	debugAssert(b instanceof Vector3D, "b must be a Vector3D");
	return new Vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
}

Vector3D.prototype.CreateMultiplication = function(v, scalar)
{
	debugAssert(v instanceof Vector3D, "v must be a Vector3D");
	debugAssert(typeof scalar === "number", "scalar must be a number");
	return new Vector3D(v.x * scalar, v.y * scalar, v.z * scalar);
}

Vector3D.prototype.CreateDivision = function(v, divisor)
{
	debugAssert(v instanceof Vector3D, "v must be a Vector3D");
	debugAssert(typeof divisor === "number", "divisor must be a number");
	return new Vector3D(v.x / divisor, v.y / divisor, v.z / divisor);
}

Vector3D.prototype.DotProduct = function(a, b)
{
	debugAssert(a instanceof Vector3D, "a must be a Vector3D");
	debugAssert(b instanceof Vector3D, "b must be a Vector3D");
	return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
}

Vector3D.prototype.CrossProduct = function(a, b)
{
	debugAssert(a instanceof Vector3D, "a must be a Vector3D");
	debugAssert(b instanceof Vector3D, "b must be a Vector3D");
	return new Vector3D((a.y * b.z) - (a.z * b.y), (a.x * b.z) - (a.z * b.x), (a.x * b.y) - (a.y * b.x));
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
// CRC32
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

//-----------------------------------------------------------------------------
// Other utilities
//-----------------------------------------------------------------------------

let Lerp = function(a, b, t)
{
	return a + (t * (b - a));
}