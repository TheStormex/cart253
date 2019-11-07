// Ability
//
// Ability class

class Ability {
  // constructor
  //
  // Sets the initial values for the Ability's properties
  // Either sets default values or uses the arguments provided
  constructor(name, text, effect) {
    // Position
    this.x = x;
    this.y = y;
    // Size
    this.size = width/8;
    // The text
    this.text = text;
  }
  clicked() {
    if (mousePressed(this)) {
    this.leadsTo;
    }
  }
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,0,255);
    rect(this.x, this.y, this.size, this.size*2);
    fill(0);
    textSize(width/10);
    textAlign(CENTER,CENTER);
    text(this.text, this.x , this.y);
    pop();
  }

}
