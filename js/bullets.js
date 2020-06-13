class Bullets {

    constructor(ctx, survivorPosX, survivorPosY, survivorSizeW, survivorSizeH) {
      this.ctx = ctx;
      this.bulletsPos = { 
          x: survivorPosX + survivorSizeW,  
          y: survivorPosY + survivorSizeH / 2} 
  
      this.radius = 10;
  
      this.bulletsVel = 15
      this.image = new Image()
      this.image.src = 'img/bullet.png'
      
    }
  
    draw() {

    this.ctx.drawImage(this.image, this.bulletsPos.x, this.bulletsPos.y, 100, 50)  //Bala de prueba
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