var keySize = offset = 30, // in px
	gridSize = 576,
	noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
	numOctaves = 6,
	totalNotes = noteScale.length * numOctaves,
	noteW = gridSize / totalNotes,
	xlabel, labelStrg, xSlider, ySlider, intX, intY, prevIntX;

function updateSliders(intX, intY) {
	xSlider.update(offset, (noteW * intY) - 2);
	ySlider.update((noteW * intX) - 2, offset);
	xSlider.display();
	ySlider.display();
}

function midiToNote(note) {
	var freq = new Tone();
	return freq.midiToNote(note);
}

var Slider = function (x, y, w, h, c) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.update = function (mX, mY) {
		this.x = constrain(mX, offset, width - offset - noteW);
		this.y = constrain(mY, offset, width - offset - noteW);
	}
	
	this.display = function () {
		fill(c);
		rect(this.x, this.y, this.w, this.h);
	}

}

var Sound = function () {
	this.fmSynth = new Tone.FMSynth().toMaster();
	
	this.play = function (note) {
		this.fmSynth.triggerAttackRelease( midiToNote(note), '16n');
	}
	
}

function setup() {
	// init p5 stuff
	createCanvas(gridSize + (offset * 2), gridSize + (offset * 2)); // 576px grid actual//
	xlabel = createDiv();
	xlabel.style('font-size', '1em').style('text-align', 'center').style('font-family', 'Arial Black').style('margin-top', '1em')

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
	// slider objects
	xSlider = new Slider(offset, offset, gridSize, noteW, '#ccc');
	ySlider = new Slider(offset, offset, noteW, gridSize, '#ccc');
	
	//
	mySound = new Sound();
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
	
	// calc divider index
	intX = int(mouseX / noteW);
	intY = int(mouseY / noteW);

	updateSliders(intX, intY);
	
		if(intX !== prevIntX) {
		mySound.play(intX);
		prevIntX = intX;
	}
	
}

function mouseMoved	() {
	// if(intX !== prevIntX) {
	// 	mySound.play(intX);
	// 	prevIntX = intX;
	// }
	return false;
}