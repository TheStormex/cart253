// Target
//
// Targets to hit in the mini game


class Target extends MinigameObj {
  constructor(x, y, sizeX, sizeY, speedX, speedY) {
    // To MinigameObj
    super(x, y, sizeX, sizeY, speedX, speedY);
  }
  clicked() {
    // if the player clicks on it, they gain targetsHit
  }
  // display
  //
  // display the target
  display() {
    console.log("targetdi");
    push();
    fill(0,255,0);
    ellipse(this.x, this.y, this.sizeX, this.sizeY);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = targets.splice(this.index, 1);
    // }
  }
}
