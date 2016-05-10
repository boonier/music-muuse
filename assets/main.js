function setup() {

	var keySize = offset = 30, // in px
		gridSize = 576;

	var noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
		numOctaves = 6,
		totalNotes = noteScale.length * numOctaves,
		noteW = gridSize / totalNotes,
		spacer = 0;

	// background('#ccc');
	createCanvas(gridSize + (offset * 2), gridSize + (offset * 2)); // 576px grid actual
	stroke('#eee');
	rect(offset, offset, gridSize - 1, gridSize - 1);

	for (let i = 0; i < totalNotes; i++) {
		if (noteScale[i % noteScale.length] == 1) {
			fill('#333');
		} else {
			fill('#FFFFFF');
		}
		noStroke();
		rect(spacer + offset, 0, noteW, keySize); //top
		rect(spacer + offset, height - keySize, noteW, keySize); //bottom
		rect(0, spacer + offset, keySize, noteW); //left
		rect(width-keySize, spacer + offset, keySize, noteW); //right
		spacer += noteW;
	}
}

function draw() {
	// background('rgba(0,0,0,0.1)');
	// fill('#000')
	// rect(mouseX, mouseY, 20, 20);
}
