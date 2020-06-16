class Background {

    constructor(ctx, backgroundW, backgroundH) {
      this.ctx = ctx;
      this.backgroundW = backgroundW
      this.backgroundH = backgroundH
      this.backgroundPos = { x: 0, y: 0}
      this.canvasSize = { w: window.innerWidth, h: window.innerHeight }
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

        
      if (this.backgroundPos.x <= -this.canvasSize.w) {
        this.backgroundPos.x = 0;
      } else {
      this.backgroundPos.x -= this.backgroundVelX;
      }
    }
  }