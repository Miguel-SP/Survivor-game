
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

    keys : {
        SPACE: 32,
        UP: 38,
        DOWN: 40
    },

    player: undefined,    

    init(id){
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.createSurvivor()
        this.setEventListeners()        

    },

     setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },

    createSurvivor() {
        this.player = new Survivor(this.ctx, this.canvasSize)
        
        this.player.draw()          // Aquí estaría dibujando la imagen cargada (cuadro)
    },

    setEventListeners() {
        document.onkeydown = e => {
            e.keyCode === this.keys.SPACE ? this.shoot() : null

            e.keyCode === this.keys.UP ? this.player.move('up'): null //this.move('up') : null
                
            e.keyCode === this.keys.DOWN ? this.player.move('down') : null

        }
    }, 
    
    


}