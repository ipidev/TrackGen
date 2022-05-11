"use strict"

let gUI =
{
	zoomScale: 1,
	rotation: 0,
	viewLayer: 0,
	hasUserProvidedSeed: false,
	isOnMobile: false,
	trackPiecesImage: new Image(),
	selectedPieceIndex: -1,
};
gUI.trackPiecesImage.src = "images/trackmaniaPieces.png";
gUI.isOnMobile = navigator.maxTouchPoints ||
	/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(navigator.userAgent) ||
	/\b(Android|Windows Phone|iPad|iPod)\b/i.test(navigator.userAgent);

let RenderAll = function(ctx, viewZ, layerViewType)
{
	if (viewZ === undefined)
	{
		viewZ = document.getElementById("trackViewLayer").valueAsNumber;
	}

	if (layerViewType === undefined)
	{
		layerViewType = document.getElementById("trackViewType").value;
	}

	RenderGrass(ctx, viewZ);
	RenderTrack(ctx, viewZ, layerViewType);
	RenderSelectedPiece(ctx, viewZ, layerViewType);
}

let RenderGrass = function(ctx, viewZ)
{
	let priorCtxTransform = ctx.getTransform();

	ctx.setTransform(new DOMMatrix());

	//Change grass to sky as viewing height increases - cute effect!
	let grassToSkyAlpha = viewZ / 32;
	let grassR = Lerp(36, 85, grassToSkyAlpha);
	let grassG = Lerp(122, 160, grassToSkyAlpha);
	let grassB = Lerp(39, 155, grassToSkyAlpha);
	ctx.fillStyle = "rgb(" + grassR + "," + grassG + "," + grassB + ")";

	ctx.globalAlpha = 1;
	ctx.fillRect(0, 0, gCanvas.width, gCanvas.height);

	ctx.setTransform(priorCtxTransform);

	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FFFFFF";
	ctx.globalAlpha = 0.075;

	for (let y = -23; y <= 24; ++y)
	{
		for (let x = -11; x <= 12; ++x)
		{
			ctx.fillRect((x * 64 - ((y & 1) * 32)) - 16, (y * 32) - 16, 32, 32);
		}
	}

	ctx.globalAlpha = 1;
}

let RenderTrack = function(ctx, viewZ, layerViewType)
{
	let priorCtxTransform = ctx.getTransform();

	let sortedPieces = gPlacedPieces.slice();
	sortedPieces.sort((a, b) =>
	{
		if (a.translation.z !== b.translation.z)
			return a.translation.z > b.translation.z ? 1 : -1;
		return 0;
	});

	let ResetCanvas = function(ctx)
	{
		ctx.globalAlpha = 1;
		ctx.globalCompositeOperation = "source-over";
	};

	//Draw piece outlines.
	for (let i = 0; i < sortedPieces.length; ++i)
	{
		DrawTrackPieceOutline(ctx, sortedPieces[i], viewZ, layerViewType);
		ctx.setTransform(priorCtxTransform);
	}
	ResetCanvas(ctx);

	//Draw pieces.
	for (let i = 0; i < sortedPieces.length; ++i)
	{
		DrawTrackPiece(ctx, sortedPieces[i], viewZ, layerViewType);
		ctx.setTransform(priorCtxTransform);
	}
	ResetCanvas(ctx);
}

let DetermineDeltaZForDraw = function(placedPiece, viewZ, layerViewType)
{
	let placedPieceType = placedPiece.trackPieceType;

	if (layerViewType != "all")
	{
		let nearestZWithinCollision = placedPiece.translation.z;
		if (placedPieceType.useCollisionForRender && placedPieceType.collisionOffset && placedPieceType.collisionExtents)
		{
			let renderCollisionOffset = placedPieceType.renderCollisionOffset ? placedPieceType.renderCollisionOffset : 0;	//Fudge!
			let minimumZCollision = nearestZWithinCollision + placedPieceType.collisionOffset.z - placedPieceType.collisionExtents.z + renderCollisionOffset;
			let maximumZCollision = nearestZWithinCollision + placedPieceType.collisionOffset.z + placedPieceType.collisionExtents.z + renderCollisionOffset;

			if (placedPieceType.collisionOffset.z > 0)
				maximumZCollision -= 1;
			else if (placedPieceType.collisionOffset.z < 0)
				minimumZCollision += 1;

			nearestZWithinCollision = Math.max(minimumZCollision, Math.min(viewZ, maximumZCollision));
		}

		return Math.round(Math.abs(nearestZWithinCollision - viewZ));
	}
	
	return 0;
}

