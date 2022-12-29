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
// actorListList is a list of all mobile objects currently in play
// the actorListList[0] will always be at position [0]
const actorList = []

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
    // console.log(`initial pc x: ${rndX}`)
    let rndY = Math.floor(Math.random() * (game.height / gridSize))
    // console.log(`initial pc y: ${rndY}`)
    // console.log(`width within middle ${rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3}`)
    // console.log(`height within middle ${rndHeight >= 3 && rndHeight <= (game.width / gridSize) - 3}`)
    // console.log(`width within middle and height within middle ${(rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3) && (rndHeight >= 3 && rndHeight <= (game.height / gridSize) - 3)}`)
    let coordinates = []
    while (!coordinateTest) {
        if ((rndX >= 3 && rndX < (game.width / gridSize) - 3) && (rndY >= 3 && rndY <= (game.height / gridSize) - 3)) {
            rndX = Math.floor(Math.random() * (game.width / gridSize))
            // console.log(`new pc x: ${rndX}`)
        } else {
            coordinateTest = true
        }
    }
    
    coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]
    // console.log(`pc coordinates ${coordinates}`)
    return coordinates
}

const enemySpawnCoordinates = () => {
    let coordinateTest = false
    //spawn enemy(s) at least 5 tiles away from pc
    //get player coordinates
    const pcCoordsRaw = actorList[0].gridPos
    //'normalize' player coordinates
    const pcCoords = pcCoordsRaw.map(coord => (coord - 15) / gridSize)
    // console.log(`normailzed pc coordinates ${pcCoords}`)
    //random X and Y, bound by the visible grid
    let rndX = Math.floor(Math.random() * (game.width / gridSize))
    // console.log(`initial enemy x: ${rndX}`)
    let rndY = Math.floor(Math.random() * (game.height / gridSize))
    // console.log(`initial enemy y: ${rndY}`)
    let coordinates = []
    while (!coordinateTest) {
        // if the difference between either (X/Y) of pc and enemy is less than 5 OR
        // if the coordinates already exist in the occupied tiles grid
        if ((Math.abs(pcCoords[0] - rndX) < 5 && Math.abs(pcCoords[1] - rndY) < 5) && (playerCharacter.xPos === rndX && playerCharacter.yPos === rndY)) {
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

    // console.log(`enemy coordinates ${coordinates}`)
    //add these coords to an array for future testing
    // console.log(`enemy occupied tiles array: ${occupiedTiles}`)
    //gimme
    return coordinates
}

const enemySpawn = (numberToSpawn) => {
    for (let i = 1; i <= numberToSpawn; i++) {
        let enemy = new EnemyCharacter(`enemy${[i]}`, i, enemySpawnCoordinates())
        actorList.push(enemy)
        enemy.render('hotPink')
    }
}

const isCollision = (targetTileX, targetTileY) => {
    let collisionDetected = false
    while(!collisionDetected){
        for (let i = 0; i < actorList.length; i++) {
            if (targetTileX === actorList[i].xPos && targetTileY === actorList[i].yPos) {
                console.log(`COLLISON DETECTED`)
                collisionDetected = true
                return collisionDetected
            } 
        }            
        return collisionDetected
    }
}

const actorAt = (targetTileX, targetTileY) => {
    let actor
    // find the actor[index] with the given coordinates
    for (let i = 0; i < actorList.length; i++) {
        if (actorList[i].xPos === targetTileX && actorList[i].yPos === targetTileY) {
            actor = actorList[i]
            return actor
        }
    }
}

const enemyDefeat = (enemy) => {
    enemy.isAlive = false
    enemy.render('transparent')
    actorList.splice(enemy.actorListArrayPos, 1)
}

// create character sprite and spawn
// first create a basic MOB class with traits shared be friend and foe alike
class MobileObject {
    constructor (uid, actorListArrayPos, gridPos) {
        this.uid = uid
        this.gridPos = gridPos
        this.actorListArrayPos = actorListArrayPos
        this.xPos = this.gridPos[0]
        this.yPos = this.gridPos[1]
        this.characterType = 'MOB'
        this.alive = true
        this.baseHealth = 100
        this.baseEnergy = 100
        this.baseAttack = 10
        this.attackType = ''
        this.basePhysResist = 0
        this.baseMagResist = 0
    }
    meleeAttack = (target) => {
        let defenderHealth = target.baseHealth
        const incomingDamage = this.baseAttack - (this.baseAttack * target.basePhysResist)
        defenderHealth = defenderHealth - incomingDamage
        console.log(`${this.uid} deals ${incomingDamage} to ${target.uid}`)
        return defenderHealth
    }
    moveUp = function() {
        const targetAt = actorAt(this.xPos, this.yPos - gridSize)
        if (!isCollision(this.xPos, this.yPos - gridSize) && this.yPos > tileCenter) {
            this.yPos -= gridSize
        } else if (isCollision(this.xPos, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('up')
    }
    moveUpRight = function() {
        const targetAt = actorAt(this.xPos + gridSize, this.yPos - gridSize)
        if (!isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos < game.width - tileCenter) {
            this.yPos -= gridSize
            this.xPos += gridSize
        } else if (isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('up-right')
    }
    moveRight = function() {
        const targetAt = actorAt(this.xPos + gridSize, this.yPos)
        if (!isCollision(this.xPos + gridSize, this.yPos) && this.xPos < game.width - tileCenter) {
            this.xPos += gridSize
        } else if (isCollision(this.xPos + gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('right')
    }
    moveDownRight = function() {
        const targetAt = actorAt(this.xPos + gridSize, this.yPos + gridSize)
        if (!isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.yPos < game.height - tileCenter && this.xPos < game.width - tileCenter ) {
        this.yPos += gridSize
        this.xPos += gridSize
        } else if (isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('down-right')
    }
    moveDown = function() {
        const targetAt = actorAt(this.xPos, this.yPos + gridSize)
        if (!isCollision(this.xPos, this.yPos + gridSize) && this.yPos < game.height - tileCenter) {
            this.yPos += gridSize
        } else if (isCollision(this.xPos, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('down')
    }
    moveDownLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos + gridSize)
        if (!isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.yPos < game.height - tileCenter && this.xPos > tileCenter) {
            this.yPos += gridSize
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('down-left')
    }
    moveLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos)
        if (!isCollision(this.xPos - gridSize, this.yPos) && this.xPos > tileCenter) {
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
        // console.log('left')
    }
    moveUpLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos - gridSize)
        if (!isCollision(this.xPos - gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos > tileCenter) {
            this.yPos -= gridSize
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.baseHealth = this.meleeAttack(targetAt)
            console.log(targetAt.baseHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.baseHealth <= 0) {
                enemyDefeat(targetAt)
            }
        }
    }
}

// the player character inherits the MOB's traits, and adds its own (specifically move and other action methods)
class PlayerCharacter extends MobileObject {
    constructor (uid, actorListArrayPos, gridPos, characterType, baseAttack) {
        super(uid, actorListArrayPos, gridPos, characterType, baseAttack)
        this.characterType = 'PC'
        this.enemyType = 'ENEMY'
        this.displayColor = 'skyBlue'
        this.baseAttack = 50
    }
    render = function () {
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, gridSize / 3, 0, 2.0 * Math.PI)
        ctx.fillStyle = this.displayColor
        ctx.fill()
        }
    movementHandler = function(key) {
        // we'll use the numPad for movement and explicitly define the diagonals
        if (key === 56) {
            // if (isCollision(this.xPos, this.yPos - gridSize) === false && this.yPos > tileCenter) {
            this.moveUp()
        }
        if (key === 57) {
            // if (isCollision(this.xPos, this.yPos - gridSize) === false && this.yPos > tileCenter) {
            this.moveUpRight()
        }
        if (key === 54) {
            // if (isCollision(this.xPos + gridSize, this.yPos) === false && this.xPos < game.width - tileCenter) {                        
            this.moveRight()
        }
        if (key === 51) {
            // if (isCollision(this.xPos, this.yPos - gridSize) === false && this.yPos > tileCenter) {
            this.moveDownRight()
        }
        if (key === 50) {
            // if (isCollision(this.xPos, this.yPos +gridSize) === false && this.yPos < game.height - tileCenter) {
            this.moveDown()
        }
        if (key === 49) {
            // if (isCollision(this.xPos, this.yPos - gridSize) === false && this.yPos > tileCenter) {
            this.moveDownLeft()
        }
        if (key === 52) {
            this.moveLeft()
        }
        if (key === 55) {
            // if (isCollision(this.xPos, this.yPos - gridSize) === false && this.yPos > tileCenter) {
            this.moveUpLeft()
        }
        endTurn()
    }
}

class EnemyCharacter extends MobileObject {
    constructor(uid, actorListArrayPos, gridPos, characterType) {
        super(uid, actorListArrayPos, gridPos, characterType)
        this.uid = uid
        this.characterType = 'ENEMY'
        this.enemyType = 'PC'
    }
    render = function (displayColor) {
        ctx.font = '24px sans-serif'
        // ctx.textBaseLine = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = displayColor
        ctx.fillText(`${this.actorListArrayPos}`, this.xPos, this.yPos + 8)
        }
    // attackHandler = function() {
    //     //we're just going with melee and baseAttack for now

    // }
    movementHandler = function() {
        const pcX = actorList[0].xPos
        const pcY = actorList[0].yPos
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
    // decisionHandler = function() {
    //     // console.log(`x distance to pc ${Math.abs(this.xPos - playerCharacter.xPos)}, y distance to pc ${Math.abs(this.yPos - playerCharacter.yPos)}`)
    //     //if the distance between the pc in both directions === 1
    //     if (Math.abs(this.xPos - playerCharacter.xPos) <= gridSize && Math.abs(this.yPos - playerCharacter.yPos) <= gridSize) {
    //         console.log(`ATTACK!`)
    //         //attack the enemy
    //         playerCharacter.baseHealth = this.meleeAttack(playerCharacter)
    //     } else {
    //         //else move towards the pc
    //         this.movementHandler()
    //     }
    // }
}

// create a player character instance and render it on the map with its initial traits

// const actorListList[0] = new PlayerCharacter(`pc0`, 0, pcSpawn())
// actorListList[0].render()
const playerCharacter = new PlayerCharacter(`pc0`, 0, pcSpawnCoordinates())
playerCharacter.render()
actorList.push(playerCharacter)
enemySpawn(5)

// call this function when the player either moves, attacks or uses a skill, drinks a potion, or picks up loot

const endTurn = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    mapDraw()
    actorList.splice(0, 1, playerCharacter)
    playerCharacter.render()
    // console.log(actorList[0].baseHealth)
    for (i = 1; i < actorList.length; i++) {
        let enemy = actorList[i]
        enemy.actorListArrayPos = i
        enemy.movementHandler()
        actorList.splice(enemy.actorListArrayPos, 1, enemy)
        enemy.render('hotPink')
    }
    console.log(actorList)
    turn++
    console.log(turn)
}


// since the game is turn-based we can simply use the keypress method and pass that to our movement handler
document.addEventListener('keypress', (e) => {
    playerCharacter.movementHandler(e.keyCode)
})

// **********NEXT STEPS***************
// *) spawn pc within three tiles of an edge
// *) spawn an enemy in a random location at least 5 tiles away from the pc
// *) detect collision between pc and enemy
// *) make it so one unit cannot move into square occupied by another unit
// *) have collision instantiate 'battle' - atk vs def and adjust health accordingly
// ?) FIX: defeated enemy is 'diappearing' from game but not being removed
// *) enemy tracks (moves) towards player!!
// *) spawn multiple enemies
// *) create movement boundaries which impede movement without advancing a turn
// *) enemy collision - stop from colliding with other enemies && pc 
// *) Instead of clearing out entire array, somehow log occupiedTiles index of MOB, then use splice() to change the x/y positions / success!
// ?) enemy keep moving around towrds pc even if collision detected
// ?) figure out how to deal damage to specific enemy being targetted <<<-----

// ?) refactorList spawn code - take in param such that if(param) executes its own while loop, since the rest is basically the same
// create UI
// **************************************


// case 57:
                //     this.yPos -= gridSize
                //     this.xPos += gridSize
                //     console.log('up-right')
                //     break
                // case 51:
                //     this.xPos += gridSize
                //     this.yPos += gridSize
                //     console.log('down-right')
                //     break
                // case 49:
                //     this.yPos += gridSize
                //     this.xPos -= gridSize
                //     console.log('down-left')
                //     break
                // case 55:
                //     this.xPos -= gridSize
                //     this.yPos -= gridSize
                //     console.log('up-left')
                //     break