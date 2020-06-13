
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
    frameCounter: 0,

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
        setInterval(() => {
            this.clearScreen()                  // Limpia la pantalla
            this.background.draw()                                                
            this.player.draw()
            this.createObstacles()
            this.obstacles.forEach(elm => elm.draw())
            this.frameCounter++
            this.clearObstacles()
            console.log(this.obstacles)
            
        }, 50)},



    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)      // Elimina del array bullets las balas que ya no están en pantalla
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
    
    
    
}