const infectionRadius = 10;

const sickcounttext = document.querySelector("#sickcount");
const immunecounttext = document.querySelector("#immunecount");
const peaktext = document.querySelector("#peak");
const commoncounttext = document.querySelector("#commoncount");
const deadtext = document.querySelector("#dead")

const dataRecordDelay = 180; // frames

let savedata = true;

let people = [];
let peak = 0;

let skdata = 0;
let imdata = 0;
let cpdata = 0;
let pedata = 0;
let dedata = 0;

let drdp = dataRecordDelay;

let skcp, imcp, cpcp, peap, dpcp;

let paused = false;

function setup() {
    createCanvas(800, 600);
    for(let i = 0; i < 200; i++) {
        people.push(new Person(floor(random(10)) == 1 ? true : false));
    }
    frameRate(60);
}
function draw() {
    background(0);
    let skc = 0;
    let imc = 0;
    let cpc = 0;
    let dpc = 0;
    for(let i = 0; i < people.length; i++) {
        people[i].update();
        people[i].edge();
        people[i].emitInfection(people);
        if(people[i].isSick)
            skc++;
        else if(people[i].immune)
            imc++;
        else if(people[i].isDead)
            dpc++;
        else
            cpc++;

        people[i].show();
    }
    peak = max(peak, skc);
    sickcounttext.textContent = `Sick: ${skc} / ${people.length}`;
    commoncounttext.textContent = `Uninfected: ${cpc} / ${people.length}`;
    immunecounttext.textContent = `Immune: ${imc} / ${people.length}`;
    peaktext.textContent = `Peak: ${peak}`;
    deadtext.textContent = `Dead: ${dpc}`;

    skcp = skc;
    imcp = imc;
    cpcp = cpc;
    peap = peak;
    dpcp = dpc;

    if(drdp <= 0) {
        if(savedata)
            saveData();
        drdp = dataRecordDelay;
    }

    drdp -= 1;
}
function mousePressed() {
    savedata = !savedata;
}
function keyPressed() {
    if(keyCode == ENTER) {
        pause();
    }
}
function pause() {
    paused = !paused;
    if(!paused)
        loop();
    else
        noLoop();
}
function saveData() {
    let dataToSave = {
        sick: skcp,
        immune: imcp,
        uninfected: cpcp,
        peak: peap,
        dead: dpcp
    };
    skdata++;
    imdata++;
    cpdata++;
    pedata++;
    dedata++;

    addLabel(mychart, floor(frameCount / 60));

    addData(mychart, 0, dataToSave.sick);
    addData(mychart, 1, dataToSave.immune);
    addData(mychart, 2, dataToSave.uninfected);
    addData(mychart, 3, dataToSave.dead);
}