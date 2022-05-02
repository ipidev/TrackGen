"use strict"

////////////////////////////////////////////////////////////////////////////////
// Piece type templates
////////////////////////////////////////////////////////////////////////////////

let gGenericPieceTemplates =
{
	straight:
	{
		tags: [ "straight" ],
		imageOffset: new Vector2D(0, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
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
	crossroad:
	{
		tags: [ "crossroad" ],
		imageOffset: new Vector2D(0, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		probability: 0,	//Don't allow normal placement
		supportsCrossroad: true,
	},
};

//Templates for materials that transition to banked pieces.
let gBankTransitionPieceTemplates =
{
	toBankRightLevelShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(608, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		transitionTo: { material: "BankRight" },
	},
	toBankRightDownShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(608, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 0),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		transitionTo: { material: "BankRight" },
	},
	toBankRightLevelLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(640, 0),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1),
		collisionExtents: new Vector3D(0.5, 1, 1),
		transitionTo: { material: "BankRight" },
	},
	toBankRightDownLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(640, 64),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 0),
		collisionExtents: new Vector3D(0.5, 1, 1),
		transitionTo: { material: "BankRight" },
	},
	toBankLeftLevelShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(608, 64),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		transitionTo: { material: "BankLeft" },
	},
	toBankLeftDownShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(608, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 0),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		transitionTo: { material: "BankLeft" },
	},
	toBankLeftLevelLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(672, 0),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1),
		collisionExtents: new Vector3D(0.5, 1, 1),
		transitionTo: { material: "BankLeft" },
	},
	toBankLeftDownLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(672, 64),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 0),
		collisionExtents: new Vector3D(0.5, 1, 1),
		transitionTo: { material: "BankLeft" },
	},
};

//Templates for right-banked pieces (can be flipped for left-banking pieces)
let gBankedPieceTemplates =
{
	straight:
	{
		tags: [ "straight" ],
		imageOffset: new Vector2D(704, 0),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
	},
	checkpoint:
	{
		tags: [ "progress", "checkpoint" ],
		imageOffset: new Vector2D(704, 64),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
	},
	corner:
	{
		imageOffset: new Vector2D(704, 32),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
	},
	curve:
	{
		imageOffset: new Vector2D(736, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(2, -2, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0.5, 0.5, 1),
		collisionExtents: new Vector3D(1, 1, 1),
	},
	curveBig:
	{
		imageOffset: new Vector2D(800, 0),
		imageDimensions: new Vector2D(96, 96),
		exitOffset: new Vector3D(3, -3, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(1, 1, 1),
		collisionExtents: new Vector3D(1.5, 1.5, 1),
	},
	sBendOut:
	{
		imageOffset: new Vector2D(736, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-1, -2, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -0.5, 1.5),
		collisionExtents: new Vector3D(1, 1, 1.5),
	},
	bigSBendOut:
	{
		imageOffset: new Vector2D(896, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector3D(-1, -3, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -1, 1.5),
		collisionExtents: new Vector3D(1, 1.5, 1.5),
	},
	sBendIn:
	{
		imageOffset: new Vector2D(1024, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(1, -2, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 1.5),
	},
	bigSBendIn:
	{
		imageOffset: new Vector2D(960, 0),
		imageDimensions: new Vector2D(64, 96),
		exitOffset: new Vector3D(1, -3, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, -1, 0.5),
		collisionExtents: new Vector3D(1, 1.5, 1.5),
	},
	toFlatLevelShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(960, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		transitionTo: { material: "Flat" },
	},
	toFlatUpShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(992, 96),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		transitionTo: { material: "Flat" },
	},
	toFlatLevelLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1024, 64),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1),
		collisionExtents: new Vector3D(0.5, 1, 1),
		transitionTo: { material: "Flat" },
	},
	toFlatUpLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1056, 64),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1),
		collisionExtents: new Vector3D(0.5, 1, 1),
		transitionTo: { material: "Flat" },
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
};

