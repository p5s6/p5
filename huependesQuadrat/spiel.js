let canvasBreite = 1000;
let canvasHoehe = 500;
let y_horizont = canvasHoehe - 100;

let quadrat = new Quadrat();
let kreis = new Kreis();

let punktestand = 0;

let speed = 3;

var pling; // wir müssen pling als globale variable deklariern
var sash;

function preload() {
  soundFormats('mp3');
  pling = loadSound('./sound/pling.mp3');
  smash = loadSound('./sound/smash.mp3');
}


function setup() {
  //  Wir definieren die Malfläche, siehe https://p5js.org/reference/#/p5/createCanvas 
  createCanvas(canvasBreite, canvasHoehe);

  
  userStartAudio().then(function() {
  });

}


function draw() {

  let t = frameCount; // update time

  // himmel zeichnen
  fill(200);
  noStroke();
  rect(0, 0, canvasBreite, y_horizont);
  // siehe https://p5js.org/reference/#/p5/rect 

  // boden zeichnen
  fill(100);
  noStroke();
  rect(0, y_horizont, canvasBreite, canvasHoehe - y_horizont);

  // quadrat positionieren und zeichnen
  quadrat.update(t);
  quadrat.display();

  // kreis positionieren und zeichnen
  kreis.update(t);
  kreis.display();

  // Punktestand schreiben
  fill(0, 102, 153);
  textSize(20);
  text('Punktestand: ' + punktestand, 50, 50);
  

  // Kollision feststellen, siehe https://github.com/bmoren/p5.collide2D
  let hit = collideRectCircle(quadrat.posX, quadrat.posY - quadrat.seitenlaenge, quadrat.seitenlaenge, quadrat.seitenlaenge, kreis.posX, kreis.posY, 2 * kreis.radius);
  if (hit) {
    
    smash.play();
    
    // Spiel anhalten
    noLoop();

    // text anzeigen
    fill(200, 0, 0);
    textSize(60);
    text('GAME OVER!', 300, 250);
    textSize(25)
    fill('black')
    text('Drücke die linke Maustaste um nochmal zu spielen', 230, 300)
  }
}


function keyPressed() {
  quadrat.startJumping();
}


function mouseClicked() {
  // Spiel fortsetzen
  speed = 3;
  punktestand = 0;

  quadrat = new Quadrat;
  kreis = new Kreis();
  loop();
}

// Quadrat Klasse
function Quadrat() {
  // initialize coordinates
  this.seitenlaenge = 50;
  this.posX = 50;
  this.posY = y_horizont;
  this.v = 0;
  this.jumping = false;

  this.update = function (time) {

    if (this.posY < y_horizont || this.v < 0) {
      // quadrat hüpft schon oder wurde gerade angestoßen
      this.posY += this.v;
      this.v += 0.1;
    } else {
      // stop jumping
      this.jumping = false;
      this.v = 0;
      this.posY = y_horizont;
    }


  };

  this.startJumping = function () {
    // kicke nach oben, falls nicht schon in Bewegung
    if (this.posY == y_horizont) {
      this.v = -5;
      pling.play();
    }
  }


  this.display = function () {
    fill(255, 204, 0);
    rect(this.posX, this.posY - this.seitenlaenge, this.seitenlaenge, this.seitenlaenge);
  };
}


// Kreis Klasse
function Kreis() {
  // initialize coordinates
  this.radius = 25;
  this.posX = canvasBreite - this.radius;
  this.posY = y_horizont - this.radius;

  this.update = function (time) {
    this.posX = this.posX - speed;

    // wenn Kreis links rausgeht, rechts wieder reinkommen lassen. Punkte erhöhen
    if (this.posX < 0) {
      this.posX = canvasBreite - this.radius;
      punktestand++;  // es gibt einen Punkt
      speed++;  // die Kugel wird schneller
    }
  };

  this.display = function () {
    fill(0, 255, 0);
    // https://p5js.org/reference/#/p5/circle
    circle(this.posX, this.posY, 2 * this.radius)
  };
}