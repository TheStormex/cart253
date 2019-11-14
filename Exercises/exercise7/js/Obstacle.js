// Obstacle
//
// Obstacles to avoid hitting in the mini game


class Obstacle extends MinigameObj {
  constructor(x, y, sizeX, sizeY, speedX, speedY) {
    // To MinigameObj
    super(x, y, sizeX, sizeY, speedX, speedY);
  }
  clicked() {
    // if the player clicks on it, they lose targetsHit
  }
  // display
  //
  // display the obstacle
  display() {
    push();
    fill(255,0,0);
    console.log("obst");
    ellipse(this.x, this.y, this.sizeX, this.sizeY);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = obstacles.splice(this.index, 1);
    // }
  }
}
