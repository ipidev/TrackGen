"use strict"

let gPlacedPieces = [];
let gRandom = null;
let gTrackDimensions = null;

let PlacePiece = function(translation, rotation, trackPieceType)
{
	gPlacedPieces.push(
	{
		translation: Vector3DStatic.CreateCopy(translation),
		rotation: rotation,
		trackPieceType: trackPieceType,
	});
}

let ApplyPieceOffset = function(translation, rotation, trackPieceType)
{
	let rotatedOffset = Vector3DStatic.CreateCopy(trackPieceType.exitOffset);
	rotatedOffset.RotateYaw(rotation);

	let newTranslation = Vector3DStatic.CreateCopy(translation);
	newTranslation.x += rotatedOffset.x;
	newTranslation.y += rotatedOffset.y;
	newTranslation.z += rotatedOffset.z;
	rotation += trackPieceType.exitAngle;
	
	return { translation: newTranslation, rotation: rotation };
}

let GetTrackPieceAABB = function(translation, rotation, trackPieceType)
{
	if (!trackPieceType.collisionExtents || !trackPieceType.collisionOffset)
	{
		let returnValue =
		{
			min: new Vector3D(translation.x - 0.5, translation.y - 0.5, translation.z - 0.5),
			max: new Vector3D(translation.x + 0.5, translation.y + 0.5, translation.z + 0.5),
		};
		return returnValue;
	}
	
	let rotatedCollisionOffset = Vector3DStatic.CreateCopy(trackPieceType.collisionOffset);
	rotatedCollisionOffset.RotateYaw(rotation);
	
	rotatedCollisionOffset.x += translation.x;
	rotatedCollisionOffset.y += translation.y;
	rotatedCollisionOffset.z += translation.z;
	
	let extent1 = Vector3DStatic.CreateCopy(rotatedCollisionOffset);
	extent1.x += trackPieceType.collisionExtents.x;
	extent1.y += trackPieceType.collisionExtents.y;
	extent1.z += trackPieceType.collisionExtents.z;
	
	let extent2 = Vector3DStatic.CreateCopy(rotatedCollisionOffset);
	extent2.x -= trackPieceType.collisionExtents.x;
	extent2.y -= trackPieceType.collisionExtents.y;
	extent2.z -= trackPieceType.collisionExtents.z;
	
	let returnValue =
	{
		min: new Vector3D(Math.min(extent1.x, extent2.x), Math.min(extent1.y, extent2.y), Math.min(extent1.z, extent2.z)),
		max: new Vector3D(Math.max(extent1.x, extent2.x), Math.max(extent1.y, extent2.y), Math.max(extent1.z, extent2.z)),
	};
	return returnValue;
}

