class Survivor {
        constructor(ctx, canvasSize){
            this.ctx = ctx
            this.canvasSize = { w: window.innerWidth, h: window.innerHeight } // Tamaño del canvas
            this.survivorPos = { x: 100, y: 300 } // Posición inicial
            this.survivorSize = { w: 150, h: 200 } // Pendientes de modificar tamaño

            this.image = new Image() 
            this.image.src = 'img/survivor.png'     // pendientes del Sprite para cargarlo
            

            this.vel = 50

            this.keys = {
                SPACE: 32,
                UP: 38,
                DOWN: 40
            }

            this.bullets = []


        }
        
        
        draw(){                             //Recordar meter todas las funciones que necesiten ejecutarse.
            this.setEventListeners()
            
            this.bullets.forEach(bullet => bullet.draw())
            this.clearBullets()

            console.log (this.bullets)
            this.move()
            this.ctx.drawImage(this.image, this.survivorPos.x, this.survivorPos.y, this.survivorSize.w, this.survivorSize.h)

        }
        
        
        move(dir){

            switch (dir){
                case 'up': 
                if (this.survivorPos.y <= 0){
                    this.survivorPos.y == 0
                } else {
                this.survivorPos.y -= this.vel          // Mueve el survivor hacia arriba y le pone límite
                }
                break;
                case 'down': 
                if (this.survivorPos.y + this.survivorSize.h >= this.canvasSize.h){
                    this.survivorPos.y == this.canvasSize.h - this.survivorSize.h
                }else{
                    this.survivorPos.y += this.vel      // Mueve el survivor hacia abajo y le pone límite
                }
                break;
            }
                   
        }

        shoot() {
            this.bullets.push(new Bullets(this.ctx, this.survivorPos.x, this.survivorPos.y, this.survivorSize.w, this.survivorSize.h))

            
          }

        clearBullets() {
            this.bullets = this.bullets.filter(elm => elm.bulletsPos.x <= this.canvasSize.w);
          }
        
        
        
        setEventListeners() {
            document.onkeydown = e => {
                e.keyCode === this.keys.SPACE ? this.shoot() : null
    
                e.keyCode === this.keys.UP ? this.move('up'): null
                    
                e.keyCode === this.keys.DOWN ? this.move('down') : null
                
    
            }
        } 
        
    }