// Player Bullet
//
// The player's bullets in the shooting mini game


class Player Bullet extends MinigameObj {
  constructor(x, y, size, vx, vy, image) {
    // To MinigameObj
    super(x, y, size, vx, vy, image);
  }
  // clicked
  //
  // if this is clicked
  clicked() {
    // if the player clicks on it, they lose targetsHit
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size) {
      minigameHits--;
      if (minigameHits < 0) {
        minigameHits = 0;
      }
      var removed = obstacles.splice(this.index, 1);
    }
  }
  // display
  //
  // display the obstacle
  display() {
    push();
    fill(255,0,0);
    ellipse(this.x, this.y, this.size);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = obstacles.splice(this.index, 1);
    // }
  }
}
