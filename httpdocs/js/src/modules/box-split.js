export default function () {

	let buttons = document.querySelectorAll(".split-button");

	buttons.forEach(function (element) {
		element.addEventListener("click", canvasSplit);
	});

	function canvasSplit() {
		let number = this.dataset.number;
		buttons.forEach(function (element) {
			element.classList.remove("active");
		});
		this.classList.add("active");

		let canvas = document.querySelector(".canvas");

		let block = document.createElement("div");
		block.classList.add("canvas__block");

		let fragment = new DocumentFragment();
		// remove all
		while (canvas.firstChild) {
			canvas.removeChild(canvas.firstChild);
		}

		for (let i = 0; i < number; i++) {
			let blockClone = block.cloneNode();
			fragment.appendChild(blockClone);
		}

		canvas.appendChild(fragment);


	}

}


