"use strict"

let gAdjectives =
{
	anyList:
	[
		"good", "bad", "new", "old", "great", "poor", "wild", "crazy", "red",
		"green", "blue", "white", "black", "thin", "wide", "stale", "terrific",
		"horrific", "average", "run-of-the-mill", "dusty", "clear", "opaque",
		"my first", "equal", "foolish", "gullible", "first", "second", "third",
		"last", "feeble", "faint", "lame", "awesome", "cool", "hot", "8",
		"psychedelic", "greasy", "momentus", "memorable", "forgettable",
		"plain", "busy", "hurried", "unknown", "loud", "quiet",
	],
	fastSynonyms:
	[
		"fast", "quick", "dashing", "rapid", "accelerated", "speeding",
		"zoomy", "zippy", "nippy", "turbo", "agile", "swift", "fleeting",
		"flying", "hasty", "breakneck",
	],
	slowSynonyms:
	[
		"slow", "lethargic", "snail's-pace", "screechy", "lumbering", "stopped",
		"laboured", "unmoving", "unfast", "idle", "lagging", "leisurely",
		"sluggish", "moderate",
	],
	difficultSynonyms:
	[
		"difficult", "hard", "challenging", "tough", "savage", "technical",
		"severe", "demanding", "intricate", "advanced", "expert", "confusing",
		"rage-inducing", 
	],
	easySynonyms:
	[
		"easy", "simple", "breezy", "casual", "piece-of-cake", "cakewalk",
		"accessible", "effortless", "straightforward", "basic", "paltry",
		"novice",
	],
	longSynonyms:
	[
		"long", "arduous", "lengthy", "tedious", "neverending", "girthy",
		"infinite", "unending", "boundless", "lingering", "exhausting",
		"Sisyphean", "labourious",
	],
	shortSynonyms:
	[
		"short", "stubby", "chode-like", "brief", "stumpy", "terse", "bare",
		"condensed", "little", "concise", "succinct", "sparse", "skimpy",
		"inadequate", "slim", "meager",
	],
};

let gNounsList = 
[
	"corner", "straight", "jump", "hairpin", "twist", "turbo", "loop-de-loop",
	"corkscew", "cement", "tarmac", "rubber", "dirt", "mud", "ice", "space",
	"canyon", "valley", "stadium", "horse", "egg", "toilet", "drum and bass",
	"pringle", "unicorn", "chewing gum", "snow", "meat", "air", "random",
	"robot", "stone", "billboard", "gate", "hospital", "ear", "bedroom", "bath",
	"pond", "emotion", "gate", "signature", "aspect", "sponge", "quality",
	"painting", "world", "agency", "sample", "surgery", "estate", "stranger",
	"operation", "ratio", "garbage", "pony", "animal", "snail", "bunny",
	"rabbit", "undefined", "king's", "queen's", "royal", "invitational",
	"colloseum", "open-wheel", "sports", "touring", "stock", "competition",
	"spring", "summer", "autumn", "fall", "winter", "auto", "car",
];

let gPostpositionsList = 
[
	"raceway", "circuit", "speedway", "stadium", "highway", "motorway",
	"turnpike", "obstacle course", "course", "alley", "road", "sprint", "lane",
	"track", "loop", "derby", "event", "trial", "trail", "marathon", "biathlon",
	"triathlon", "tour", "rally", "street",
];

let DeterminePossibleAdjectives = function()
{
	if (gPlacedPieces.length == 0)
		return [ "how did you do this" ];

	let possibleAdjectives = [];

	//Determine track length.
	if (gPlacedPieces.length <= 25)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.shortSynonyms);
	}
	else if (gPlacedPieces.length >= 50)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.longSynonyms);
	}

	//Check track features.
	let turboCount = 0;
	let checkpointCount = 0;
	let cornerCount = 0;

	gPlacedPieces.forEach(placedPiece =>
	{
		let placedPieceType = placedPiece.trackPieceType;
		if (placedPieceType.tags.includes("engineBlock"))
		{
			++turboCount;
		}
		else if (placedPieceType.tags.includes("checkpoint"))
		{
			++checkpointCount;
		}
		else if (placedPieceType.exitAngle != 0)
		{
			++cornerCount;
		}
	});

	let turboRatio = turboCount / gPlacedPieces.length;
	let checkpointRatio = checkpointCount / gPlacedPieces.length;
	let cornerRatio = cornerCount / gPlacedPieces.length;

	if (checkpointRatio < 0.1 || cornerRatio > 0.5)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.difficultSynonyms);
	}
	else if (checkpointRatio > 0.2)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.easySynonyms);
	}

	if (turboRatio > 0.15 || cornerRatio < 0.25)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.fastSynonyms);
	}
	else if (turboRatio < 0.05)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.slowSynonyms);
	}

	//Make sure special adjectives are chosen more than generic ones.
	if (possibleAdjectives.length == 0 || gRandom() >= 0.5)
	{
		possibleAdjectives = possibleAdjectives.concat(gAdjectives.anyList);
	}

	return possibleAdjectives;
}

let GenerateTitle = function()
{
	let SelectRandomElement = function(array)
	{
		return array.length > 0 ? array[Math.floor(gRandom() * array.length)] : null;
	}

	//Determine which adjectives can be used for this track.
	let randomAdjective = SelectRandomElement(DeterminePossibleAdjectives());
	let randomNoun = SelectRandomElement(gNounsList);
	let randomPostpositon = SelectRandomElement(gPostpositionsList);
	return randomAdjective + " " + randomNoun + " " + randomPostpositon;
}

let GenerateNewTitle = function()
{
	document.getElementById("title").innerHTML = GenerateTitle();
}