let DoesPieceCollide = function(translation, rotation, trackPieceType)
{
	let DoesAABBIntersect = function(a, b)
	{
		return a.min.x < b.max.x && a.max.x > b.min.x &&
				a.min.y < b.max.y && a.max.y > b.min.y &&
				a.min.z < b.max.z && a.max.z > b.min.z;
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
	return translation.x < Math.floor(gTrackDimensions.x * -0.5) + 1 ||
			translation.x > Math.floor(gTrackDimensions.x * 0.5) ||
			translation.y < Math.floor(gTrackDimensions.y * -0.5) + 1 ||
			translation.y > Math.floor(gTrackDimensions.y * 0.5) ||
			translation.z < 0 ||
			translation.z > gTrackDimensions.z - 1;
}

let CanPlacePiece = function(translation, rotation, trackPieceType)
{
	let offsetPositions = ApplyPieceOffset(translation, rotation, trackPieceType);
	return !DoesPieceCollide(translation, rotation, trackPieceType) && !IsOutOfBounds(translation) &&
		!DoesPieceCollide(offsetPositions.translation, offsetPositions.rotation, gPieceTypes.roadFlat.straight) && !IsOutOfBounds(offsetPositions.translation);
}

let GenerateTrack = function(seed, length, dimensions, checkpointCount, materialWhitelist)
{
	gPlacedPieces.length = 0;
	gRandom = mulberry32(seed);
	gTrackDimensions = dimensions;

	//Set starting position and create the start line.
	let GetRandomStartCoordinate = function(dimension) { return Math.round((gRandom() - 0.5) * Math.floor(dimension * 0.5)); };
	let currentTranslation = new Vector3D(GetRandomStartCoordinate(dimensions.x), GetRandomStartCoordinate(dimensions.y), 0);
	let currentRotation = Math.floor(gRandom() * 4) * 0.5 * Math.PI;

	//Setup the tags that will be used to place pieces.
	let materialBlacklist = GetPieceMaterials().filter(material => !materialWhitelist.includes(material));

	let pieceTagWhitelist = [];
	let pieceTagBlacklist = [].concat(materialBlacklist);

	let pieceMaterial = SelectPieceMaterialFromTag("startLine", materialBlacklist);
	if (!pieceMaterial)
		return;
	
	//Place the start line.
	{
		let startLinePieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceMaterial, ["startLine"], pieceTagBlacklist, [], true);
		if (!startLinePieceType)
			return;	//Oh dear.
		
		PlacePiece(currentTranslation, currentRotation, startLinePieceType);

		let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, startLinePieceType);
		currentTranslation = offsetPositions.translation;
		currentRotation = offsetPositions.rotation;
	}

	let nextCheckpointIndex = checkpointCount > 0 ? length / (checkpointCount + 1) : -1;
	
	let deadEndsHit = 0;
	let lastDeadEndPieceType = null;

	for (let pieceIndex = 0; pieceIndex < length && deadEndsHit < 20; ++pieceIndex)
	{
		let nextPieceType = null;
		
		//See if we need to place a checkpoint.
		if (nextCheckpointIndex >= 0 && pieceIndex >= Math.floor(nextCheckpointIndex))
		{
			let checkpointPieceType = SelectSuitablePieceType(currentTranslation, currentRotation,
				pieceMaterial, pieceTagWhitelist.concat(["checkpoint"]), pieceTagBlacklist, []);
			if (checkpointPieceType)
			{
				nextPieceType = checkpointPieceType;
				nextCheckpointIndex += length / (checkpointCount + 1);
			}
		}
		
		//Randomly select a piece.
		if (nextPieceType === null)
		{
			nextPieceType = SelectSuitablePieceType(currentTranslation, currentRotation,
				pieceMaterial, pieceTagWhitelist, pieceTagBlacklist.concat([ "progress" ]), [ lastDeadEndPieceType ]);
		}
		
		//Clear the whitelist each time (might need more flexible solution)
		pieceTagWhitelist.length = 0;

		//Place the piece (if we have one).
		if (nextPieceType !== null)
		{
			PlacePiece(currentTranslation, currentRotation, nextPieceType);
			
			let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, nextPieceType);
			currentTranslation = offsetPositions.translation;
			currentRotation = offsetPositions.rotation;
			
			lastDeadEndPieceType = null;

			//If this piece causes a transition, alter the whitelist.
			if (nextPieceType.transitionTo)
			{
				if (nextPieceType.transitionTo.probability === undefined ||
					gRandom() <= nextPieceType.transitionTo.probability)
				{
					if (nextPieceType.transitionTo.material && !materialBlacklist.includes(nextPieceType.transitionTo.material))
					{
						if (nextPieceType.transitionTo.material == "any")
						{
							pieceMaterial = SelectPieceMaterialFromTag("startLine", materialBlacklist);
						}
						else
						{
							pieceMaterial = nextPieceType.transitionTo.material;
						}
					}
					
					if (nextPieceType.transitionTo.tag)
					{
						pieceTagWhitelist.push(nextPieceType.transitionTo.tag);
					}
				}
			}
		}
		//Can't place the piece - back up
		else
		{
			//Reduce index and count dead-ends hit
			++deadEndsHit;

			let timesToBackUp = Math.max(1, Math.floor(Math.min(deadEndsHit * 0.5, gPlacedPieces.length * 0.25)));
			for (let j = 0; j < timesToBackUp && gPlacedPieces.length > 1; ++j)
			{
				//Don't select this piece again
				let deadEndPiece = gPlacedPieces.pop();
				lastDeadEndPieceType = deadEndPiece.trackPieceType;
				
				//Step backwards
				currentTranslation = deadEndPiece.translation;
				currentRotation = deadEndPiece.rotation;
				pieceMaterial = lastDeadEndPieceType.pieceMaterial;
			}

			pieceIndex = gPlacedPieces.length - 1;
		}
	}
	
	//Place the finish line.
	for (let i = 0; i < 3; ++i)
	{
		let finishLinePieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceMaterial, ["finishLine"], pieceTagBlacklist, [], true);
		if (finishLinePieceType)
		{
			PlacePiece(currentTranslation, currentRotation, finishLinePieceType);
			break;
		}
		
		//This material doesn't have a finish line - transition to one that does.
		let pieceMaterials = GetPieceMaterials();
		for (let j = 0; j < pieceMaterials.length; ++j)
		{
			if (FindPieceTypeByPredicate(pieceMaterials[j], pieceType => pieceType.tags.includes("finishLine")))
			{
				let transitionPieceType = FindPieceTypeByPredicate(pieceMaterial, pieceType =>
				{
					return pieceType.transitionTo !== undefined && pieceType.transitionTo.material == pieceMaterials[j];
				});
				if (transitionPieceType)
				{
					PlacePiece(currentTranslation, currentRotation, transitionPieceType);
			
					let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, transitionPieceType);
					currentTranslation = offsetPositions.translation;
					currentRotation = offsetPositions.rotation;
					
					pieceMaterial = pieceMaterials[j];
					break;
				}
			}
		}
	}
}