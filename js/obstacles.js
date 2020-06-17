 
class Obstacle {
    constructor(ctx, canvasSize) {
      this.ctx = ctx;
      this.canvasSize = canvasSize

      this.size = { w: 100, h: 180 }
      this.position = { x: this.canvasSize.w + 10, y: Math.random()*((this.canvasSize.h - this.size.h) - (200)) + (200)}
  
      this.obstacleVel = 2

      this.image = new Image()
      this.image.src = 'img/wood.png'
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h)
        this.move()
    }
  
    move() {
      this.position.x -= this.obstacleVel
    }
  }