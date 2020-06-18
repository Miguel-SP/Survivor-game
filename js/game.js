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
    kits: [],

    frameCounter: 0,

    lives: 3,
    image: new Image(),
    soundtrack: new Audio('sounds/Main_Theme.mp3'),
    survivorDead: new Audio('sounds/survivor_kill.mp3'),
    zombieDead: new Audio('sounds/zombie_kill.mp3'),
    gameoverMusic: new Audio('sounds/gameover_music.mp3'),
    liveUpSound: new Audio('sounds/liveUp.mp3'),   
   
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
        this.soundtrack.play()
        this.soundtrack.volume = 0.05
        this.interval = setInterval(() => {
        this.clearScreen()                  // Limpia la pantalla
        this.createObjects()                // Crea obstaculos y kits de salud
        this.createEnemies()
        this.drawAndClearEverything()
        this.groupCollisions()
        this.healthBar()
        this.munitionBar()
        this.frameCounter++
            
        }, 1000/60)
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)   
    },
    
    createBackground(){
        this.background = new Background(this.ctx, this.canvasSize)
    },

    createObjects(){
        if (this.frameCounter % 350 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize))
        } else if (this.frameCounter % 1001 === 0) {
        this.kits.push(new Kit(this.ctx, this.canvasSize))}
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

    clearKits() {
        this.kits = this.kits.filter(elm => elm.position.x + elm.size.w >= 0)
    },

    drawAndClearEverything(){
        this.clearObstacles()
        this.clearEnemies()
        this.clearKits()
        this.background.draw()                                                
        this.player.draw()
        this.obstacles.forEach(elm => elm.draw())
        this.enemies.forEach(elm => elm.draw())
        this.kits.forEach(elm => elm.draw())
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
                this.survivorDead.play()
                this.survivorDead.volume = 0.05
                this.lives--

        } else if(this.lives === 0){
            this.survivorDead.play()
            this.survivorDead.volume = 0.05
            this.gameOver()
        }
        }) 
    },

    kitsCollision(){
        return this.kits.some(elm => {
 
         if (this.player.position.x + 60 < elm.position.x + elm.size.w &&
             this.player.position.x + this.player.size.w - 50 > elm.position.x &&
             this.player.position.y < elm.position.y + elm.size.h - 30  &&
             this.player.position.y + this.player.size.h > elm.position.y)
             {    
                 this.kits.shift()
                 this.liveUpSound.play()
                 this.liveUpSound.volume = 0.2
                 this.lives++
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
                this.zombieDead.play()
                this.zombieDead.volume = 0.2
            } 
        })
        })
    },
   
    bulletsObstCollision(){
        return  this.obstacles.forEach(obs => {
            
        this.player.bullets.forEach(bul => {
          
            (bul.position.x < obs.position.x + obs.size.w && 
            bul.position.x + bul.size.w > obs.position.x && 
            bul.position.y < obs.position.y + obs.size.h && 
            bul.position.y + bul.size.h > obs.position.y) ?
            this.player.bullets.shift() : null
        })
        })
    },

    groupCollisions(){
        this.obstaclesAndEnemiesCollision(this.obstacles)
        this.obstaclesAndEnemiesCollision(this.enemies)
        this.kitsCollision()
        this.bulletsCollision()
        this.bulletsObstCollision()
    },

    healthBar(){
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(95, 72, 285, 35)
        this.ctx.fillStyle = 'gray'
        this.ctx.fillRect(100, 77, 275, 25)
        if(this.lives >= 3){
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(100, 77, 275, 25)
        }else if(this.lives === 2){
            this.ctx.fillStyle = 'green'
            this.ctx.fillRect(100, 77, 183, 25)
        }else if(this.lives === 1){
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(100, 77, 92, 25)
        }
        this.ctx.font = '22px Staatliches sans-serif'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText('HEALTH = ' + this.lives, 177, 97)  
    },

    munitionBar(){
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(95, 122, 285, 35)
        this.ctx.fillStyle = 'gray'
        this.ctx.fillRect(100, 127, 275, 25)
        this.ctx.font = '22px Staatliches sans-serif'
        if(this.player.munition === 5){
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(100, 127, 275, 25)
        }else if(this.player.munition === 4){
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(100, 127, 220, 25)
        }else if(this.player.munition === 3){
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(100, 127, 165, 25)
        }else if(this.player.munition === 2){
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(100, 127, 110, 25)
        }else if(this.player.munition === 1){
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(100, 127, 55, 25)
        }
        if(this.player.munition >= 1){
        this.ctx.fillStyle = 'black'
        this.ctx.fillText('MUNITION = ' + this.player.munition, 170, 148)
        }
        else if(this.player.munition === 0){
            this.ctx.fillStyle = 'darkred'
            this.ctx.fillText('RECHARGE!', 170, 148)
        }
    },

    gameOver() {
        this.image.src = 'img/gameover.jpg'
        this.image.onload = () => this.ctx.drawImage(this.image, 0, 0, this.canvasSize.w, this.canvasSize.h)        
        this.player.sound.pause()
        this.soundtrack.pause()
        this.gameoverMusic.play()
        this.gameoverMusic.volume = 0.3   
        clearInterval(this.interval)
    }
}
