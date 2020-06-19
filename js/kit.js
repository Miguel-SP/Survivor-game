class Kit {
    constructor(ctx, canvasSize) {
      this.ctx = ctx;
      this.canvasSize = canvasSize

      this.size = { w: 50, h: 50 }
      this.position = { x: this.canvasSize.w + 10, y: Math.random()*((this.canvasSize.h - this.size.h) - (250)) + (250)}
      this.Vel = 2

      this.image = new Image()
      this.image.src = 'img/first_aid_kit.png'
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h)
        this.move()
    }
  
    move() {
      this.position.x -= this.Vel
    }
  }