// Enemy Avatar
//
// Shoot this to damage the enemy in the shooting mini game


class EnemyAvatar extends MinigameObj {
  constructor(x, y, size, vx, vy, image) {
    // To MinigameObj
    super(x, y, size, vx, vy, image);
  }
  // shot
  //
  // if this is shot by the player bullet
  shot() {
    // if the player's bullet touches it, they gain targetsHit
    for (var i = 0; i < playerBullets.length; i++) {
      let d = dist(this.x, this.y, playerBullets[i].x, playerBullets[i].y);
      if (d < this.size) {
        minigameHits++;
        var removed = enemyAvatars.splice(this.index, 1);
        removed = playerBullets.splice(playerBullets[i], 1);
      }
    }
  }
  // display
  //
  // display the obstacle
  display() {
    push();
    fill(255,0,0);
    image(this.image, this.x, this.y, this.size, this.size);
    pop();
    // if (x < 0 || x > width || y < 0 || y > height) {
    //   var removed = obstacles.splice(this.index, 1);
    // }
  }
}
