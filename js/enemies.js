class Enemy {
    constructor(ctx, canvasSize, enemyPosX, enemyPosY, enemySizeW, enemySizeH) {
      this.ctx = ctx;
      this.canvasSize = { w: window.innerWidth, h: window.innerHeight }

      this.enemySize = { w: 150, h: 200 }
 
      this.enemyPos = { x: this.canvasSize.w + 10, y: Math.random()*((this.canvasSize.h - this.enemySize.h) - 0)}
  
      this.enemyVel = 6


      this.image = new Image()
      this.image.src = "img/zombie.png"
    }
  
    draw() {

        this.ctx.drawImage(this.image, this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)

        this.move()
    }
  
    move() {
      this.enemyPos.x -= this.enemyVel
    }
  }


  class Enemy2 extends Enemy {          // no nos aparece. Consultar

    constructor(ctx, canvasSize, enemyPosX, enemyPosY, enemySizeW, enemySizeH, image){

    super(ctx, canvasSize, enemyPosX, enemyPosY, enemySizeW, enemySizeH)

    this.image = new Image()
    this.image.src = "img/zombie2.png"
    
    this.enemyVel = 4


    }
    
  }