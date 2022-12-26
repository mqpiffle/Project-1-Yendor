const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('message')

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.width = 900
game.height = 900
const gridSize = 30
const tileCenter = gridSize / 2
let turn = 0
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
    turn++
    console.log(turn)
}

const pcSpawnCoordinates = () => {
    //spawn pc within 3 tiles of any edge
    let coordinateTest = false
    let rndWidth = Math.floor(Math.random() * (game.width / gridSize))
    console.log(`initial x: ${rndWidth}`)
    let rndHeight = Math.floor(Math.random() * (game.height / gridSize))
    console.log(`initial y: ${rndHeight}`)
    // console.log(`width within middle ${rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3}`)
    // console.log(`height within middle ${rndHeight >= 3 && rndHeight <= (game.width / gridSize) - 3}`)
    // console.log(`width within middle and height within middle ${(rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3) && (rndHeight >= 3 && rndHeight <= (game.height / gridSize) - 3)}`)
    let coordinates = []
    while (!coordinateTest) {
        if ((rndWidth >= 3 && rndWidth < (game.width / gridSize) - 3) && (rndHeight >= 3 && rndHeight <= (game.height / gridSize) - 3)) {
            rndWidth = Math.floor(Math.random() * (game.width / gridSize))
            console.log(`new x: ${rndWidth}`)
        } else {
            coordinateTest = true
        }
    }
    coordinates = [rndWidth * gridSize + tileCenter, rndHeight * gridSize + tileCenter]
    console.log(`coordinates ${coordinates}`)
    return coordinates
}

const enemySpawn = (pcPos) => {
    //spawn enemy(s) at least 5 tile from pc
    //cannot spawn where the is another enemy
}

// create character sprite and spawn
// first create a basic MOB class with traits shared be friend and foe alike
class MobileObject {
    constructor (name, gridPos, health, energy, displayColor, attackRating, physicalResist) {
    this.name = name
    this.gridPos = gridPos
    this.xPos = gridPos[0]
    this.yPos = gridPos[1]
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
        // we'll use the numPad for movement and explicitly define the diagonals
        if (key === 56 ) {
            if (this.yPos > tileCenter) {
                this.yPos -= this.gridStep
                console.log('up')
                endTurn()
            }
        }
        if (key === 54) {
            if (this.xPos < game.width - tileCenter) {
                this.xPos += this.gridStep
                console.log('right')
                endTurn()
            }
        }
        if (key === 50) {
            if (this.yPos < game.height - tileCenter) {
                this.yPos += this.gridStep
                console.log('down')
                endTurn()
            } 
        }
        if (key === 52) {
            if (this.xPos > tileCenter) {
                this.xPos -= this.gridStep
                console.log('left')
                endTurn()
            }
        }
    }
}

// class EnemyCharacter extends MobileObject {

// }

// create a player character instance and render it on the map with its initial traits

const playerCharacter = new PlayerCharacter('Bob', pcSpawnCoordinates(), 100, 100, 'limegreen', 20, 80)
// const enemyCharacter = new EnemyCharacter('goblin', )
playerCharacter.render()

// since the game is turn-based we can simply use the keypress method and pass that to our movement handler
document.addEventListener('keypress', (e) => {
    playerCharacter.moveDirection(e.keyCode)
})

// **********NEXT STEPS***************
// * 0) spawn pc within three tiles of an edge
// 1) spawn an enemy in a random location at least 9 tiles away from the pc
// 2) detect collision between pc and enemy
// 3) have collision instantiate 'battle' - atk vs def and adjust health accordingly
// 4) enemy tracks (moves) towards player!!
// * 5) create movement boundaries which impede movement without advancing a turn
// **************************************
// create UI

// case 57:
                //     this.yPos -= this.gridStep
                //     this.xPos += this.gridStep
                //     console.log('up-right')
                //     break
                // case 51:
                //     this.xPos += this.gridStep
                //     this.yPos += this.gridStep
                //     console.log('down-right')
                //     break
                // case 49:
                //     this.yPos += this.gridStep
                //     this.xPos -= this.gridStep
                //     console.log('down-left')
                //     break
                // case 55:
                //     this.xPos -= this.gridStep
                //     this.yPos -= this.gridStep
                //     console.log('up-left')
                //     break