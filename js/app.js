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
const enemies = []
const occupiedTiles = []
const openTiles = []
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

const pcSpawnCoordinates = () => {
    //spawn pc within 3 tiles of any edge
    let coordinateTest = false
    let rndX = Math.floor(Math.random() * (game.width / gridSize))
    console.log(`initial pc x: ${rndX}`)
    let rndY = Math.floor(Math.random() * (game.height / gridSize))
    console.log(`initial pc y: ${rndY}`)
    // console.log(`width within middle ${rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3}`)
    // console.log(`height within middle ${rndHeight >= 3 && rndHeight <= (game.width / gridSize) - 3}`)
    // console.log(`width within middle and height within middle ${(rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3) && (rndHeight >= 3 && rndHeight <= (game.height / gridSize) - 3)}`)
    let coordinates = []
    while (!coordinateTest) {
        if ((rndX >= 3 && rndX < (game.width / gridSize) - 3) && (rndY >= 3 && rndY <= (game.height / gridSize) - 3)) {
            rndX = Math.floor(Math.random() * (game.width / gridSize))
            console.log(`new pc x: ${rndX}`)
        } else {
            coordinateTest = true
        }
    }
    coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]
    console.log(`pc coordinates ${coordinates}`)
    return coordinates
}

const enemySpawnCoordinates = () => {
    let coordinateTest = false
    //spawn enemy(s) at least 5 tiles away from pc
    //get player coordinates
    const pcCoordsRaw = playerCharacter.gridPos
    //'normalize' player coordinates
    const pcCoords = pcCoordsRaw.map(coord => (coord - 15) / gridSize)
    console.log(`normailzed pc coordinates ${pcCoords}`)
    //random X and Y, bound by the visible grid
    let rndX = Math.floor(Math.random() * (game.width / gridSize))
    console.log(`initial enemy x: ${rndX}`)
    let rndY = Math.floor(Math.random() * (game.height / gridSize))
    console.log(`initial enemy y: ${rndY}`)
    let coordinates = []
    const filterTest = occupiedTiles?.filter(coords => coords[0] === rndX && coords[1] === rndY)
    while (!coordinateTest) {
        // if the difference between either (X/Y) of pc and enemy is less than 5 OR
        // if the coordinates already exist in the occupied tiles grid
        if ((Math.abs(pcCoords[0] - rndX) < 5 && Math.abs(pcCoords[1] - rndY) < 5) || (occupiedTiles > 0 && filterTest)) {
            //rerollX
            rndX = Math.floor(Math.random() * (game.width / gridSize))
            rndY = Math.floor(Math.random() * (game.height / gridSize))
        } else {
            // we are good to go!
            coordinateTest = true
        }
    }
    //the re-un-normalized coordinates
    coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]
    console.log(`enemy coordinates ${coordinates}`)
    //add these coords to an array for future testing
    occupiedTiles.push(coordinates)
    console.log(`enemy occupied tiles array: ${occupiedTiles}`)
    //gimme
    return coordinates
    //cannot spawn where the is another enemy
}

const spawnEnemies = (numberToSpawn) => {
    for (let i = 0; i < numberToSpawn; i++) {
        let goblin = new EnemyCharacter(`goblin${[i]}`, enemySpawnCoordinates(playerCharacter.gridPos))
        enemies.push(goblin)
        goblin.render()
    }
}

const meleeAttack = (attacker, defender) => {
    const incomingDamage = attacker.baseAttack - (attacker.baseAttack * defender.basePhysResist)
    if (defender.baseHealth - incomingDamage <= 0) {
        defender.alive = false
    }
    return incomingDamage
}

const detectEnemyCollision = (targetTileX, targetTileY) => {
    let collisionDetected = false
    while(!collisionDetected){
        for (let i = 0; i < occupiedTiles.length; i++) {
            if (targetTileX === occupiedTiles[i][0] && targetTileY === occupiedTiles[i][1]) {
                console.log(`COLLISON DETECTED`)
                collisionDetected = true
                return collisionDetected
            } 
        }            
        return collisionDetected
    }
}

const enemyMove = () => {
    //if the player is adjacent, auto attack
    //check enemyX vs playerX and enemyY vs playerY
    //whichever is greater(default to x), move that direction towards the player
    //if there's not another enemy in target tile, else move the other dimension
}

