//TODO: добавить проверку на корректность ввода нот, в случае ошибки выкидывать варн и не начинать исполнение мелодии
//TODO: добавить возможность добавлять дополнительные дорожки и кнопку запуска всех дорожек одновременно
//TODO: добавить 2-3 эффекта (???)

class Sound {

    constructor(context) {
        this.context = context;
    }

    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
    }

    play(value, startTime, stopTime, volumeValue) {
        this.init();
        this.gainNode.gain.value = volumeValue;
        this.oscillator.frequency.value = value;

        this.oscillator.start(startTime);
        this.oscillator.stop(stopTime); 
    }
}



function button1() {
    buttonAction(1);
}
function button2() {
    buttonAction(2);
}
function button3() {
    buttonAction(3);
}

let melodyTimer;
let melodyTimer2;
let melodyTimer3;
function buttonAction(id) {

    let buttonText, strnotes, interval, instrument;
    let deltafreq, notelength;

    switch (id) {
        case (1):
            buttonText = document.getElementById("playButton");
            strnotes = document.getElementById("notes").value;
            interval = document.getElementById("interval").value;
            instrument = document.getElementById("selectinst").value;
            break;
        case (2):
            buttonText = document.getElementById("playButton2");
            strnotes = document.getElementById("notes2").value;
            interval = document.getElementById("interval2").value;
            instrument = document.getElementById("selectinst2").value;
            break;
        case (3):
            buttonText = document.getElementById("playButton3");
            strnotes = document.getElementById("notes3").value;
            interval = document.getElementById("interval3").value;
            instrument = document.getElementById("selectinst3").value;
            break;
    }
    
    switch (instrument) {
        case 'Default':
            deltafreq=0;
            notelength=1;
            break;
        case 'Instrument 1':
            deltafreq=-70;
            notelength=1.2;
            break;
        case 'Instrument 2':
            deltafreq=100;
            notelength=0.6;
            break;
    }

    let notesArray = strnotes.split(' ');
    if (notesArray=="") return;
    let duration = (notesArray.length)*notelength*1000 + Number(interval);

    if (buttonText.value == "Start") {
        buttonText.value = "Stop";
        playMelody(notesArray, deltafreq, notelength, id);
        switch (id) {
            case (1):
                melodyTimer = setInterval(playMelody, duration, notesArray, deltafreq, notelength, id);
                break;
            case (2):
                melodyTimer2 = setInterval(playMelody, duration, notesArray, deltafreq, notelength, id);
                break;
            case (3):
                melodyTimer3 = setInterval(playMelody, duration, notesArray, deltafreq, notelength, id);
                break;
        }
    } else {
        buttonText.value = "Start";
        switch (id) {
            case (1):
                clearTimeout(melodyTimer);
                break;
            case (2):
                clearTimeout(melodyTimer2);
                break;
            case (3):
                clearTimeout(melodyTimer3);
                break;
        }
    }
}

function playMelody(notesArray, deltafreq, notelength, id) {
    let volume;
    switch (id) {
        case (1):
            volume = document.getElementById("volumeChange").value;
            break;
        case (2):
            volume = document.getElementById("volumeChange2").value;
            break;
        case (3):
            volume = document.getElementById("volumeChange3").value;
            break;
    }
    let context = new AudioContext();
    let sound = new Sound(context); 
    let currentCount=0;

    notesArray.forEach(function(element) {
        let freq = map.get(element); 
        sound.play(freq+deltafreq, currentCount, currentCount+notelength, volume);
        currentCount+=notelength;
    })
}








// class Elements {
//     constructor(){
//         this.wrapper = null;

//         this.appendToWrapper();
//     }
//     static get CSS() {
//             return {
//                 maincontainerClass : "maincontainer",
//                 buttonWrapperClass : "buttonWrapper",
//                 notesWrapperClass : "notesWrapper",
//                 intervalWrapperClass : "intervalWapper",
//                 volumeWrapperClass : "volumeWrapper"
//             }
//     }    

//     make(tagName, elementType, ClassName) {
//         var element = document.createElement(tagName);
//         if (!elementType) {element.type = elementType}
//         element.classList.add(ClassName);
//         return element;
//     }

//     appendToWrapper() {
//         this.wrapper = this.make('div', null, Elements.CSS.maincontainerClass)
//         let playList = document.getElementById('playList');
//         console.log(playList);
//         playList.appendChild(this.wrapper);

//         this.buttonWrapper = this.make('div', null, Elements.CSS.buttonWrapperClass)
//         console.log(this.buttonWrapper);
//         this.wrapper.appendChild(this.buttonWrapper);

//         this.notesWrapper = this.make('div', null, Elements.CSS.notesWrapperClass)
//         console.log(this.notesWrapper);
//         this.wrapper.appendChild(this.notesWrapper);

//         this.intervalWrapper = this.make('div', null, Elements.CSS.intervalWrapperClass)
//         console.log(this.intervalWrapper);
//         this.wrapper.appendChild(this.intervalWrapper);

//         this.volumeWrapper = this.make('div', null, Elements.CSS.volumeWrapperClass)
//         console.log(this.volumeWrapper);
//         this.wrapper.appendChild(this.volumeWrapper);
//     }

//     appendElementsToWrapper() {
        
//     }
// }

// function addTrack() {
//     let newTrack = new Elements();
// }



