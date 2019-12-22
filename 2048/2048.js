let canvas_w = 500;
let canvas_h = 500;


let felder = [];
let leereFelder = [];

let feld11 = new Feld(1, 1);
let feld12 = new Feld(1, 2);
let feld13 = new Feld(1, 3);
let feld14 = new Feld(1, 4);

let feld21 = new Feld(2, 1);
let feld22 = new Feld(2, 2);
let feld23 = new Feld(2, 3);
let feld24 = new Feld(2, 4);

let feld31 = new Feld(3, 1);
let feld32 = new Feld(3, 2);
let feld33 = new Feld(3, 3);
let feld34 = new Feld(3, 4);

let feld41 = new Feld(4, 1);
let feld42 = new Feld(4, 2);
let feld43 = new Feld(4, 3);
let feld44 = new Feld(4, 4);


let inBewegung = false;

let score = 0;


function setup() {
  createCanvas(canvas_w, canvas_h);

  background(200, 200, 255);

  showScore();

  for (let feld of felder) {
    feld.display();
  }

  feldBelegen();
}


function showScore(){
  fill(200, 200, 255);
  rect(0,0,canvas_w,40);
  fill(0);
  text("Score: " + score, 20, 20);
}


function keyPressed() {


  switch (keyCode) {
    case LEFT_ARROW:
      inBewegung = true;
      while (inBewegung) {
        inBewegung = false;
        move_left();
      }
      break;
    case RIGHT_ARROW:
      inBewegung = true;
      while (inBewegung) {
        inBewegung = false;
        move_right();
      }
      break;
    case UP_ARROW:
      inBewegung = true;
      while (inBewegung) {
        inBewegung = false;
        move_up();
      }
      break;
    case DOWN_ARROW:
      inBewegung = true;
      while (inBewegung) {
        inBewegung = false;
        move_down();
      }
      break;
  }

  feldBelegen();
 
}


function feldBelegen(){
 // neue Zahl in leeres feld
 leereFelder = [];
 for (let feld of felder) {
   if (feld.wert == 0) {
     leereFelder.push(feld);
   }
 }

 let anzahlLeererFelder = leereFelder.length;
 if (anzahlLeererFelder > 0) {
   let index = floor(random(anzahlLeererFelder));
   let feld = leereFelder[index];
   feld.wert = 2;
   feld.display();
 } else {
   // game over
 }
}


function move_from_to(feld_from, feld_to) {
  if (feld_from.wert > 0) {
    if (feld_to.wert == 0) {
      feld_to.wert = feld_from.wert;
      feld_from.wert = 0;
      feld_from.display();
      feld_to.display();
      inBewegung = true;
    } else if (feld_to.wert == feld_from.wert) {
      feld_to.wert += feld_from.wert;
      score += feld_to.wert;
      showScore();
      feld_from.wert = 0;
      feld_from.display();
      feld_to.display();
      inBewegung = true;
    }
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

}


function Feld(x, y) {
  this.x = x - 0.5;
  this.y = y - 0.5;
  this.w = 100;
  this.wert = 0;
  felder.push(this);


  this.display = function () {
    fill(0);


    if (this.wert > 0) {
      let helligkeit = 100 + 10 * floor(log(this.wert) / log(2));
      fill(helligkeit);
    }
    rect(this.x * this.w * 1.1, this.y * this.w * 1.1, this.w, this.w);
    fill(0);
    textSize(16);
    text(this.wert, (this.x + 0.4) * this.w * 1.1, (this.y + 0.5) * this.w * 1.1);
  };

}