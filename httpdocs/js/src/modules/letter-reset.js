export default function () {

	document.querySelector(".reset").addEventListener("click", function () {
		let clones = document.querySelectorAll(".clone");
		clones.forEach(function (element) {
			element.parentNode.removeChild(element);
		});
	});

}