let gBlockPieceTemplates =
{
	straight:
	{
		tags: [ "straight" ],
		imageOffset: new Vector2D(576, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		supportsCrossroad: true,
	},
	cornerRight:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(576, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
	},
	cornerLeft:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(576, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
	},
	triangleRight:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(800, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
		blockRenderType: "triangleRight",
	},
	triangleLeft:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(800, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
		blockRenderType: "triangleLeft",
	},
	startLine:
	{
		tags: [ "progress", "startLine" ],
		imageOffset: new Vector2D(544, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		supportsCrossroad: true,
	},
	checkpoint:
	{
		tags: [ "progress", "checkpoint" ],
		imageOffset: new Vector2D(576, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		supportsCrossroad: true,
	},
	finishLine:
	{
		tags: [ "progress", "finishLine" ],
		imageOffset: new Vector2D(608, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		supportsCrossroad: true,
	},
	rampUpLevelGentle:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(608, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		useCollisionForRender: true,
	},
	rampUpLevelSteep:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(640, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		useCollisionForRender: true,
	},
	rampDownLevelGentle:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(672, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		useCollisionForRender: true,
	},
	rampDownLevelSteep:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(704, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		useCollisionForRender: true,
	},
	holeStraight:
	{
		tags: [ "hole", "notAfterTurbo", "notAfterBoost" ],
		imageOffset: new Vector2D(640, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		probability: 0.25,
		supportsCrossroad: true,
	},
	holeCornerRight:
	{
		tags: [ "hole", "notAfterTurbo", "notAfterBoost" ],
		imageOffset: new Vector2D(640, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
		probability: 0.25,
	},
	holeCornerLeft:
	{
		tags: [ "hole", "notAfterTurbo", "notAfterBoost" ],
		imageOffset: new Vector2D(640, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
		probability: 0.25,
	},
	turbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(608, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterTurbo" },
		supportsCrossroad: true,
		crossroadPieceType: "straight",
	},
	superTurbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(640, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.5,
		transitionTo: { tag: "!notAfterTurbo" },
		supportsCrossroad: true,
		crossroadPieceType: "straight",
	},
	boostUp:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(672, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
		supportsCrossroad: true,
		crossroadPieceType: "straight",
	},
	superBoostUp:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(704, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.333,
		transitionTo: { tag: "!notAfterBoost" },
		supportsCrossroad: true,
		crossroadPieceType: "straight",
	},
	boostDown:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(736, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
		supportsCrossroad: true,
		crossroadPieceType: "straight",
	},
	superBoostDown:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(768, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		absoluteImageOffset: true,
		probability: 0.5,
		transitionTo: { tag: "!notAfterBoost" },
		supportsCrossroad: true,
		crossroadPieceType: "straight",
	},
};

let gShoulderPieceTemplates =
{
	straight:
	{
		tags: [ "straight" ],
		imageOffset: new Vector2D(1760, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		supportsCrossroad: true,
		crossroadPieceType: "crossroad",
	},
	cornerRight:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(1792, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
	},
	cornerLeft:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(1824, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
	},
	checkpoint:
	{
		tags: [ "progress", "checkpoint" ],
		imageOffset: new Vector2D(1760, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
	},
	curveRight:
	{
		imageOffset: new Vector2D(1856, 512),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(2, -1, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
	},
	curveLeft:
	{
		imageOffset: new Vector2D(1920, 512),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-2, -1, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
	},
	rampUpLevelGentle:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(1984, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		useCollisionForRender: true,
	},
	rampUpLevelSteep:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(2016, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		useCollisionForRender: true,
	},
	rampDownLevelGentle:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(1984, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -1),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -1),
		collisionExtents: new Vector3D(0.5, 0.5, 1),
		useCollisionForRender: true,
	},
	rampDownLevelSteep:
	{
		tags: [ "ramp", "notAfterTurbo" ],
		imageOffset: new Vector2D(2016, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		useCollisionForRender: true,
	},
	crossroad:
	{
		tags: [ "crossroad" ],
		imageOffset: new Vector2D(1824, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		probability: 0,	//Don't allow normal placement
		supportsCrossroad: true,
	},
};

//Templates for materials that transition to diagonal pieces.
let gDiagonalTransitionPieceTemplates =
{
	toDiagLeft:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1856, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
	toDiagLeftBendIn:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1920, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-2, -1, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
	toDiagLeftBendOut:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1984, 0),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0, -0.5, 0.5),
		collisionExtents: new Vector3D(0.5, 1, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
	toDiagRight:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2528, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagRight" },
	},
	toDiagRightBendIn:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2592, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(2, -1, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagRight" },
	},
	toDiagRightBendOut:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2656, 0),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(0, -0.5, 0.5),
		collisionExtents: new Vector3D(0.5, 1, 0.5),
		transitionTo: { material: "DiagRight" },
	},
};

//Templates for left diagonal pieces (can be flipped for right diagonal pieces)
let gDiagonalPieceTemplates =
{
	diagonal:
	{
		tags: [ "diagonal" ],
		imageOffset: new Vector2D(1472, 0),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
	},
	checkpoint:
	{
		tags: [ "progress", "checkpoint" ],
		imageOffset: new Vector2D(1568, 0),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 1),
		collisionExtents: new Vector3D(1.5, 1, 1),
	},
	turbo:
	{
		tags: [ "diagonal", "engineBlock" ],
		imageOffset: new Vector2D(1664, 0),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
		probability: 0.666,
		transitionTo: { tag: "!notAfterTurbo" },
	},
	superTurbo:
	{
		tags: [ "diagonal", "engineBlock" ],
		imageOffset: new Vector2D(1664, 0),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
		probability: 0.5,
		transitionTo: { tag: "!notAfterTurbo" },
	},
	boostUp:
	{
		tags: [ "diagonal", "engineBlock" ],
		imageOffset: new Vector2D(1472, 64),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
	},
	superBoostUp:
	{
		tags: [ "diagonal", "engineBlock" ],
		imageOffset: new Vector2D(1568, 64),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
		probability: 0.333,
		transitionTo: { tag: "!notAfterBoost" },
	},
	boostDown:
	{
		tags: [ "diagonal", "engineBlock" ],
		imageOffset: new Vector2D(1664, 64),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
	},
	superBoostDown:
	{
		tags: [ "diagonal", "engineBlock" ],
		imageOffset: new Vector2D(1760, 64),
		imageDimensions: new Vector2D(96, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-1, -0.5, 0.5),
		collisionExtents: new Vector3D(1.5, 1, 0.5),
		probability: 0.5,
		transitionTo: { tag: "!notAfterBoost" },
	},
	toFlat:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2016, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "Flat" },
	},
	toFlatBendOut:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2080, 0),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(1, -1, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "Flat" },
	},
	toFlatBendIn:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1856, 64),
		imageDimensions: new Vector2D(64, 32),
		exitOffset: new Vector3D(-2, 0, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-0.5, 0, 0.5),
		collisionExtents: new Vector3D(1, 0.5, 0.5),
		transitionTo: { material: "Flat" },
	},
};

