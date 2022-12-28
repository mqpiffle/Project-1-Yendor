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
let occupiedTiles = []
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
    occupiedTiles.push(coordinates)
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
    const filterTest = occupiedTiles.filter(coords => coords[0] === rndX && coords[1] === rndY)
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
        let goblin = new EnemyCharacter(`${[i]}`, enemySpawnCoordinates(playerCharacter.gridPos))
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

const willCollide = (targetTileX, targetTileY) => {
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
        
        this.moveUp = function() {
            if (willCollide(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                this.yPos -= this.gridStep
            }
            // console.log('up')
        }
        this.moveUpRight = function() {
            if (willCollide(this.xPos + this.gridStep, this.yPos - this.gridStep) === false && this.yPos > tileCenter && this.xPos < game.width - tileCenter) {
                this.yPos -= this.gridStep
                this.xPos += this.gridStep
            }
            // console.log('up-right')
        }
        this.moveRight = function() {
            if (willCollide(this.xPos + this.gridStep, this.yPos) === false && this.xPos < game.width - tileCenter) {
                this.xPos += this.gridStep
            }
            // console.log('right')
        }
        this.moveDownRight = function() {
            if (willCollide(this.xPos + this.gridStep, this.yPos + this.gridStep) === false && this.yPos < game.height - tileCenter && this.xPos < game.width - tileCenter ) {
            this.yPos += this.gridStep
            this.xPos += this.gridStep
            }
            // console.log('down-right')
        }
        this.moveDown = function() {
            if (willCollide(this.xPos, this.yPos + this.gridStep) === false && this.yPos < game.height - tileCenter) {
                this.yPos += this.gridStep
            }
            // console.log('down')
        }
        this.moveDownLeft = function() {
            if (willCollide(this.xPos - this.gridStep, this.yPos + this.gridStep) === false && this.yPos < game.height - tileCenter && this.xPos > tileCenter) {
                this.yPos += this.gridStep
                this.xPos -= this.gridStep
            }
            // console.log('down-left')
        }
        this.moveLeft = function() {
            if (willCollide(this.xPos - this.gridStep, this.yPos) === false && this.xPos > tileCenter) {
                this.xPos -= this.gridStep
            }
            // console.log('left')
        }
        this.moveUpLeft = function() {
            if (willCollide(this.xPos - this.gridStep, this.yPos - this.gridStep) === false && this.yPos > tileCenter && this.xPos > tileCenter) {
                this.yPos -= this.gridStep
                this.xPos -= this.gridStep
            }
            // console.log('up-left')
        }
    }
}

// the player character inherits the MOB's traits, and adds its own (specifically move and other action methods)
class PlayerCharacter extends MobileObject {
    constructor (uid, gridPos) {
        super(uid, gridPos)
        this.displayColor = 'skyBlue'
    }
    render = function () {
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.gridStep / 2, 0, 2.0 * Math.PI)
        ctx.fillStyle = this.displayColor
        ctx.fill()
        }
    moveDirection = function(key) {
        // we'll use the numPad for movement and explicitly define the diagonals
        if (key === 56) {
            // if (willCollide(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                this.moveUp()
        }
        if (key === 57) {
            // if (willCollide(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                this.moveUpRight()
        }
        if (key === 54) {
            // if (willCollide(this.xPos + this.gridStep, this.yPos) === false && this.xPos < game.width - tileCenter) {                        
                this.moveRight()
        }
        if (key === 51) {
            // if (willCollide(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                this.moveDownRight()
        }
        if (key === 50) {
            // if (willCollide(this.xPos, this.yPos +this.gridStep) === false && this.yPos < game.height - tileCenter) {
                this.moveDown()
        }
        if (key === 49) {
            // if (willCollide(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                this.moveDownLeft()
        }
        if (key === 52) {
            // if (willCollide(this.xPos - this.gridStep, this.yPos) === false && this.xPos > tileCenter) {
                this.moveLeft()
        }
        if (key === 55) {
            // if (willCollide(this.xPos, this.yPos - this.gridStep) === false && this.yPos > tileCenter) {
                this.moveUpLeft()
        }
        endTurn()
    }
}

class EnemyCharacter extends MobileObject {
    constructor(uid, gridPos) {
        super(uid, gridPos)
        this.uid = uid
        this.displayColor = 'hotPink'
        this.type = 'ENEMY'
    }
    render = function () {
        ctx.font = '24px sans-serif'
        // ctx.textBaseLine = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = this.displayColor
        ctx.fillText(`${this.uid}`, this.xPos, this.yPos + 8)
        }
    moveEnemy = function() {
        const pcX = playerCharacter.xPos
        const pcY = playerCharacter.yPos
        const x = this.xPos
        const y = this.yPos
        if (Math.abs(pcY - y) === Math.abs(pcX - x)) {
            if (pcY < y && pcX > x) {
                this.moveUpRight()
            }
            if (pcY > y && pcX > x) {
                this.moveDownRight()
            }
            if (pcY > y && pcX < x) {
                this.moveDownLeft()
            }
            if (pcY < y && pcX < x) {
                this.moveUpLeft()
            }
        }
        if (Math.abs(pcY - y) > Math.abs(pcX - x)) {
            if (pcY < y) {
                this.moveUp()
            }
            if (pcY > y) {
                this.moveDown()
            }
        } else {
            if (pcX > x) {
                this.moveRight()
            }
            if (pcX < x) {
                this.moveLeft()
            }
        }
    }
}

// create a player character instance and render it on the map with its initial traits

const playerCharacter = new PlayerCharacter(`pc0`, pcSpawnCoordinates())
playerCharacter.render()
spawnEnemies(5)

// call this function when the player either moves, attacks or uses a skill, drinks a potion, or picks up loot

const endTurn = () => {
    occupiedTiles = []
    ctx.clearRect(0, 0, game.width, game.height)
    mapDraw()
    occupiedTiles.push([playerCharacter.xPos, playerCharacter.yPos])
    playerCharacter.render()
    enemies.forEach(enemy => {
        enemy.moveEnemy()
        occupiedTiles.push([enemy.xPos, enemy.yPos])
        enemy.render()
    })
    console.log(occupiedTiles)
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
// *) make it so one unit cannot move into square occupied by another unit
// *) have collision instantiate 'battle' - atk vs def and adjust health accordingly
// 2) FIX: defeated enemy is 'diappearing' from game but not being removed
// *) enemy tracks (moves) towards player!!
// *) spawn multiple enemies
// *) create movement boundaries which impede movement without advancing a turn
// 1) enemy collision - stop from colliding with other enemies && pc ** SO CLOSE!!
// ???? Instead of clearing out entire array, somehow log occupiedTiles index of MOB, then use splice() to change the x/y positions ????

// 2) refactor spawn code - take in param such that if(param) executes its own while loop, since the rest is basically the same
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