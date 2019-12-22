let canvas_w = 1000;
let canvas_h = 750;


let bild_wasser;
let bild_fisch_r;
let bild_fisch_l;
let plop;
let schmatz;

let fisch = new Fisch();

var geschwindigkeit = 1;

let futterListe = []; // array to hold snowflake objects

/*
  Docu zu
    Bilder laden: https://p5js.org/reference/#/p5/image
    Man muss Bilder aus dem Internet nehmen, es functionaiert aber nicht mit allen.
*/


function preload() {
  bild_wasser = loadImage('./unterWasser.jpg');
  bild_fisch_r = loadImage('./gold-fish-icon-r.png');
  bild_fisch_l = loadImage('./gold-fish-icon-l.png');

  soundFormats('mp3');
  plop = loadSound('./Flensburger_Brauerei_-_plop_.mp3');
  schmatz = loadSound('salamisound-8138442-kauen-und-schmatzen-keks.mp3');
}


function setup() {
  //  Wir definieren die Malfläche, siehe https://p5js.org/reference/#/p5/createCanvas 
  createCanvas(canvas_w, canvas_h);
}


function keyPressed() {
  // a: keyCode 65 - soll langsamer werden
  // s: keyCode 83 - soll schneler werden
  //print(keyCode);

  switch (keyCode) {
    case 65:
      geschwindigkeit--;
      break;
    case 83:
      geschwindigkeit++;
      break;
  }
}

function draw() {

  image(bild_wasser, 0, 0);
  fisch.update();
  fisch.display();

  // neues Futter zufällig
  if (random() < 0.01 ) {
    futterListe.push(new Futter()); // zur Liste hinzufügen
  }

  // loop through snowflakes with a for..of loop
  for (let futter of futterListe) {
    futter.update(); 
    futter.display(); 
  }


}




// Fisch Klasse
function Fisch() {
  this.x = canvas_w / 2;
  this.y = canvas_h / 2;
  this.w = 128;
  this.h = 128;
  this.orientierung = 1;


  this.update = function () {

    // bewegen
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= geschwindigkeit;
      this.orientierung = -1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += geschwindigkeit;
      this.orientierung = 1;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= geschwindigkeit;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += geschwindigkeit;
    }

    // am Rand anhalten
    if (this.x <= 0) {
      this.x = 0;
      this.orientierung = 1;
    }
    if (this.x + this.w >= canvas_w) {
      this.x = canvas_w - this.w;
      this.orientierung = -1;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
    if (this.y + this.h >= canvas_h) {
      this.y = canvas_h - this.h;
    }
  }

  this.display = function () {
    if (this.orientierung > 0) {
      image(bild_fisch_r, this.x, this.y);
    } else {
      image(bild_fisch_l, this.x, this.y);
    }
  };
}

function Futter() {
  this.x = random(canvas_w);
  this.y = 0;

  this.v_y = random(3);

  this.update = function () {
    this.y += this.v_y;

    // löschen, falls außerhalb canvas
    if (this.y > canvas_h) {
      let index = futterListe.indexOf(this);
      futterListe.splice(index, 1);
      plop.play();
    }

    // wird gefressen?
    if (collideRectCircle(fisch.x, fisch.y, fisch.w, fisch.h, this.x, this.y, 5))
   {
    let index = futterListe.indexOf(this);
    futterListe.splice(index, 1);
    schmatz.play();
   }


  }

  this.display = function () {
    circle(this.x, this.y, 5);
  };

}