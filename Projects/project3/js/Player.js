// Player
//
// Player class

class Player {
  // constructor
  //
  // Sets the initial values for the player's properties
  // Either sets default values or uses the arguments provided
  constructor(name, health, power, color) {
    // Name
    this.name = name;
    // Health
    this.maxHealth = health;
    this.health = this.maxHealth;
    // Power
    this.power = power;
    // Color of the avatar
    this.color = color;
  }
  // displayGame
  //
  //
  displayGame() {
    push();
    this.health = 49;
    // the player avatar
    ellipseMode(CORNER);
    noStroke();
    fill(0,0,255);
    ellipse(width/50, height/2+height/30, width/30+height/30);
    // The player's name
    fill(0);
    text(this.name,width/12,height/2+height/30,width,height);
    // the health bar
    rectMode(CORNER);
    strokeWeight(5);
    stroke(0);
    fill(255);
    rect(width/5, height/2+height/30, width-width/4, height/10);
    noStroke();
    fill(255,0,0);
    let lifeBarSize = map(this.health*100/this.maxHealth,0,100,width/5,width-width/4);
    rect(width/5, height/2+height/30, lifeBarSize, height/10);
    pop();
  }
}
