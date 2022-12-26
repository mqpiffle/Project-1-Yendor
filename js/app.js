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
const enemyOccupiedTiles = []
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
    while (!coordinateTest) {
        // if the difference between either (X/Y) of pc and enemy is less than 5
        if (Math.abs(pcCoords[0] - rndX) < 5 && Math.abs(pcCoords[1] - rndY) < 5) {
            //reroll X
            rndX = Math.floor(Math.random() * (game.width / gridSize))
            console.log(`enemy on top of pc! new enemy x: ${rndX}`)
        } else if (enemyOccupiedTiles > 0) {
            const filterTest = enemyOccupiedTiles.filter(coords => coords[0] === rndX && coords[1] === rndY)
            if (filterTest) {
                rndX = Math.floor(Math.random() * (game.width / gridSize))
                console.log(`enemies on top of each other! new enemy x: ${rndX}`)
            }
        } else {
            // we are good to go!
            coordinateTest = true
        }
    }
    //the re-un-normalized coordinates
    coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]
    console.log(`enemy coordinates ${coordinates}`)
    //add these coords to an array for future testing
    enemyOccupiedTiles.push(coordinates)
    console.log(`enemy occupied tiles array: ${enemyOccupiedTiles}`)
    //gimme
    return coordinates
    //cannot spawn where the is another enemy
}

const spawnEnemies = (numberToSpawn) => {
    for (let i = 0; i < numberToSpawn; i++) {
        let goblin = new EnemyCharacter('goblin', enemySpawnCoordinates())
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

const detectEnemyCollision = (enemy) => {
    if (playerCharacter.xPos === enemy.xPos && playerCharacter.yPos === enemy.yPos) {
        console.log(`pc base attack is ${playerCharacter.baseAttack}`)
        console.log(`enemy's health is ${enemy.baseHealth}`)
        return enemy.baseHealth -= meleeAttack(playerCharacter, enemy)
    }

}

// create character sprite and spawn
// first create a basic MOB class with traits shared be friend and foe alike
class MobileObject {
    constructor (name, gridPos) {
    this.name = name
    this.gridPos = gridPos
    this.xPos = gridPos[0]
    this.yPos = gridPos[1]
    this.displayColor = 'skyBlue'
    this.alive = true
    this.baseHealth = 100
    this.baseEnergy = 100
    this.baseAttack = 50
    this.basePhysResist = 0
    this.baseMagResist = 0
    this.gridStep = gridSize
    this.render = function () {
        if (this.alive) {
            ctx.beginPath()
            ctx.arc(this.xPos, this.yPos, this.gridStep / 2, 0, 2.0 * Math.PI)
            ctx.fillStyle = this.displayColor
            ctx.fill()
            }
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
                // console.log('up')
                endTurn()
            }
        }
        if (key === 54) {
            if (this.xPos < game.width - tileCenter) {
                this.xPos += this.gridStep
                // console.log('right')
                endTurn()
            }
        }
        if (key === 50) {
            if (this.yPos < game.height - tileCenter) {
                this.yPos += this.gridStep
                // console.log('down')
                endTurn()
            } 
        }
        if (key === 52) {
            if (this.xPos > tileCenter) {
                this.xPos -= this.gridStep
                // console.log('left')
                endTurn()
            }
        }
    }
}

class EnemyCharacter extends MobileObject {
    constructor(displayColor, gridPos) {
        super(displayColor, gridPos)
        this.displayColor = 'darkRed'
    }
}

// create a player character instance and render it on the map with its initial traits

const playerCharacter = new PlayerCharacter('Bob', pcSpawnCoordinates())
const enemyCharacter = new EnemyCharacter('goblin', enemySpawnCoordinates(playerCharacter.gridPos))
playerCharacter.render()
spawnEnemies(5)

// call this function when the player either moves, attacks or uses a skill, drinks a potion, or picks up loot

const endTurn = () => {
    detectEnemyCollision(enemyCharacter)
    console.log(`enemy's health is ${enemyCharacter.baseHealth}`)
    ctx.clearRect(0, 0, game.width, game.height)
    mapDraw()
    playerCharacter.render()
    if (enemyCharacter.alive) {
        enemyCharacter.render()
    }
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