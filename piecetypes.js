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
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
	},
	cornerRight:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(32, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
	},
	cornerLeft:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(64, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
	},
	startLine:
	{
		tags: [ "progress", "startLine" ],
		imageOffset: new Vector2D(0, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
	},
	checkpoint:
	{
		tags: [ "progress", "checkpoint" ],
		imageOffset: new Vector2D(32, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
	},
	finishLine:
	{
		tags: [ "progress", "finishLine" ],
		imageOffset: new Vector2D(64, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
	},
	curveRight:
	{
		imageOffset: new Vector2D(96, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(2, -1, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
	},
	curveLeft:
	{
		imageOffset: new Vector2D(160, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-2, -1, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
	},
	bigCurveRight:
	{
		imageOffset: new Vector2D(224, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector3D(3, -2, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(1, -1, 0.5),
		collisionExtents: new Vector3D(1.5, 1.5, 0.5),
	},
	bigCurveLeft:
	{
		imageOffset: new Vector2D(320, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector3D(-3, -2, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-1, -1, 0.5),
		collisionExtents: new Vector3D(1.5, 1.5, 0.5),
	},
	sBendLeft:
	{
		imageOffset: new Vector2D(96, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
	},
	sBendRight:
	{
		imageOffset: new Vector2D(160, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
	},
	bigSBendLeft:
	{
		imageOffset: new Vector2D(416, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector3D(-1, -3, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -1, 0.5),
		collisionExtents: new Vector3D(1, 1.5, 0.5),
	},
	bigSBendRight:
	{
		imageOffset: new Vector2D(480, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector3D(1, -3, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, -1, 0.5),
		collisionExtents: new Vector3D(1, 1.5, 0.5),
	},
	turbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(320, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterTurbo" },
	},
	superTurbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(352, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.5,
		transitionTo: { tag: "!notAfterTurbo" },
	},
	boostUp:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(384, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
	},
	superBoostUp:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(416, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.333,
		transitionTo: { tag: "!notAfterBoost" },
	},
	boostDown:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(448, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
	},
	superBoostDown:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(480, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.5,
		transitionTo: { tag: "!notAfterBoost" },
	},
	rampUpLevelGentle:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(544, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		useCollisionForRender: true,
	},
	rampDownLevelGentle:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(576, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		useCollisionForRender: true,
	},
	rampUpLevelSteep:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(544, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		useCollisionForRender: true,
	},
	rampDownLevelSteep:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(576, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		useCollisionForRender: true,
	},
	rampUpLevelLong:
	{
		tags: [ "ramp" ],
		imageOffset: new Vector2D(544, 64),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1),
		collisionExtents: new Vector3D(0.5, 1, 1),
		useCollisionForRender: true,
	},
	rampDownLevelLong:
	{
		tags: [ "ramp" ],
		imageOffset: new Vector2D(576, 64),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, -1),
		collisionExtents: new Vector3D(0.5, 1, 1),
		useCollisionForRender: true,
	},
};

//Piece types object.
let gPieceTypes =
{
	roadFlat:
	{
		toDirt:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(224, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "dirtFlat" },
		},
		toIce:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(256, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "iceFlat" },
		},
		toSausage:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(288, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "sausageFlat" },
		},
		toSausageLong:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(64, 448),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, -0.5, 0.5),
			collisionExtents: new Vector3D(1, 2, 0.5),
			transitionTo: { material: "sausageFlat" },
		},
		jump:
		{
			tags: [ "jump", "notAfterTurbo" ],
			imageOffset: new Vector2D(0, 64),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			transitionTo: { material: "any", tag: "straight" },
		},
	},
	dirtFlat:
	{
		toRoad:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(0, 192),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
		},
		largeBump:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(32, 192),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
		},
		smallBumps:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(64, 192),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
		},
	},
	iceFlat:
	{
		toRoad:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(0, 320),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
		}
	},
	sausageFlat:
	{
		toRoad:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(0, 448),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
		},
		toRoadLong:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(32, 448),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, -0.5, 0.5),
			collisionExtents: new Vector3D(1, 2, 0.5),
			transitionTo: { material: "roadFlat" },
		},
		narrowCentre:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(224, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
		},
		narrowRight:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(256, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
		},
		narrowLeft:
		{
			tags: [ "straight" ],
			imageOffset: new Vector2D(288, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
		},
	},
	waterShallow:
	{
		toWaterDeep:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(0, 576),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, -1),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, -1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "waterDeep" },
		},
	},
	waterDeep:
	{
		toWaterShallow:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(0, 704),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 1),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "waterShallow" },
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

