const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('message')

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.width = 900
game.height = 900
const gridSize = 30
// presentational map board for development

const checkerboard = (horiz, vert) => {
    if (horiz % 2 === 0) {
        return `hsl(0 0% ${30 + (vert % 2) * 2}%`
    } else {
        return `hsl(0 0% ${32 - (vert % 2) * 2}%`
    }
}

// make a map grid

const mapDraw = () => {
    for (let i = 0; i < game.width / gridSize; i++) {
        for (let j = 0; j < game.height / gridSize; j++) {
            ctx.fillStyle = checkerboard(i, j)
            ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize)
        }
    }
}
// create the initial map overlay, will also be called on every game turn (redraw)

mapDraw()

// call this function when the player either moves, attacks or uses a skill, drinks a potion, or picks up loot

const endTurn = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    mapDraw()
    playerCharacter.render()
}

// create character sprite and spawn
// first create a basic MOB class with traits shared be friend and foe alike
class MobileObject {
    constructor (name, xPos, yPos, health, energy, displayColor, attackRating, physicalResist) {
    this.name = name
    this.xPos = xPos
    this.yPos = yPos
    this.health = health
    this.energy = energy
    this.displayColor = displayColor
    this.alive = true
    this.attackRating = attackRating
    this.physicalResist = physicalResist
    this.gridStep = gridSize
    this.render = function () {
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.gridStep / 2, 0, 2.0 * Math.PI)
        ctx.fillStyle = this.displayColor
        ctx.fill()
        }
    }
}

// the player character inherits the MOB's traits, and adds its own (specifically move and other action methods)
class PlayerCharacter extends MobileObject {
    // player movement handler
    moveDirection = function (key) {
        // switch/case will work just fine here, since we are not interested in listening for multiple keypresses
        // we'll use the numPad for movement and explicitly define the diagonals

        switch(key) {
            case 56:
                this.yPos -= this.gridStep
                console.log('up')
                break
            case 54:
                this.xPos += this.gridStep
                console.log('right')
                break
            case 50:
                this.yPos += this.gridStep
                console.log('down')
                break
            case 52:
                this.xPos -= this.gridStep
                console.log('left')
                break
            case 57:
                this.yPos -= this.gridStep
                this.xPos += this.gridStep
                console.log('up-right')
                break
            case 51:
                this.xPos += this.gridStep
                this.yPos += this.gridStep
                console.log('down-right')
                break
            case 49:
                this.yPos += this.gridStep
                this.xPos -= this.gridStep
                console.log('down-left')
                break
            case 55:
                this.xPos -= this.gridStep
                this.yPos -= this.gridStep
                console.log('up-left')
                break
        }
        endTurn()
    }
}

// create a player character instance and render it on the map with its initial traits

const playerCharacter = new PlayerCharacter('Bob', 15, 15, 100, 100, 'limegreen', 20, 80)
playerCharacter.render()

// since the game is turn-based we can simply use the keypress method and pass that to our movement handler
document.addEventListener('keypress', (e) => {
    playerCharacter.moveDirection(e.keyCode)
})

// **********NEXT STEPS***************
// 1) spawn an enemy in a random location at least 9 tiles away from the pc
// 2) detect collision between pc and enemy
// 3) have collision instantiate 'battle' - atk vs def and adjust health accordingly
// 4) enemy tracks (moves) towards player!!