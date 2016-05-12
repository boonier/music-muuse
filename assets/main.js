var keySize = offset = 30, // in px
	gridSize = 576,
	noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
	numOctaves = 6,
	totalNotes = noteScale.length * numOctaves,
	noteW = gridSize / totalNotes;

var xlabel, labelStrg, xSlider, ySlider;


function setup() {
	createCanvas(gridSize + (offset * 2), gridSize + (offset * 2)); // 576px grid actual
	for (let i = 0; i < totalNotes; i++) {
		if (noteScale[i % noteScale.length] == 1) {
			fill('#333');
		} else {
			fill('#FFFFFF');
		}
		noStroke();
		rect((noteW * i) + offset, 0, noteW, keySize); //top
		rect((noteW * i) + offset, height - keySize, noteW, keySize); //bottom
		rect(0, (noteW * i) + offset, keySize, noteW); //left
		rect(width - keySize, (noteW * i) + offset, keySize, noteW); //right
	}

	xSlider = new Slider(offset, offset, gridSize, noteW, '#ccc');
	ySlider = new Slider(offset, offset, noteW, gridSize, '#ccc');

	//
	xlabel = createDiv();
	xlabel.style('font-size', '1em').style('text-align', 'center').style('font-family', 'Arial Black').style('margin-top', '1em')
}

function draw() {

	rect(offset, offset, gridSize, gridSize);
	for (var i = 0; i < totalNotes; i++) {
		if (noteScale[i % noteScale.length] == 1) {
			fill('#f2f2f2');
		} else {
			noFill();
		}
		noStroke();
		rect((noteW * i) + offset, offset, noteW, gridSize); // hor
		rect(offset, (noteW * i) + offset, gridSize, noteW); // vert
	}
	//
	labelStrg = int(mouseX) + ':' + int(mouseY);
	xlabel.html(labelStrg);

	xSlider.update(offset, mouseY - (noteW / 2));
	ySlider.update(mouseX - (noteW / 2), offset);
	xSlider.display();
	ySlider.display();
}

var Slider = function (x, y, w, h, c) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.update = function (mX, mY) {
		let intX = (int(mX / noteW) * noteW) - 2,
			intY = (int(mY / noteW) * noteW) - 2;

		this.x = constrain(intX, offset, width - offset - noteW);
		this.y = constrain(intY, offset, width - offset - noteW);
	}
	this.display = function () {
		fill(c);
		rect(this.x, this.y, this.w, this.h);
	}
}