//Templates for left-to-right diagonal transitions.
let gDiagonalLeftToRightPieceTemplates =
{
	toDiagRight:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1856, 96),
		imageDimensions: new Vector2D(64, 32),
		exitOffset: new Vector3D(-1, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, 0.5, 0.5),
		collisionExtents: new Vector3D(1, 0.5, 0.5),
		transitionTo: { material: "DiagRight" },
	},
	toDiagRightLong:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1920, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagRight" },
	},
	toDiagRightBendIn:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(1984, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-2, 0, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagRight" },
	},
	toDiagRightBendOut:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2048, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(1, -1, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagRight" },
	},
};

//Templates for right-to-left diagonal transitions.
let gDiagonalRightToLeftPieceTemplates =
{
	toDiagLeft:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2528, 96),
		imageDimensions: new Vector2D(64, 32),
		exitOffset: new Vector3D(1, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, 0, 0.5),
		collisionExtents: new Vector3D(1, 0.5, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
	toDiagLeftLong:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2592, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(1, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
	toDiagLeftBendIn:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2656, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(2, 0, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
	toDiagLeftBendOut:
	{
		tags: [ "transition" ],
		imageOffset: new Vector2D(2720, 64),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-1, -1, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(0.5, -0.5, 0.5),
		collisionExtents: new Vector3D(1, 1, 0.5),
		transitionTo: { material: "DiagLeft" },
	},
};

//Templates for block materials that transition to block banked pieces.
let gBlockBankTransitionPieceTemplates =
{
	toBlockBankRightLevelShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(832, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		transitionTo: { material: "BlockBankRight" },
	},
	toBlockBankRightDownShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(832, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -0.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		transitionTo: { material: "BlockBankRight" },
	},
	toBlockBankRightLevelLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(864, 512),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1.5),
		collisionExtents: new Vector3D(0.5, 1, 1.5),
		transitionTo: { material: "BlockBankRight" },
	},
	toBlockBankRightDownLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(896, 512),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, -0.5),
		collisionExtents: new Vector3D(0.5, 1, 1.5),
		transitionTo: { material: "BlockBankRight" },
	},
	toBlockBankLeftLevelShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1216, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		transitionTo: { material: "BlockBankLeft" },
	},
	toBlockBankLeftDownShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1216, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, -0.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		transitionTo: { material: "BlockBankLeft" },
	},
	toBlockBankLeftLevelLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1248, 512),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1.5),
		collisionExtents: new Vector3D(0.5, 1, 1.5),
		transitionTo: { material: "BlockBankLeft" },
	},
	toBlockBankLeftDownLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1280, 512),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, -2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, -0.5),
		collisionExtents: new Vector3D(0.5, 1, 1.5),
		transitionTo: { material: "BlockBankLeft" },
	},
};

