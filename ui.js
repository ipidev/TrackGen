"use strict"

let gUI =
{
	zoomScale: 1,
	rotation: 0,
	viewLayer: 0,
	hasUserProvidedSeed: false,
	isOnMobile: false,
	trackPiecesImage: new Image(),
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

	for (let i = 0; i < sortedPieces.length; ++i)
	{
		//Determine piece position.
		let placedPiece = sortedPieces[i];
		let placedPieceType = placedPiece.trackPieceType;
		
		ctx.translate(placedPiece.translation.x * 32, placedPiece.translation.y * 32);
		ctx.rotate(placedPiece.rotation);
		
		let renderOffset = Vector2DStatic.CreateZeroVector();
		if (placedPieceType.collisionOffset)
		{
			renderOffset.x = placedPieceType.collisionOffset.x * 32;
			renderOffset.y = placedPieceType.collisionOffset.y * 32;
		}

		//Determine opacity based on the currently viewed height layer.
		let compositionPasses = [ "source-over" ];
		let alphaPasses = [];
		let deltaZ = 0;

		if (layerViewType != "all")
		{
			let nearestZWithinCollision = placedPiece.translation.z;
			if (placedPieceType.useCollisionForRender && placedPieceType.collisionOffset && placedPieceType.collisionExtents)
			{
				let minimumZCollision = nearestZWithinCollision + placedPieceType.collisionOffset.z - placedPieceType.collisionExtents.z;
				let maximumZCollision = nearestZWithinCollision + placedPieceType.collisionOffset.z + placedPieceType.collisionExtents.z;

				if (placedPieceType.collisionOffset.z > 0)
					maximumZCollision -= 1;
				else if (placedPieceType.collisionOffset.z < 0)
					minimumZCollision += 1;

				nearestZWithinCollision = Math.max(minimumZCollision, Math.min(viewZ, maximumZCollision));
			}

			deltaZ = Math.round(Math.abs(nearestZWithinCollision - viewZ));
			if (layerViewType == "none" && deltaZ != 0)
			{
				ctx.setTransform(priorCtxTransform);
				continue;
			}
		}

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

		for (let j = 0; j < alphaPasses.length; ++j)
		{
			ctx.globalAlpha = alphaPasses[j];
			ctx.globalCompositeOperation = compositionPasses[j];

			ctx.drawImage(gUI.trackPiecesImage,
				placedPieceType.imageOffset.x, placedPieceType.imageOffset.y,
				placedPieceType.imageDimensions.x, placedPieceType.imageDimensions.y,
				(placedPieceType.imageDimensions.x * -0.5) + renderOffset.x, (placedPieceType.imageDimensions.y * -0.5) + renderOffset.y,
				placedPieceType.imageDimensions.x, placedPieceType.imageDimensions.y);
		}
		
		ctx.setTransform(priorCtxTransform);
	}

	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = "source-over";
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

	let trackMaterialWhitelist = [];
	let trackMaterialsElement = document.getElementById("trackMaterials");

	for (let i = 0; i < trackMaterialsElement.options.length; ++i)
	{
		if (trackMaterialsElement.options[i].selected)
		{
			trackMaterialWhitelist.push(trackMaterialsElement.options[i].value);
		}
	}

	GenerateTrack(trackSeed, trackLength, trackDimensions, trackCheckpoints, trackMaterialWhitelist);

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
	}

	switch (e.key)
	{
		case "z":
			OnZoomButtonPressed(e);
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