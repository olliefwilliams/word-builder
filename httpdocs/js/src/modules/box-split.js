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
	}

}


