class Bullets {

    constructor(ctx, positionX, positionY, sizeW, sizeH) {
      this.ctx = ctx;
      this.position = { x: positionX + sizeW,  y: positionY + sizeH / 2} 
      this.size = { w: 70 , h: 50 }
      this.Vel = 12
      this.image = new Image()
      this.image.src = 'img/bullet-in-air.png'
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h)
      this.move()
    }
  
    move() {
      this.position.x += this.Vel
    }
  }