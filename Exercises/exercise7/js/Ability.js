// Ability
//
// Ability class
// the name, image and effect of the ability in the inventory.

class Ability {
  // constructor
  //
  // Sets the initial values for the Ability's properties
  // Either sets default values or uses the arguments provided
  constructor(x, name) {
    // Position
    this.x = x;
    this.y = height/2+height/3.2;
    // Size
    this.sizeX = width/6;
    this.sizeY = height/3;
    // The name
    this.name = name;
  }
  displayInventory() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,255,255);
    rect(this.x, this.y, this.sizeX, this.sizeY);
    fill(0);
    textSize(width/40+height/40);
    textAlign(CENTER,CENTER);
    text(this.name, this.x , this.y-this.y/8);
    pop();
  }

}
