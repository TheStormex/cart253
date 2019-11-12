// MinigameObj
//
// A super class for the minigame objects


class MinigameObj {
  // constructor
  //
  // Sets the initial values for the MinigameObj's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, sizeX, sizeY, speedX, speedY) {
    // Position
    this.x = x;
    this.y = y;
    // Size
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    // Speed
    this.speedX = speedX;
    this.speedY = speedY;
  }
  // move
  //
  // move the minigame Obj
  move() {

  }
  // display
  //
  // display the shape
  display() {
    console.log("error: this is a superclass");
  }
}
