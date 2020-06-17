class Enemy {
    constructor(ctx, canvasSize, imgSource, enemyVel, enemySizeW, enemySizeH) {
      this.ctx = ctx;
      this.canvasSize = canvasSize
      this.image = new Image()
      this.image.src = imgSource
      this.enemyVelX = enemyVel
      this.size = { w: enemySizeW, h: enemySizeH }
      
      this.currentFrame = 0
      this.spriteFrames = 3
      this.spriteSrc = {x: undefined, y: undefined}
      this.position = { x: this.canvasSize.w + 10, y: Math.random()*((this.canvasSize.h - this.size.h) - 200) + 200}
      
    }
  
    draw() {
      this.updateFrame()
      
      this.ctx.drawImage(this.image, this.spriteSrc.x, this.spriteSrc.y, this.size.w, this.size.h, this.position.x, this.position.y, this.size.w, this.size.h)
      
      this.move()
      
    }
  
    updateFrame(){
      if (Game.frameCounter % 12 === 0){
          this.currentFrame++
      }
      if (this.currentFrame > this.spriteFrames - 1){

          this.currentFrame = 0
      }
      this.spriteSrc.x = this.currentFrame * this.size.w
      this.spriteSrc.y = 0
    }

  }
  
  class EnemyRight extends Enemy {
    constructor(ctx, canvasSize, imgSource, enemyVel, enemySizeW, enemySizeH){
  
      super(ctx, canvasSize, imgSource, enemyVel, enemySizeW, enemySizeH)
    }
    move() {
      this.position.x -= this.enemyVelX
      
    }

  }

class EnemyZigZag extends Enemy {
  constructor(ctx, canvasSize, imgSource, enemyVel, enemySizeW, enemySizeH){

    super(ctx, canvasSize, imgSource, enemyVel, enemySizeW, enemySizeH)

    this.enemyVelY = 4
  }
  
    move(){
    this.position.y += this.enemyVelY
    this.position.x -= this.enemyVelX
      
    this.position.y >= (this.canvasSize.h - this.size.h) ? this.enemyVelY *= -1 : null
    this.position.y <= 200 ? this.enemyVelY *= -1 : null
  
  }

}
  