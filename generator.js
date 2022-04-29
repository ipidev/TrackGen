"use strict"

let gPlacedPieces = [];
let gRandom = null;
let gTrackDimensions = null;

//Used to 
class TimedFilterList
{
	constructor(permanentItems)
	{
		this.list = [];

		if (permanentItems instanceof Array)
			permanentItems.forEach(item => this.Add(item));
	}

	Add(value, lifetime)
	{
		if (value !== undefined && value !== null &&
			(lifetime === undefined || lifetime > 0))
		{
			this.list.push(
			{
				value: value,
				lifetime: lifetime !== undefined ? lifetime : Number.POSITIVE_INFINITY
			});
		}
	}

	GetFlatList()
	{
		let returnedList = [];
		this.list.forEach(item => returnedList.push(item.value));
		return returnedList;
	}

	StepLifetime()
	{
		for (let i = this.list.length - 1; i >= 0; --i)
		{
			if (--this.list[i].lifetime <= 0)
				this.list.splice(i, 1);
		}
	}
}

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

let GetTrackPieceAABB = function(translation, rotation, trackPieceType, scale)
{
	if (scale === undefined) { scale = 1; }

	if (!trackPieceType.collisionExtents || !trackPieceType.collisionOffset)
	{
		let returnValue =
		{
			min: new Vector3D(translation.x - (0.5 * scale), translation.y - (0.5 * scale), translation.z - 0.5),
			max: new Vector3D(translation.x + (0.5 * scale), translation.y + (0.5 * scale), translation.z + 0.5),
		};
		return returnValue;
	}
	
	let rotatedCollisionOffset = Vector3DStatic.CreateCopy(trackPieceType.collisionOffset);
	rotatedCollisionOffset.RotateYaw(rotation);
	
	rotatedCollisionOffset.x += translation.x;
	rotatedCollisionOffset.y += translation.y;
	rotatedCollisionOffset.z += translation.z;
	
	let extent1 = Vector3DStatic.CreateCopy(rotatedCollisionOffset);
	extent1.x += trackPieceType.collisionExtents.x * scale;
	extent1.y += trackPieceType.collisionExtents.y * scale;
	extent1.z += trackPieceType.collisionExtents.z;
	
	let extent2 = Vector3DStatic.CreateCopy(rotatedCollisionOffset);
	extent2.x -= trackPieceType.collisionExtents.x * scale;
	extent2.y -= trackPieceType.collisionExtents.y * scale;
	extent2.z -= trackPieceType.collisionExtents.z;
	
	let returnValue =
	{
		min: new Vector3D(Math.min(extent1.x, extent2.x), Math.min(extent1.y, extent2.y), Math.min(extent1.z, extent2.z)),
		max: new Vector3D(Math.max(extent1.x, extent2.x), Math.max(extent1.y, extent2.y), Math.max(extent1.z, extent2.z)),
	};
	return returnValue;
}

let DoesAABBIntersect = function(a, b)
{
	return a.min.x < b.max.x && a.max.x > b.min.x &&
			a.min.y < b.max.y && a.max.y > b.min.y &&
			a.min.z < b.max.z && a.max.z > b.min.z;
}

let FindCollidingPiece = function(translation, rotation, trackPieceType)
{
	//Fudge AABB to be smaller - avoids adjacent collisions for 1x1 pieces.
	let currentPieceAABB = GetTrackPieceAABB(translation, rotation, trackPieceType, 0.95);
	
	for (let i = 0; i < gPlacedPieces.length; ++i)
	{
		let placedPieceAABB = GetTrackPieceAABB(gPlacedPieces[i].translation, gPlacedPieces[i].rotation, gPlacedPieces[i].trackPieceType);
		if (DoesAABBIntersect(placedPieceAABB, currentPieceAABB))
			return gPlacedPieces[i];
	}
	
	return null;
}

let DoesPieceCollide = function(translation, rotation, trackPieceType)
{
	return FindCollidingPiece(translation, rotation, trackPieceType) !== null;
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
		(!DoesPieceCollide(offsetPositions.translation, offsetPositions.rotation, gGenericPieceType) ||
		CanBeginCrossroadChain(offsetPositions.translation, offsetPositions.rotation, trackPieceType)) &&
		!IsOutOfBounds(offsetPositions.translation);
}