// create character sprite and spawn
// first create a basic MOB class with traits shared be friend and foe alike
class MobileObject {
    constructor (uid, gridPos) {
    this.uid = uid
    this.gridPos = gridPos
    this.xPos = this.gridPos[0]
    this.yPos = this.gridPos[1]
    this.type = 'MOB'
    this.alive = true
    this.baseHealth = 100
    this.baseEnergy = 100
    this.baseAttack = 50
    this.basePhysResist = 0
    this.baseMagResist = 0
    this.gridStep = 30
    this.render = function () {
        if (this.alive) {
            ctx.beginPath()
            ctx.arc(this.xPos, this.yPos, this.gridStep / 2, 0, 2.0 * Math.PI)
            ctx.fillStyle = this.displayColor
            ctx.fill()
            }
        }
    this.moveUp = function() {
        this.yPos -= this.gridStep
        // console.log('up')
        endTurn()
        }
    this.moveRight = function() {
        this.xPos += this.gridStep
        // console.log('right')
        endTurn()
        }
    this.moveDown = function() {
        this.yPos += this.gridStep
        // console.log('down')
        endTurn()
        }
    this.moveLeft = function() {
        this.xPos -= this.gridStep
        // console.log('left')
        endTurn()
        }
    }
}

// the player character inherits the MOB's traits, and adds its own (specifically move and other action methods)
class PlayerCharacter extends MobileObject {
    constructor (uid, gridPos) {
        super(uid, gridPos)
        this.displayColor = 'skyBlue'
    }
        moveDirection = function(key) {
            // we'll use the numPad for movement and explicitly define the diagonals
            if (key === 56) {
                if (detectEnemyCollision(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                    this.yPos -= this.gridStep
                    // console.log('up')
                    endTurn()
                }
            }
            if (key === 54) {
                if (detectEnemyCollision(this.xPos + this.gridStep, this.yPos) === false && this.xPos < game.width - tileCenter) {                        
                    this.xPos += this.gridStep
                    // console.log('right')
                    endTurn()
                }
            }
            if (key === 50) {
                if (detectEnemyCollision(this.xPos, this.yPos +this.gridStep) === false && this.yPos < game.height - tileCenter) {
                    this.yPos += this.gridStep
                    // console.log('down')
                    endTurn()
                } 
            }
            if (key === 52) {
                if (detectEnemyCollision(this.xPos - this.gridStep, this.yPos) === false && this.xPos > tileCenter) {
                    this.xPos -= this.gridStep
                    // console.log('left')
                    endTurn()
            }
        }
    }
}

class EnemyCharacter extends MobileObject {
    constructor(uid, gridPos) {
        super(uid, gridPos)
        this.uid = uid
        this.displayColor = 'darkRed'
        this.type = 'ENEMY'
    }
    moveUp = function() {
        this.yPos -= this.gridStep
        // console.log('up')
        endTurn()
    }
    move
}

// create a player character instance and render it on the map with its initial traits

const playerCharacter = new PlayerCharacter(`pc0`, pcSpawnCoordinates())
playerCharacter.render()
spawnEnemies(5)

// call this function when the player either moves, attacks or uses a skill, drinks a potion, or picks up loot

const endTurn = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    mapDraw()
    playerCharacter.render()
    enemies.forEach(enemy => {
        enemy.render()
    })
    turn++
    console.log(turn)
}


// since the game is turn-based we can simply use the keypress method and pass that to our movement handler
document.addEventListener('keypress', (e) => {
    playerCharacter.moveDirection(e.keyCode)
})

// **********NEXT STEPS***************
// *) spawn pc within three tiles of an edge
// *) spawn an enemy in a random location at least 5 tiles away from the pc
// *) detect collision between pc and enemy
// !) define what a tile is and use tile coords instead of pixel coords
// 1) make it so one unit cannot move into square occupied by another unit
// *) have collision instantiate 'battle' - atk vs def and adjust health accordingly
// 2) FIX: defeated enemy is 'diappearing' from game but not being removed
// 3) enemy tracks (moves) towards player!!
// *) spawn multiple enemies
// *) create movement boundaries which impede movement without advancing a turn
// create UI
// **************************************


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