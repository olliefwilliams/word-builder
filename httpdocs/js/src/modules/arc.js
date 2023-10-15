export default function () {

	let circle = {
		centre: [100, 250],
		radius: 200,
		startDegrees: 0,
		endDegrees: 180,
		get degreesSweep() {
			return this.endDegrees - this.startDegrees;
		}
	};


	let letters = document.querySelectorAll(".letter");

	window.addEventListener('load', updateAll);
	window.addEventListener('resize', updateAll);

	function updateAll() {
		updateCircle();
		updatePoints(letters);
	}

	function updateCircle() {
		let ww = window.innerWidth;
		let wh = window.innerHeight;
		let maxRadius;
		if (wh < ww && ww / 2 > wh) {
			maxRadius = wh;
		} else {
			maxRadius = ww / 2;
		}

		let buffer = ww * 0.1;
		circle.radius = maxRadius - buffer;
		circle.centre[0] = ww / 2;
		circle.centre[1] = circle.radius + (buffer / 2);

		// give container a fixed height, so we can position things relative to it
		// don't want it to be taller than the arc + buffer
		document.querySelector(".container").style.height = maxRadius + "px";

		document.querySelector(".canvas").style.maxWidth = circle.radius * 1.5 + "px";
		document.querySelector(".canvas").style.maxHeight = circle.radius * 0.5 + "px";

	}

	function updatePoints(nodeList) {
		let origin = document.querySelector(".circle-origin");
		origin.style.left = circle.centre[0] + "px";
		origin.style.top = circle.centre[1] + "px";

		let increment = degreeIncrement(circle.degreesSweep, letters.length);
		nodeList.forEach(function (letter, index) {
			let thisDegrees = circle.startDegrees + (index * increment);
			let thisX = circle.centre[0] - circle.radius * Math.cos(degreesToRadians(thisDegrees));
			let thisY = circle.centre[1] - circle.radius * Math.sin(degreesToRadians(thisDegrees));
			letter.style.left = thisX + "px";
			letter.style.top = thisY + "px";
			letter.style.transform = "translate(-50%, -50%) rotate(" + (thisDegrees - 90) + "deg)";
			// -90 degrees to ensure letter bottoms are flat against the curve
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

}