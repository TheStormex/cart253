// Bullet
//
// Enemy bullets in the mini game


class Bullet extends MinigameObj {
  constructor(x, y, size, vx, vy) {
    // To MinigameObj
    super(x, y, size, vx, vy);
    // If this moves in sine wave, keep track of angle
    this.waveAngle = 0;
  }
  touchPlayer() {
    // if touch player, player loses life
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.size) {
      minigameHits++;
      var removed = bullets.splice(this.index, 1);
    }
  }
  bounce() { // if this bullet bounces on walls run this code
    if (this.x-this.size/2 <= 0) {
      this.x = this.size/2;
      this.vx *= -1;
    }
    if (this.x+this.size/2 > width) {
      this.x = width-this.size/2;
      this.vx *= -1;
    }
    if (this.y-this.size/2 < 0) {
      this.y = this.size/2;
      this.vy *= -1;
    }
    if (this.y+this.size/2 > height) {
      this.y = height-this.size/2;
      this.vy *= -1;
    }
  }
  wave() { // if this bullet moves in a sine wave motion
    this.waveAngle += 5;
    this.vx = sin(this.waveAngle*0.1) * width/30;
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