let SetupCanvasForDraw = function(ctx, placedPiece, viewZ, layerViewType)
{
	let placedPieceType = placedPiece.trackPieceType;
	
	//Determine opacity based on the currently viewed height layer.
	let deltaZ = DetermineDeltaZForDraw(placedPiece, viewZ, layerViewType);
	if (layerViewType == "none" && deltaZ != 0)
		return null;	//Don't draw anything - piece isn't visible.

	let compositionPasses = [ "source-over" ];
	let alphaPasses = [];
	
	switch (deltaZ)
	{
		case 0:		alphaPasses.push(1);	break;
		case 1:		alphaPasses.push(0.4);	break;
		case 2:		alphaPasses.push(0.3);	break;
		default:	alphaPasses.push(0.1);	break;
	}

	//Darken or lighten the image if it's below or above the current layer.
	if (deltaZ != 0)
	{
		compositionPasses.push(placedPiece.translation.z - viewZ > 0 ? "screen" : "multiply");
		alphaPasses.push((1 - alphaPasses[0]) * 0.15);
	}

	//Move canvas into correct position.
	ctx.translate(placedPiece.translation.x * 32, placedPiece.translation.y * 32);
	ctx.rotate(placedPiece.rotation);
	
	let renderOffset = Vector2DStatic.CreateZeroVector();
	if (placedPieceType.collisionOffset)
	{
		renderOffset.x = placedPieceType.collisionOffset.x * 32;
		renderOffset.y = placedPieceType.collisionOffset.y * 32;
	}

	let setupObject =
	{
		compositionPasses: compositionPasses,
		alphaPasses: alphaPasses,
		renderOffset: renderOffset,
	};
	return setupObject;
}

let DrawTrackPieceOutline = function(ctx, placedPiece, viewZ, layerViewType)
{
	let placedPieceType = placedPiece.trackPieceType;
	if (!placedPieceType.pieceMaterial.includes("Block") &&
		!placedPieceType.pieceMaterial.includes("Shoulder") &&
		!placedPieceType.renderAsBlock)
	{
		return;
	}

	let setupObject = SetupCanvasForDraw(ctx, placedPiece, viewZ, layerViewType);
	if (setupObject === null)
		return;
	
	for (let j = 0; j < setupObject.alphaPasses.length; ++j)
	{
		ctx.globalAlpha = setupObject.alphaPasses[j];
		ctx.globalCompositeOperation = setupObject.compositionPasses[j];
		
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;

		let leftSideX = (placedPieceType.imageDimensions.x * -0.5) + setupObject.renderOffset.x - 1;
		let rightSideX = (placedPieceType.imageDimensions.x * 0.5) + setupObject.renderOffset.x + 1;
		let topSideY = (placedPieceType.imageDimensions.y * -0.5) + setupObject.renderOffset.y - 1;
		let bottomSideY = (placedPieceType.imageDimensions.y * 0.5) + setupObject.renderOffset.y + 1;

		switch (placedPieceType.blockRenderType)
		{
		case "curveRight":
			ctx.beginPath();
			ctx.moveTo(leftSideX + 32, bottomSideY);
			ctx.arc(rightSideX, bottomSideY, placedPieceType.imageDimensions.x + 2, Math.PI, Math.PI * 1.5);
			ctx.arc(rightSideX, bottomSideY, placedPieceType.imageDimensions.x - 32, Math.PI * 1.5, Math.PI, true);
			ctx.stroke();
			break;

		case "curveLeft":
			ctx.beginPath();
			ctx.moveTo(rightSideX - 32, bottomSideY);
			ctx.arc(leftSideX, bottomSideY, placedPieceType.imageDimensions.x + 2, Math.PI * 2, Math.PI * 1.5, true);
			ctx.arc(leftSideX, bottomSideY, placedPieceType.imageDimensions.x - 32, Math.PI * 1.5, Math.PI * 2);
			ctx.stroke();
			break;

		case "triangleRight":
			ctx.beginPath();
			ctx.moveTo(rightSideX, bottomSideY);
			ctx.lineTo(leftSideX, bottomSideY);
			ctx.lineTo(rightSideX, topSideY);
			ctx.lineTo(rightSideX, bottomSideY);
			ctx.stroke();
			break;

		case "triangleLeft":
			ctx.beginPath();
			ctx.moveTo(leftSideX, bottomSideY);
			ctx.lineTo(rightSideX, bottomSideY);
			ctx.lineTo(leftSideX, topSideY);
			ctx.lineTo(leftSideX, bottomSideY);
			ctx.stroke();
			break;

		default:
			//Only draw side lines for pieces that change height, avoids black line breaking track flow
			if (placedPieceType.exitOffset.z == 0)
			{
				ctx.strokeRect(leftSideX, topSideY, placedPieceType.imageDimensions.x + 2, placedPieceType.imageDimensions.y + 2);
			}
			else
			{
				ctx.beginPath();
				ctx.moveTo(leftSideX, topSideY);
				ctx.lineTo(leftSideX, bottomSideY);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(rightSideX, topSideY);
				ctx.lineTo(rightSideX, bottomSideY);
				ctx.stroke();
			}
			break;
		}
		
	}
}