//Templates for right-block bank pieces (can be flipped for left-banking pieces)
let gBlockBankedPieceTemplates =
{
	straight:
	{
		tags: [ "straight" ],
		imageOffset: new Vector2D(928, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
	},
	checkpoint:
	{
		tags: [ "progress", "checkpoint" ],
		imageOffset: new Vector2D(928, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
	},
	cornerIn:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(960, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(1, 0, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		blockRenderType: "curveRight",
	},
	cornerOut:
	{
		tags: [ "notAfterTurbo" ],
		imageOffset: new Vector2D(960, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(-1, 0, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		blockRenderType: "curveLeft",
	},
	curveIn:
	{
		imageOffset: new Vector2D(992, 512),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(2, -1, 0),
		exitAngle: Math.PI * 0.5,
		collisionOffset: new Vector3D(0.5, -0.5, 1.5),
		collisionExtents: new Vector3D(1, 1, 1.5),
		blockRenderType: "curveRight",
	},
	curveOut:
	{
		imageOffset: new Vector2D(1056, 512),
		imageDimensions: new Vector2D(64, 64),
		exitOffset: new Vector3D(-2, -1, 0),
		exitAngle: Math.PI * -0.5,
		collisionOffset: new Vector3D(-0.5, -0.5, 1.5),
		collisionExtents: new Vector3D(1, 1, 1.5),
		blockRenderType: "curveLeft",
	},
	turbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(608, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterTurbo" },
	},
	superTurbo:
	{
		tags: [ "straight", "engineBlock" ],
		imageOffset: new Vector2D(640, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		absoluteImageOffset: true,
		probability: 0.5,
		transitionTo: { tag: "!notAfterTurbo" },
	},
	boostUp:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(672, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
	},
	superBoostUp:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(704, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		absoluteImageOffset: true,
		probability: 0.333,
		transitionTo: { tag: "!notAfterBoost" },
	},
	boostDown:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(736, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		absoluteImageOffset: true,
		probability: 0.666,
		transitionTo: { tag: "!notAfterBoost" },
	},
	superBoostDown:
	{
		tags: [ "straight", "engineBlock", "notAfterBoost" ],
		imageOffset: new Vector2D(768, 256),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		absoluteImageOffset: true,
		probability: 0.5,
		transitionTo: { tag: "!notAfterBoost" },
	},
	toBlockLevelShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1120, 512),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		transitionTo: { material: "Block" },
	},
	toBlockUpShort:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1120, 544),
		imageDimensions: new Vector2D(32, 32),
		exitOffset: new Vector3D(0, -1, 2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, 0, 1.5),
		collisionExtents: new Vector3D(0.5, 0.5, 1.5),
		transitionTo: { material: "Block" },
	},
	toBlockLevelLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1152, 512),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 0),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1.5),
		collisionExtents: new Vector3D(0.5, 1, 1.5),
		transitionTo: { material: "Block" },
	},
	toBlockUpLong:
	{
		tags: [ "straight", "transition" ],
		imageOffset: new Vector2D(1184, 512),
		imageDimensions: new Vector2D(32, 64),
		exitOffset: new Vector3D(0, -2, 2),
		exitAngle: 0,
		collisionOffset: new Vector3D(0, -0.5, 1.5),
		collisionExtents: new Vector3D(0.5, 1, 1.5),
		transitionTo: { material: "Block" },
	},
};

