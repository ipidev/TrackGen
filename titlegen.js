"use strict"

let adjectives =
[
	"fast", "quick", "dashing", "rapid", "accelerating", "speeding", "zoomy", "zippy", "nippy", "turbo",
	"slow", "lethargic", "snail's-pace", "screechy", "lumbering", "stopped", "laboured", "unmoving", "unfast",
	"difficult", "hard", "challenging", "tough", "savage",
	"easy", "simple", "breezy", "casual", "piece-of-cake", "cakewalk",
	"long", "arduous", "lengthy", "tedious", "neverending", "girthy", "infinite",
	"short", "stubby", "chode-like", "brief", "stumpy", 
];

let nouns = 
[
	"corner", "straight", "jump", "hairpin", "twist", "turbo", "loop-de-loop", "corkscew",
	"cement", "tarmac", "rubber", "dirt", "mud", "ice", "space", "canyon", "valley", "stadium",
	"horse", "egg", "toilet", "drum and bass", "pringle", "unicorn", "chewing gum", "snow",
	"meat", "airtime", "random", "robot", "stone", "billboard", "gate", "hospital", "ear", "bedroom",
	"bath", "pond", "emotion", "gate", "signature", "aspect", "sponge", "quality", "painting",
	"world", "agency", "sample", "surgery", "estate", "stranger", "operation", "ratio", "garbage",
	"pony", "animal", "snail", "bunny", "rabbit", "undefined",
];

let postpositions = 
[
	"raceway", "circuit", "speedway", "stadium", "highway", "motorway", "turnpike", 
	"obstacle course", "course", "alley", "road", "sprint", "lane", "track", "loop",
];

let GenerateTitle = function()
{
	let randomAdjective = adjectives[Math.floor(gRandom() * adjectives.length)];
	let randomNoun = nouns[Math.floor(gRandom() * nouns.length)];
	let randomPostpositon = postpositions[Math.floor(gRandom() * postpositions.length)];
	return "&nbsp;" + randomAdjective + " " + randomNoun + " " + randomPostpositon;
}

let GenerateNewTitle = function()
{
	document.getElementById("title").innerHTML = GenerateTitle();
}