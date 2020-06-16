
const Game = {

    title: 'Survivor game',
    author: 'Miguel Serrano y Pablo de Tuero',
    license: null,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },

    player: undefined,   

    background: undefined,

    obstacles: [],
    enemies: [],
    frameCounter: 0,

    lives: 3,
    image: new Image(),
    
   

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
        this.player = new Survivor(this.ctx, this.canvasSize, this.survivorPosX, this.survivorPosY, this.survivorSizeW, this.survivorSizeH)
        
    },
    
    
    
    start() {


        this.interval = setInterval(() => {
            this.clearScreen()                  // Limpia la pantalla
            this.createObstacles()
            this.createEnemies()
            this.createEnemies2()
            this.drawAndClearEverything()

            this.obstacleCollision()
            this.enemiesCollision()
            this.bulletsCollision()
            this.bulletsObstCollision()
            //this.levelUp()

            this.frameCounter++
            
            
        }, 1000/60)},



    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)   
    },
    
    createBackground(){
        this.background = new Background(this.ctx, this.backgroundW, this.backgroundH)
    },

    createObstacles(){
        if (this.frameCounter % 350 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, this.obstaclePosX, this.obstaclePosY, this.obstacleSizeW, this.obstacleSizeH))}
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(elm => elm.obstaclePos.x + elm.obstacleSize.w >= 0)
    },
    
    createEnemies(){
        if (this.frameCounter % 400 === 0) {
        this.enemies.push(new Enemy(this.ctx, this.canvasSize, this.enemyPosX, this.enemyPosY, this.enemySizeW, this.enemySizeH))}
    },

    createEnemies2(){       
        if (this.frameCounter % 500 === 0) {
        this.enemies.push(new Enemy2(this.ctx, this.canvasSize, this.enemyPosX, this.enemyPosY, this.enemySizeW, this.enemySizeH, this.image))}
    },

    clearEnemies() {
        this.enemies = this.enemies.filter(elm => elm.enemyPos.x + elm.enemySize.w >= 0)
    },

    drawAndClearEverything(){
        this.background.draw()                                                
        this.player.draw()
        this.obstacles.forEach(elm => elm.draw())
        this.clearObstacles()
        this.enemies.forEach(elm => elm.draw())
        this.clearEnemies()
    },
    
    obstacleCollision(){

       return this.obstacles.some(elm => {

        if ( this.player.survivorPos.x + 60 < elm.obstaclePos.x + elm.obstacleSize.w &&
            this.player.survivorPos.x + this.player.survivorSize.w - 50 > elm.obstaclePos.x &&
            this.player.survivorPos.y < elm.obstaclePos.y + elm.obstacleSize.h - 30  &&
            this.player.survivorPos.y + this.player.survivorSize.h > elm.obstaclePos.y &&
            this.lives > 0)
            {
                let index = this.obstacles.indexOf(elm)
                if(index > -1){
                        this.obstacles.splice(index, 1)
                }
                this.lives--
                alert(`${this.lives} lives left!`)
                
            }
                else if(this.lives === 0){
        
                this.gameOver()
                }
        })
        
    },

    enemiesCollision(){
        return this.enemies.some(elm => {
            if (
                this.player.survivorPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.player.survivorPos.x + this.player.survivorSize.w - 100 > elm.enemyPos.x &&
                this.player.survivorPos.y < elm.enemyPos.y + elm.enemySize.h - 20 &&
                this.player.survivorPos.y + this.player.survivorSize.h > elm.enemyPos.y &&
                this.lives > 0)
            {
                let index = this.enemies.indexOf(elm)
                if(index > -1){
                        this.enemies.splice(index, 1)
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

           if(
           bul.bulletsPos.x < enem.enemyPos.x + enem.enemySize.w &&
           bul.bulletsPos.x + bul.bulletsSize.w > enem.enemyPos.x &&
           bul.bulletsPos.y < enem.enemyPos.y + enem.enemySize.h &&
           bul.bulletsPos.y + bul.bulletsSize.h > enem.enemyPos.y
           ){
                console.log(this.enemies)
                console.log(this.player.bullets)
                //this.enemies.splice(index, 1)
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

           if(
           bul.bulletsPos.x < obs.obstaclePos.x + obs.obstacleSize.w &&
           bul.bulletsPos.x + bul.bulletsSize.w > obs.obstaclePos.x &&
           bul.bulletsPos.y < obs.obstaclePos.y + obs.obstacleSize.h &&
           bul.bulletsPos.y + bul.bulletsSize.h > obs.obstaclePos.y
           ){
               this.player.bullets.shift()
            }   
        })
        })
    },

    // levelUp(){

    //     if (this.frameCounter % 1000 === 0){

    //         this.enemies.enemyVel++
    //     }


    // },
    
    
    gameOver() {

        clearInterval(this.interval)
        this.image.src = 'img/gameover.jpg'

        this.image.onload = () => this.ctx.drawImage(this.image, 0, 0, this.canvasSize.w, this.canvasSize.h)
        
    }





}