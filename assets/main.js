var keySize = 30,
	offset = keySize, // in px
	gridSize = 576,
	noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
	numOctaves = 6,
	totalNotes = noteScale.length * numOctaves,
	noteW = gridSize / totalNotes,
	xlabel, labelStrg, xSlider, ySlider, intX, intY, prevIntY, mySound;

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

class Slider {
	constructor(x, y, w, h, c) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
	}
	update(mX, mY) {
		this.x = constrain(mX, offset, width - offset - noteW);
		this.y = constrain(mY, offset, width - offset - noteW);
	}
	display() {
		fill(this.c);
		rect(this.x, this.y, this.w, this.h);
	}
}

class Sound {
	constructor() {
		this.fmSynth = new Tone.FMSynth({
			harmonicity: 1.5,
			modulationIndex :5.22,
			carrier: {
				oscillator: {
					type: 'sine'
				},
				envelope: {
					attack: 1,
					decay: 0.1,
					sustain: 0.5,
					release: 1
				}
			},
			modulator: {
				oscillator: {
					type: 'sine'
				},
				envelope: {
					attack: 1,
					decay: .2,
					sustain: .5,
					release: 1
				}
			}
		});
		this.fmSynth.toMaster();
	}
	play(note) {
		console.log(note);
		this.fmSynth.triggerAttackRelease(midiToNote(note), 2);
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
	xSlider = new Slider(offset, offset, gridSize, noteW, '#aab');
	ySlider = new Slider(offset, offset, noteW, gridSize, '#fb0');

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

	if (intY !== prevIntY) {
		mySound.play(totalNotes - intY);
		prevIntY = intY;
	}

}

function mouseMoved() {
	// if(intX !== prevIntX) {
	// 	mySound.play(intX);
	// 	prevIntX = intX;
	// }
	return false;
}
