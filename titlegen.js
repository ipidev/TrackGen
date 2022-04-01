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
		"psychedelic", "greasy", "momentous", "memorable", "forgettable",
		"plain", "busy", "hurried", "unknown", "loud", "quiet", "living",
		"dead", "injured", "maimed", "healthy", "invisible", "obvious", "solid",
		"hard", "soft", "bloody", "clean", "dirty", "spotless", "smelly",
		"mother's", "father's", "daddy's", "grandma's", "baby's", "king's",
		"queen's", "royal", "buggy", "janky", "progressive", "regressive",
		"radical", "incredible", "amazing", "brilliant", "official", "stinky",
	],
	fastSynonyms:
	[
		"fast", "quick", "dashing", "rapid", "accelerated", "speeding",
		"zoomy", "zippy", "nippy", "turbo", "agile", "swift", "fleeting",
		"flying", "hasty", "breakneck", "supersonic", "moving", "brisk",
		"snappy", "swift", "reckless", "energetic", "abrupt", "expeditive",
		"active", "transient", "volatile", "double-time", "hurried", "nimble",
	],
	slowSynonyms:
	[
		"slow", "lethargic", "snail's-pace", "screechy", "lumbering", "stopped",
		"laboured", "unmoving", "unfast", "idle", "lagging", "leisurely",
		"sluggish", "moderate", "boring", "lifeless", "late", "passive",
		"torpid", "deliberate", "inactive", "reluctant", "inert", "sleepy",
		"humdrum", "dull", "lackadaisical", "slothful", "listless", "lazy",
	],
	difficultSynonyms:
	[
		"difficult", "hard", "challenging", "tough", "savage", "technical",
		"severe", "demanding", "intricate", "advanced", "expert", "confusing",
		"rage-inducing", "tight", "burdensome", "troublesome", "irritating",
		"toilsome", "unyielding", "critical", "onerous", "Herculean", "painful",
		"complex", "tricky", "awkward", "bothersome", "titanic", "hard-won",
		"tenacious", "resilient", "firm", "stalwart", "vigorous",
	],
	easySynonyms:
	[
		"easy", "simple", "breezy", "casual", "piece-of-cake", "cakewalk",
		"accessible", "effortless", "straightforward", "basic", "paltry",
		"novice", "clear", "manageable", "mere", "smooth", "automatic",
		"beginner's", "painless", "facile", "lucid", "apt", "easy-peasy",
		"elementary", "mild", "transparent", "readable", "accessible",
	],
	longSynonyms:
	[
		"long", "arduous", "lengthy", "tedious", "neverending", "girthy",
		"infinite", "unending", "boundless", "lingering", "exhausting",
		"Sisyphean", "labourious", "lengthened", "protracted", "lofty",
		"tall", "verbose", "prolonged", "sustained", "extensive", "gangling",
		"drawn-out", "spindly", "stringy", "oversized", "jumbo", "extra large",
		"large", "big", "full", "vast", "mammoth", "enormous", "gigantic",
		"considerable", "colossal", "heavy-duty", "walloping", "burly",
	],
	shortSynonyms:
	[
		"short", "stubby", "chode-like", "brief", "stumpy", "terse", "bare",
		"condensed", "little", "concise", "succinct", "sparse", "skimpy",
		"inadequate", "slim", "meager", "abbreviated", "undersized", "small",
		"teensy", "cramped", "minuscule", "miniature", "modest", "slight",
		"insufficient", "teeny-weeny", "scrubby", "toy", "puny", "petite",
	],
};

let gNouns = 
{
	anyList:
	[
		"corner", "straight", "jump", "hairpin", "twist", "turbo", "engine",
		"loop-de-loop", "corkscew", "rubber", "horse", "egg", "toilet", 
		"drum and bass", "pringle", "unicorn", "chewing gum", "meat", "random",
		"robot", "stone", "billboard", "gate", "hospital", "ear", "bedroom",
		"pond", "emotion", "gate", "signature", "aspect", "sponge", "quality",
		"painting", "world", "agency", "sample", "surgery", "estate", "stranger",
		"operation", "ratio", "garbage", "pony", "animal", "snail", "bunny",
		"rabbit", "undefined", "invitational", "moisturiser", "imposter",
		"stock", "chassis", "wheel", "axle", "gear", "pedal", "subscriber",
		"spring", "summer", "autumn", "fall", "auto", "car", "dog", "cat",
		"hand", "pole", "object", "block", "arrow", "lamppost", "spotlight",
		"body", "sandwich", "food", "bass", "sheep", "beer", "castle", "null",
		"bottle cap", "meme", "trackmania", "video game", "lol", "waste",
		"generation", "plastic", "toy", "mass", "pirate", "experiment", "bit",
		"mistake", "accident", "chicken", "beef", "noodles", "fish", "curry",
		"tikka masala", "ball", "stunt", "demo", "hamster", "sugar", "candy",
		"brand", "teeth", "tank", "vehicle", "feet", "toes", "member", "leg",
		"intestine", "gut", "stomach", "bone", "spine", "sphincter", "organ",
	],
	roadList:
	[
		"tarmac", "cement", "asphalt", "road", "stadium", "classic", "original",
		"national", "town", "city", "drag", "parking lot", "subway", "pavement",
	],
	dirtList:
	[
		"dirt", "mud", "dust", "sand", "canyon", "outdoor", "nature", "desert",
		"drift", "dune", "farm", "hot", "ground", "excrement", "soil", "crud",
	],
	iceList:
	[
		"ice", "snow", "glacier", "frost", "slide", "pipe", "cold", "winter",
		"dew", "shiver", "bath", "anger", "sadness", "permafrost", "sleet",
	],
	sausageList:
	[
		"sausage", "fat", "tech", "air", "jump", "bank", "lagoon", "shortcut",
		"patty", "frankfurter", "bratwurst", "tallow", "bulk", "vault",
	],
};

