class Survivor {
        constructor(ctx, canvasSize){
            this.ctx = ctx
            this.canvasSize = canvasSize
            this.survivorPos = { x: 200, y: 200 }  // Revisar posición inicial
            this.survivorSize = { w: 150, h: 200 } // Pendientes de modificar tamaño

            this.image = new Image() // necesitamos colocar la imagen del survivor  
            this.image.src = 'img/survivor.png'     // pendientes del Sprite para cargarlo
            

            this.vel = 20

            
            
            
        }

        draw(){
             
            this.image.onload = () => this.ctx.drawImage(this.image, this.survivorPos.x, this.survivorPos.y, this.survivorSize.w, this.survivorSize.h)
            // this.ctx.drawImage(this.image, this.survivorPos.x, this.survivorPos.y, this.survivorSize.w, this.survivorSize.h)        // No nos dibuja la imagen cargada...
            
            this.move()

        }


        move(dir){

            dir === 'up' ? this.survivorPos.y -= this.vel : null   // Se mueve hacia arriba

            dir === 'down' ? this.survivorPos.y += this.vel : null   // Se mueve hacia abajo

            


            // this.survivorPos.y > this.canvasSize.h - this.survivorSize.h ? this.survivorPos.y = this.canvasSize.h - this.survivorSize.h : this.survivorPos.y  // Límite inferior de movimiento

            // this.survivorPos.y = 0 ? this.survivorPos.y = 0 : this.survivorPos.y  // límite superior de movimiento

        }

       

        

       
}