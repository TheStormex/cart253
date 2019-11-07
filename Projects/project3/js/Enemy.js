// Enemy
//
// Enemy class

class Enemy {
  // constructor
  //
  // Sets the initial values for the enemy's properties
  // Either sets default values or uses the arguments provided
  constructor(name, health, power) {
    // Name
    this.name = name;
    // Health
    this.health = health;
    // Power
    this.power = power;
  }
  display() {
    push();
    ellipseMode(CENTER);
    fill(0,255,0);
    ellipse(width/2,height/2,width/10+height/10);
    pop();
  }
}
