//TODO: добавить проверку на корректность ввода нот, в случае ошибки выкидывать варн и не начинать исполнение мелодии
//TODO: запускать мелодию циклично с интервалом N между повторами (!!!)
//TODO: добавить возможность добавлять дополнительные дорожки и кнопку запуска всех дорожек одновременно
//TODO: разработать синтетические инструменты (отличаются от "оригинала" длиной ноты, интервалом между нот и заданным изменением в частоте)
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

let timerId;
let isPlaying = false;
function playpause() {
    
    let interval = +document.getElementById("intervalValue").value;
    let strfreq = document.getElementById("notes").value;
    let volume = document.getElementById("volumeChange").value;
    let notesArray = strfreq.split(' ');
    if (notesArray=="") return;
    let duration = (notesArray.length)*1000 + interval;


    if (!isPlaying) {
        playMelody(notesArray, volume);
        timerId = setInterval(playMelody, duration, notesArray, volume);
    } else {
        clearTimeout(timerId);
    }
    isPlaying=!isPlaying;
}

function playMelody(notesArray, volume) {
    let context = new AudioContext();
    let sound = new Sound(context); 

    let currentCount=0;
    notesArray.forEach(function(element) {
        let freq = map.get(element);
        sound.play(freq, currentCount, currentCount+1, volume);
        ++currentCount;
    })
}




let map = new Map();
map.set('C0', 16.35);
map.set('C#0/Db0', 17.32);
map.set('D0', 18.3);
map.set('D#0/Eb0', 19.45);
map.set('E0', 20.60 );
map.set('F0', 21.8 );
map.set('F#0/Gb0', 23.12);
map.set( 'G0', 24.5);
map.set('G#0/Ab0', 25.96);
map.set('A0', 27.5);
map.set('A#0/Bb0', 29.14);
map.set('B0', 30.87);
map.set('C1', 32.7);
map.set('C#1/Db1', 34.65);
map.set('D1', 36.71);
map.set('D#1/Eb1', 38.89);
map.set('E1', 41.20);
map.set('F1', 43.65);
map.set('F#1/Gb1', 46.25);
map.set('G1', 49.00);
map.set('G#1/Ab1', 51.91);
map.set('A1', 55.00);
map.set('A#1/Bb1', 58.27);
map.set('B1', 61.74);
map.set('C2', 65.41); 
map.set('C#2/Db2', 69.30);
map.set('D2', 73.42);
map.set('D#2/Eb2', 77.78);
map.set('E2', 82.41);
map.set('F2', 87.31);
map.set('F#2/Gb2', 92.50);
map.set('G2', 98.00);
map.set('G#2/Ab2', 103.83);
map.set('A2', 110.00);
map.set('A#2/Bb2', 116.54);
map.set('B2', 123.47);
map.set('C3', 130.81);
map.set('C#3/Db3', 138.59);
map.set('D3', 146.83);
map.set('D#3/Eb3', 155.56);
map.set('E3', 164.81);
map.set('F3', 174.61);
map.set('F#3/Gb3', 185.00);
map.set('G3', 196.00);
map.set('G#3/Ab3', 207.65);
map.set('A3', 220.00);
map.set('A#3/Bb3', 233.08);
map.set('B3', 246.94);
map.set('C4', 261.63);
map.set('C#4/Db4', 277.18);
map.set('D4', 293.66);
map.set('D#4/Eb4', 311.13);
map.set('E4', 329.63);
map.set('F4', 349.23);
map.set('F#4/Gb4', 369.99);
map.set('G4', 392.00);
map.set('G#4/Ab4', 415.30);
map.set('A4', 440.00);
map.set('A#4/Bb4', 466.16) 
map.set('B4', 493.88);
map.set('C5', 523.25);
map.set('C#5/Db5', 554.37) 
map.set('D5', 587.33);
map.set('D#5/Eb5', 622.25) 
map.set('E5', 659.25);
map.set('F5', 698.46);
map.set('F#5/Gb5', 739.99) 
map.set('G5', 783.99);
map.set('G#5/Ab5', 830.61) 
map.set('A5', 880.00);
map.set('A#5/Bb5', 932.33) 
map.set('B5', 987.77);
map.set('C6', 1046.50);
map.set('C#6/Db6', 1108.73);
map.set('D6', 1174.66);
map.set('D#6/Eb6', 1244.51);
map.set('E6', 1318.51);
map.set('F6', 1396.91);
map.set('F#6/Gb6', 1479.98);
map.set('G6', 1567.98);
map.set('G#6/Ab6', 1661.22);
map.set('A6', 1760.00);
map.set('A#6/Bb6', 1864.66);
map.set('B6', 1975.53);
map.set('C7', 2093.00);
map.set('C#7/Db7', 2217.46);
map.set('D7', 2349.32);
map.set('D#7/Eb7', 2489.02);
map.set('E7', 2637.02);
map.set('F7', 2793.83);
map.set('F#7/Gb7', 2959.96);
map.set('G7', 3135.96);
map.set('G#7/Ab7', 3322.44);
map.set('A7', 3520.00);
map.set('A#7/Bb7', 3729.31);
map.set('B7', 3951.07);
map.set('C8', 186.01); 
map.set('C#8/Db8' , 4434.92);
map.set('D8', 4698.63);
map.set('D#8/Eb8', 4978.03);
map.set('E8', 5274.04);
map.set('F8', 5587.65);
map.set('F#8/Gb8', 5919.91); 
map.set('G8', 6271.93);
map.set('G#8/Ab8', 6644.88);
map.set('A8' , 7040.00);
map.set('A#8/Bb8', 7458.62); 
map.set('B8', 7902.13);
