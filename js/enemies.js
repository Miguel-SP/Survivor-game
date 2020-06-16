class Enemy {
    constructor(ctx, canvasSize, enemyPosX, enemyPosY, enemySizeW, enemySizeH) {
      this.ctx = ctx;
      this.canvasSize = { w: window.innerWidth, h: window.innerHeight }

      this.enemySize = { w: 66, h: 150 }
 
      this.enemyPos = { x: this.canvasSize.w + 10, y: Math.random()*((this.canvasSize.h - this.enemySize.h) - 200) + (200)}
  
      this.enemyVel = 4

      this.image = new Image()
      this.image.src = "img/zombie1.png"

      this.spriteSrcX 
      this.spriteSrcY
      this.spriteW = 66
      this.spriteH = 150
      this.currentFrame = 0
      this.spriteFrames = 3

      
    }
  
    draw() {

      this.updateFrame()

          this.ctx.drawImage(this.image, this.spriteSrcX, this.spriteSrcY, this.spriteW, this.spriteH, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)

          this.move()
    }
  
    move() {
      this.enemyPos.x -= this.enemyVel
    }

    updateFrame(){

      if (Game.frameCounter % 12 === 0){
          this.currentFrame++
      }
      if (this.currentFrame > this.spriteFrames - 1){

       this.currentFrame = 0
      }
      this.spriteSrcX = this.currentFrame * this.spriteW
      this.spriteSrcY = 0
   }

  }

  // levelUp(){150
  //   if ( Game.frameCounter % 1000 === 0)
  //   this.enemyVel 
  // }


  class Enemy2 extends Enemy {          

    constructor(ctx, canvasSize, enemyPosX, enemyPosY, enemySizeW, enemySizeH, image){

    super(ctx, canvasSize, enemyPosX, enemyPosY)

    this.image = new Image()
    this.image.src = "img/zombie2.png"
    
    this.enemyVel = 6
    this.enemySize = { w: 167, h: 200 }

    this.spriteW = 167
    this.spriteH = 200
    }
    
  }