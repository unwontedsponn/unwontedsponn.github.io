// input music note function-------------------------------------------------------------------
function worksheetPrompt() {
  let text;
  const defaultValue = "C";
  document.getElementById("MT1-1").setAttribute("class", "textWhite");

  let note = prompt("Enter your root note:", "C");
  const musicNotes = ["A", "B", "C", "D", "E", "F", "G", "Ab", "Bb", "Db", "Eb", "Gb"];

  if (musicNotes.includes(note)) {
    text = note;
    document.getElementById("MT1-1").setAttribute("class", "textBlack");
  } else {
    text = defaultValue;
  }

  document.getElementById("MT1-1").innerHTML = text;
}