let DrawTrackPiece = function(ctx, placedPiece, viewZ, layerViewType)
{
	
	
	let placedPieceType = placedPiece.trackPieceType;

	let setupObject = SetupCanvasForDraw(ctx, placedPiece, viewZ, layerViewType);
	if (setupObject === null)
		return;

	for (let j = 0; j < setupObject.alphaPasses.length; ++j)
	{
		ctx.globalAlpha = setupObject.alphaPasses[j];
		ctx.globalCompositeOperation = setupObject.compositionPasses[j];

		ctx.drawImage(gUI.trackPiecesImage,
			placedPieceType.imageOffset.x, placedPieceType.imageOffset.y,
			placedPieceType.imageDimensions.x, placedPieceType.imageDimensions.y,
			(placedPieceType.imageDimensions.x * -0.5) + setupObject.renderOffset.x, (placedPieceType.imageDimensions.y * -0.5) + setupObject.renderOffset.y,
			placedPieceType.imageDimensions.x, placedPieceType.imageDimensions.y);
	}
}

let RenderSelectedPiece = function(ctx, viewZ, layerViewType)
{
	if (gUI.selectedPieceIndex < 0 || gUI.selectedPieceIndex >= gPlacedPieces.length)
		return;
	
	let placedPiece = gPlacedPieces[gUI.selectedPieceIndex];

	//Force layer view type to avoid confusing users with selections on other layers.
	let forcedLayerViewType = layerViewType == "all" ? "all" : "none";

	let priorCtxTransform = ctx.getTransform();
	let setupObject = SetupCanvasForDraw(ctx, placedPiece, viewZ, forcedLayerViewType);
	if (setupObject === null)
		return;

	//Draw surrounding box and arrows annotating entry/exit direction.
	ctx.strokeStyle = ctx.fillStyle = "#FF00FF";
	ctx.lineWidth = 3;

	let placedPieceType = placedPiece.trackPieceType;
	let leftSideX = (placedPieceType.imageDimensions.x * -0.5) + setupObject.renderOffset.x - (ctx.lineWidth * 0.5);
	let topSideY = (placedPieceType.imageDimensions.y * -0.5) + setupObject.renderOffset.y - (ctx.lineWidth * 0.5);
	let boxWidth = placedPieceType.imageDimensions.x + ctx.lineWidth;
	let boxHeight = placedPieceType.imageDimensions.y + ctx.lineWidth;

	ctx.strokeRect(leftSideX, topSideY, boxWidth, boxHeight);

	//Draw entry arrow.
	let DrawArrow = function(ctx, yOffset)
	{
		ctx.beginPath();
		ctx.moveTo(-8, 16 + yOffset);
		ctx.lineTo(0, 8 + yOffset);
		ctx.lineTo(8, 16 + yOffset);
		ctx.fill();
	}

	//Draw entry arrow at the root position of the piece, then transform according to the exit and draw again.
	DrawArrow(ctx, 0);

	ctx.translate(placedPieceType.exitOffset.x * 32, placedPieceType.exitOffset.y * 32);
	ctx.rotate(placedPieceType.exitAngle);
	DrawArrow(ctx, -3);
	
	ctx.setTransform(priorCtxTransform);
}

