// MinigameObj
//
// A super class for the minigame objects


class MinigameObj {
  // constructor
  //
  // Sets the initial values for the MinigameObj's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, size, vx, vy, image) {
    // Position
    this.x = x;
    this.y = y;
    // Size
    this.size = size;
    // Velocity
    this.vx = vx;
    this.vy = vy;
    // Image
    this.image = image; 
  }
  // move
  //
  // move the minigame Obj
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  // display
  //
  // display the shape
  display() {
    console.log("error: this is a superclass");
  }
}
