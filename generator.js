"use strict"

let gTrackPiecesImage = new Image();
gTrackPiecesImage.src = "images/trackmaniaPieces.png";

let gPlacedPieces = [];
let gRandom = null;

let PlacePiece = function(translation, rotation, trackPieceType)
{
	gPlacedPieces.push(
	{
		translation: Vector2DStatic.CreateCopy(translation),
		rotation: rotation,
		trackPieceType: trackPieceType,
	});
}

let ApplyPieceOffset = function(translation, rotation, trackPieceType)
{
	let rotatedOffset = Vector2DStatic.CreateCopy(trackPieceType.exitOffset);
	rotatedOffset.Rotate(rotation);
	
	let newTranslation = Vector2DStatic.CreateCopy(translation);
	newTranslation.x += rotatedOffset.x;
	newTranslation.y += rotatedOffset.y;
	rotation += trackPieceType.exitAngle;
	
	return { translation: newTranslation, rotation: rotation };
}

let GetTrackPieceAABB = function(translation, rotation, trackPieceType)
{
	if (!trackPieceType.collisionExtents || !trackPieceType.collisionOffset)
	{
		let returnValue =
		{
			min: new Vector2D(translation.x - 0.5, translation.y - 0.5),
			max: new Vector2D(translation.x + 0.5, translation.y + 0.5),
		};
		return returnValue;
	}
	
	let rotatedCollisionOffset = Vector2DStatic.CreateCopy(trackPieceType.collisionOffset);
	rotatedCollisionOffset.Rotate(rotation);
	
	rotatedCollisionOffset.x += translation.x;
	rotatedCollisionOffset.y += translation.y;
	
	let extent1 = Vector2DStatic.CreateCopy(rotatedCollisionOffset);
	extent1.x += trackPieceType.collisionExtents.x;
	extent1.y += trackPieceType.collisionExtents.y;
	
	let extent2 = Vector2DStatic.CreateCopy(rotatedCollisionOffset);
	extent2.x -= trackPieceType.collisionExtents.x;
	extent2.y -= trackPieceType.collisionExtents.y;
	
	let returnValue =
	{
		min: new Vector2D(Math.min(extent1.x, extent2.x), Math.min(extent1.y, extent2.y)),
		max: new Vector2D(Math.max(extent1.x, extent2.x), Math.max(extent1.y, extent2.y)),
	};
	return returnValue;
}

let HasPieceBeenPlaced = function(translation)
{
	let AreVectorsNearlyEqual = function(a, b)
	{
		return Math.abs(a.x - b.x) < 0.01 && Math.abs(a.y - b.y) < 0.01;
	}
	
	for (let i = 0; i < gPlacedPieces.length; ++i)
	{
		if (AreVectorsNearlyEqual(gPlacedPieces[i].translation, translation))
			return true;
	}
	
	return false;
}

let DoesPieceCollide = function(translation, rotation, trackPieceType)
{
	let DoesAABBIntersect = function(a, b)
	{
		return a.min.x < b.max.x && a.max.x > b.min.x &&
				a.min.y < b.max.y && a.max.y > b.min.y;
	}
	
	let currentPieceAABB = GetTrackPieceAABB(translation, rotation, trackPieceType);
	
	for (let i = 0; i < gPlacedPieces.length; ++i)
	{
		let placedPieceAABB = GetTrackPieceAABB(gPlacedPieces[i].translation, gPlacedPieces[i].rotation, gPlacedPieces[i].trackPieceType);
		if (DoesAABBIntersect(placedPieceAABB, currentPieceAABB))
			return true;
	}
	
	return false;
}

let IsOutOfBounds = function(translation)
{
	return translation.x <= -23 || translation.x >= 23 || translation.y <= -23 || translation.y >= 23;
}

let CanPlacePiece = function(translation, rotation, trackPieceType)
{
	let offsetPositions = ApplyPieceOffset(translation, rotation, trackPieceType);
	return !DoesPieceCollide(translation, rotation, trackPieceType) && !IsOutOfBounds(translation) &&
		!DoesPieceCollide(offsetPositions.translation, offsetPositions.rotation, gPieceTypes.roadFlatStraight) && !IsOutOfBounds(offsetPositions.translation);
}

let GenerateTrack = function(length, checkpointCount, seed)
{
	gPlacedPieces.length = 0;
	gRandom = seed ? mulberry32(seed) : mulberry32(Math.floor(Math.random() * 4294967296));

	//Setup the tags that will be used to place pieces.
	let pieceTagWhitelist = [ "road", "flat" ];

	//Set starting position and create the start line.
	let currentTranslation = new Vector2D(Math.floor(gRandom() * 24) - 12, Math.floor(gRandom() * 24) - 12);
	let currentRotation = 0;
	
	PlacePiece(currentTranslation, currentRotation, SelectSuitablePieceType(currentTranslation, currentRotation, pieceTagWhitelist.concat(["startLine"]), [], []));
	currentTranslation.y -= 1;

	let nextCheckpointIndex = checkpointCount > 0 ? length / (checkpointCount + 1) : -1;
	
	let deadEndsHit = 0;
	let lastDeadEndPieceType = null;

	for (let i = 0; i < length && deadEndsHit < 10; ++i)
	{
		let nextPieceType = null;
		
		//See if we need to place a checkpoint.
		if (nextCheckpointIndex >= 0 && i >= Math.floor(nextCheckpointIndex))
		{
			let checkpointPieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceTagWhitelist.concat(["checkpoint"]), [], []);
			if (checkpointPieceType)
			{
				nextPieceType = checkpointPieceType;
				nextCheckpointIndex += length / (checkpointCount + 1);
			}
		}
		
		//Randomly select a piece.
		if (nextPieceType === null)
		{
			nextPieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceTagWhitelist, [ "startLine", "checkpoint", "finishLine" ], [ lastDeadEndPieceType ]);
		}
		
		//Place the piece (if we have one).
		if (nextPieceType !== null)
		{
			PlacePiece(currentTranslation, currentRotation, nextPieceType);
			
			let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, nextPieceType);
			currentTranslation = offsetPositions.translation;
			currentRotation = offsetPositions.rotation;
			
			lastDeadEndPieceType = null;
		}
		//Can't place the piece - back up
		else
		{
			//Reduce index and count dead-ends hit
			--i;
			++deadEndsHit;

			//Don't select this piece again
			if (gPlacedPieces.length > 0)
			{
				let deadEndPiece = gPlacedPieces.pop();
				lastDeadEndPieceType = deadEndPiece.trackPieceType;
				
				//Step backwards
				currentTranslation = deadEndPiece.translation;
				currentRotation = deadEndPiece.rotation;
			}
		}
	}
	
	PlacePiece(currentTranslation, currentRotation, SelectSuitablePieceType(currentTranslation, currentRotation, pieceTagWhitelist.concat(["finishLine"]), [], [], true));
}