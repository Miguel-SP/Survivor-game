class Survivor {
        constructor(ctx, canvasSize){
            this.ctx = ctx
            this.canvasSize = canvasSize // Tamaño del canvas
            this.image = new Image() 
            this.image.src = 'img/chuckandando.png'
                
            this.position = { x: 100, y: 300 } // Posición inicial
            this.size = { w: 200, h: 153 } 
            this.spriteSrc = {x: undefined, y: undefined} 
            this.vel = 30
           
            this.currentFrame = 0
            this.spriteFrames = 3

            this.keys = { SPACE: 32, UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 }

            this.bullets = []
            this.munition = 5
            this.sound = new Audio()
            this.sound.src = 'sounds/gun-gunshot-new.mp3'    
            this.rechargeSound = new Audio()
            this.rechargeSound.src = 'sounds/gun_cocking.mp3'    
        }
        
        draw(){       
            this.setEventListeners()
            this.bullets.forEach(bullet => bullet.draw())
            this.move()
            this.updateFrame()
            this.ctx.drawImage(this.image, this.spriteSrc.x, this.spriteSrc.y, this.size.w, this.size.h, this.position.x, this.position.y, this.size.w, this.size.h)
        }

        move(dir){
            switch (dir){
                case 'up': 
                this.position.y <= 250 ? this.position.y == 250 : this.position.y -= this.vel 
                break;
                case 'down': 
                this.position.y + this.size.h >= this.canvasSize.h ? this.position.y == this.canvasSize.h - this.size.h : this.position.y += this.vel                                                  // Move down
                break;
                case 'right': 
                this.position.x + this.size.w == this.canvasSize.w ? this.canvasSize.w - this.size.w : this.position.x += this.vel 
                break;
                case 'left': 
                this.position.x <= 100 ? this.position.x == 100 : this.position.x -= this.vel                                                  // Move down
                break;
            }         
        }

        setEventListeners() {
            document.onkeydown = e => {
                e.keyCode === this.keys.SPACE ? this.shoot() : null
                e.keyCode === this.keys.UP ? this.move('up'): null
                e.keyCode === this.keys.DOWN ? this.move('down') : null
                e.keyCode === this.keys.LEFT ? this.move('left') : null
                e.keyCode === this.keys.RIGHT ? this.move('right') : null
            }
        }

        shoot() {

            if (this.munition === 0){
                setTimeout(() => {
                    this.rechargeSound.play()
                    this.rechargeSound.volume = 0.05
                    this.munition = 5
                }, 1000)
            } else if (this.munition > 0){
                this.munition--
                this.bullets.push(new Bullets(this.ctx, this.position.x, this.position.y, this.size.w, this.size.h))
                this.sound.play()
                this.sound.volume = 0.05
            }
    }
        clearBullets() {
            this.bullets = this.bullets.filter(elm => elm.position.x <= this.canvasSize.w);
          }
        
        updateFrame(){
           Game.frameCounter % 7 === 0 ? this.currentFrame++ : null
           this.currentFrame > this.spriteFrames - 1 ? this.currentFrame = 0 : null
           this.spriteSrc.x = this.currentFrame * this.size.w
           this.spriteSrc.y = 0
        }  
    }