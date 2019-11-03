// fruit
//
// A class that represents a simple fruit
// can be consumed by prey objects.

class Fruit {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, image, index) {
    // Position
    this.x = x;
    this.y = y;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    // The fruit's image
    this.image = image;
    // This object's index in the array
    this.index = index;
  }

  // display
  //
  // Draw the fruit as an ellipse on the canvas
  // with a radius the same size as its current health.
  // Draw the image in the ellipse
  // Draw only if alive
  display() {
    if (this.health > 0) {
      push();
      noStroke();
      fill(this.fillColor);
      this.radius = this.health;
      ellipse(this.x, this.y, this.radius * 2);
      image(this.image, this.x, this.y, this.radius, this.radius);
      pop();
    }
    else {
      var removed = fruitList.splice(this.index, 1);
    }
  }
}