let gInfixList = 
[
	" and ", " and ", " and ", " and ", " and ", " 'n' ", " & ", " or ",
	" with ", "-", " and ", " plus ", "-in-", "-on-",
]

let gPostpositionsList = 
[
	"raceway", "circuit", "speedway", "stadium", "highway", "motorway",
	"turnpike", "obstacle course", "course", "alley", "road", "sprint", "lane",
	"track", "loop", "derby", "event", "trial", "trail", "marathon", "biathlon",
	"triathlon", "tour", "rally", "street", "avenue", "boulevard", "expressway",
	"roadway", "route", "way", "parkway", "terrace", "throughway", "viaduct",
	"passage", "line", "aqueduct", "conduit", "lap", "run", "series", "round",
	"freeway", "pike", "promenade", "development", "movement", "trajectory",
	"direction", "canal", "aisle", "twist", "turn", "straightaway", "stunt",
	"stadium", "colosseum", "amphitheatre", "gymnasium", "field", "gridiron",
	"diamond", "ring", "bowl", "pit", "rallycross", "crossroads", "roundabout",
	"competition", "endurance", "playground", "assault course", "test",
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

	if (gPlacedPieces.length > 20 && (checkpointRatio < 0.1 || cornerRatio > 0.5))
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

let DeterminePossibleNouns = function()
{
	let possibleAdjectives = gNouns.anyList;

	//Count track materials.
	let trackMaterialCounts = {};

	gPlacedPieces.forEach(placedPiece =>
	{
		let placedPieceType = placedPiece.trackPieceType;
		if (trackMaterialCounts[placedPieceType.pieceMaterial] !== undefined)
		{
			++trackMaterialCounts[placedPieceType.pieceMaterial];
		}
		else
		{
			trackMaterialCounts[placedPieceType.pieceMaterial] = 1;
		}
	});

	//Determine which is the highest.
	let highestTrackMaterial = null;
	let highestTrackMaterialCount = 0;

	Object.getOwnPropertyNames(trackMaterialCounts).forEach(trackMaterialKey =>
	{
		if (trackMaterialCounts[trackMaterialKey] > highestTrackMaterialCount)
		{
			highestTrackMaterial = trackMaterialKey;
			highestTrackMaterialCount = trackMaterialCounts[trackMaterialKey];
		}
	});

	//Now add the nouns to be selected.
	if (highestTrackMaterialCount > gPlacedPieces.length * 0.5)
	{
		let materialToNounListMap =
		{
			"road": gNouns.roadList,
			"dirt": gNouns.dirtList,
			"ice": gNouns.iceList,
			"sausage": gNouns.sausageList,
		};

		let materialToNounListKey = Object.getOwnPropertyNames(materialToNounListMap).find(materialKey =>
		{
			return highestTrackMaterial.startsWith(materialKey);
		});
		possibleAdjectives = possibleAdjectives.concat(materialToNounListMap[materialToNounListKey]);
	}

	return possibleAdjectives;
}

let GenerateTitle = function()
{
	let SelectRandomElement = function(array, exclusion)
	{
		let result = null;
		if (array.length > 0)
		{
			do
			{
				result = array[Math.floor(gRandom() * array.length)];
			}
			while (result === exclusion)
		}

		return result;
	}

	//Determine which adjectives can be used for this track.
	let adjective = SelectRandomElement(DeterminePossibleAdjectives());
	let noun = SelectRandomElement(DeterminePossibleNouns());
	let postposition = SelectRandomElement(gPostpositionsList);

	//Rarely use an infix.
	if (gRandom() < 0.02)
	{
		let noun2 = SelectRandomElement(DeterminePossibleNouns(), noun);
		let infix = SelectRandomElement(gInfixList);
		return adjective + " " + noun + infix + noun2 +  " " + postposition;
	}
	else
	{
		return adjective + " " + noun + " " + postposition;
	}
}

let GenerateNewTitle = function()
{
	document.getElementById("title").innerHTML = GenerateTitle();
}