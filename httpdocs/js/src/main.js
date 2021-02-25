import interact from 'interactjs';

var target = document.querySelector('body');

// This stores the position of the current item being dragged
let position = {
	x: 0,
	y: 0,
};

interact(".dot")
	.draggable({
		// By setting manualStart to true - we control the manualStart.
		// We need to do this so that we can clone the object before we begin dragging it.
		manualStart: true,
		listeners: {
			move(event) {

				position.x += event.dx;
				position.y += event.dy;

				event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
				event.target.classList.remove("original");
				event.target.classList.add("clone");
			}
		}
	})
	// This only gets called when we trigger it below using interact.start(...)
	.on("move", function (event) {
		const { currentTarget, interaction } = event;
		let element = currentTarget;

		// If we are dragging an original item
		// We need to clone it, and then start moving the clone
		if (
			interaction.pointerIsDown &&
			!interaction.interacting() &&
			currentTarget.classList.contains("original")
		) {
			element = currentTarget.cloneNode(true);

			// Add absolute positioning so that cloned object lives right on top of the original object
			element.style.position = "absolute";
			element.style.left = 0;
			element.style.top = 0;

			// Add the cloned object to the document
			const container = document.querySelector(".container");
			container && container.appendChild(element);

			const { offsetTop, offsetLeft } = currentTarget;
			position.x = offsetLeft;
			position.y = offsetTop;

			// If we are moving an already existing item, we need to make sure the position object has
			// the correct values before we start dragging it
		} else if (interaction.pointerIsDown && !interaction.interacting()) {
			const regex = /translate\((\d{1,4}(?:\.\d{1,3})?)px, (\d{1,4}(?:\.\d{1,3})?)px\)/i;
			const transform = regex.exec(currentTarget.style.transform);
			console.log(currentTarget.style.transform);
			console.log(transform);
			if (transform && transform.length > 1) {
				position.x = Number(transform[1]);
				position.y = Number(transform[2]);
			}
		}

		// Start the drag event
		interaction.start({ name: "drag" }, event.interactable, element);

	});

let circle = {
	centre: [100, 250],
	radius: 200,
	startDegrees: 0,
	endDegrees: 180,
	get degreesSweep() {
		return this.endDegrees - this.startDegrees;
	}
};


let dots = document.querySelectorAll(".dot--blue");

window.addEventListener('load', updateAll);
window.addEventListener('resize', updateAll);

function updateAll() {
	updateCircle();
	updatePoints(dots);
}

function updateCircle() {
	var ww = window.innerWidth;
	var wh = window.innerHeight;
	var maxRadius;
	if (wh < ww && ww / 2 > wh) {
		maxRadius = wh;
	} else {
		maxRadius = ww / 2;
	}

	console.log(`window dimensions are ${ww},${wh}`);
	console.log(`Max radius is ${maxRadius}`);
	var buffer = 50;
	circle.radius = maxRadius - buffer;
	circle.centre[0] = ww / 2;
	circle.centre[1] = circle.radius + (buffer / 2);
	console.log(`radius is ${circle.radius}\nCentre is ${circle.centre[0]},${circle.centre[1]}`)
}

function updatePoints(nodeList) {
	var origin = document.querySelector(".circle-origin");
	origin.style.left = circle.centre[0] + "px";
	origin.style.top = circle.centre[1] + "px";

	var increment = degreeIncrement(circle.degreesSweep, dots.length);
	nodeList.forEach(function (dot, index) {
		var thisDegrees = circle.startDegrees + (index * increment);
		var thisX = circle.centre[0] - circle.radius * Math.cos(degreesToRadians(thisDegrees));
		var thisY = circle.centre[1] - circle.radius * Math.sin(degreesToRadians(thisDegrees));
		dot.style.left = thisX + "px";
		dot.style.top = thisY + "px";
		dot.style.transform = "rotate(" + thisDegrees + "deg)";
	});
}


function degreeIncrement(sweep, numberOfPoints) {
	return sweep / (numberOfPoints - 1);
}

function degreesToRadians(degrees) {
	var pi = Math.PI;
	return degrees * (pi / 180);
}

/*
Parametric equation of a circle is
x = cx + r * cos(a)
y = cy + r * sin(a)
Where r is the radius, cx,cy the origin, and a the angle in radians

x = centre[0] + radius * Math.cos(degreesToRadians(45))
y = centre[1] + radius * Match.cos(degreesToRadians(45))

*/