// Button
//
// Button class

class Button {
  // constructor
  //
  // Sets the initial values for the button's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, size, text, leadsTo) {
    // Position
    this.x = x;
    this.y = y;
    // Size
    this.size = size;
    // The text in the Button
    this.text = text;
    // What this button do when clicked
    this.leadsTo = leadsTo;
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
    rect(this.x, this.y, this.size, this.size*2/3);
    fill(0);
    textSize(width/10);
    textAlign(CENTER,CENTER);
    text(this.text, this.x , this.y);
    pop();
  }

}