let UpdateCanvasTransform = function(canvas, ctx)
{
	let pieceSize = 32 * gUI.zoomScale; 
	canvas.width = 48 * pieceSize;
	canvas.height = 48 * pieceSize;
	
	let canvasTransform = new DOMMatrix();
	canvasTransform.a = Math.cos(gUI.rotation) * gUI.zoomScale;
	canvasTransform.b = Math.sin(gUI.rotation) * gUI.zoomScale;
	canvasTransform.c = -Math.sin(gUI.rotation) * gUI.zoomScale;
	canvasTransform.d = Math.cos(gUI.rotation) * gUI.zoomScale;
	canvasTransform.e = (gCanvas.width * 0.5) - (pieceSize * 0.5);
	canvasTransform.f = (gCanvas.height * 0.5) - (pieceSize * 0.5);
	ctx.setTransform(canvasTransform);
}

////////////////////////////////////////////////////////////////////////////////
// DOM events
////////////////////////////////////////////////////////////////////////////////

let ClampNumberInput = function(e)
{
	if (e.target && e.isTrusted)
	{
		let value = e.target.valueAsNumber;

		if (Number.isNaN(value))
		{
			e.target.value = value = 0;
		}

		if (e.target.min !== undefined && value < parseFloat(e.target.min))
		{
			e.target.value = e.target.min;
		}
		else if (e.target.max !== undefined && value > parseFloat(e.target.max))
		{
			e.target.value = e.target.max;
		}
	}
}

let OnGenerateButtonPressed = function()
{
	let trackLength = document.getElementById("trackLength").valueAsNumber;
	let trackCheckpoints = document.getElementById("trackCheckpoints").valueAsNumber;

	let trackDimensions = new Vector3D(document.getElementById("trackDimensionsX").valueAsNumber,
		document.getElementById("trackDimensionsY").valueAsNumber,
		document.getElementById("trackDimensionsZ").valueAsNumber);

	//Pick a random seed if the user doesn't provide one.
	let trackSeedElement = document.getElementById("trackSeed");
	let trackSeed = trackSeedElement.value;
	if (gUI.hasUserProvidedSeed)
	{
		trackSeed = parseInt(trackSeed, 10);
		if (Number.isNaN(trackSeed))
		{
			trackSeed = crc32(trackSeedElement.value);
		}
	}
	else
	{
		trackSeedElement.value = trackSeed = Math.floor(Math.random() * 4294967296);
	}

	let GetSelectedOptions = function(selectElement)
	{
		let array = [];

		if (selectElement)
		{
			for (let i = 0; i < selectElement.options.length; ++i)
			{
				if (selectElement.options[i].selected)
					array.push(selectElement.options[i].value);
			}
		}

		return array;
	}

	let trackMaterialWhitelist = GetSelectedOptions(document.getElementById("trackMaterials"));
	let trackFeatureWhitelist = GetSelectedOptions(document.getElementById("trackFeatures"));

	GenerateTrack(trackSeed, trackLength, trackDimensions, trackCheckpoints, trackMaterialWhitelist, trackFeatureWhitelist);

	//Determine new view layer limits from generated track.
	let newViewZ = 0;
	if (gPlacedPieces.length > 0)
	{
		newViewZ = gPlacedPieces[0].translation.z;
		let minimumZ = newViewZ;
		let maximumZ = newViewZ;

		gPlacedPieces.forEach(placedPiece =>
		{
			if (minimumZ > placedPiece.translation.z)
				minimumZ = placedPiece.translation.z;
			
			if (maximumZ < placedPiece.translation.z)
				maximumZ = placedPiece.translation.z;
		});

		let trackViewLayerElement = document.getElementById("trackViewLayer");
		trackViewLayerElement.min = Math.round(minimumZ);
		trackViewLayerElement.max = Math.round(maximumZ);
		trackViewLayerElement.value = Math.round(newViewZ);
	}

	gUI.selectedPieceIndex = -1;
	RenderAll(gCtx, newViewZ);
	
	GenerateNewTitle();
}

