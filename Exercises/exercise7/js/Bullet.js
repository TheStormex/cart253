// Bullet
//
// Enemy bullets in the mini game


class Bullet extends MinigameObj {
  constructor(x, y, sizeX, sizeY, speedX, speedY) {
    // To MinigameObj
    super(x, y, sizeX, sizeY, speedX, speedY);
  }
  touchPlayer() {
    // if touch player, player loses life
  }
  // display
  //
  // display the bullet
  display() {
    push();
    fill(0,0,0);
    ellipse(this.x, this.y, this.sizeX, this.sizeY);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = bullets.splice(this.index, 1);
    // }
  }
}
