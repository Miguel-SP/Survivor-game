 
class Obstacle {
    constructor(ctx, canvasSize, obstaclePosX, obstaclePosY, obstacleSizeW, obstacleSizeH) {
      this.ctx = ctx;
      this.canvasSize = { w: window.innerWidth, h: window.innerHeight }

      this.obstacleSize = { w: 100, h: 180 }
 
      this.obstaclePos = { x: this.canvasSize.w + 10, y: Math.random()*((this.canvasSize.h - this.obstacleSize.h) - 0)}
  
      this.obstacleVel = 2


      this.image = new Image()
      this.image.src = 'img/valla.jpg'
    }
  
    draw() {

        this.ctx.drawImage(this.image, this.obstaclePos.x, this.obstaclePos.y, this.obstacleSize.w, this.obstacleSize.h)


    //   this.ctx.fillStyle = "black"
    //   this.ctx.fillRect(this.ObstaclePos.x, this.ObstaclePos.y, this.ObstacleSize.w, this.ObstacleSize.h)
      this.move()
    }
  
    move() {
      this.obstaclePos.x -= this.obstacleVel
    }
  }