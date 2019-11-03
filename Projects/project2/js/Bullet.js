// Bullet
//
// A class that represents a simple bullet that moves
// on screen in a straight line
// damages the predator if touches it. Damage more and more as time goes on

class Bullet {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, image, index) {
    // Position
    this.x = x;
    this.y = y;
    // Speed
    this.speed = speed;
    // Get a direction for velocity
    this.vx = 0;
    this.vy = 0;
    // Display properties
    this.fillColor = fillColor;
    this.radius = radius;
    // The bullets's image
    this.image = image;
    // This object's index in the array
    this.index = index;
    // The health for the sake of removing it
    this.health = 1;

  }

  direction() {
    let leftRight = floor(random(0,2));
    switch (leftRight) {
      case 0:
          this.vx = random(this.speed*0.5, this.speed*1.5);
        break;
      case 1:
          this.vx = -(random(this.speed*0.5, this.speed*1.5));
        break;
      default:
    }
    let upDown = floor(random(0,2));
    switch (upDown) {
      case 0:
          this.vy = random(this.speed*0.5, this.speed*1.5);
        break;
      case 1:
          this.vy = -(random(this.speed*0.5, this.speed*1.5));
        break;
      default:
    }
  }
  // move
  //
  // Moves in a straight line until it hits a wall or a predator
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Exit if left screen
    // this.exit();
  }

  // exit
  //
  // Checks if the bullet has gone off the canvas and
  // destroy it.
  exit() {
    // Off the left or right
    if (this.x < 0) {
      this.health = 0;
    }
    else if (this.x > width) {
      this.health = 0;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.health = 0;
    }
    else if (this.y > height) {
      this.health = 0;
    }
  }

  // harm
  //
  // Checks if touch a Predator, if so, hurt the predator and take away score
  harm(predator) {
    // Calculate distance from this predator to the predator
    let d = dist(this.x, this.y, predator.x, predator.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + predator.radius) {
      // Decrease preadator health then disappear
      predator.health -= 6;
      predator.preyEaten = floor(predator.preyEaten/2);
      audioPredatorHurt.play();
      this.health = 0;
    }
  }

  // display
  //
  // Draw the bullet as an ellipse on the canvas
  // Draw the image in the ellipse
  display() {
    if (this.health > 0) {
      push();
      noStroke();
      fill(this.fillColor);
      ellipse(this.x, this.y, this.radius * 2);
      image(this.image, this.x, this.y, this.radius, this.radius);
      pop();
    }
    else {
      var removed = bulletList.splice(this.index, 1);
    }
  }
}
