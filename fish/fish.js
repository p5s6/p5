let canvasBreite = 1000;
let canvasHoehe = 750;


let bild_wasser;
let bild_fisch_r;
let bild_fisch_l;

let fisch = new Fisch();


/*
  Docu zu
    Bilder laden: https://p5js.org/reference/#/p5/image
    Man muss Bilder aus dem Internet nehmen, es functionaiert aber nicht mit allen.
*/


function preload() {
  bild_wasser = loadImage('./unterWasser.jpg');
  bild_fisch_r = loadImage('./gold-fish-icon-r.png');
  bild_fisch_l = loadImage('./gold-fish-icon-l.png');
}


function setup() {
  //  Wir definieren die Malfläche, siehe https://p5js.org/reference/#/p5/createCanvas 
  createCanvas(canvasBreite, canvasHoehe);
}


function draw() {

  image(bild_wasser, 0, 0);

  if (keyIsDown(LEFT_ARROW)) {
    fisch.posX--;
    fisch.orientierung = -1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    fisch.posX++;
    fisch.orientierung = 1;
  }
  if (keyIsDown(UP_ARROW)) {
    fisch.posY--;
  }
  if (keyIsDown(DOWN_ARROW)) {
    fisch.posY++;
  }

  fisch.display();

}




// Fisch Klasse
function Fisch() {
  this.posX = canvasBreite/2;
  this.posY = canvasHoehe/2;
  this.orientierung = 1 ; 

  this.display = function () {
    if (this.orientierung > 0) {
      image(bild_fisch_r, this.posX, this.posY);
    } else {
      image(bild_fisch_l, this.posX, this.posY);
    }
  
  };
}