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

// create piano_2-----------------------------------------------------------------------
function createPiano_2(containerId) {
	const container = document.querySelector(containerId);
	createWhiteKeys(container);
	createBlackKeys(container);
	addTextC(container);
}

createPiano_2('#container_2');

// create piano_3-----------------------------------------------------------------------
function createPiano_3(containerId) {
	const container = document.querySelector(containerId);
	createWhiteKeys(container);
	createBlackKeys(container);
	addTextAllWhiteNotes(container);
}

createPiano_3('#container_3');

// create piano_empty-----------------------------------------------------------------------
function createPiano_empty(containerId) {
	const container = document.querySelector(containerId);
	addSharpTextForAllBlackNotes(container);
	addFlatTextForAllBlackNotes(container);
}

createPiano_empty('#container_empty');

// create piano_4-----------------------------------------------------------------------
function createPiano_4(containerId) {
	const container = document.querySelector(containerId);
	createWhiteKeys(container);
	createBlackKeys(container);
}

createPiano_4('#container_4');

// create piano_empty_Two-----------------------------------------------------------------------
function createPiano_empty_Two(containerId) {
	const container = document.querySelector(containerId);
	addSharpTextForChromaticBlackNotes(container);
}

createPiano_empty_Two('#container_empty_Two');

// create piano_5-----------------------------------------------------------------------
function createPiano_5(containerId) {
	const container = document.querySelector(containerId);
	createWhiteKeys(container);
	createBlackKeys(container);
	addTextChromaticWhiteNotes(container);
}

createPiano_5('#container_5');

// create piano_empty_Three-----------------------------------------------------------------------
function createPiano_empty_Three(containerId) {
	const container = document.querySelector(containerId);
	addFlatTextForChromaticBlackNotes(container);
}

createPiano_empty_Three('#container_empty_Three');

// create piano_6-----------------------------------------------------------------------
function createPiano_6(containerId) {
	const container = document.querySelector(containerId);
	createWhiteKeys(container);
	createBlackKeys(container);
	addTextChromaticWhiteNotes(container);
}

createPiano_6('#container_6');

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

// create text with the note C------------------------------------------------------------------
function addTextC(container) {

	let textCGap = 174.5;

	for (let i = 0; i < totalTextC; i++) {
		const textC = document.createElementNS(ns, 'text');
		textC.setAttribute("x", textCGap);
		textC.setAttribute("y", "350");
		textC.style.strokeWidth = "7";
		textC.setAttribute("font-size", "80");
		textC.textContent = "C";
		textC.style.fill = "black";

		textCGap = textCGap + 560;

		container.appendChild(textC);
	}
}

// create text All White Notes------------------------------------------------------------------
function addTextAllWhiteNotes(container) {

	let textAllWhiteNotesGap = 15;
	const whiteNoteNames = ["A", "B", "C", "D", "E", "F", "G"];

	for (let i = 0; i < totalWhiteKeys; i++) {

		for (let j = 0; j < whiteNoteNames.length; j++) {

			const textAllWhiteNotes = document.createElementNS(ns, 'text');
			textAllWhiteNotes.setAttribute("x", textAllWhiteNotesGap);
			textAllWhiteNotes.setAttribute("y", "350");
			textAllWhiteNotes.style.strokeWidth = "7";
			textAllWhiteNotes.setAttribute("font-size", "80");
			textAllWhiteNotes.textContent = whiteNoteNames[j];
			textAllWhiteNotes.style.fill = "black";

			textAllWhiteNotesGap = textAllWhiteNotesGap + 80;

			container.appendChild(textAllWhiteNotes);
		}
	}
}

// create sharpNames for ALL OF THE Black Notes------------------------------------------------------------------
function addSharpTextForAllBlackNotes(container) {

	let blackKeyX = 52;
	const blackNoteNamesSharp = ["A#", "C#", "D#", "F#", "G#"];

	for (let i = 1; i < totalBlackKeys+1; i++) {

		if (i == 2 || i == 4 || i == 7 || i == 9 || i == 12 || i == 14 || i == 17 || i == 19 
				|| i == 22 || i == 24 || i == 27 || i == 29 || i == 32 || i == 34) {

				blackKeyX = blackKeyX + 80;
			}

			const text = document.createElementNS(ns, 'text');
			text.setAttribute("x", blackKeyX);
			text.setAttribute("y", "50");
			text.style.fill = "black";
			text.setAttribute("font-size", "65");
			text.style.strokeWidth = "4";

			if (i == 1 || i == 6 || i == 11 || i == 16 || i == 21 || i == 26 || i == 31 || i == 36) {

				text.textContent = blackNoteNamesSharp[0];
			}

			if (i == 2 || i == 7 || i == 12 || i == 17 || i == 22 || i == 27 || i == 32) {

				text.textContent = blackNoteNamesSharp[1];
			}

			if (i == 3 || i == 8 || i == 13 || i == 18 || i == 23 || i == 28 || i == 33) {

				text.textContent = blackNoteNamesSharp[2];
			}

			if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24 || i == 29 || i == 34) {

				text.textContent = blackNoteNamesSharp[3];
			}

			if (i == 5 || i == 10 || i == 15 || i == 20 || i == 25 || i == 30 || i == 35) {

				text.textContent = blackNoteNamesSharp[4];
			}
			
			container.appendChild(text);
			blackKeyX = blackKeyX + 80;
	}
}

