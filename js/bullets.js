class Bullets {

    constructor(ctx, survivorPosX, survivorPosY, survivorSizeW, survivorSizeH) {
      this.ctx = ctx;
      this.bulletsPos = { x: survivorPosX + survivorSizeW,  y: survivorPosY + survivorSizeH / 2} 

      this.bulletsSize = { w: 50 , h: 25 }
  
  
      this.bulletsVel = 12
      this.image = new Image()
      this.image.src = 'img/bullet.png'
      
    }
  
    draw() {

    this.ctx.drawImage(this.image, this.bulletsPos.x, this.bulletsPos.y, this.bulletsSize.w, this.bulletsSize.h)  //Bala de prueba
    //   this.ctx.beginPath();
    //   this.ctx.fillStyle = "red";
    //   this.ctx.arc(this.bulletsPos.x, this.bulletsPos.y, this.radius, 0, Math.PI * 2);
    //   this.ctx.fill();
    //   this.ctx.closePath();
      this.move()
    }
  
    move() {
      this.bulletsPos.x += this.bulletsVel

    }
  }