let CanBeginCrossroadChain = function(translation, rotation, trackPieceType)
{
	let currentTranslation = Vector3DStatic.CreateCopy(translation);
	let displacement = Vector3DStatic.CreateCopy(gGenericPieceType.exitOffset);
	displacement.RotateYaw(rotation);

	for (let i = 0; i < 1000; ++i)
	{
		//Stepped out of bounds.
		if (IsOutOfBounds(currentTranslation))
			return false;

		let collidingPiece = FindCollidingPiece(currentTranslation, rotation, gGenericPieceType);
		if (collidingPiece === null)
		{
			//End of crossroad chain has been found.
			return true;
		}
		else
		{
			let collidingPieceType = collidingPiece.trackPieceType;

			if (!collidingPieceType.supportsCrossroad)
				return false;
			
			//Check the materials match.
			let pieceMaterialToCheck = trackPieceType.pieceMaterial;
			if (trackPieceType.transitionTo && trackPieceType.transitionTo.material)
				pieceMaterialToCheck = trackPieceType.transitionTo.material;

			if (pieceMaterialToCheck != collidingPieceType.pieceMaterial &&
				pieceMaterialToCheck != collidingPieceType.crossroadMaterial)
			{
				return false;
			}

			//Current piece supports crossroads, step forwards and check again.
			currentTranslation.x += displacement.x;
			currentTranslation.y += displacement.y;
		}
	}

	//Unreachable?
	return false;
}

let ApplyCrossroadChain = function(translation, rotation)
{
	let displacement = Vector3DStatic.CreateCopy(gGenericPieceType.exitOffset);
	displacement.RotateYaw(rotation);

	for (let i = 0; i < 1000; ++i)
	{
		let collidingPiece = FindCollidingPiece(translation, rotation, gGenericPieceType);
		if (collidingPiece === null)
			return i;
		
		let collidingPieceType = collidingPiece.trackPieceType;

		//Sanity check - should only be called when crossroad is possible.
		if (!collidingPieceType.supportsCrossroad)
			return i;
		
		//Transform piece if needed.
		if (collidingPieceType.crossroadPieceType !== undefined)
			collidingPiece.trackPieceType = (gPieceTypes[collidingPieceType.pieceMaterial])[collidingPieceType.crossroadPieceType];

		translation.x += displacement.x;
		translation.y += displacement.y;
	}

	return i;
}

