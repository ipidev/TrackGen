"use strict"

////////////////////////////////////////////////////////////////////////////////
// Piece types and templates
////////////////////////////////////////////////////////////////////////////////

let gTrackPieceTemplates =
{
	straight:
	{
		tags: [ "straight" ],
		imageOffset: new Vector2D(0, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	cornerRight:
	{
		imageOffset: new Vector2D(32, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(1, 0),
		exitAngle: Math.PI * 0.5,
	},
	cornerLeft:
	{
		imageOffset: new Vector2D(64, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(-1, 0),
		exitAngle: Math.PI * -0.5,
	},
	startLine:
	{
		tags: [ "startLine" ],
		imageOffset: new Vector2D(0, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	checkpoint:
	{
		tags: [ "checkpoint" ],
		imageOffset: new Vector2D(32, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	finishLine:
	{
		tags: [ "finishLine" ],
		imageOffset: new Vector2D(64, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	curveRight:
	{
		imageOffset: new Vector2D(96, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(2, -1),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector2D(0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	curveLeft:
	{
		imageOffset: new Vector2D(160, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(-2, -1),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector2D(-0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	bigCurveRight:
	{
		imageOffset: new Vector2D(224, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector2D(3, -2),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector2D(1, -1),
		collisionExtents: new Vector2D(1.5, 1.5),
	},
	bigCurveLeft:
	{
		imageOffset: new Vector2D(320, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector2D(-3, -2),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector2D(-1, -1),
		collisionExtents: new Vector2D(1.5, 1.5),
	},
	sBendLeft:
	{
		imageOffset: new Vector2D(96, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(-1, -2),
		exitAngle: 0,
		collisionOffset: new Vector2D(-0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	sBendRight:
	{
		imageOffset: new Vector2D(160, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(1, -2),
		exitAngle: 0,
		collisionOffset: new Vector2D(0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	bigSBendLeft:
	{
		imageOffset: new Vector2D(416, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector2D(-1, -3),
		exitAngle: 0,
		collisionOffset: new Vector2D(-0.5, -1),
		collisionExtents: new Vector2D(1, 1.5),
	},
	bigSBendRight:
	{
		imageOffset: new Vector2D(480, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector2D(1, -3),
		exitAngle: 0,
		collisionOffset: new Vector2D(0.5, -1),
		collisionExtents: new Vector2D(1, 1.5),
	},
	turbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(320, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
	},
	superTurbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(352, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.5,
	},
	boostUp:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(384, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
	},
	superBoostUp:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(416, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.333,
	},
	boostDown:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(448, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
	},
	superBoostDown:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(480, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.5,
	},
};

//Piece types object.
let gPieceTypes =
{
	roadFlat:
	{
		toDirt:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(224, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
			transitionTo: { material: "dirtFlat" },
		},
		toIce:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(256, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
			transitionTo: { material: "iceFlat" },
		},
		toSausage:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(288, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
			transitionTo: { material: "sausageFlat" },
		},
		toSausageLong:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(64, 448),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector2D(0, -2),
			exitAngle: 0,
			collisionOffset: new Vector2D(0, -0.5),
			collisionExtents: new Vector2D(1, 2),
			transitionTo: { material: "sausageFlat" },
		},
		jump:
		{
			tags: [ "jump" ],
			imageOffset: new Vector2D(0, 64),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -2),
			exitAngle: 0,
			transitionTo: { material: "any", tag: "straight" },
		},
	},
	dirtFlat:
	{
		toRoad:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(0, 192),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
		},
		largeBump:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(32, 192),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
		},
		smallBumps:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(64, 192),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
		},
	},
	iceFlat:
	{
		toRoad:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(0, 320),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
		}
	},
	sausageFlat:
	{
		toRoad:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(0, 448),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
		},
		toRoadLong:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(32, 448),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector2D(0, -2),
			exitAngle: 0,
			collisionOffset: new Vector2D(0, -0.5),
			collisionExtents: new Vector2D(1, 2),
			transitionTo: { material: "roadFlat" },
		},
		narrowCentre:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(224, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
		},
		narrowRight:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(256, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
		},
		narrowLeft:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(288, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector2D(0, -1),
			exitAngle: 0,
		},
	},
};

let SanitisePieceType = function(pieceType, pieceMaterial)
{
	pieceType.pieceMaterial = pieceMaterial;
	if (pieceType.tags === undefined) { pieceType.tags = []; }
}

let SanitiseBespokePieceTypes = function()
{
	Object.getOwnPropertyNames(gPieceTypes).forEach(pieceMaterialKey =>
	{
		Object.getOwnPropertyNames(gPieceTypes[pieceMaterialKey]).forEach(pieceTypeKey =>
		{
			SanitisePieceType(gPieceTypes[pieceMaterialKey][pieceTypeKey], pieceMaterialKey);
		});
	});
}

let CreatePieceTypesFromTemplate = function(templateObject, pieceMaterial, extraImageOffset)
{
	//Create material object if it doesn't exist.
	if (gPieceTypes[pieceMaterial] === undefined) { gPieceTypes[pieceMaterial] = {}; }

	Object.getOwnPropertyNames(templateObject).forEach(templateKey =>
	{
		let template = templateObject[templateKey];

		//Clone template object first.
		let newPieceType = {};
		Object.getOwnPropertyNames(template).forEach(key => newPieceType[key] = template[key]);

		if (!newPieceType.absoluteImageOffset)
		{
			newPieceType.imageOffset = Vector2DStatic.CreateAddition(newPieceType.imageOffset, extraImageOffset);
		}

		SanitisePieceType(newPieceType, pieceMaterial);

		gPieceTypes[pieceMaterial][templateKey] = newPieceType;
	});
}

let InitialisePieceTypes = function()
{
	SanitiseBespokePieceTypes();

	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "roadFlat", new Vector2D(0, 0));
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "dirtFlat", new Vector2D(0, 128));
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "iceFlat", new Vector2D(0, 256));
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "sausageFlat", new Vector2D(0, 384));
}

////////////////////////////////////////////////////////////////////////////////
// Finding appropriate pieces
////////////////////////////////////////////////////////////////////////////////

let GetPieceMaterials = function()
{
	return Object.getOwnPropertyNames(gPieceTypes);
}

let SelectPieceMaterialFromTag = function(tagToFind, materialBlacklist)
{
	let suitablePieceMaterials = [];

	Object.getOwnPropertyNames(gPieceTypes).forEach(pieceMaterialKey =>
	{
		if (materialBlacklist && materialBlacklist.includes(pieceMaterialKey))
			return;
		
		Object.getOwnPropertyNames(gPieceTypes[pieceMaterialKey]).forEach(pieceTypeKey =>
		{
			let pieceType = gPieceTypes[pieceMaterialKey][pieceTypeKey];

			if (pieceType.tags && !pieceType.tags.includes(tagToFind))
				return;
			
			suitablePieceMaterials.push(pieceMaterialKey);
		});
	});

	return suitablePieceMaterials.length > 0 ? suitablePieceMaterials[Math.floor(gRandom() * suitablePieceMaterials.length)] : null;
}

let FindAllSuitablePieceTypes = function(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement)
{
	let suitablePieceTypes = [];
	
	Object.getOwnPropertyNames(gPieceTypes[pieceMaterial]).forEach(pieceTypeKey =>
	{
		let pieceType = gPieceTypes[pieceMaterial][pieceTypeKey];
		
		//Is the piece type in the blacklist?
		if (pieceTypeBlacklist.includes(pieceType))
			return;
		
		if (pieceType.tags)
		{
			//Are any of the tags in the blacklist?
			if (tagBlacklist.find(tag => pieceType.tags.includes(tag)))
				return;
			
			//Are all of the tags in the whitelist?
			if (tagWhitelist.reduce((count, tag) => pieceType.tags.includes(tag) ? count + 1 : count, 0) != tagWhitelist.length)
				return;
		}

		if (pieceType.transitionTo)
		{
			//Does the piece transition to a piece in the blacklist?
			if (pieceType.transitionTo.material && tagBlacklist.includes(pieceType.transitionTo.material))
				return;

			if (pieceType.transitionTo.material && tagBlacklist.includes(pieceType.transitionTo.tag))
				return;
		}

		//Exclude the piece with a random chance.
		if (pieceType.probability !== undefined && gRandom() > pieceType.probability)
			return;
		
		//Check if the piece fits.
		if (!forcePlacement && !CanPlacePiece(translation, rotation, pieceType))
			return;
		
		suitablePieceTypes.push(pieceType);
	});
	
	return suitablePieceTypes;
}

let SelectSuitablePieceType = function(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement)
{
	let allSuitablePieceTypes = FindAllSuitablePieceTypes(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement);
	return allSuitablePieceTypes.length > 0 ? allSuitablePieceTypes[Math.floor(gRandom() * allSuitablePieceTypes.length)] : null;
}
