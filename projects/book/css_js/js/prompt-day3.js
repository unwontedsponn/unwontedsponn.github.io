
// placeholder grey text function-------------------------------------------------------------------
function placeholderTextColour() {
  document.getElementById("day-3-cell-1").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-2").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-3").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-4").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-5").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-6").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-7").setAttribute("class", "placeholderTextGrey");
  document.getElementById("day-3-cell-8").setAttribute("class", "placeholderTextGrey");
}

placeholderTextColour();

// input music note functions-------------------------------------------------------------------
function day3Prompt1() {
  let text;
  const defaultValue = "C";

  let note = prompt("Enter your chosen root note:", "C");
  const musicNotes = ["A", "B", "C", "D", "E", "F", "G", "Ab", "Bb", "Db", "Eb", "Gb"];

  if (musicNotes.includes(note)) {
    text = note;
    document.getElementById("day-3-cell-1").setAttribute("class", "placeholderTextBlack");
  } else {
    text = defaultValue;
  }

  document.getElementById("day-3-cell-1").innerHTML = text;
}

function day3Prompt2() {
  let text;
  const defaultValue = "D";

  let note = prompt("Enter the second note of the scale:", "D");
  const musicNotes = ["A", "B", "C", "D", "E", "F", "G", "Ab", "Bb", "Db", "Eb", "Gb"];

  if (musicNotes.includes(note)) {
    text = note;
    document.getElementById("day-3-cell-2").setAttribute("class", "placeholderTextBlack");
  } else {
    text = defaultValue;
  }

  document.getElementById("day-3-cell-2").innerHTML = text;
}