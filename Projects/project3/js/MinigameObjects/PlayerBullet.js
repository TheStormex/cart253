// Player Bullet
//
// The player's bullets in the shooting mini game


class PlayerBullet extends MinigameObj {
  constructor(x, y, size, vx, vy, image) {
    // To MinigameObj
    super(x, y, size, vx, vy, image);
  }
  // display
  //
  // display the bullet
  display() {
    push();
    fill(255,0,0);
    image(imagePlayerBullet, this.x, this.y, this.size, this.size);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = obstacles.splice(this.index, 1);
    // }
  }
}
