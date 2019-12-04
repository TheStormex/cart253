// Target
//
// Targets to hit in the mini game


class Target extends MinigameObj {
  constructor(x, y, size, vx, vy, image) {
    // To MinigameObj
    super(x, y, size, vx, vy, image);
  }
  // clicked
  //
  // if this is clicked
  clicked() {
    // if the player clicks on it, they gain targetsHit
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size) {
      minigameHits++;
      var removed = targets.splice(this.index, 1);
    }
  }
  // display
  //
  // display the target
  display() {
    push();
    fill(0,255,0);
    ellipse(this.x, this.y, this.size);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = targets.splice(this.index, 1);
    // }
  }
}