let CreatePieceTypesFromTemplate = function(templateObject, pieceMaterial, extraImageOffset, tagBlacklist, extraHeight)
{
	//Create material object if it doesn't exist.
	if (gPieceTypes[pieceMaterial] === undefined) { gPieceTypes[pieceMaterial] = {}; }

	Object.getOwnPropertyNames(templateObject).forEach(templateKey =>
	{
		let template = templateObject[templateKey];

		if (template.tags && tagBlacklist !== undefined)
		{
			//Are any of the tags in the blacklist?
			if (tagBlacklist.find(tag => template.tags.includes(tag)))
				return;
		}

		//Clone template object first.
		let newPieceType = {};
		Object.getOwnPropertyNames(template).forEach(key => newPieceType[key] = template[key]);

		if (!newPieceType.absoluteImageOffset)
		{
			newPieceType.imageOffset = Vector2DStatic.CreateAddition(newPieceType.imageOffset, extraImageOffset);
		}

		//Some materials are taller than others
		if (extraHeight !== undefined)
		{
			if (newPieceType.collisionOffset === undefined && newPieceType.collisionExtents === undefined)
			{
				newPieceType.collisionOffset = new Vector3D(0, 0, 0.5);
				newPieceType.collisionExtents = new Vector3D(0.5, 0.5, 0.5);
			}
			else
			{
				newPieceType.collisionOffset = Vector3DStatic.CreateCopy(newPieceType.collisionOffset);
				newPieceType.collisionExtents = Vector3DStatic.CreateCopy(newPieceType.collisionExtents);
			}

			//Convert extents to height, perform addition, divide back into extents
			newPieceType.collisionOffset.z += extraHeight * 0.5;
			newPieceType.collisionExtents.z = ((newPieceType.collisionExtents.z * 2) + extraHeight) * 0.5;
		}

		SanitisePieceType(newPieceType, pieceMaterial);

		gPieceTypes[pieceMaterial][templateKey] = newPieceType;
	});
}

let ModifyPieceTypeProperty = function(pieceMaterialKey, propertyKey, propertyValue, tagBlacklist)
{
	Object.getOwnPropertyNames(gPieceTypes[pieceMaterialKey]).forEach(pieceTypeKey =>
	{
		let pieceType = gPieceTypes[pieceMaterialKey][pieceTypeKey];

		if (pieceType[propertyKey] !== undefined && typeof pieceType[propertyKey] !== "number")
			return;

		if (pieceType.tags && tagBlacklist !== undefined)
		{
			//Are any of the tags in the blacklist?
			if (tagBlacklist.find(tag => pieceType.tags.includes(tag)))
				return;
		}

		if (pieceType[propertyKey] === undefined)
		{
			pieceType[propertyKey] = propertyValue;
		}
		else
		{
			pieceType[propertyKey] *= propertyValue;
		}
	});
}

let InitialisePieceTypes = function()
{
	SanitiseBespokePieceTypes();

	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "roadFlat", new Vector2D(0, 0));
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "dirtFlat", new Vector2D(0, 128));
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "iceFlat", new Vector2D(0, 256), undefined, 1);
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "sausageFlat", new Vector2D(0, 384));
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "waterShallow", new Vector2D(0, 512), [ "ramp" ]);
	CreatePieceTypesFromTemplate(gTrackPieceTemplates, "waterDeep", new Vector2D(0, 640), [ "ramp", "progress" ], 1);

	//Special-case transitions.
	ModifyPieceTypeProperty("roadFlat", "transitionTo", { material: "waterShallow", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("waterShallow", "transitionTo", { material: "roadFlat", probability: 0.25 }, [ "ramp" ]);

	//Shorten deep water sections and make them appear on more layers.
	ModifyPieceTypeProperty("waterDeep", "probability", 0.1, [ "transition "]);
	ModifyPieceTypeProperty("waterDeep", "useCollisionForRender", true);
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

let FindPieceTypeByPredicate = function(pieceMaterial, predicate)
{
	let pieceTypeKey = Object.getOwnPropertyNames(gPieceTypes[pieceMaterial]).find(pieceTypeKey =>
	{
		return predicate(gPieceTypes[pieceMaterial][pieceTypeKey]);
	});
	return pieceTypeKey ? gPieceTypes[pieceMaterial][pieceTypeKey] : null;
}

let FindAllSuitablePieceTypes = function(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, alwaysUse)
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

		if (pieceType.transitionTo && !pieceType.transitionTo.probability)
		{
			//Does the piece transition to a piece in the blacklist?
			if (pieceType.transitionTo.material && tagBlacklist.includes(pieceType.transitionTo.material))
				return;

			if (pieceType.transitionTo.material && tagBlacklist.includes(pieceType.transitionTo.tag))
				return;
		}

		if (!alwaysUse)
		{
			//Exclude the piece with a random chance.
			if (pieceType.probability !== undefined && gRandom() > pieceType.probability)
				return;
			
			//Check if the piece fits.
			if (!CanPlacePiece(translation, rotation, pieceType))
				return;
		}
		
		suitablePieceTypes.push(pieceType);
	});
	
	return suitablePieceTypes;
}

let SelectSuitablePieceType = function(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement)
{
	let allSuitablePieceTypes = FindAllSuitablePieceTypes(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement);
	return allSuitablePieceTypes.length > 0 ? allSuitablePieceTypes[Math.floor(gRandom() * allSuitablePieceTypes.length)] : null;
}
