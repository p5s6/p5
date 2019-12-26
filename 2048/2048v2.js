let liste_aller_felder = [];
let liste_leerer_felder = [];


let feld11;
let feld12;
let feld13;
let feld14;

let feld21;
let feld22;
let feld23;
let feld24;

let feld31;
let feld32;
let feld33;
let feld34;

let feld41;
let feld42;
let feld43;
let feld44;

var score = 0;


let inBewegung = false;
let schritte = 0;

var touchStartEvent;

class Feld {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.element = document.createElement("div");

        var platzStyle = "platz" + String(x) + String(y);
        this.element.classList.add(platzStyle);

        var raster = document.getElementById("id_raster");
        raster.appendChild(this.element);

        liste_aller_felder.push(this);

        this.setzteWert(0);
    }


    setzteWert(wert) {

        this.wert = wert;

        if (wert > 0) {
            this.element.innerHTML = String(this.wert);
        } else {
            this.element.innerHTML = "";
        }
        var wertStyle = "wertStyle" + String(this.wert);
        while (this.element.classList.length > 1) {
            this.element.classList.remove(this.element.classList.item(1));
        }
        this.element.classList.add(wertStyle);


    };

}
function start() {


    // felder erzeugen, falls noch nicht geschehen
    if (liste_aller_felder.length == 0) {
        feld11 = new Feld(1, 1);
        feld12 = new Feld(1, 2);
        feld13 = new Feld(1, 3);
        feld14 = new Feld(1, 4);

        feld21 = new Feld(2, 1);
        feld22 = new Feld(2, 2);
        feld23 = new Feld(2, 3);
        feld24 = new Feld(2, 4);

        feld31 = new Feld(3, 1);
        feld32 = new Feld(3, 2);
        feld33 = new Feld(3, 3);
        feld34 = new Feld(3, 4);

        feld41 = new Feld(4, 1);
        feld42 = new Feld(4, 2);
        feld43 = new Feld(4, 3);
        feld44 = new Feld(4, 4);

        // wir legen touch zone üner FElder

        var touchZone = document.createElement("div");
        touchZone.classList.add("touchZone");
        touchZone.addEventListener("touchstart", touchStart);
        touchZone.addEventListener("touchend", touchEnd);

        var raster = document.getElementById("id_raster");
        raster.appendChild(touchZone);      



    }

    // falls Felder schon angelegt waren, müssen Wert aug Null gesetzt werden
    for (let feld of liste_aller_felder) {
        feld.setzteWert(0);
    }

    belege_leeres_feld();

    setzeScore(0);
}


/*
    zu touch handling, siehe 
    https://www.mediaevent.de/javascript/touch-events.html
*/

function touchStart(event) {
    touchStartEvent = event;
    event.preventDefault();
}


function touchEnd(event) {
    var touchEndEvent = event;

    if (touchStartEvent) {
        var x = touchEndEvent.changedTouches[0].clientX - touchStartEvent.changedTouches[0].clientX;
        var y = touchEndEvent.changedTouches[0].clientY - touchStartEvent.changedTouches[0].clientY;

        if (Math.abs(x) > Math.abs(y)) {
            // (vorwiegend) horizontale Bewegung
            if (x > 0) {
                nach_rechts();
            } else {
                nach_links();
            }
        } else {
            // (vorwiegend) vertikale Bewegung
            if (y > 0) {
                nach_unten();
            } else {
                nach_oben();
            }
        }

        touchStartEvent = null;

    }
    
    event.preventDefault();
}








function setzeScore(score) {
    var element = document.getElementById("id_score");
    element.innerHTML = String(score);
}

function addiereScore(wert) {
    score += wert;
    var element = document.getElementById("id_score");
    element.innerHTML = String(score);
}


function belege_leeres_feld() {
    liste_leerer_felder = [];


    for (let feld of liste_aller_felder) {
        if (feld.wert == 0) {
            liste_leerer_felder.push(feld);
        }
    }

    let anzahlLeererFelder = liste_leerer_felder.length;
    if (anzahlLeererFelder > 0) {
        let index = Math.floor(Math.random() * anzahlLeererFelder);
        let feld = liste_leerer_felder[index];
        feld.setzteWert(2);
    } else {
        // game over
    }

}




function move_from_to(feld_from, feld_to) {
    if (feld_from.wert > 0) {
        if (feld_to.wert == 0) {
            feld_to.setzteWert(feld_from.wert);
            feld_from.setzteWert(0);
            inBewegung = true;
        } else if (feld_to.wert == feld_from.wert) {
            addiereScore(feld_from.wert);

            feld_to.setzteWert(2 * feld_from.wert);
            feld_from.setzteWert(0);

            inBewegung = true;
        }
    }
}


function nach_links() {

    inBewegung = true;
    schritte = 0;
    while (inBewegung) {
        inBewegung = false;
        move_left();
    }
    if (schritte > 0) {
        belege_leeres_feld();
    }
}

function nach_rechts() {

    inBewegung = true;
    schritte = 0;
    while (inBewegung) {
        inBewegung = false;
        move_right();
    }
    if (schritte > 0) {
        belege_leeres_feld();
    }
}

function nach_oben() {
    inBewegung = true;
    schritte = 0;
    while (inBewegung) {
        inBewegung = false;
        move_up();
    }
    if (schritte > 0) {
        belege_leeres_feld();
    }
}

function nach_unten() {

    inBewegung = true;
    schritte = 0;
    while (inBewegung) {
        inBewegung = false;
        move_down();
    }
    if (schritte > 0) {
        belege_leeres_feld();
    }

}




function move_left() {
    move_from_to(feld21, feld11);
    move_from_to(feld31, feld21);
    move_from_to(feld41, feld31);

    move_from_to(feld22, feld12);
    move_from_to(feld32, feld22);
    move_from_to(feld42, feld32);

    move_from_to(feld23, feld13);
    move_from_to(feld33, feld23);
    move_from_to(feld43, feld33);

    move_from_to(feld24, feld14);
    move_from_to(feld34, feld24);
    move_from_to(feld44, feld34);


    schritte++;
}

function move_right() {
    move_from_to(feld31, feld41);
    move_from_to(feld21, feld31);
    move_from_to(feld11, feld21);

    move_from_to(feld32, feld42);
    move_from_to(feld22, feld32);
    move_from_to(feld12, feld22);

    move_from_to(feld33, feld43);
    move_from_to(feld23, feld33);
    move_from_to(feld13, feld23);

    move_from_to(feld34, feld44);
    move_from_to(feld24, feld34);
    move_from_to(feld14, feld24);


    schritte++;
}

function move_up() {
    move_from_to(feld12, feld11);
    move_from_to(feld13, feld12);
    move_from_to(feld14, feld13);

    move_from_to(feld22, feld21);
    move_from_to(feld23, feld22);
    move_from_to(feld24, feld23);

    move_from_to(feld32, feld31);
    move_from_to(feld33, feld32);
    move_from_to(feld34, feld33);

    move_from_to(feld42, feld41);
    move_from_to(feld43, feld42);
    move_from_to(feld44, feld43);


    schritte++;
}

function move_down() {
    move_from_to(feld13, feld14);
    move_from_to(feld12, feld13);
    move_from_to(feld11, feld12);

    move_from_to(feld23, feld24);
    move_from_to(feld22, feld23);
    move_from_to(feld21, feld22);

    move_from_to(feld33, feld34);
    move_from_to(feld32, feld33);
    move_from_to(feld31, feld32);

    move_from_to(feld43, feld44);
    move_from_to(feld42, feld43);
    move_from_to(feld41, feld42);


    schritte++;
}

