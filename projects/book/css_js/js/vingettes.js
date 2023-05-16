let count = 0;

function playAudio(track) {
	let audio = new Audio(track);

	if (count == 0) {
		count++;
		audio.play();
	} 
	// else {
	// 	count--;
	// 	audio.pause();
	// }
}