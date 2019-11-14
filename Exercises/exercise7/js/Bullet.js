// Bullet
//
// Enemy bullets in the mini game


class Bullet extends MinigameObj {
  constructor(x, y, size, speedX, speedY) {
    // To MinigameObj
    super(x, y, size, speedX, speedY);
  }
  touchPlayer() {
    // if touch player, player loses life
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.size) {
      bulletHits++;
      var removed = bullets.splice(this.index, 1);
    }
  }
  // display
  //
  // display the bullet
  display() {
    push();
    fill(0,0,0);
    ellipse(this.x, this.y, this.size);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = bullets.splice(this.index, 1);
    // }
  }
}
