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


	let dots = document.querySelectorAll(".dot--blue");

	window.addEventListener('load', updateAll);
	window.addEventListener('resize', updateAll);

	function updateAll() {
		updateCircle();
		updatePoints(dots);
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

		console.log(`window dimensions are ${ww},${wh}`);
		console.log(`Max radius is ${maxRadius}`);
		let buffer = 50;
		circle.radius = maxRadius - buffer;
		circle.centre[0] = ww / 2;
		circle.centre[1] = circle.radius + (buffer / 2);
		console.log(`radius is ${circle.radius}\nCentre is ${circle.centre[0]},${circle.centre[1]}`)
	}

	function updatePoints(nodeList) {
		let origin = document.querySelector(".circle-origin");
		origin.style.left = circle.centre[0] + "px";
		origin.style.top = circle.centre[1] + "px";

		let increment = degreeIncrement(circle.degreesSweep, dots.length);
		nodeList.forEach(function (dot, index) {
			let thisDegrees = circle.startDegrees + (index * increment);
			let thisX = circle.centre[0] - circle.radius * Math.cos(degreesToRadians(thisDegrees));
			let thisY = circle.centre[1] - circle.radius * Math.sin(degreesToRadians(thisDegrees));
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

}