let GenerateTrack = function(seed, length, dimensions, checkpointCount, materialWhitelist, featureWhitelist)
{
	gPlacedPieces.length = 0;
	gRandom = mulberry32(seed);
	gTrackDimensions = dimensions;

	let longestDeadEndTrack = [];

	//Set starting position and create the start line.
	let GetRandomStartCoordinate = function(dimension) { return Math.round((gRandom() - 0.5) * Math.floor(dimension * 0.5)); };
	let currentTranslation = new Vector3D(GetRandomStartCoordinate(dimensions.x),
		GetRandomStartCoordinate(dimensions.y),
		Math.floor(gRandom() * dimensions.z));
	let currentRotation = Math.floor(gRandom() * 4) * 0.5 * Math.PI;

	//Setup the tags that will be used to place pieces.
	let materialBlacklist = GetPieceMaterials().filter(material =>
	{
		return !materialWhitelist.find(materialStart => material.startsWith(materialStart)) ||
				!featureWhitelist.find(featureSubstr => material.includes(featureSubstr));
	});

	let pieceTagAllowedFilter = new TimedFilterList();
	let pieceTagUnallowedFilter = new TimedFilterList(materialBlacklist);

	let pieceMaterial = null;
	
	//Place the start line.
	{
		let result = PlaceStartLine(currentTranslation, currentRotation, materialBlacklist);
		if (!result.success)
			return;	//Oh dear.

		currentTranslation = result.translation;
		currentRotation = result.rotation;
		pieceMaterial = result.pieceMaterial;
	}

	let nextCheckpointIndex = checkpointCount > 0 ? length / (checkpointCount + 1) : -1;
	
	let deadEndsHit = 0;
	let minimumTrackLength = gPlacedPieces.length;
	let lastDeadEndPieceType = null;

	for (let pieceIndex = gPlacedPieces.length; pieceIndex < length && deadEndsHit < 20; ++pieceIndex)
	{
		let nextPieceType = null;
		let pieceTagWhitelist = pieceTagAllowedFilter.GetFlatList();
		let pieceTagBlacklist = pieceTagUnallowedFilter.GetFlatList();
		
		//Apply crossroads if we're overlapping a piece that supports them.
		{
			let collidingPiece = FindCollidingPiece(currentTranslation, currentRotation, gGenericPieceType);
			if (collidingPiece && collidingPiece.trackPieceType.supportsCrossroad === true)
			{
				let crossroadLength = ApplyCrossroadChain(currentTranslation, currentRotation);
				pieceIndex += crossroadLength;
				minimumTrackLength = gPlacedPieces.length;
			}
		}

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

		//Place the piece (if we have one).
		if (nextPieceType !== null)
		{
			PlacePiece(currentTranslation, currentRotation, nextPieceType);
			
			let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, nextPieceType);
			currentTranslation = offsetPositions.translation;
			currentRotation = offsetPositions.rotation;
			
			lastDeadEndPieceType = null;

			//Step the filters as we've placed a new piece.
			pieceTagAllowedFilter.StepLifetime();
			pieceTagUnallowedFilter.StepLifetime();

			//If this piece causes a transition, alter the whitelist.
			if (nextPieceType.transitionTo)
			{
				if (nextPieceType.transitionTo.probability === undefined ||
					gRandom() <= nextPieceType.transitionTo.probability)
				{
					if (nextPieceType.transitionTo.material && !materialBlacklist.includes(nextPieceType.transitionTo.material))
					{
						switch (nextPieceType.transitionTo.material)
						{
							case "#any":
								pieceMaterial = SelectPieceMaterialFromTag("startLine", materialBlacklist);
								break;
							case "#waterShallowFlatExit":
								pieceMaterial = SelectPieceMaterialFromSubstrings([ "roadFlat", "Block", "Shoulder" ], materialBlacklist);
								break;
							case "#waterShallowBlockExit":
								pieceMaterial = SelectPieceMaterialFromSubstrings([ "waterShallowFlat", "Block", "Shoulder" ], materialBlacklist);
								break;
							case "#waterShallowEntry":
								pieceMaterial = SelectPieceMaterialFromSubstrings([ "waterShallow" ], materialBlacklist);
								break;
							default:
								pieceMaterial = nextPieceType.transitionTo.material;
								break;
						}
					}
					
					if (nextPieceType.transitionTo.tag)
					{
						if (nextPieceType.transitionTo.tag.startsWith("!"))
							pieceTagUnallowedFilter.Add(nextPieceType.transitionTo.tag.slice(1), 1);
						else
							pieceTagAllowedFilter.Add(nextPieceType.transitionTo.tag, 1);
					}
				}
			}
		}
		//Can't place the piece - back up
		else
		{
			//Reduce index and count dead-ends hit
			++deadEndsHit;

			let timesToBackUp = 1;//Math.max(1, Math.floor(Math.min(deadEndsHit * 0.5, gPlacedPieces.length * 0.25)));
			for (let j = 0; j < timesToBackUp && gPlacedPieces.length > minimumTrackLength; ++j)
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

			if (gPlacedPieces.length > longestDeadEndTrack.length)
			{
				longestDeadEndTrack = [].concat(gPlacedPieces);
			}
		}

		//Centre the track if we get too close to the boundary to give us more space.
		if ((dimensions.x >= 10 || dimensions.y >= 10) &&
			(Math.abs(dimensions.x - currentTranslation.x) < 5 || Math.abs(dimensions.y - currentTranslation.y) < 5))
		{
			let recentredOffset = TryRecentreTrack();
			currentTranslation.Subtract(recentredOffset);
		}

		RenderAll(gCtx);
	}

	//Use the longest track we ever encountered.
	if (longestDeadEndTrack.length > gPlacedPieces.length)
	{
		gPlacedPieces = longestDeadEndTrack;

		let lastPiece = longestDeadEndTrack[longestDeadEndTrack.length - 1];
		let lastPieceType = lastPiece.trackPieceType;

		if (lastPieceType.transitionTo && lastPieceType.transitionTo.material &&
			!lastPieceType.transitionTo.material.startsWith("#"))
		{
			pieceMaterial = lastPieceType.transitionTo.material;
		}
		else
		{
			pieceMaterial = lastPieceType.pieceMaterial;
		}

		let offsetPositions = ApplyPieceOffset(lastPiece.translation, lastPiece.rotation, lastPiece.trackPieceType);
		currentTranslation = offsetPositions.translation;
		currentRotation = offsetPositions.rotation;
	}

	//Place the finish line.
	for (let i = 0; i < 3; ++i)
	{
		let finishLinePieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceMaterial, ["finishLine"], materialBlacklist, [], true);
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
	
	TryRecentreTrack(true);
}

