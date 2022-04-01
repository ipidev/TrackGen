"use strict"

let gUI =
{
	zoomScale: 1,
	trackPiecesImage: new Image(),
};
gUI.trackPiecesImage.src = "images/trackmaniaPieces.png";

let RenderAll = function(ctx)
{
	RenderGrass(ctx);
	RenderTrack(ctx);
}

let RenderGrass = function(ctx)
{
	let priorCtxTransform = ctx.getTransform();

	ctx.setTransform(new DOMMatrix());
	ctx.fillStyle = "#247A27";
	ctx.fillRect(0, 0, gCanvas.width, gCanvas.height);

	ctx.setTransform(priorCtxTransform);

	ctx.fillStyle = "#FFFFFF";
	ctx.globalAlpha = 0.075;

	for (let y = -24; y <= 24; ++y)
	{
		for (let x = -12; x <= 12; ++x)
		{
			ctx.fillRect((x * 64 + ((y & 1) * 32)) - 16, (y * 32) - 16, 32, 32);
		}
	}

	ctx.globalAlpha = 1;
}

let RenderTrack = function(ctx)
{
	let priorCtxTransform = ctx.getTransform();

	for (let i = 0; i < gPlacedPieces.length; ++i)
	{
		let placedPiece = gPlacedPieces[i];
		let placedPieceType = placedPiece.trackPieceType;
		
		ctx.translate(placedPiece.translation.x * 32, placedPiece.translation.y * 32);
		ctx.rotate(placedPiece.rotation);
		
		let renderOffset = Vector2DStatic.CreateZeroVector();
		if (placedPieceType.collisionOffset)
		{
			renderOffset.x = placedPieceType.collisionOffset.x * 32;
			renderOffset.y = placedPieceType.collisionOffset.y * 32;
		}

		ctx.drawImage(gUI.trackPiecesImage,
			placedPieceType.imageOffset.x, placedPieceType.imageOffset.y,
			placedPieceType.imageDimensions.x, placedPieceType.imageDimensions.y,
			(placedPieceType.imageDimensions.x * -0.5) + renderOffset.x, (placedPieceType.imageDimensions.y * -0.5) + renderOffset.y,
			placedPieceType.imageDimensions.x, placedPieceType.imageDimensions.y);
		
		ctx.setTransform(priorCtxTransform);
	}
}

let SetCanvasZoom = function(scale)
{
	gUI.zoomScale = scale;
	gCanvas.width = 1536 * scale;
	gCanvas.height = 1536 * scale;
	
	let canvasTransform = new DOMMatrix();
	canvasTransform.a = scale;
	canvasTransform.d = scale;
	canvasTransform.e = gCanvas.width * 0.5;
	canvasTransform.f = gCanvas.height * 0.5;
	gCtx.setTransform(canvasTransform);
}

////////////////////////////////////////////////////////////////////////////////
// DOM events
////////////////////////////////////////////////////////////////////////////////

let OnGenerateButtonPressed = function()
{
	let trackLength = parseFloat(document.getElementById("trackLength").value);
	let trackCheckpoints = parseFloat(document.getElementById("trackCheckpoints").value);
	let trackSeed = document.getElementById("trackSeed").value ? crc32(document.getElementById("trackSeed").value) : null;
	
	GenerateTrack(trackLength, trackCheckpoints, trackSeed);
	RenderAll(gCtx);
	
	GenerateNewTitle();
}

let OnZoomButtonPressed = function(e)
{
	if (gUI.zoomScale != 1)
	{
		SetCanvasZoom(1);
		e.target.innerHTML = "Zoom Out";
	}
	else
	{
		SetCanvasZoom(0.5);
		e.target.innerHTML = "Zoom In";
	}
	
	RenderAll(gCtx);
}

let OnPageLoaded = function(e)
{
	SetCanvasZoom(1);
	InitialisePieceTypes();

	OnGenerateButtonPressed();
	
	document.getElementById("generateButton").addEventListener("click", OnGenerateButtonPressed);
	document.getElementById("zoomButton").addEventListener("click", OnZoomButtonPressed);
};