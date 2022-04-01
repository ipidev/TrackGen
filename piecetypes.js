"use strict"

//Piece types object.
let gPieceTypes =
{
	roadFlatStraight:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(0, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	roadFlatCornerRight:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(32, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(1, 0),
		exitAngle: Math.PI * 0.5,
	},
	roadFlatCornerLeft:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(64, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(-1, 0),
		exitAngle: Math.PI * -0.5,
	},
	roadStartLine:
	{
		tags: [ "road", "flat", "startLine" ],
		imageOffset: new Vector2D(0, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	roadFlatCheckpoint:
	{
		tags: [ "road", "flat", "checkpoint" ],
		imageOffset: new Vector2D(32, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	roadFinishLine:
	{
		tags: [ "road", "flat", "finishLine" ],
		imageOffset: new Vector2D(64, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	roadFlatCurveRight:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(96, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(2, -1),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector2D(0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	roadFlatCurveLeft:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(160, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(-2, -1),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector2D(-0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	roadFlatBigCurveRight:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(224, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector2D(3, -2),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector2D(1, -1),
		collisionExtents: new Vector2D(1.5, 1.5),
	},
	roadFlatBigCurveLeft:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(320, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector2D(-3, -2),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector2D(-1, -1),
		collisionExtents: new Vector2D(1.5, 1.5),
	},
	roadFlatSBendLeft:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(96, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(-1, -2),
		exitAngle: 0,
		collisionOffset: new Vector2D(-0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	roadFlatSBendRight:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(160, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector2D(1, -2),
		exitAngle: 0,
		collisionOffset: new Vector2D(0.5, -0.5),
		collisionExtents: new Vector2D(1, 1),
	},
	roadFlatBigSBendLeft:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(416, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector2D(-1, -3),
		exitAngle: 0,
		collisionOffset: new Vector2D(-0.5, -1),
		collisionExtents: new Vector2D(1, 1.5),
	},
	roadFlatBigSBendRight:
	{
		tags: [ "road", "flat" ],
		imageOffset: new Vector2D(480, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector2D(1, -3),
		exitAngle: 0,
		collisionOffset: new Vector2D(0.5, -1),
		collisionExtents: new Vector2D(1, 1.5),
	},
	roadFlatTurbo:
	{
		tags: [ "road", "flat", "engineBlock" ],
		imageOffset: new Vector2D(0, 64),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
	roadFlatSuperTurbo:
	{
		tags: [ "road", "flat", "engineBlock" ],
		imageOffset: new Vector2D(32, 64),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector2D(0, -1),
		exitAngle: 0,
	},
};

let FindAllSuitablePieceTypes = function(translation, rotation, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement)
{
	let suitablePieceTypes = [];
	
	Object.getOwnPropertyNames(gPieceTypes).forEach(pieceTypeKey =>
	{
		let pieceType = gPieceTypes[pieceTypeKey];
		
		//Is the piece type in the blacklist?
		if (pieceTypeBlacklist.find(type => pieceType == type))
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
		
		//Check if the piece fits.
		if (!forcePlacement && !CanPlacePiece(translation, rotation, pieceType))
			return;
		
		suitablePieceTypes.push(pieceType);
	});
	
	return suitablePieceTypes;
}

let SelectSuitablePieceType = function(translation, rotation, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement)
{
	let allSuitablePieceTypes = FindAllSuitablePieceTypes(translation, rotation, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement);
	return allSuitablePieceTypes.length > 0 ? allSuitablePieceTypes[Math.floor(gRandom() * allSuitablePieceTypes.length)] : null;
}