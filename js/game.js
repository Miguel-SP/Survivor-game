
const Game = {

    title: 'Survivor game',
    author: 'Miguel Serrano y Pablo de Tuero',
    license: null,
    version: '1.0',

    canvasDom: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    player: undefined,   
    background: undefined,
    
    obstacles: [],
    enemies: [],

    frameCounter: 0,

    lives: 3,
    image: new Image(),
    soundtrack: new Audio('sounds/Main_Theme.mp3'),   
   
    init(id){
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()   
        this.createSurvivor()
        this.createBackground()
        this.start()
    },

     setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    createSurvivor() {
        this.player = new Survivor(this.ctx, this.canvasSize)
    },
    
    start() {
        
        this.soundtrack.volume = 0.05
        this.soundtrack.play()
        
        this.interval = setInterval(() => {
        this.clearScreen()                  // Limpia la pantalla
        this.createObstacles()
        this.createEnemies()
        this.drawAndClearEverything()
        this.obstaclesAndEnemiesCollision(this.obstacles)
        this.obstaclesAndEnemiesCollision(this.enemies)
        this.bulletsCollision()
        this.bulletsObstCollision()
        this.frameCounter++
            
        }, 1000/60)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)   
    },
    
    createBackground(){
        this.background = new Background(this.ctx, this.canvasSize)
    },

    createObstacles(){
        if (this.frameCounter % 350 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize))}
    },
    
    createEnemies(){
        if (this.frameCounter % 201 === 0) {
        this.enemies.push(new EnemyRight(this.ctx, this.canvasSize, 'img/zombie1.png', 4, 66, 150))
        } 
        else if (this.frameCounter % 301 === 0) {
        this.enemies.push(new EnemyRight(this.ctx, this.canvasSize, 'img/zombie2.png', 6, 167, 200))
        }
        else if (this.frameCounter % 401 === 0) {
        this.enemies.push(new EnemyZigZag(this.ctx, this.canvasSize, 'img/zombie3.png', 7, 160, 180))
        }
    },
      
    clearObstacles() {
        this.obstacles = this.obstacles.filter(elm => elm.position.x + elm.size.w >= 0)
    },
    
    clearEnemies() {
        this.enemies = this.enemies.filter(elm => elm.position.x + elm.size.w >= 0)
    },

    drawAndClearEverything(){
        this.background.draw()                                                
        this.player.draw()
        this.obstacles.forEach(elm => elm.draw())
        this.clearObstacles()
        this.enemies.forEach(elm => elm.draw())
        this.clearEnemies()
    },
    
    obstaclesAndEnemiesCollision(obstOrEnemy){
       return obstOrEnemy.some(elm => {

        if (this.player.position.x + 60 < elm.position.x + elm.size.w &&
            this.player.position.x + this.player.size.w - 50 > elm.position.x &&
            this.player.position.y < elm.position.y + elm.size.h - 30  &&
            this.player.position.y + this.player.size.h > elm.position.y &&
            this.lives > 0){
                let index = obstOrEnemy.indexOf(elm)

                if(index > -1){
                    obstOrEnemy.splice(index, 1)
                }
                this.lives--
                alert(`${this.lives} lives left!`)
        }
        else if(this.lives === 0){
        this.gameOver()
        }
        }) 
    },

    bulletsCollision(){
        return  this.enemies.forEach(enem => {
            
        this.player.bullets.forEach(bul => {
         
        if(bul.position.x < enem.position.x + enem.size.w &&
           bul.position.x + bul.size.w > enem.position.x &&
           bul.position.y < enem.position.y + enem.size.h &&
           bul.position.y + bul.size.h > enem.position.y){

                let index = this.enemies.indexOf(enem);
                (index > -1) ? this.enemies.splice(index, 1) : null
                this.player.bullets.shift()
            } 
        })
        })
    },
   
    bulletsObstCollision(){
        return  this.obstacles.forEach(obs => {
            
        this.player.bullets.forEach(bul => {
          
        if(bul.position.x < obs.position.x + obs.size.w &&
           bul.position.x + bul.size.w > obs.position.x &&
           bul.position.y < obs.position.y + obs.size.h &&
           bul.position.y + bul.size.h > obs.position.y){
               this.player.bullets.shift()
            }   
        })
        })
    },
    
    gameOver() {
        this.image.src = 'img/gameover.jpg'
        this.image.onload = () => this.ctx.drawImage(this.image, 0, 0, this.canvasSize.w, this.canvasSize.h)        
        this.player.sound.pause()
        this.soundtrack.pause()   
        setTimeout( ()=> {
            clearInterval(this.interval)
        }, 2000)
    }
}
