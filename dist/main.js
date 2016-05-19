'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keySize = 30,
    offset = keySize,

// in px
gridSize = 576,
    noteScale = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    numOctaves = 6,
    totalNotes = noteScale.length * numOctaves,
    noteW = gridSize / totalNotes,
    xlabel,
    labelStrg,
    xSlider,
    ySlider,
    intX,
    intY,
    prevIntY,
    mySound;

function updateSliders(intX, intY) {
	xSlider.update(offset, noteW * intY - 2);
	ySlider.update(noteW * intX - 2, offset);
	xSlider.display();
	ySlider.display();
}

function midiToNote(note) {
	var freq = new Tone();
	return freq.midiToNote(note);
}

var Slider = function () {
	function Slider(x, y, w, h, c) {
		_classCallCheck(this, Slider);

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
	}

	_createClass(Slider, [{
		key: 'update',
		value: function update(mX, mY) {
			this.x = constrain(mX, offset, width - offset - noteW);
			this.y = constrain(mY, offset, width - offset - noteW);
		}
	}, {
		key: 'display',
		value: function display() {
			fill(this.c);
			rect(this.x, this.y, this.w, this.h);
		}
	}]);

	return Slider;
}();

var Sound = function () {
	function Sound() {
		_classCallCheck(this, Sound);

		this.fmSynth = new Tone.FMSynth({
			harmonicity: 1.5,
			modulationIndex: 5.22,
			carrier: {
				oscillator: {
					type: 'sine'
				}
			},
			modulator: {
				oscillator: {
					type: 'sine'
				},
				envelope: {
					attack: 1,
					decay: .2
				}
			}
		});
		this.fmSynth.toMaster();
	}

	_createClass(Sound, [{
		key: 'play',
		value: function play(note) {
			this.fmSynth.triggerAttackRelease(midiToNote(note), 2);
		}
	}]);

	return Sound;
}();

function setup() {
	// init p5 stuff
	createCanvas(gridSize + offset * 2, gridSize + offset * 2); // 576px grid actual//
	xlabel = createDiv();
	xlabel.style('font-size', '1em').style('text-align', 'center').style('font-family', 'Arial Black').style('margin-top', '1em');

	for (var i = 0; i < totalNotes; i++) {
		if (noteScale[i % noteScale.length] == 1) {
			fill('#333');
		} else {
			fill('#FFFFFF');
		}
		noStroke();
		rect(noteW * i + offset, 0, noteW, keySize); //top
		rect(noteW * i + offset, height - keySize, noteW, keySize); //bottom
		rect(0, noteW * i + offset, keySize, noteW); //left
		rect(width - keySize, noteW * i + offset, keySize, noteW); //right
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
		rect(noteW * i + offset, offset, noteW, gridSize); // hor
		rect(offset, noteW * i + offset, gridSize, noteW); // vert
	}
	//
	labelStrg = int(mouseX) + ':' + int(mouseY);
	xlabel.html(labelStrg);

	// calc divider index
	intX = int(mouseX / noteW);
	intY = int(mouseY / noteW);

	console.log(intY);

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