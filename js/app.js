// *********** GLOBAL STUFF ***********

// const game = document.getElementById('primary-canvas')
// const movement = document.getElementById('movement')
// const message = document.getElementById('message')

// const ctx = game.getContext('2d')

// game.setAttribute('width', getComputedStyle(game)['width'])
// game.setAttribute('height', getComputedStyle(game)['height'])
// game.width = 900
// game.height = 900
const gridSize = 30
const tileCenter = gridSize / 2
// actorListList is a list of all mobile objects currently in play
// the playerCharacter will always be at position [0]
const actorList = []
let playerCharacter
let characterName
let characterClass
let turn = 0






// *********** GAME LOOP STUFF ***********

// presentational map board for development

// const checkerboard = (horiz, vert) => {
//     if (horiz % 2 === 0) {
//         return `hsl(0 0% ${30 + (vert % 2) * 2}%`
//     } else {
//         return `hsl(0 0% ${32 - (vert % 2) * 2}%`
//     }
// }

// make a map grid

// const mapDraw = () => {
//     for (let i = 0; i < game.width / gridSize; i++) {
//         for (let j = 0; j < game.height / gridSize; j++) {
//             ctx.fillStyle = checkerboard(i, j)
//             ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize)
//         }
//     }
// }
// create the initial map overlay, will also be called on every game turn (redraw)



// const pcSpawnCoordinates = () => {
    //spawn pc within 3 tiles of any edge
    // let coordinateTest = false
    // let rndX = Math.floor(Math.random() * (game.width / gridSize))
    // console.log(`initial pc x: ${rndX}`)
    // let rndY = Math.floor(Math.random() * (game.height / gridSize))
    // console.log(`initial pc y: ${rndY}`)
    // console.log(`width within middle ${rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3}`)
    // console.log(`height within middle ${rndHeight >= 3 && rndHeight <= (game.width / gridSize) - 3}`)
    // console.log(`width within middle and height within middle ${(rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3) && (rndHeight >= 3 && rndHeight <= (game.height / gridSize) - 3)}`)
    // let coordinates = []
    // while (!coordinateTest) {
        // if ((rndX >= 3 && rndX < (game.width / gridSize) - 3) && (rndY >= 3 && rndY <= (game.height / gridSize) - 3)) {
            // rndX = Math.floor(Math.random() * (game.width / gridSize))
            // console.log(`new pc x: ${rndX}`)
    //     } else {
    //         coordinateTest = true
    //     }
    // }
    
    // coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]
    // console.log(`pc coordinates ${coordinates}`)
//     return coordinates
// }

// const enemySpawnCoordinates = () => {
//     let coordinateTest = false
    //spawn enemy(s) at least 5 tiles away from pc
    //get player coordinates
    // const pcCoordsRaw = actorList[0].gridPos
    //'normalize' player coordinates
    // const pcCoords = pcCoordsRaw.map(coord => (coord - 15) / gridSize)
    // console.log(`normailzed pc coordinates ${pcCoords}`)
    //random X and Y, bound by the visible grid
    // let rndX = Math.floor(Math.random() * (game.width / gridSize))
    // console.log(`initial enemy x: ${rndX}`)
    // let rndY = Math.floor(Math.random() * (game.height / gridSize))
    // console.log(`initial enemy y: ${rndY}`)
    // let coordinates = []
    // while (!coordinateTest) {
        // if the difference between either (X/Y) of pc and enemy is less than 5 OR
        // if the coordinates already exist in the occupied tiles grid
        // if ((Math.abs(pcCoords[0] - rndX) < 5 && Math.abs(pcCoords[1] - rndY) < 5) && (playerCharacter.xPos === rndX && playerCharacter.yPos === rndY)) {
            //rerollX
        //     rndX = Math.floor(Math.random() * (game.width / gridSize))
        //     rndY = Math.floor(Math.random() * (game.height / gridSize))
        // } else {
            // we are good to go!
            // coordinateTest = true
    //     }
    // }
    //the re-un-normalized coordinates
    // coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]

    // console.log(`enemy coordinates ${coordinates}`)
    //add these coords to an array for future testing
    // console.log(`enemy occupied tiles array: ${occupiedTiles}`)
    //gimme