let PlaceStartLine = function(currentTranslation, currentRotation, materialBlacklist)
{
	let result = {};
	result.success = false;

	let startLinePieceType = null;
	let transitionFromPieceMaterial = null;

	let pieceMaterial = SelectPieceMaterialFromTag("startLine", materialBlacklist);
	if (pieceMaterial !== null)
	{
		startLinePieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceMaterial, ["startLine"], materialBlacklist, [], true);
	}
	else
	{
		//No permitted material has a start line - find one in a material that also has a transition to a whitelisted material.
		let pieceMaterials = GetPieceMaterials();
		let materialWhitelist = pieceMaterials.filter(material => !materialBlacklist.includes(material));

		for (let i = 0; i < pieceMaterials.length; ++i)
		{
			let possibleStartLinePieceType = SelectSuitablePieceType(currentTranslation, currentRotation, pieceMaterials[i], ["startLine"], [], [], true);
			if (possibleStartLinePieceType != null)
			{
				let transitionPieceType = FindPieceTypeByPredicate(pieceMaterials[i], pieceType =>
				{
					return pieceType.transitionTo !== undefined && materialWhitelist.includes(pieceType.transitionTo.material);
				});

				if (transitionPieceType)
				{
					startLinePieceType = possibleStartLinePieceType;
					transitionFromPieceMaterial = pieceMaterials[i];
					break;
				}
			}
		}
	}

	if (!startLinePieceType)
		return result;	//Abort - failed to find valid start line.
	
	PlacePiece(currentTranslation, currentRotation, startLinePieceType);

	let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, startLinePieceType);
	currentTranslation = offsetPositions.translation;
	currentRotation = offsetPositions.rotation;

	if (transitionFromPieceMaterial !== null)
	{
		let transitionPieceType = SelectSuitablePieceType(currentTranslation, currentRotation, transitionFromPieceMaterial, [ "transition" ], materialBlacklist, [], true);
		if (!transitionPieceType)
			return result;	//Abort - failed to find valid transition.

		PlacePiece(currentTranslation, currentRotation, transitionPieceType);
	
		let offsetPositions = ApplyPieceOffset(currentTranslation, currentRotation, transitionPieceType);
		currentTranslation = offsetPositions.translation;
		currentRotation = offsetPositions.rotation;
		pieceMaterial = transitionPieceType.transitionTo.material;
	}

	result.translation = currentTranslation;
	result.rotation = currentRotation;
	result.pieceMaterial = pieceMaterial;
	result.success = true;
	return result;
}

let TryRecentreTrack = function(setOnGround)
{
	if (gPlacedPieces.length <= 0)
		return null;

	let minExtents = new Vector3D(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	let maxExtents = new Vector3D(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);

	//Average out the location of each piece.
	gPlacedPieces.forEach(placedPiece =>
	{
		minExtents.x = Math.min(minExtents.x, placedPiece.translation.x);
		minExtents.y = Math.min(minExtents.y, placedPiece.translation.y);
		minExtents.z = Math.min(minExtents.z, placedPiece.translation.z);
		maxExtents.x = Math.max(maxExtents.x, placedPiece.translation.x);
		maxExtents.y = Math.max(maxExtents.y, placedPiece.translation.y);
		maxExtents.z = Math.max(maxExtents.z, placedPiece.translation.z);
	});

	let offset = Vector3DStatic.CreateAddition(minExtents, maxExtents);
	offset.x = (offset.x * 0.5) | 0;	//Truncate (rounds towards zero)
	offset.y = (offset.y * 0.5) | 0;
	offset.z = setOnGround ? minExtents.z : 0;

	if (offset.x !== 0 || offset.y !== 0 || offset.z !== 0)
	{
		gPlacedPieces.forEach(placedPiece =>
		{
			placedPiece.translation.Subtract(offset);
		});
	}

	return offset;
}