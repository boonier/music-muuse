var keySize = offset = 30, // in px
	gridSize = 576,
	noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
	numOctaves = 6,
	totalNotes = noteScale.length * numOctaves,
	noteW = gridSize / totalNotes,
	spacer = 0;

function setup() {
	createCanvas(gridSize + (offset * 2), gridSize + (offset * 2)); // 576px grid actual
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
	spacer = 0;
}

function draw() {
	for (var i = 0; i < totalNotes; i++) {
		if (noteScale[i % noteScale.length] == 1) {
			fill('#f2f2f2');
		} else {
			noFill();
		}
		noStroke();
		rect(spacer + offset, offset, noteW, gridSize); // hor
		rect(offset, spacer + offset, gridSize, noteW); // vert
		spacer += noteW;
	}
	spacer = 0;
}