////////////////////////////////////////////////////////////////////////////////
// Piece types (non-templated)
////////////////////////////////////////////////////////////////////////////////

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
		toRoadBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(544, 512),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadBlock" },
			renderAsBlock: true,
			supportsCrossroad: true,
			crossroadMaterial: "roadBlock",
		},
		toDirtBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(544, 576),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "dirtBlock" },
			renderAsBlock: true,
			supportsCrossroad: true,
			crossroadMaterial: "dirtBlock",
		},
		toIceBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(544, 640),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "iceBlock" },
			renderAsBlock: true,
			supportsCrossroad: true,
			crossroadMaterial: "iceBlock",
		},
		toGrassBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(544, 704),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "grassBlock" },
			renderAsBlock: true,
			supportsCrossroad: true,
			crossroadMaterial: "grassBlock",
		},
		toRubberBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(544, 768),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "rubberBlock" },
			renderAsBlock: true,
			supportsCrossroad: true,
			crossroadMaterial: "rubberBlock",
		},
		jump:
		{
			tags: [ "jump", "notAfterTurbo" ],
			imageOffset: new Vector2D(0, 64),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			transitionTo: { material: "#any", tag: "straight" },
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
			collisionExtents: new Vector3D(0.5, 1, 0.5),
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
	waterShallowFlat:
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
			transitionTo: { material: "waterDeepFlat" },
		},
	},
	waterDeepFlat:
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
			transitionTo: { material: "waterShallowFlat" },
		},
	},
	roadBankRight:
	{
		toBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "roadBankLeft" },
		},
		toDirtBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(800, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "dirtBankRight" },
		},
		toSausageBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(832, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "sausageBankRight" },
		},
		toSausageBankRightLong:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1408, 256),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, -0.5, 1),
			collisionExtents: new Vector3D(0.5, 1, 1),
			transitionTo: { material: "sausageBankRight" },
		},
	},
	roadBankLeft:
	{
		toBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1088, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "roadBankRight" },
		},
		toDirtBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1184, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "dirtBankLeft" },
		},
		toSausageBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1216, 96),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "sausageBankLeft" },
		},
		toSausageBankLeftLong:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1440, 256),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, -0.5, 1),
			collisionExtents: new Vector3D(0.5, 1, 1),
			transitionTo: { material: "sausageBankLeft" },
		},
	},
	dirtBankRight:
	{
		toBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 224),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "dirtBankLeft" },
		},
		toRoadBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(800, 224),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "roadBankRight" },
		},
	},
	dirtBankLeft:
	{
		toBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1088, 224),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "dirtBankRight" },
		},
		toRoadBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1184, 224),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "roadBankLeft" },
		},
	},
	sausageBankRight:
	{
		toBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "sausageBankLeft" },
		},
		toRoadBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(800, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "roadBankRight" },
		},
		toRoadBankRightLong:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1408, 320),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, -0.5, 1),
			collisionExtents: new Vector3D(0.5, 1, 1),
			transitionTo: { material: "roadBankRight" },
		},
	},
	sausageBankLeft:
	{
		toBankRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1088, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "sausageBankRight" },
		},
		toRoadBankLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1184, 480),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, 0, 1),
			collisionExtents: new Vector3D(0.5, 0.5, 1),
			transitionTo: { material: "roadBankLeft" },
		},
		toRoadBankLeftLong:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1440, 320),
			imageDimensions: new Vector2D(32, 64),
			exitOffset: new Vector3D(0, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0, -0.5, 1),
			collisionExtents: new Vector3D(0.5, 1, 1),
			transitionTo: { material: "roadBankRight" },
		},
	},
	roadDiagLeft:
	{
		toDirtDiagLeft:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2048, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "dirtDiagLeft" },
		},
		toSausageDiagLeft:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2144, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "sausageDiagLeft" },
		},
		jump:
		{
			tags: [ "jump", "notAfterTurbo" ],
			imageOffset: new Vector2D(2048, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
		toRoadBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 512),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(-1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadBlock" },
			renderAsBlock: true,
		},
		toDirtBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 576),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(-1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "dirtBlock" },
			renderAsBlock: true,
		},
		toIceBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 640),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(-1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "iceBlock" },
			renderAsBlock: true,
		},
		toGrassBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 704),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(-1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "grassBlock" },
			renderAsBlock: true,
		},
		toRubberBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 768),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(-1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "rubberBlock" },
			renderAsBlock: true,
		},
	},
	roadDiagRight:
	{
		toDirtDiagRight:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2432, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "dirtDiagRight" },
		},
		toSausageDiagRight:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2528, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "sausageDiagRight" },
		},
		jump:
		{
			tags: [ "jump", "notAfterTurbo" ],
			imageOffset: new Vector2D(2432, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
		toRoadBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 512),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadBlock" },
			renderAsBlock: true,
		},
		toDirtBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 576),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "dirtBlock" },
			renderAsBlock: true,
		},
		toGrassBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 704),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "grassBlock" },
			renderAsBlock: true,
		},
		toRubberBlock:
		{
			tags: [ "transition" ],
			imageOffset: new Vector2D(736, 768),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(1, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "rubberBlock" },
			renderAsBlock: true,
		},
	},
	dirtDiagLeft:
	{
		toRoadDiagLeft:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2240, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		largeBump:
		{
			tags: [ "diagonal" ],
			imageOffset: new Vector2D(2144, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
		smallBumps:
		{
			tags: [ "diagonal" ],
			imageOffset: new Vector2D(2240, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
	},
	dirtDiagRight:
	{
		toRoadDiagRight:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2624, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
		largeBump:
		{
			tags: [ "diagonal" ],
			imageOffset: new Vector2D(2528, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
		smallBumps:
		{
			tags: [ "diagonal" ],
			imageOffset: new Vector2D(2624, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
	},
	sausageDiagLeft:
	{
		toRoadDiagLeft:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2336, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		narrowCentre:
		{
			tags: [ "diagonal" ],
			imageOffset: new Vector2D(2336, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(-1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
	},
	sausageDiagRight:
	{
		toRoadDiagRight:
		{
			tags: [ "diagonal", "transition" ],
			imageOffset: new Vector2D(2720, 512),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
		narrowCentre:
		{
			tags: [ "diagonal" ],
			imageOffset: new Vector2D(2720, 576),
			imageDimensions: new Vector2D(96, 64),
			exitOffset: new Vector3D(1, -2, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(1, -0.5, 0.5),
			collisionExtents: new Vector3D(1.5, 1, 0.5),
		},
	},
	roadBlock:
	{
		toRoadFlat:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(672, 544),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
			supportsCrossroad: true,
		},
		toRoadShoulder:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 544),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadShoulder" },
		},
		toRoadDiagLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 544),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		toRoadDiagRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 544),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
	},
	roadShoulder:
	{
		toRoadBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1792, 544),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadBlock" },
		},
	},
	dirtBlock:
	{
		toRoadFlat:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(672, 608),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
			supportsCrossroad: true,
		},
		toDirtShoulder:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 608),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "dirtShoulder" },
		},
		toRoadDiagLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 608),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		toRoadDiagRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 608),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
	},
	dirtShoulder:
	{
		toDirtBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1792, 608),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "dirtBlock" },
		},
	},
	iceBlock:
	{
		toRoadFlat:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(672, 672),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
			supportsCrossroad: true,
		},
		toIceShoulder:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 672),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "iceShoulder" },
		},
		toRoadDiagLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 672),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		toRoadDiagRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 672),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
	},
	iceShoulder:
	{
		toIceBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1792, 672),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "iceBlock" },
		},
	},
	grassBlock:
	{
		toRoadFlat:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(672, 736),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
			supportsCrossroad: true,
		},
		toGrassShoulder:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(704, 736),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "grassShoulder" },
		},
		toRoadDiagLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 736),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		toRoadDiagRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 736),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
	},
	grassShoulder:
	{
		toGrassBlock:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(1792, 736),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "grassBlock" },
		},
	},
	rubberBlock:
	{
		toRoadFlat:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(672, 800),
			imageDimensions: new Vector2D(32, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			transitionTo: { material: "roadFlat" },
			supportsCrossroad: true,
		},
		toRoadDiagLeft:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 800),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(-0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagLeft" },
		},
		toRoadDiagRight:
		{
			tags: [ "straight", "transition" ],
			imageOffset: new Vector2D(736, 800),
			imageDimensions: new Vector2D(64, 32),
			exitOffset: new Vector3D(0, -1, 0),
			exitAngle: 0,
			collisionOffset: new Vector3D(0.5, 0, 0.5),
			collisionExtents: new Vector3D(1, 0.5, 0.5),
			transitionTo: { material: "roadDiagRight" },
		},
	},
};