let map = new Map();
map.set('C0', 16.35);
map.set('C#0',  17.32);
map.set('Db0', 17.32);
map.set('D0', 18.3);
map.set('D#0',  19.45);
map.set('Eb0', 19.45);
map.set('E0', 20.60);
map.set('F0', 21.8);
map.set('F#0',  23.12);
map.set('Gb0', 23.12);
map.set( 'G0', 24.5);
map.set('G#0',  25.96);
map.set('Ab0', 25.96);
map.set('A0', 27.5);
map.set('A#0',  29.14);
map.set('Bb0', 29.14);
map.set('B0', 30.87);
map.set('C1', 32.7);
map.set('C#1',  34.65);
map.set('Db1', 34.65);
map.set('D1', 36.71);
map.set('D#1',  38.89);
map.set('Eb1', 38.89);
map.set('E1', 41.20);
map.set('F1', 43.65);
map.set('F#1',  46.25);
map.set('Gb1', 46.25);
map.set('G1', 49.00);
map.set('G#1',  51.91);
map.set('Ab1', 51.91);
map.set('A1', 55.00);
map.set('A#1',  58.27);
map.set('Bb1', 58.27);
map.set('B1', 61.74);
map.set('C2', 65.41); 
map.set('C#2',  69.30);
map.set('Db2', 69.30);
map.set('D2', 73.42);
map.set('D#2',  77.78);
map.set('Eb2', 77.78);
map.set('E2', 82.41);
map.set('F2', 87.31);
map.set('F#2',  92.50);
map.set('Gb2', 92.50);
map.set('G2', 98.00);
map.set('G#2',  103.83);
map.set('Ab2', 103.83);
map.set('A2', 110.00);
map.set('A#2',  116.54);
map.set('Bb2', 116.54);
map.set('B2', 123.47);
map.set('C3', 130.81);
map.set('C#3',  138.59);
map.set('Db3', 138.59);
map.set('D3', 146.83);
map.set('D#3',  155.56);
map.set('Eb3', 155.56);
map.set('E3', 164.81);
map.set('F3', 174.61);
map.set('F#3',  185.00);
map.set('Gb3', 185.00);
map.set('G3', 196.00);
map.set('G#3',  207.65);
map.set('Ab3', 207.65);
map.set('A3', 220.00);
map.set('A#3',  233.08);
map.set('Bb3', 233.08);
map.set('B3', 246.94);
map.set('C4', 261.63);
map.set('C#4', 277.18);
map.set('Db4', 277.18);
map.set('D4', 293.66);
map.set('D#4',  311.13);
map.set('Eb4', 311.13);
map.set('E4', 329.63);
map.set('F4', 349.23);
map.set('F#4',  369.99);
map.set('Gb4', 369.99);
map.set('G4', 392.00);
map.set('G#4',  415.30)
map.set('Ab4', 415.30);
map.set('A4', 440.00);
map.set('A#4',  466.16);
map.set('Bb4', 466.16); 
map.set('B4', 493.88);
map.set('C5', 523.25);
map.set('C#5',  554.37);
map.set('Db5', 554.37); 
map.set('D5', 587.33);
map.set('D#5',  622.25);
map.set('Eb5', 622.25); 
map.set('E5', 659.25);
map.set('F5', 698.46);
map.set('F#5',  739.99);
map.set('Gb5', 739.99);
map.set('G5', 783.99);
map.set('G#5',  830.61);
map.set('Ab5', 830.61); 
map.set('A5', 880.00);
map.set('A#5',  932.33)
map.set('Bb5', 932.33); 
map.set('B5', 987.77);
map.set('C6', 1046.50);
map.set('C#6',  1108.73);
map.set('Db6', 1108.73);
map.set('D6', 1174.66);
map.set('D#6',  1244.51);
map.set('Eb6', 1244.51);
map.set('E6', 1318.51);
map.set('F6', 1396.91);
map.set('F#6',  1479.98);
map.set('Gb6', 1479.98);
map.set('G6', 1567.98);
map.set('G#6',  1661.22);
map.set('Ab6', 1661.22);
map.set('A6', 1760.00);
map.set('A#6',  1864.66);
map.set('Bb6', 1864.66);
map.set('B6', 1975.53);
map.set('C7', 2093.00);
map.set('C#7',  2217.46);
map.set('Db7', 2217.46);
map.set('D7', 2349.32);
map.set('D#7',  2489.02);
map.set('Eb7', 2489.02);
map.set('E7', 2637.02);
map.set('F7', 2793.83);
map.set('F#7',  2959.96);
map.set('Gb7', 2959.96);
map.set('G7', 3135.96);
map.set('G#7',  3322.44);
map.set('Ab7', 3322.44);
map.set('A7', 3520.00);
map.set('A#7',  3729.31);
map.set('Bb7', 3729.31);
map.set('B7', 3951.07);
map.set('C8', 186.01); 
map.set('C#8', 4434.9);
map.set('Db8' , 4434.92);
map.set('D8', 4698.63);
map.set('D#8',  4978.03);
map.set('Eb8', 4978.03);
map.set('E8', 5274.04);
map.set('F8', 5587.65);
map.set('F#8',  5919.91);
map.set('Gb8', 5919.91); 
map.set('G8', 6271.93);
map.set('G#8',  6644.88);
map.set('Ab8', 6644.88);
map.set('A8' , 7040.00);
map.set('A#8',  7458.62);
map.set('Bb8', 7458.62); 
map.set('B8', 7902.13);