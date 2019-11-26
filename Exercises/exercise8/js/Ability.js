// Ability
//
// Ability class
// the name, image and effect of the ability in the inventory.

class Ability {
  // constructor
  //
  // Sets the initial values for the Ability's properties
  // Either sets default values or uses the arguments provided
  constructor(name, text, user, targets, effect, amount, minigame, color) {
    // Position in the inventory (if in the inventory)
    this.x = width/10;
    this.y = height/2+height/3.2;
    // Size
    this.sizeX = width/6;
    this.sizeY = height/3;
    // The name
    this.name = name;
    // The ability's effect text (should it appear anywhere)
    this.text = text;
    // Whose inventory is this ability in
    this.user = user;
    // Who this ability can target
    this.targets = targets;
    // what effect this ability has
    this.effect = effect;
    // how much of the effect per minigame hit
    this.amount = amount;
    // how much total effect
    this.totalAmount = 0;
    // the minigame of this ability
    this.minigame = minigame;
    // the color of the card
    this.color = color;
  }
  displayInventory(i) {
    push();
    rectMode(CENTER);
    noStroke();
    this.x = width/10 + width/5 * i;
    fill(this.color);
    rect(this.x, this.y, this.sizeX, this.sizeY);
    fill(0);
    textSize(width/50+height/50);
    textAlign(CENTER,CENTER);
    text(this.name, this.x , this.y-this.y/8);
    textSize(width/60+height/60);
    text(this.text, this.x, this.y+height/20);
    pop();
    // console.log(this.x);
  }

}