let OnZoomButtonPressed = function(e)
{
	gUI.zoomScale = (gUI.zoomScale == 1) ? 0.5 : 1;
	UpdateCanvasTransform(gCanvas, gCtx);
	
	RenderAll(gCtx);
}

let OnRotateLeftButtonPressed = function(e)
{
	gUI.rotation -= Math.PI * 0.5;
	UpdateCanvasTransform(gCanvas, gCtx);

	RenderAll(gCtx);
}

let OnRotateRightButtonPressed = function(e)
{
	gUI.rotation += Math.PI * 0.5;
	UpdateCanvasTransform(gCanvas, gCtx);

	RenderAll(gCtx);
}

let OnViewLayerChanged = function(e)
{
	//Skip programmatic changes
	if (!e.isTrusted)
		return;

	ClampNumberInput(e);

	let newViewZ = parseFloat(e.target.value);
	RenderAll(gCtx, newViewZ);
}

let OnViewLayerDownPressed = function(e)
{
	let trackViewLayerElement = document.getElementById("trackViewLayer");
	let newViewZ = Math.max(trackViewLayerElement.valueAsNumber - 1, trackViewLayerElement.min);
	trackViewLayerElement.value = newViewZ;

	RenderAll(gCtx, newViewZ, null);
}

let OnViewLayerUpPressed = function(e)
{
	let trackViewLayerElement = document.getElementById("trackViewLayer");
	let newViewZ = Math.min(trackViewLayerElement.valueAsNumber + 1, trackViewLayerElement.max);
	trackViewLayerElement.value = newViewZ;

	RenderAll(gCtx, newViewZ, null);
}

let OnViewTypeChanged = function(e)
{
	//Skip programmatic changes
	if (!e.isTrusted)
		return;

	let newLayerViewType = document.getElementById("trackViewType").value;
	RenderAll(gCtx, undefined, newLayerViewType);
}

let OnTrackSeedChanged = function(e)
{
	//Skip programmatic changes
	if (!e.isTrusted)
		return;

	//Allow random seeds to be used again if the user clears the field.
	gUI.hasUserProvidedSeed = !(e.target.value === "" || e.target.value === null);
	document.getElementById("trackSeedLabel").innerHTML = gUI.hasUserProvidedSeed ? "Seed*:" : "Seed:";
}

let OnPreviousPieceButtonPressed = function(e)
{
	if (gUI.selectedPieceIndex <= 0)
		gUI.selectedPieceIndex = gPlacedPieces.length - 1;
	else
		--gUI.selectedPieceIndex;
	
	if (gPlacedPieces.length > 0)
	{
		let newViewZ = gPlacedPieces[gUI.selectedPieceIndex].translation.z;
		document.getElementById("trackViewLayer").value = newViewZ;
	}

	RenderAll(gCtx);
}

let OnNextPieceButtonPressed = function(e)
{
	if (gUI.selectedPieceIndex >= gPlacedPieces.length - 1)
		gUI.selectedPieceIndex = 0;
	else
		++gUI.selectedPieceIndex;
	
	if (gPlacedPieces.length > 0)
	{
		let newViewZ = gPlacedPieces[gUI.selectedPieceIndex].translation.z;
		document.getElementById("trackViewLayer").value = newViewZ;
	}

	RenderAll(gCtx);
}