// create flatNames for ALL OF THE Black Notes------------------------------------------------------------------
function addFlatTextForAllBlackNotes(container) {

	let blackKeyX = 52;
	const blackNoteNamesFlat = ["Bb", "Db", "Eb", "Gb", "Ab"];

	for (let i = 1; i < totalBlackKeys+1; i++) {

		if (i == 2 || i == 4 || i == 7 || i == 9 || i == 12 || i == 14 || i == 17 || i == 19 
				|| i == 22 || i == 24 || i == 27 || i == 29 || i == 32 || i == 34) {

				blackKeyX = blackKeyX + 80;
			}

			const text = document.createElementNS(ns, 'text');
			text.setAttribute("x", blackKeyX);
			text.setAttribute("y", "117");
			text.style.fill = "black";
			text.setAttribute("font-size", "65");
			text.style.strokeWidth = "4";

			if (i == 1 || i == 6 || i == 11 || i == 16 || i == 21 || i == 26 || i == 31 || i == 36) {

				text.textContent = blackNoteNamesFlat[0];
			}

			if (i == 2 || i == 7 || i == 12 || i == 17 || i == 22 || i == 27 || i == 32) {

				text.textContent = blackNoteNamesFlat[1];
			}

			if (i == 3 || i == 8 || i == 13 || i == 18 || i == 23 || i == 28 || i == 33) {

				text.textContent = blackNoteNamesFlat[2];
			}

			if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24 || i == 29 || i == 34) {

				text.textContent = blackNoteNamesFlat[3];
			}

			if (i == 5 || i == 10 || i == 15 || i == 20 || i == 25 || i == 30 || i == 35) {

				text.textContent = blackNoteNamesFlat[4];
			}
			
			container.appendChild(text);
			blackKeyX = blackKeyX + 80;
	}
}

// create text Chromatic White Notes------------------------------------------------------------------
function addTextChromaticWhiteNotes(container) {

	let firstNoteX = 1855;
	const whiteNoteNames = ["C", "D", "E", "F", "G", "A", "B", "C"];

	for (let i = 0; i < whiteNoteNames.length; i++) {

			const textAllWhiteNotes = document.createElementNS(ns, 'text');
			textAllWhiteNotes.setAttribute("x", firstNoteX);
			textAllWhiteNotes.setAttribute("y", "350");
			textAllWhiteNotes.style.strokeWidth = "7";
			textAllWhiteNotes.setAttribute("font-size", "80");
			textAllWhiteNotes.textContent = whiteNoteNames[i];
			textAllWhiteNotes.style.fill = "black";

			firstNoteX = firstNoteX + 80;

			container.appendChild(textAllWhiteNotes);
	}
}

// create sharpNames for CHROMATIC Black Notes------------------------------------------------------------------
function addSharpTextForChromaticBlackNotes(container) {

	let blackKeyX = 52;
	const blackNoteNamesSharp = ["C#", "D#", "F#", "G#", "A#"];

	for (let i = 1; i < totalBlackKeys+1; i++) {

			if (i == 24) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[0];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 24) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[1];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 25) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[2];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 25) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[3];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 25) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[4];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			else {
				blackKeyX = blackKeyX + 80;
			}
	}
}

// create flatNames for CHROMATIC Black Notes------------------------------------------------------------------
function addFlatTextForChromaticBlackNotes(container) {

	let blackKeyX = 52;
	const blackNoteNamesSharp = ["Db", "Eb", "Gb", "Ab", "Bb"];

	for (let i = 1; i < totalBlackKeys+1; i++) {

			if (i == 24) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[0];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 24) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[1];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 25) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[2];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 25) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[3];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			if (i == 25) {

				const text = document.createElementNS(ns, 'text');
				text.setAttribute("x", blackKeyX);
				text.setAttribute("y", "117");
				text.style.fill = "black";
				text.setAttribute("font-size", "65");
				text.textContent = blackNoteNamesSharp[4];
				container.appendChild(text);
				blackKeyX = blackKeyX + 80;
				text.style.strokeWidth = "4";
			}

			else {
				blackKeyX = blackKeyX + 80;
			}
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