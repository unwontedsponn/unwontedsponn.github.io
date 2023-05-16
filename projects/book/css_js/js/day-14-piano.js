// creating svg namespace: use this when creating every new element-----------------
let ns = "http://www.w3.org/2000/svg";

// global variables------------------------------------------------------------------
const totalWhiteKeys = 52;
const totalBlackKeys = 36;
const totalTextC = 8;

// CREATE PIANO FUNCTIONS--------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// create piano_1-----------------------------------------------------------------------
function createPiano_1(containerId) {
	const container = document.querySelector(containerId);
	createWhiteKeys(container);
	createBlackKeys(container);
}

createPiano_1('#container');

// CONTENT CREATION FUNCTIONS--------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// create white keys------------------------------------------------------------------
function createWhiteKeys(container) {
	for (let i = 0; i < totalWhiteKeys; i++) {

		const whiteKey = document.createElementNS(ns, 'rect');
		whiteKey.setAttribute("x", i * 80);
		whiteKey.setAttribute("y", "10");
		whiteKey.setAttribute("width", "80");
		whiteKey.setAttribute("height", "380");
		whiteKey.style.fill = "white";
		whiteKey.style.stroke = "black";
		whiteKey.style.strokeWidth = "13";
		
		container.appendChild(whiteKey);
	}
}

// create black keys------------------------------------------------------------------
function createBlackKeys(container) {

	let blackKeyX = 55;

	for (let i = 1; i < totalBlackKeys+1; i++) {
			
			if (i == 2 || i == 4 || i == 7 || i == 9 || i == 12 || i == 14 || i == 17 || i == 19 
				|| i == 22 || i == 24 || i == 27 || i == 29 || i == 32 || i == 34) {

				blackKeyX = blackKeyX + 80;
			}

			const blackKey = document.createElementNS(ns, 'rect');
			blackKey.setAttribute("x", blackKeyX);
			blackKey.setAttribute("y", "10");
			blackKey.setAttribute("width", "50");
			blackKey.setAttribute("height", "230");
			blackKey.style.fill = "black";
			// blackKey.style.strokeWidth = "13";
			
			container.appendChild(blackKey);
			blackKeyX = blackKeyX + 80;
	}

}






// container.style.backgroundColor =  "black";

// const circle = document.createElementNS(ns, 'circle');
// circle.setAttribute("cx", "200");
// circle.setAttribute("cy", "100");
// circle.setAttribute("r", "90");
// circle.style.fill = "red";
// circle.style.stroke = "white";
// circle.style.strokeWidth = "5";
// container.appendChild(circle);

// // event handler
// circle.onclick = function(e) {
// 	e.target.style.fill = "cyan";
// 	e.target.style.stroke = "none";
// 	// move x, y from current position
// 	e.target.style.transform = "translate(10px, 10px)";
// }