let OnCanvasClicked = function(e)
{
	//Skip programmatic changes
	if (!e.isTrusted)
		return;

	//Convert from canvas space to world space.
	let worldScale = 32 * gUI.zoomScale;
	let clickX = (e.offsetX / worldScale) - 23.5;
	let clickY = (e.offsetY / worldScale) - 23.5;

	//Find the piece we've clicked on (if any).
	let clickedPieceIndex = -1;
	let viewZ = document.getElementById("trackViewLayer").valueAsNumber;
	let layerViewType = document.getElementById("trackViewType").value;
	
	for (let i = 0; i < gPlacedPieces.length; ++i)
	{
		let placedPiece = gPlacedPieces[i];
		let placedPieceType = placedPiece.trackPieceType;

		let currentPieceAABB = GetTrackPieceAABB(placedPiece.translation,
			placedPiece.rotation, placedPieceType);
		
		if (currentPieceAABB.min.x <= clickX && clickX <= currentPieceAABB.max.x &&
			currentPieceAABB.min.y <= clickY && clickY <= currentPieceAABB.max.y)
		{
			if (DetermineDeltaZForDraw(placedPiece, viewZ, layerViewType) == 0)
			{
				clickedPieceIndex = i;
				break;
			}
		}
	}

	gUI.selectedPieceIndex = clickedPieceIndex;
	RenderAll(gCtx, viewZ, layerViewType);
}

let OnKeyDown = function(e)
{
	switch (e.code)
	{
		case "Minus":
			OnViewLayerDownPressed(e);
			break;
		case "Equal":
			OnViewLayerUpPressed(e);
			break;
		case "Comma":
			OnRotateLeftButtonPressed(e);
			break;
		case "Period":
			OnRotateLeftButtonPressed(e);
			break;
		case "BracketLeft":
			OnPreviousPieceButtonPressed(e);
			break;
		case "BracketRight":
			OnNextPieceButtonPressed(e);
			break;
	}

	switch (e.key)
	{
		case "z":
			OnZoomButtonPressed(e);
			break;
		case "g":
			OnGenerateButtonPressed(e);
			break;
	}
}

let OnHotkeysButtonPressed = function(e)
{
	let hotkeysWindowElement = document.getElementById("hotkeysWindow");
	if (hotkeysWindowElement.classList.contains("hotkeysWindowShown"))
	{
		hotkeysWindowElement.classList.remove("hotkeysWindowShown");
		e.target.innerHTML = "Show hotkeys"
	}
	else
	{
		hotkeysWindowElement.classList.add("hotkeysWindowShown");
		e.target.innerHTML = "Hide hotkeys"
	}
}

let OnPageLoaded = function(e)
{
	UpdateCanvasTransform(gCanvas, gCtx);
	InitialisePieceTypes();

	OnGenerateButtonPressed();
	
	document.getElementById("trackLength").addEventListener("input", ClampNumberInput);
	document.getElementById("trackCheckpoints").addEventListener("input", ClampNumberInput);
	document.getElementById("trackDimensionsX").addEventListener("input", ClampNumberInput);
	document.getElementById("trackDimensionsY").addEventListener("input", ClampNumberInput);
	document.getElementById("trackDimensionsZ").addEventListener("input", ClampNumberInput);
	document.getElementById("generateButton").addEventListener("click", OnGenerateButtonPressed);
	document.getElementById("zoomButton").addEventListener("click", OnZoomButtonPressed);
	document.getElementById("rotateLeftButton").addEventListener("click", OnRotateLeftButtonPressed);
	document.getElementById("rotateRightButton").addEventListener("click", OnRotateRightButtonPressed);
	document.getElementById("trackViewLayer").addEventListener("input", OnViewLayerChanged);
	document.getElementById("trackViewLayerDown").addEventListener("click", OnViewLayerDownPressed);
	document.getElementById("trackViewLayerUp").addEventListener("click", OnViewLayerUpPressed);
	document.getElementById("trackViewType").addEventListener("input", OnViewTypeChanged);
	document.getElementById("trackSeed").addEventListener("input", OnTrackSeedChanged);
	gCanvas.addEventListener("click", OnCanvasClicked);

	if (gUI.isOnMobile)
	{
		document.getElementById("trackViewLayerPC").classList.add("hidden");
		document.getElementById("trackViewLayerMobile").classList.remove("hidden");

		document.getElementById("hotkeysContainer").classList.add("hidden");
	}
	else
	{
		document.getElementById("trackViewLayerMobile").classList.add("hidden");
		document.getElementById("trackViewLayerPC").classList.remove("hidden");

		document.getElementById("hotkeysContainer").classList.remove("hidden");

		document.addEventListener("keydown", OnKeyDown);
		document.getElementById("hotkeysButton").addEventListener("click", OnHotkeysButtonPressed);
	}
};