let gGenericPieceType = null;

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

let CreatePieceTypesFromTemplate = function(templateObject, pieceMaterial, extraImageOffset, tagBlacklist, extraHeight, transitionPreposition, flipExitX)
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
		Object.getOwnPropertyNames(template).forEach(key =>
		{
			if (template[key] instanceof Vector3D)
				newPieceType[key] = Vector3DStatic.CreateCopy(template[key]);
			else if (template[key] instanceof Vector2D)
				newPieceType[key] = Vector2DStatic.CreateCopy(template[key]);
			else if (typeof template[key] === "object")
				newPieceType[key] = JSON.parse(JSON.stringify(template[key]));
			else
				newPieceType[key] = template[key]
		});

		if (!newPieceType.absoluteImageOffset)
		{
			newPieceType.imageOffset = Vector2DStatic.CreateAddition(newPieceType.imageOffset, extraImageOffset);
		}

		//Some materials are taller than others
		if (extraHeight !== undefined && extraHeight != 0)
		{
			if (newPieceType.collisionOffset === undefined && newPieceType.collisionExtents === undefined)
			{
				newPieceType.collisionOffset = new Vector3D(0, 0, 0.5);
				newPieceType.collisionExtents = new Vector3D(0.5, 0.5, 0.5);
			}

			//Convert extents to height, perform addition, divide back into extents
			newPieceType.collisionOffset.z += extraHeight * 0.5;
			newPieceType.collisionExtents.z = ((newPieceType.collisionExtents.z * 2) + extraHeight) * 0.5;
		}

		if (transitionPreposition !== undefined && newPieceType.transitionTo && newPieceType.transitionTo.material &&
			!newPieceType.transitionTo.material.startsWith('#'))
		{
			newPieceType.transitionTo.material = transitionPreposition.concat(newPieceType.transitionTo.material);
		}

		if (flipExitX)
		{
			newPieceType.exitOffset.x *= -1;
			newPieceType.exitAngle *= -1;

			if (newPieceType.collisionOffset !== undefined)
			{
				newPieceType.collisionOffset.x *= -1;
			}

			//Flip block render type.
			if (newPieceType.blockRenderType !== undefined)
			{
				switch (newPieceType.blockRenderType)
				{
				case "curveRight":		newPieceType.blockRenderType = "curveLeft";		break;
				case "curveLeft":		newPieceType.blockRenderType = "curveRight";	break;
				case "triangleRight":	newPieceType.blockRenderType = "triangleLeft";	break;
				case "triangleLeft":	newPieceType.blockRenderType = "triangleRight";	break;
				}
			}
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

	CreatePieceTypesFromTemplate(gGenericPieceTemplates, "roadFlat", new Vector2D(0, 0));
	CreatePieceTypesFromTemplate(gGenericPieceTemplates, "dirtFlat", new Vector2D(0, 128));
	CreatePieceTypesFromTemplate(gGenericPieceTemplates, "iceFlat", new Vector2D(0, 256), undefined, 1);
	CreatePieceTypesFromTemplate(gGenericPieceTemplates, "sausageFlat", new Vector2D(0, 384));
	CreatePieceTypesFromTemplate(gGenericPieceTemplates, "waterShallowFlat", new Vector2D(0, 512), [ "ramp" ]);
	CreatePieceTypesFromTemplate(gGenericPieceTemplates, "waterDeepFlat", new Vector2D(0, 640), [ "ramp", "progress" ], 1);

	CreatePieceTypesFromTemplate(gBankTransitionPieceTemplates, "roadFlat", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gBankedPieceTemplates, "roadBankRight", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gBankedPieceTemplates, "roadBankLeft", new Vector2D(384, 0), undefined, 0, "road", true);

	CreatePieceTypesFromTemplate(gBankTransitionPieceTemplates, "dirtFlat", new Vector2D(0, 128), undefined, 0, "dirt");
	CreatePieceTypesFromTemplate(gBankedPieceTemplates, "dirtBankRight", new Vector2D(0, 128), undefined, 0, "dirt");
	CreatePieceTypesFromTemplate(gBankedPieceTemplates, "dirtBankLeft", new Vector2D(384, 128), undefined, 0, "dirt", true);

	CreatePieceTypesFromTemplate(gBankTransitionPieceTemplates, "sausageFlat", new Vector2D(0, 384), undefined, 0, "sausage");
	CreatePieceTypesFromTemplate(gBankedPieceTemplates, "sausageBankRight", new Vector2D(0, 384), undefined, 0, "sausage");
	CreatePieceTypesFromTemplate(gBankedPieceTemplates, "sausageBankLeft", new Vector2D(384, 384), undefined, 0, "sausage", true);

	CreatePieceTypesFromTemplate(gBlockPieceTemplates, "roadBlock", new Vector2D(0, 0));
	CreatePieceTypesFromTemplate(gShoulderPieceTemplates, "roadShoulder", new Vector2D(0, 0));
	CreatePieceTypesFromTemplate(gBlockPieceTemplates, "dirtBlock", new Vector2D(0, 64));
	CreatePieceTypesFromTemplate(gShoulderPieceTemplates, "dirtShoulder", new Vector2D(0, 64));
	CreatePieceTypesFromTemplate(gBlockPieceTemplates, "iceBlock", new Vector2D(0, 128));
	CreatePieceTypesFromTemplate(gShoulderPieceTemplates, "iceShoulder", new Vector2D(0, 128));
	CreatePieceTypesFromTemplate(gBlockPieceTemplates, "grassBlock", new Vector2D(0, 192));
	CreatePieceTypesFromTemplate(gShoulderPieceTemplates, "grassShoulder", new Vector2D(0, 192));
	CreatePieceTypesFromTemplate(gBlockPieceTemplates, "rubberBlock", new Vector2D(0, 256));
	CreatePieceTypesFromTemplate(gBlockPieceTemplates, "waterShallowBlock", new Vector2D(64, -224), [ "ramp", "hole" ]);

	CreatePieceTypesFromTemplate(gBlockBankTransitionPieceTemplates, "roadBlock", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gBlockBankedPieceTemplates, "roadBlockBankRight", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gBlockBankedPieceTemplates, "roadBlockBankLeft", new Vector2D(384, 0), undefined, 0, "road", true);

	CreatePieceTypesFromTemplate(gDiagonalTransitionPieceTemplates, "roadFlat", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "roadDiagLeft", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "roadDiagRight", new Vector2D(672, 0), undefined, 0, "road", true);
	CreatePieceTypesFromTemplate(gDiagonalLeftToRightPieceTemplates, "roadDiagLeft", new Vector2D(0, 0), undefined, 0, "road");
	CreatePieceTypesFromTemplate(gDiagonalRightToLeftPieceTemplates, "roadDiagRight", new Vector2D(0, 0), undefined, 0, "road");

	CreatePieceTypesFromTemplate(gDiagonalTransitionPieceTemplates, "dirtFlat", new Vector2D(0, 128), undefined, 0, "dirt");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "dirtDiagLeft", new Vector2D(0, 128), undefined, 0, "dirt");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "dirtDiagRight", new Vector2D(672, 128), undefined, 0, "dirt", true);
	CreatePieceTypesFromTemplate(gDiagonalLeftToRightPieceTemplates, "dirtDiagLeft", new Vector2D(0, 128), undefined, 0, "dirt");
	CreatePieceTypesFromTemplate(gDiagonalRightToLeftPieceTemplates, "dirtDiagRight", new Vector2D(0, 128), undefined, 0, "dirt");

	CreatePieceTypesFromTemplate(gDiagonalTransitionPieceTemplates, "iceFlat", new Vector2D(0, 256), undefined, 0, "ice");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "iceDiagLeft", new Vector2D(0, 256), undefined, 0, "ice");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "iceDiagRight", new Vector2D(672, 256), undefined, 0, "ice", true);
	CreatePieceTypesFromTemplate(gDiagonalLeftToRightPieceTemplates, "iceDiagLeft", new Vector2D(0, 256), undefined, 0, "ice");
	CreatePieceTypesFromTemplate(gDiagonalRightToLeftPieceTemplates, "iceDiagRight", new Vector2D(0, 256), undefined, 0, "ice");

	CreatePieceTypesFromTemplate(gDiagonalTransitionPieceTemplates, "sausageFlat", new Vector2D(0, 384), undefined, 0, "sausage");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "sausageDiagLeft", new Vector2D(0, 384), undefined, 0, "sausage");
	CreatePieceTypesFromTemplate(gDiagonalPieceTemplates, "sausageDiagRight", new Vector2D(672, 384), undefined, 0, "sausage", true);
	CreatePieceTypesFromTemplate(gDiagonalLeftToRightPieceTemplates, "sausageDiagLeft", new Vector2D(0, 384), undefined, 0, "sausage");
	CreatePieceTypesFromTemplate(gDiagonalRightToLeftPieceTemplates, "sausageDiagRight", new Vector2D(0, 384), undefined, 0, "sausage");

	//Special-case transitions.
	ModifyPieceTypeProperty("roadFlat", "transitionTo", { material: "waterShallowFlat", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("roadBlock", "transitionTo", { material: "#waterShallowEntry", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("dirtBlock", "transitionTo", { material: "#waterShallowEntry", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("iceBlock", "transitionTo", { material: "#waterShallowEntry", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("grassBlock", "transitionTo", { material: "#waterShallowEntry", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("rubberBlock", "transitionTo", { material: "#waterShallowEntry", probability: 0.025 }, [ "ramp" ]);
	ModifyPieceTypeProperty("waterShallowFlat", "transitionTo", { material: "#waterShallowFlatExit", probability: 0.25 });
	ModifyPieceTypeProperty("waterShallowBlock", "transitionTo", { material: "#waterShallowBlockExit", probability: 0.25 });

	//Shorten ice sections.
	ModifyPieceTypeProperty("waterDeepFlat", "probability", 0.2, [ "transition "]);

	//Shorten deep water sections and make them appear on more layers.
	ModifyPieceTypeProperty("waterDeepFlat", "probability", 0.025, [ "transition "]);
	ModifyPieceTypeProperty("waterDeepFlat", "useCollisionForRender", true);

	//Useful for collision detection.
	gGenericPieceType = gPieceTypes.roadFlat.straight;
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

let SelectPieceMaterialFromSubstrings = function(materialSubstringWhitelist, materialBlacklist)
{
	let suitablePieceMaterials = [];

	Object.getOwnPropertyNames(gPieceTypes).forEach(pieceMaterialKey =>
	{
		if (materialBlacklist && materialBlacklist.includes(pieceMaterialKey))
			return;
		
		if (materialSubstringWhitelist && !materialSubstringWhitelist.find(substr => pieceMaterialKey.includes(substr)))
			return;
		
		suitablePieceMaterials.push(pieceMaterialKey);
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
	let unluckyPieceTypes = [];		//Placeable but discounted due to chance.
	
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
			//Check if the piece fits.
			if (!CanPlacePiece(translation, rotation, pieceType))
				return;

			//Exclude the piece with a random chance.
			if (pieceType.probability !== undefined && gRandom() >= pieceType.probability)
			{
				//Keep track of the fact this piece is technically placeable.
				if (pieceType.probability > 0)
					unluckyPieceTypes.push(pieceType);
				
				return;
			}
		}
		
		suitablePieceTypes.push(pieceType);
	});
	
	return suitablePieceTypes.length > 0 ? suitablePieceTypes : unluckyPieceTypes;
}

let SelectSuitablePieceType = function(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement)
{
	let allSuitablePieceTypes = FindAllSuitablePieceTypes(translation, rotation, pieceMaterial, tagWhitelist, tagBlacklist, pieceTypeBlacklist, forcePlacement);
	return allSuitablePieceTypes.length > 0 ? allSuitablePieceTypes[Math.floor(gRandom() * allSuitablePieceTypes.length)] : null;
}
