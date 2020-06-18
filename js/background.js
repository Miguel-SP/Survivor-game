class Background {

    constructor(ctx, canvasSize) {
      this.ctx = ctx;
      this.canvasSize = canvasSize
      this.backgroundPos = { x: 0, y: 0}
      this.image = new Image()
      this.image.src = 'img/bgapocalypse.png'
      this.backgroundVelX = 2
    }
  
    draw() {
      this.move()
      this.ctx.drawImage(this.image, this.backgroundPos.x, this.backgroundPos.y, this.canvasSize.w, this.canvasSize.h)
      this.ctx.drawImage(this.image, this.backgroundPos.x + this.canvasSize.w, this.backgroundPos.y, this.canvasSize.w, this.canvasSize.h)
    }

    move() {
        this.backgroundPos.x <= -this.canvasSize.w ? this.backgroundPos.x = 0 : this.backgroundPos.x -= this.backgroundVelX
    }
  }