//     return coordinates
// }

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


class GameObject {
    constructor () {
        this.canvas = document.getElementById('primary-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
    }

    checkerboard = (horiz, vert) => {
        if (horiz % 2 === 0) {
            return `hsl(0 0% ${30 + (vert % 2) * 2}%`
        } else {
            return `hsl(0 0% ${32 - (vert % 2) * 2}%`
        }
    }

    mapDraw = () => {
        for (let i = 0; i < this.width / gridSize; i++) {
            for (let j = 0; j < this.height / gridSize; j++) {
                this.ctx.fillStyle = this.checkerboard(i, j)
                this.ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize)
            }
        }
    }
}
class MobileObject extends GameObject {
    constructor (uid, actorListArrayPos, gridPos, canvas, ctx, width, height) {
        super(canvas, ctx, width, height)
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

    // ***I feel like these can be refactored into one 'move' function, maybe later***

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
        if (!isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos < this.width - tileCenter) {
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
        if (!isCollision(this.xPos + gridSize, this.yPos) && this.xPos < this.width - tileCenter) {
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
        if (!isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.yPos < this.height - tileCenter && this.xPos < this.width - tileCenter ) {
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
        if (!isCollision(this.xPos, this.yPos + gridSize) && this.yPos < this.height - tileCenter) {
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
        if (!isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.yPos < this.height - tileCenter && this.xPos > tileCenter) {
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
    constructor (uid, actorListArrayPos, gridPos, characterType, baseAttack, canvas, ctx, width, height) {
        super(uid, actorListArrayPos, gridPos, characterType, baseAttack, canvas, ctx, width, height)
        this.characterType = 'PC'
        this.enemyType = 'ENEMY'
        this.displayColor = 'skyBlue'
        this.baseAttack = 50
    }

    render = function () {
        this.ctx.beginPath()
        this.ctx.arc(this.xPos, this.yPos, gridSize / 3, 0, 2.0 * Math.PI)
        this.ctx.fillStyle = this.displayColor
        this.ctx.fill()
    }

    endTurn = () => {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.mapDraw()
        actorList.splice(0, 1, playerCharacter)
        actorList[0].render()
        // console.log(actorList[0].baseHealth)
        for (let i = 1; i < actorList.length; i++) {
            let enemy = actorList[i]
            enemy.actorListArrayPos = i
            enemy.decisionHandler()
            actorList.splice(enemy.actorListArrayPos, 1, enemy)
            enemy.render('hotPink')
        }
        console.log(actorList)
        turn++
        console.log(turn)
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
        this.endTurn()
    }
}

class EnemyCharacter extends MobileObject {
    constructor(uid, actorListArrayPos, gridPos, characterType, canvas, ctx, width, height, xPos, yPos) {
        super(uid, actorListArrayPos, gridPos, characterType, canvas, ctx, width, height, xPos, yPos)
        this.uid = uid
        this.characterType = 'ENEMY'
        this.enemyType = 'PC'
    }
    render = function (displayColor) {
        this.ctx.font = '24px sans-serif'
        // ctx.textBaseLine = 'middle'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = displayColor
        this.ctx.fillText(`${this.actorListArrayPos}`, this.xPos, this.yPos + 8)
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
    decisionHandler = function() {
        // console.log(`x distance to pc ${Math.abs(this.xPos - playerCharacter.xPos)}, y distance to pc ${Math.abs(this.yPos - playerCharacter.yPos)}`)
        //if the distance between the pc in both directions === 1
        if (Math.abs(this.xPos - actorList[0].xPos) <= gridSize && Math.abs(this.yPos - actorList[0].yPos) <= gridSize) {
            console.log(`ATTACK!`)
            //attack the enemy
            actorList[0].baseHealth = this.meleeAttack(actorList[0])
        } else {
            //else move towards the pc
            this.movementHandler()
        }
    }
}

class GameWorld extends GameObject {
    constructor(canvas, ctx) {
        super(canvas, ctx)
    }

    

    pcSpawnCoordinates = () => {
        //spawn pc within 3 tiles of any edge
        let coordinateTest = false
        let rndX = Math.floor(Math.random() * (this.width / gridSize))
        // console.log(`initial pc x: ${rndX}`)
        let rndY = Math.floor(Math.random() * (this.height / gridSize))
        // console.log(`initial pc y: ${rndY}`)
        // console.log(`width within middle ${rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3}`)
        // console.log(`height within middle ${rndHeight >= 3 && rndHeight <= (game.width / gridSize) - 3}`)
        // console.log(`width within middle and height within middle ${(rndWidth >= 3 && rndWidth <= (game.width / gridSize) - 3) && (rndHeight >= 3 && rndHeight <= (game.height / gridSize) - 3)}`)
        let coordinates = []
        while (!coordinateTest) {
            if ((rndX >= 3 && rndX < (this.width / gridSize) - 3) && (rndY >= 3 && rndY <= (this.height / gridSize) - 3)) {
                rndX = Math.floor(Math.random() * (this.width / gridSize))
                // console.log(`new pc x: ${rndX}`)
            } else {
                coordinateTest = true
            }
        }
        
        coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]
        // console.log(`pc coordinates ${coordinates}`)
        return coordinates
    }

    enemySpawnCoordinates = () => {
        let coordinateTest = false
        //spawn enemy(s) at least 5 tiles away from pc
        //get player coordinates
        const pcCoordsRaw = actorList[0].gridPos
        //'normalize' player coordinates
        const pcCoords = pcCoordsRaw.map(coord => (coord - 15) / gridSize)
        // console.log(`normailzed pc coordinates ${pcCoords}`)
        //random X and Y, bound by the visible grid
        let rndX = Math.floor(Math.random() * (this.width / gridSize))
        // console.log(`initial enemy x: ${rndX}`)
        let rndY = Math.floor(Math.random() * (this.height / gridSize))
        // console.log(`initial enemy y: ${rndY}`)
        let coordinates = []
        while (!coordinateTest) {
            // if the difference between either (X/Y) of pc and enemy is less than 5 OR
            // if the coordinates already exist in the occupied tiles grid
            if ((Math.abs(pcCoords[0] - rndX) < 5 && Math.abs(pcCoords[1] - rndY) < 5) && (playerCharacter.xPos === rndX && playerCharacter.yPos === rndY)) {
                //rerollX
                rndX = Math.floor(Math.random() * (this.width / gridSize))
                rndY = Math.floor(Math.random() * (this.height / gridSize))
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

    enemySpawn = (numberToSpawn) => {
        for (let i = 1; i <= numberToSpawn; i++) {
            let enemy = new EnemyCharacter(`enemy${[i]}`, i, this.enemySpawnCoordinates())
            actorList.push(enemy)
            enemy.render('hotPink')
        }
    }
}

// create a player character instance and render it on the map with its initial traits

// const actorListList[0] = new PlayerCharacter(`pc0`, 0, pcSpawn())
// actorListList[0].render()


// call this function when the player either moves, attacks or uses a skill, drinks a potion, or picks up loot

// const endTurn = () => {
//     ctx.clearRect(0, 0, game.width, game.height)
//     mapDraw()
//     actorList.splice(0, 1, playerCharacter)
//     playerCharacter.render()
//     // console.log(actorList[0].baseHealth)
//     for (i = 1; i < actorList.length; i++) {
//         let enemy = actorList[i]
//         enemy.actorListArrayPos = i
//         enemy.decisionHandler()
//         actorList.splice(enemy.actorListArrayPos, 1, enemy)
//         enemy.render('hotPink')
//     }
//     console.log(actorList)
//     turn++
//     console.log(turn)
// }


// since the game is turn-based we can simply use the keypress method and pass that to our movement handler
document.addEventListener('keypress', (e) => {
    playerCharacter.movementHandler(e.keyCode)
})

// *********** UI STUFF ***********

// TODO:
// 1) add text to Instructions and About
// *) add input form(s) to character selction screen (character name and class selector)
// 2) start game loop when enter dungeon button clicked
// *) choose some better fonts
// 3) create in-game UI

// we'll need this a lot, like a lot a lot
const body = document.getElementById('body')

const initializeGame = () => {
    // Build UI
    const gameContainer =  document.createElement('div')
    gameContainer.id = 'game-container'
    // TOP game info element (character info, hp/energy/xp bars)
    const gameTop = document.createElement('div')
    gameTop.id = 'game-top-ui'
    gameTop.className = 'UI-game-element'
    const gameTopCharInfoContainer = document.createElement('div')
    gameTopCharInfoContainer.id = 'game-top-char-info-container'
    gameTopCharInfoContainer.className = 'UI-game-element'
    const gameTopCharName = document.createElement('div')
    gameTopCharName.id = 'game-top-char-name'
    gameTopCharName.className = 'UI-game-element'
    const gameTopCharNameLabel = document.createElement('p')
    gameTopCharNameLabel.id = 'game-top-char-name-label'
    gameTopCharNameLabel.className = 'UI-game-display-label'
    gameTopCharNameLabel.innerText = 'Name:'
    const gameTopCharNameText = document.createElement('h2')
    gameTopCharNameText.id = 'game-top-char-name-text'
    gameTopCharNameText.className = 'UI-game-display-text'
    gameTopCharNameText.innerText = localStorage.getItem('charName') 
    const gameTopCharClass = document.createElement('div')
    gameTopCharClass.id = 'game-top-char-class'
    gameTopCharClass.className = 'UI-game-element'
    const gameTopCharClassLabel = document.createElement('p')
    gameTopCharClassLabel.id = 'game-top-char-class-label'
    gameTopCharClassLabel.className = 'UI-game-display-label'
    gameTopCharClassLabel.innerText = 'Class:'
    const gameTopCharClassText = document.createElement('h2')
    gameTopCharClassText.id = 'game-top-char-class-text'
    gameTopCharClassText.className = 'UI-game-display-text'
    gameTopCharClassText.innerText = localStorage.getItem('charClass')
    const gameTopCharLevel = document.createElement('div')
    gameTopCharLevel.id = 'game-top-char-level'
    gameTopCharLevel.className = 'UI-game-element'
    const gameTopTrackBarsContainer = document.createElement('div')
    gameTopTrackBarsContainer.id = 'game-top-track-bars-container'
    gameTopTrackBarsContainer.className = 'UI-game-element'
    const gameHealthBar = document.createElement('div')
    gameHealthBar.id = 'game-top-health-bar'
    gameHealthBar.className = 'UI-game-track-bar'
    const gameEnergyBar = document.createElement('div')
    gameEnergyBar.id = 'game-top-energy-bar'
    gameEnergyBar.className = 'UI-game-track-bar'
    const gameXpBar = document.createElement('div')
    gameXpBar.id = 'game-top-xp-bar'
    gameXpBar.className = 'UI-game-track-bar'
    const gameTopTurnCounter = document.createElement('div')
    gameTopTurnCounter.id = 'game-top-turn-counter'
    gameTopTurnCounter.className = 'UI-game-element'
    const gameCanvas = document.createElement('canvas')
    gameCanvas.id = 'primary-canvas'
    gameCanvas.width = '900'
    gameCanvas.height = '900'
    const gameBottom = document.createElement('div')
    gameBottom.id = 'game-bottom-ui'
    gameBottom.className = 'UI-game-element'
    // BOTTOM game info element (character skills/actions, output log)
    const gameBottomSkillsContainer = document.createElement('div')
    gameBottomSkillsContainer.id = 'game-bottom-skills-container'
    gameBottomSkillsContainer.className = 'UI-game-element'
    const gameCurrentWeapon = document.createElement('div')
    gameCurrentWeapon.id = 'game-current-weapon'
    gameCurrentWeapon.className = 'game-skill-button'
    const gameSkill1 = document.createElement('div')
    gameSkill1.id = 'game-skill-1'
    gameSkill1.className = 'game-skill-button'
    const gameSkill2 = document.createElement('div')
    gameSkill2.id = 'game-skill-2'
    gameSkill2.className = 'game-skill-button'
    const gameSkill3 = document.createElement('div')
    gameSkill3.id = 'game-skill-3'
    gameSkill3.className = 'game-skill-button'
    const gameBottomOutputLog = document.createElement('div')
    gameBottomOutputLog.id = 'game-bottom-output-log'



    body.innerHTML = ''
    body.appendChild(gameContainer)
    gameContainer.appendChild(gameTop)
    gameTop.appendChild(gameTopCharInfoContainer)
    gameTopCharInfoContainer.appendChild(gameTopCharName)
    gameTopCharName.appendChild(gameTopCharNameLabel)
    gameTopCharName.appendChild(gameTopCharNameText)
    gameTopCharInfoContainer.appendChild(gameTopCharClass)
    gameTopCharClass.appendChild(gameTopCharClassLabel)
    gameTopCharClass.appendChild(gameTopCharClassText)
    gameTopCharInfoContainer.appendChild(gameTopCharLevel)
    gameTop.appendChild(gameTopTrackBarsContainer)
    gameTopTrackBarsContainer.appendChild(gameHealthBar)
    gameTopTrackBarsContainer.appendChild(gameEnergyBar)
    gameTopTrackBarsContainer.appendChild(gameXpBar)
    gameTop.appendChild(gameTopTurnCounter)
    gameContainer.appendChild(gameCanvas)
    gameContainer.appendChild(gameBottom)
    gameBottom.appendChild(gameBottomSkillsContainer)
    gameBottomSkillsContainer.appendChild(gameCurrentWeapon)
    gameBottomSkillsContainer.appendChild(gameSkill1)
    gameBottomSkillsContainer.appendChild(gameSkill2)
    gameBottomSkillsContainer.appendChild(gameSkill3)
    gameBottom.appendChild(gameBottomOutputLog)

    // hmmm...now the game can't figure out canvas? because it doesn't exist
    const floorOne = new GameWorld
    floorOne.mapDraw()

    playerCharacter = new PlayerCharacter(`pc0`, 0, floorOne.pcSpawnCoordinates())
    playerCharacter.render()
    actorList.push(playerCharacter)
    floorOne.enemySpawn(5)
}

const characterSelectionScreen = () => {
    const charactersSelectionContainerDiv = document.createElement('div')
    charactersSelectionContainerDiv.id = 'characters-selection-container'
    charactersSelectionContainerDiv.className = 'UI-base-container'
    const charactersSelectionTitleDiv = document.createElement('div')
    charactersSelectionTitleDiv.id = 'characters-selection-title-container'
    charactersSelectionTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    // *** insert character name form here ???
    const charactersForm = document.createElement('form')
    // this should probably be a selection form
    charactersForm.id = 'characters-form-container'
    charactersForm.className = 'UI-button-nav-container'
    const charactersFormInputLabel = document.createElement('label')
    charactersFormInputLabel.for = 'char-name'
    charactersFormInputLabel.id = 'char-name-label'
    const charactersFormInput = document.createElement('input')
    charactersFormInput.id = 'char-name'
    charactersFormInput.type = 'text'
    charactersFormInput.name = 'char-name'
    const charactersSelectionButtonContainer = document.createElement('div')
    charactersSelectionButtonContainer.id  = 'characters-button-container'
    const warriorButton = document.createElement('button')
    warriorButton.id = 'warrior-select-button'
    warriorButton.className = 'UI-character-select-button'
    warriorButton.classList.add('selected-class')
    const warriorImage = document.createElement('img')
    const huntressButton = document.createElement('button')
    huntressButton.id = 'huntress-select-button'
    huntressButton.className = 'UI-character-select-button'
    const huntressImage = document.createElement('img')
    const wizardButton = document.createElement('button')
    wizardButton.id = 'wizard-select-button'
    wizardButton.className = 'UI-character-select-button'
    const wizardImage = document.createElement('img')
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'characters-select-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const enterDungeonButton = document.createElement('button')
    enterDungeonButton.id = 'enter-dungeon-button'
    enterDungeonButton.className = 'button'
    const backButton = document.createElement('button')
    backButton.id = 'characters-select-back-button'
    backButton.className = 'button'

    title.innerText = 'Select Character'
    enterDungeonButton.innerText = 'Enter Dungeon'
    backButton.innerText = 'Back'
    wizardImage.src = '../images/BoY_wizard_1.png'
    warriorImage.src = '../images/BoY_warrior_1.png'
    huntressImage.src = '../images/BoY_huntress_1.png'
    wizardButton.value = 'Wizard'
    warriorButton.value = 'Warrior'
    huntressButton.value = 'Huntress'
    wizardButton.type = 'button'
    warriorButton.type = 'button'
    huntressButton.type = 'button'
    charactersFormInputLabel.innerText = 'Character Name'

    body.innerHTML = ''
    body.appendChild(charactersSelectionContainerDiv)
    charactersSelectionContainerDiv.appendChild(charactersSelectionTitleDiv)
    charactersSelectionTitleDiv.appendChild(title)
    charactersSelectionContainerDiv.appendChild(charactersForm)
    // charactersSelectionContainerDiv.appendChild(charactersFormInputLabel)
    // charactersSelectionContainerDiv.appendChild(charactersFormInput)
    charactersForm.appendChild(charactersFormInputLabel)
    charactersForm.appendChild(charactersFormInput)
    charactersForm.appendChild(charactersSelectionButtonContainer)
    charactersSelectionButtonContainer.appendChild(warriorButton)
    charactersSelectionButtonContainer.appendChild(huntressButton)
    charactersSelectionButtonContainer.appendChild(wizardButton)
    wizardButton.appendChild(wizardImage)
    warriorButton.appendChild(warriorImage)
    huntressButton.appendChild(huntressImage)

    charactersSelectionContainerDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(enterDungeonButton)
    buttonNavDiv.appendChild(backButton)

    const classButtonsArray = [warriorButton, huntressButton, wizardButton]
    let selectedClass = warriorButton.value

    classButtonsArray.forEach(button => {
        button.addEventListener('click', () => {
            // remove .selected class from previoiusly selected button
            classButtonsArray.forEach(btn=> {
                btn.classList.remove('selected-class')
            })
            // add .selected class to clicked button
            button.classList.add('selected-class')
            // pass button value to selectedClass variable to use in localStorage to set the class of the char for the game
            selectedClass = button.value
            return selectedClass
        })
    })

    // ***** Add character name and character class selection to local storage!!
    enterDungeonButton.addEventListener('click', () => {
        let charName = charactersFormInput.value
        localStorage.setItem('charName', charName)
        localStorage.setItem('charClass', selectedClass)
        initializeGame()
    })
    backButton.addEventListener('click', splashScreen)
}

const instructionsScreen = () => {
    const instructionsContainerDiv = document.createElement('div')
    instructionsContainerDiv.id = 'instructions-container'
    instructionsContainerDiv.className = 'UI-base-container'
    const instructionsTitleDiv = document.createElement('div')
    instructionsTitleDiv.id = 'instructions-title-container'
    instructionsTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    const instructionsTextDiv = document.createElement('div')
    instructionsTextDiv.id = 'instructions-text-container'
    instructionsTextDiv.className = 'UI-text-container'
    const instructionsText = document.createElement('p')
    instructionsText.id = 'instructions-text'
    instructionsText.className = 'UI-text'
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'instructions-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const backButton = document.createElement('button')
    backButton.id = 'instructions-back-button'
    backButton.className = 'button'

    title.innerText = 'Instructions'
    backButton.innerText = 'Back'

    body.innerHTML = ''
    body.appendChild(instructionsContainerDiv)
    instructionsContainerDiv.appendChild(instructionsTitleDiv)
    instructionsTitleDiv.appendChild(title)
    instructionsContainerDiv.appendChild(instructionsTextDiv)
    instructionsTextDiv.appendChild(instructionsText)
    instructionsContainerDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(backButton)

    backButton.addEventListener('click', splashScreen)
}

const aboutScreen = () => {
    const aboutContainerDiv = document.createElement('div')
    aboutContainerDiv.id = 'about-container'
    aboutContainerDiv.className = 'UI-base-container'
    const aboutTitleDiv = document.createElement('div')
    aboutTitleDiv.id = 'about-title-container'
    aboutTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    const aboutTextDiv = document.createElement('div')
    aboutTextDiv.id = 'about-text-container'
    aboutTextDiv.className = 'UI-text-container'
    const aboutText = document.createElement('p')
    aboutText.id = 'about-text'
    aboutText.className = 'UI-text'
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'instructions-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const backButton = document.createElement('button')
    backButton.id = 'instructions-back-button'
    backButton.className = 'button'

    title.innerText = 'About'
    backButton.innerText = 'Back'

    body.innerHTML = ''
    body.appendChild(aboutContainerDiv)
    aboutContainerDiv.appendChild(aboutTitleDiv)
    aboutTitleDiv.appendChild(title)
    aboutContainerDiv.appendChild(aboutTextDiv)
    aboutTextDiv.appendChild(aboutText)
    aboutContainerDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(backButton)

    backButton.addEventListener('click', splashScreen)
}

const splashScreen = () => {
    const startSplashDiv = document.createElement('div')
    startSplashDiv.id = 'start-splash'
    startSplashDiv.className = 'UI-base-container'
    const mainTitleDiv = document.createElement('div')
    mainTitleDiv.id = 'main-title-container'
    mainTitleDiv.className = 'UI-title-container'
    const title = document.createElement('h1')
    const buttonNavDiv = document.createElement('div')
    buttonNavDiv.id = 'splash-button-nav-container'
    buttonNavDiv.className = 'UI-button-nav-container'
    const instructionsButton = document.createElement('button')
    instructionsButton.id = 'instructions-button'
    instructionsButton.className = 'button'
    const aboutButton = document.createElement('button')
    aboutButton.id = 'about-button'
    aboutButton.className = 'button'
    const startGameButton = document.createElement('button')
    startGameButton.id = 'start-game-button'
    startGameButton.className = 'button'

    title.innerText = 'The Dungeon of Yendor'
    instructionsButton.innerText = 'Instructions'
    aboutButton.innerText = 'About'
    startGameButton.innerText = 'Start Game'

    body.innerHTML = ''
    body.appendChild(startSplashDiv)
    startSplashDiv.appendChild(mainTitleDiv)
    mainTitleDiv.appendChild(title)
    startSplashDiv.appendChild(buttonNavDiv)
    buttonNavDiv.appendChild(instructionsButton)
    buttonNavDiv.appendChild(aboutButton)
    buttonNavDiv.appendChild(startGameButton)
    
    instructionsButton.addEventListener('click', instructionsScreen)
    aboutButton.addEventListener('click', aboutScreen)
    startGameButton.addEventListener('click', characterSelectionScreen)
}

document.addEventListener('DOMContentLoaded', splashScreen)


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
// ?) enemy keep moving around towrds pc even if collision detected ???
// *) figure out how to deal damage to specific enemy being targetted <<<-----
// *) enemy needs to attack @ 1 range
// *) start filling out the ui
// 1) style the UI elements -- in progress
// 2) Add character name and character class selcetion to local storage to be used in-game
// 3) give the charcter a weapon. have the enemies drop weapons on defeat
// 4) refactor the friggin move functions - should be able to do it with ONE function

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