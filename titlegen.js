"use strict"

let gAdjectives =
{
	anyList:
	[
		"good", "bad", "new", "old", "great", "poor", "wild", "crazy", "red",
		"green", "blue", "white", "black", "thin", "wide", "stale", "terrific",
		"horrific", "average", "run-of-the-mill", "shiny", "clear", "opaque",
		"my first", "equal", "foolish", "gullible", "first", "second", "third",
		"last", "feeble", "faint", "lame", "awesome", "cool", "warm", "8",
		"psychedelic", "trippy", "momentous", "memorable", "forgettable",
		"distinct", "busy", "hurried", "unknown", "loud", "quiet", "living",
		"dead", "injured", "maimed", "healthy", "invisible", "obvious", "solid",
		"hard", "soft", "bloody", "clean", "immaculate", "spotless", "smelly",
		"mother's", "father's", "daddy's", "grandma's", "baby's", "king's",
		"queen's", "royal", "buggy", "janky", "progressive", "regressive",
		"radical", "incredible", "amazing", "brilliant", "official", "stinky",
		"well-produced", "factory-farmed", "organic", "processed", "refined",
		"voluptuous", "supple", "top-heavy", "down-trodden", "beaten",
		"roasted", "poached", "boiled", "raw", "unique", "mass-produced",
		"hand-carved", "random", "curious", "industrious", "lovely", "bright",
		"dark", "redundant", "sassy", "common", "uncommon", "rare", "epic",
		"legendary", "broken", "dysfunctional", "sporadic", "magical", "half",
		"full", "nutty", "wacky", "zany", "kooky", "sticky", "graceful", 
		"hodge-podge", "improvised", "tidy", "trashy", "futuristic", "roomy", 
		"claustrophobic", "indoor", "spacious", "decorated", "own-brand", 
		"family-owned", "corporate", "ill", "sick", "twisted", "far-out", 
		"tubular", "wicked", "mondo", "poggers", "peng", "modern", "classic", 
		"retro", "vintage", "pulsating", "throbbing", "disgusting", "holy", 
		"legitimate", "original", "genuine", "fake", "fraudulent", "knock-off",
		"counterfeit", "reproduced", "unusual", "zany", "bogus", "cheap",
		"expensive", "disastrous", "fresh", "rotten", "vegan", "vegetarian",
		"carnivorous", "meat-free", "dairy-free", "gluten-free", "sugar-free",
		"scummy", "horny", "cheeky", "naughty", "inviting", "mature", "spicy",
		"risqué", "sweet", "sour", "salty", "bitter", "unwashed", "steamy",
		"suspicious", "bashful", "shy", "abrasive", "brash", "dying", "killed",
		"murdered", "buried", "stiff", "strange", "odd", "peculiar", "uncanny",
		"quaint", "outlandish", "boring", "dull", "humdrum", "dreary", "fun",
	],
	emptyList:
	[
		"empty", "absent", "non-existent", "gone", "departed", "null", "nil",
		"blank", "devoid", "lost", "missing", "vacant", "bugged", "glitched",
	],
	fastSynonyms:
	[
		"fast", "quick", "dashing", "rapid", "accelerated", "speeding",
		"zoomy", "zippy", "nippy", "turbo", "agile", "swift", "fleeting",
		"flying", "hasty", "breakneck", "supersonic", "moving", "brisk",
		"snappy", "swift", "reckless", "energetic", "abrupt", "expeditive",
		"active", "transient", "volatile", "double-time", "hurried", "nimble",
		"express", "screaming", "spanking", "barrelling", "impulsive", "urgent",
		"electric", "split-second", "full-speed", "speedy", "rushed", "boosted",
	],
	slowSynonyms:
	[
		"slow", "lethargic", "snail's-pace", "screechy", "lumbering", "stopped",
		"laboured", "unmoving", "unfast", "idle", "lagging", "leisurely",
		"sluggish", "moderate", "boring", "lifeless", "late", "passive",
		"torpid", "deliberate", "inactive", "reluctant", "inert", "sleepy",
		"humdrum", "dull", "lackadaisical", "slothful", "listless", "lazy",
		"slack", "apathetic", "dawdling", "crawling", "creeping", "disinclined",
		"static", "dormant", "immobile", "sedentary", "limp", "low-key",
	],
	difficultSynonyms:
	[
		"difficult", "hard", "challenging", "tough", "savage", "technical",
		"severe", "demanding", "intricate", "advanced", "expert", "confusing",
		"rage-inducing", "tight", "burdensome", "troublesome", "irritating",
		"toilsome", "unyielding", "critical", "onerous", "Herculean", "painful",
		"complex", "tricky", "awkward", "bothersome", "dangerous", "hard-won",
		"tenacious", "resilient", "firm", "stalwart", "vigorous", "cruel",
		"ambitious", "backbreaking", "confounding", "formidable", "brutal",
		"relentless", "harsh", "callous", "inhumane", "curvy", "winding",
	],
	easySynonyms:
	[
		"easy", "simple", "breezy", "casual", "piece-of-cake", "cakewalk",
		"accessible", "effortless", "straightforward", "basic", "paltry",
		"novice", "clear", "manageable", "mere", "smooth", "automatic",
		"beginner's", "painless", "facile", "lucid", "apt", "easy-peasy",
		"elementary", "mild", "transparent", "readable", "accessible",
		"light", "uncomplicated", "peaceful", "calm", "tranquil", "gentle",
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
		"excruciating", "sadistic", "agonizing", "drawn-out", "continued",
		"extended", "long-winded", "wearisome", "elongated", "padded", "mega",
		"titanic", "astronomical", "bumper", "mighty", "supersize", "grand",
	],
	shortSynonyms:
	[
		"short", "stubby", "chode-like", "brief", "stumpy", "terse", "bare",
		"condensed", "little", "concise", "succinct", "sparse", "skimpy",
		"inadequate", "slim", "meager", "abbreviated", "undersized", "small",
		"teensy", "cramped", "minuscule", "miniature", "modest", "slight",
		"insufficient", "teeny-weeny", "scrubby", "toy", "puny", "petite",
		"compressed", "lessened", "diminished", "condensed", "mini", "tiny",
		"insignificant", "diminuitive", "infinitesimal", "pint-sized", "wee",
	],
	roadAdjectives:
	[
		"paved", "surfaced", "constructed", "plain", "vanilla", "pure", 
		"conventional", "traditional", "typical", "emblematic", "normal",
		"exemplary", "quintissential", "archetypal", "everyday", "standard",
	],
	dirtAdjectives:
	[
		"dirty", "dusty", "muddy", "sandy", "natural", "deserted", "hot",
		"chalky", "drifting", "messy", "granular", "unkempt", "gritty",
		"baking", "tropical", "scorching", "sweltering", "sweaty", "sizzling",
	],
	iceAdjectives:
	[
		"icy", "snowy", "glacial", "frosty", "slippery", "greasy", "lubricated",
		"glazed", "unstable", "chilly", "cold", "freezing", "frozen", "polar",
		"arctic", "antarctic", "frigid", "glistening", "polished", "glacé",
	],
	sausageAdjectives:
	[
		"porky", "fat", "jumping", "banking", "risen", "bulging", "chunky",
		"elephantine", "potbellied", "lumpy", "bumpy", "uneven", "slanted", 
	],
	waterAdjectives:
	[
		"wet", "dank", "rainy", "drenched", "sodden", "saturated", "soaking",
		"moist", "dripping", "watery", "aqueous", "flooded", "inundated",
	],
	grassAdjectives:
	[
		"grassy", "carpeted", "lush", "verdant", "reedy", "sowed", "turfy",
		"gardened", "outdoor", "overgrown", "mossy", "dense", "natural",
	],
	rubberAdjectives:
	[
		"rubber", "elastic", "bouncy", "flexible", "stretchy", "springy",
		"supple", "plastic", "formable", "chemical", "synthetic", "eyecatching",
	],
	leftAdjectives:
	[
		"left", "left-handed", "left-leaning", "anticlockwise", "port",
		"liberal", "leftist", "sinistral",
	],
	rightAdjectives:
	[
		"right", "right-handed", "right-leaning", "clockwise", "starboard",
		"conservative", "reactionary", "dextral",
	],
	hillyAdjectives:
	[
		"hilly", "elevated", "mountainous", "rolling", "steep", "undulating",
		"high", "sloped", "inclined", "choppy", "jarring", "wavy", "ripply",
	],
	flatAdjectives:
	[
		"flat", "horizontal", "low", "even", "flush", "planar", "deflated",
		"prostrate", "level", "parallel", "smooth", "aligned", "uniform",
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
		"operation", "ratio", "garbage", "pony", "animal", "human", "bunny",
		"vegetable", "mineral", "invitational", "moisturiser", "imposter",
		"stock", "chassis", "wheel", "axle", "gear", "pedal", "subscriber",
		"spring", "summer", "autumn", "fall", "auto", "car", "dog", "cat",
		"hand", "pole", "object", "block", "arrow", "lamppost", "spotlight",
		"body", "sandwich", "food", "bass", "sheep", "beer", "castle", "null",
		"bottle cap", "meme", "trackmania", "video game", "lol", "waste",
		"generation", "cardboard", "toy", "mass", "pirate", "experiment", "bit",
		"mistake", "accident", "chicken", "beef", "noodles", "fish", "curry",
		"tikka masala", "ball", "stunt", "demo", "sweet", "sugar", "candy",
		"brand", "teeth", "tank", "vehicle", "feet", "toes", "member", "leg",
		"intestine", "gut", "stomach", "bone", "spine", "sphincter", "organ",
		"tweet", "internet", "website", "product", "oil", "chocolate", "gum",
		"foot", "heel", "elbow", "finger", "thumb", "bean", "pie", "horn",
		"goat", "yoghurt", "cereal", "waffle", "bread", "toast", "panini",
		"toastie", "cheese", "brie", "cheddar", "edam", "mozarella", "halloumi",
		"pizza", "korma", "vindaloo", "duck", "goose", "chow mein", "spaghetti",
		"pasta", "lasagne", "apple", "banana", "cherry", "pear", "lemon",
		"lime", "strawberry", "raspberry", "pineapple", "anchovy", "bacon",
		"ham", "salt", "pepper", "sushi", "spring roll", "fried rice", "rice",
		"naan bread", "venison", "sea bass", "cod", "pollock", "scampi",
		"haddock", "salmon", "paper", "muscle", "tongue", "sack", "wood",
		"trunk", "pocket", "wound", "toe", "ring", "rod", "bell", "cream",
		"crack", "hole", "glue", "bear", "twink", "scene", "goth", "nerd",
		"geek", "normie", "acid", "vinegar", "chemical", "rock", "gabber",
		"speedcore", "house", "trance", "eurobeat", "metal", "jazz", "funk",
		"beaver", "racoon", "squirrel", "gopher", "hedgehog", "owl", "raven",
		"crow", "pigeon", "shrimp", "prawn", "crayfish", "lobster", "octopus",
		"squid", "jellyfish", "tuna", "caviar", "eel", "alligator", "anchovy",
		"avocado", "bagel", "cookie", "cow", "cucumber", "donkey", "fox",
		"gammon", "guinea pig", "hamster", "koala", "lamb", "llama", "lunch",
		"maize", "milk", "moose", "mushroom", "mustard", "opossum", "pangolin",
		"peacock", "pheasant", "popcorn", "quesadilla", "reindeer", "salad",
		"sardine", "shortcake", "spider", "steak", "sundae", "tofu", "turtle",
		"wheat", "worm", "breakfast", "dinner", "tea", "coffee", "snack",
		"aadvark", "toucan", "chipmunk", "deer", "weasel", "lynx", "porcupine",
		"seahorse", "starfish", "elk", "turkey", "pig", "meerkat", "narwhal",
		"flamingo", "skunk", "hippo", "emu", "zebra", "orangutan", "chameleon",
		"factory", "cola", "vodka", "cider", "wine", "champagne", "rum", "gin",
	],
	emptyList:
	[
		"void", "nothing", "gap", "vacuum", "space", "exhaustion", "vacuity",
		"plain", "free space", "land", "grass", "editor", "canvas", "slate",
		"what",
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
	waterList:
	[
		"water", "river", "lake", "ocean", "sea", "stream", "estuary", "pond",
		"watercourse", "basin", "puddle", "pool", "reservoir", "drink",
		"liquid", "splunge", "sandbank", "shoal", "reef", "atoll", "quay",
	],
	grassList:
	[
		"grass", "lawn", "garden", "backyard", "park", "yard", "plot", "field",
		"farm", "green", "meadow", "pasture", "range", "grove", "vineyard",
	],
	rubberList:
	[
		"rubber", "plastic", "toy brick", "building block", "slot car", "model",
	],
	fastNouns:
	[
		"speed", "speedrun", "rush", "blitz", "flow", "scramble", "energy",
		"express", "priority", "run", "jog", "momentum", "velocity", "tempo", 
		"quickness", "headway", "cheetah", "lion", "rabbit", "bunny", "falcon",
		"hawk", "eagle", "kangaroo", "blue hedgehog",
	],
	slowNouns:
	[
		"walk", "stroll", "crawl", "ramble", "cruise", "saunter", "leisure",
		"pleasure", "sunday", "weekend", "holiday", "vacation", "break",
		"rest", "sleep", "bed", "sloth", "snail", "koala", "tortoise", "slug", 
	],
	difficultNouns:
	[
		"challenge", "puzzle", "test", "exam", "experiment", "essay", "trick",
		"obstruction", "blockage", "hindrance", "trouble", "wall", "punishment",
		"bull", "tiger", "shark", "dragon", "killer", "murder", "death",
	],
	easyNouns:
	[
		"training", "warm-up", "practice", "excercise", "basics", "foundation",
		"advantage", "help", "support", "luxury", "rest", "relaxation", "life",
	],
	longNouns:
	[
		"length", "tedium", "task", "giant", "titan", "behemoth", "goliath",
		"whale", "elephant", "mammoth", "snake", "cross-country", "planet",
		"rhino", "dinosaur", "mountain", "cobra", "colossus", "whopper",
	],
	shortNouns:
	[
		"speck", "crumb", "dot", "fleck", "particle", "iota", "baby", "child",
		"youngster", "toy", "ant", "mouse", "hamster", "fly", "waterbear",
		"bacteria", "microbe", "chode", "stub", "dwarf", "pixie", "sprite",
		"insect", "mite", "bacterium", "beetle", "particle", "plankton",
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
	"competition", "endurance", "playground", "assault course", "test", "pass",
	"cut", "gorge", "path", "ravine", "court", "throughfare", "drive", "row",
	"way", "turf", "byway", "superhighway", "parking lot", "subway", "artery",
];

let DetermineTrackCharacteristics = function()
{
	if (gPlacedPieces.length == 0)
		return [ "empty" ];

	let characteristics = [ "any" ];

	//Determine track length.
	if (gPlacedPieces.length <= 25)
	{
		characteristics.push("short");
	}
	else if (gPlacedPieces.length >= 75)
	{
		characteristics.push("long");
	}

	//Check track features.
	let turboCount = 0;
	let checkpointCount = 0;
	let straightCount = 0;
	let leftTurnCount = 0;
	let rightTurnCount = 0;
	let heightChangeCount = 0;
	let trackMaterialCounts = {};

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
		else if (placedPieceType.tags.includes("straight"))
		{
			++straightCount;
		}

		if (placedPieceType.exitAngle > 0)
		{
			++rightTurnCount;
		}
		else if (placedPieceType.exitAngle < 0)
		{
			++leftTurnCount;
		}

		if (placedPieceType.exitOffset.z != 0)
		{
			++heightChangeCount;
		}

		if (trackMaterialCounts[placedPieceType.pieceMaterial] !== undefined)
		{
			++trackMaterialCounts[placedPieceType.pieceMaterial];
		}
		else
		{
			trackMaterialCounts[placedPieceType.pieceMaterial] = 1;
		}
	});

	let turboRatio = turboCount / gPlacedPieces.length;
	let checkpointRatio = checkpointCount / gPlacedPieces.length;
	let straightRatio = straightCount / gPlacedPieces.length;
	let leftTurnRatio = leftTurnCount / gPlacedPieces.length;
	let rightTurnRatio = rightTurnCount / gPlacedPieces.length;
	let heightChangeRatio = heightChangeCount / gPlacedPieces.length;

	if (gPlacedPieces.length > 30 && (checkpointRatio < 0.1 || straightRatio < 0.5))
	{
		characteristics.push("difficult");
	}
	else if (checkpointRatio > 0.2)
	{
		characteristics.push("easy");
	}

	if (turboRatio > 0.2 || (straightRatio > 0.25 && gPlacedPieces.length > 20))
	{
		characteristics.push("fast");
	}
	else if (turboRatio < 0.05)
	{
		characteristics.push("slow");
	}

	if (rightTurnRatio > leftTurnRatio * 3 && leftTurnRatio < 0.1)
	{
		characteristics.push("right");
	}
	else if (leftTurnRatio > rightTurnRatio * 3 && rightTurnRatio < 0.1)
	{
		characteristics.push("left");
	}

	if (heightChangeRatio > 0.2 && gPlacedPieces.length > 20)
	{
		characteristics.push("hilly");
	}
	else if (heightChangeRatio < 0.05)
	{
		characteristics.push("flat");
	}

	//Determine which material is used the most.
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

	if (highestTrackMaterialCount > gPlacedPieces.length * 0.5)
	{
		let materialCharacteristics = [ "road", "dirt", "ice", "sausage", "water", "grass", "rubber" ];
		let materialCharacteristic = materialCharacteristics.find(materialKey =>
		{
			return highestTrackMaterial.startsWith(materialKey);
		});

		if (materialCharacteristic)
		{
			characteristics.push(materialCharacteristic);
		}
	}

	return characteristics;
}

let GetWordsFromCharacteristics = function(wordsObject, characteristics)
{
	let possibleWords = [];

	Object.getOwnPropertyNames(wordsObject).forEach(wordsListKey =>
	{
		if (characteristics.find(characteristic => wordsListKey.startsWith(characteristic)))
		{
			possibleWords = possibleWords.concat(wordsObject[wordsListKey]);
		}
	});

	return possibleWords;
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
	let characteristics = DetermineTrackCharacteristics();

	let adjective = SelectRandomElement(GetWordsFromCharacteristics(gAdjectives, characteristics));
	let noun = SelectRandomElement(GetWordsFromCharacteristics(gNouns, characteristics));
	let postposition = SelectRandomElement(gPostpositionsList);

	//Rarely use an infix.
	if (gRandom() < 0.025)
	{
		let noun2 = SelectRandomElement(GetWordsFromCharacteristics(gNouns, characteristics));
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