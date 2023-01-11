// *********** GLOBAL STUFF ***********
const gridSize = 48
const tileCenter = gridSize / 2
let actorList = []
let gameWorld
let gameUI
let playerCharacter
let baseUI

// these can probably go in classes? idk


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
    playerCharacter.xp += enemy.xpValue
    enemy.isAlive = false
    enemy.render('transparent')
    actorList.splice(enemy.actorListArrayPos, 1)
}

class GameObject {
    constructor () {
        this.canvas = document.getElementById('primary-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas2 = document.getElementById('secondary-canvas')
        this.ctx2 = this.canvas2.getContext('2d')
        this.width = this.canvas.width
        this.height = this.canvas.height
    }

    checkerboard = function(horiz, vert) {
        if (horiz % 2 === 0) {
            return `hsl(0 0% ${30 + (vert % 2) * 2}%`
        } else {
            return `hsl(0 0% ${32 - (vert % 2) * 2}%`
        }
    }

    mapDraw = function() {
        for (let i = 0; i < this.width / gridSize; i++) {
            for (let j = 0; j < this.height / gridSize; j++) {
                this.ctx.fillStyle = this.checkerboard(i, j)
                this.ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize)
            }
        }
    }
    gameOver = function(result) {
        
        if (result === 'win') {
            winScreen()
            console.log(`You WIN!!`)
        } else if (result === 'lose') {
            loseScreen()
            console.log(`WOMP WOMP!`)
        } else {
            return
        }
    }
}
// class MobileObject extends GameObject {
//     constructor (uid, actorListArrayPos, gridPos, canvas, ctx, width, height) {
//         super(canvas, ctx, width, height)
//         this.uid = uid
//         this.gridPos = gridPos
//         this.actorListArrayPos = actorListArrayPos
//         this.xPos = this.gridPos[0]
//         this.yPos = this.gridPos[1]
//         this.gridX = this.xPos / gridSize + tileCenter
//         this.gridY = this.yPos / gridSize + tileCenter
//         this.characterType = 'MOB'
//         this.alive = true
//         this.maxHealth = 120
//         this.currentHealth = 120
//         this.maxEnergy = 100
//         this.currentEnergy = 100
//         this.physAttack = 10
//         this.magAttack = 0
//         this.attackType = ''
//         this.physResist = 0
//         this.magResist = 0
//         this.potionCharges = 1
//         // this.targUp = [this.xPos, this.yPos - gridSize]
//         // this.boundUp = this.yPos > tileCenter
//         // this.deltaUp = function() {
//         //     console.log(`move up`)
            
//         //     this.yPos -= gridSize
//         //     return this.yPos
//         // }
//     }
    
//     // this deltaUp is causing the issue!!
    

//     // deltaDown = function() {
//     //     return this.yPos += gridSize
//     // }

//     // deltaRight = function() {
//     //     return this.xPos += gridSize
//     // }

//     // deltaLeft = function() {
//     //     return this.xPos -= gridSize
//     // }

//     // ***I feel like these can be refactored into one 'move' function, maybe later***
//     // move = function(targPos, boundCheck, moveDir1, moveDir2) {
//     //     console.log(gridSize)
//     //     console.log(`target position: ${targPos}, boundary check: ${boundCheck}, move direction: ${moveDir1()}`)
//     //     const targetAt = actorAt(targPos[0], targPos[1])
//     //     if (!isCollision(targPos[0], targPos[1]) && boundCheck) {
//     //         moveDir1()
//     //     } else if (isCollision(targPos[0], targPos[1]) && this.enemyType === targetAt.characterType) {
//     //         targetAt.currentHealth= this.attack(targetAt)
//     //         console.log(targetAt.currentHealth)
//     //         if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//     //             enemyDefeat(targetAt)
//     //         }
//     //     }
//     // }
//     usePotion = function() {
//         if (this.maxHealth - this.currentHealth < 50) {
//             this.currentHealth = this.maxHealth
//         } else {
//             this.currentHealth += 50
//         }
//         console.log(`potion used, current health ${this.currentHealth}/${this.maxHealth}`)
//         this.endTurn()
//     }

//     useSkill = function(skillToUse) {
//         // itialize the skill
//         // nonono -- move the targetting logic here, then fire off the skill on [Enter]!!
//         skillToUse.init()
//     }

//     attack = function(target)  {
//         let defenderHealth = target.currentHealth
//         const incomingDamage = this.physAttack - (this.physAttack * target.physResist) + this.magAttack - (this.magAttack * target.magResist)
//         defenderHealth = defenderHealth - incomingDamage
//         console.log(`${this.uid} deals ${incomingDamage} to ${target.uid}`)
//         return defenderHealth
//     }

//     moveUp = function() {
//         const targetAt = actorAt(this.xPos, this.yPos - gridSize)
//         if (!isCollision(this.xPos, this.yPos - gridSize) && this.yPos > tileCenter) {
//             this.yPos -= gridSize
//         } else if (isCollision(this.xPos, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//         // console.log('up')
//     }
//     moveUpRight = function() {
//         const targetAt = actorAt(this.xPos + gridSize, this.yPos - gridSize)
//         if (!isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos < this.width - tileCenter) {
//             this.yPos -= gridSize
//             this.xPos += gridSize
//         } else if (isCollision(this.xPos + gridSize, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//         // console.log('up-right')
//     }
//     moveRight = function() {
//         const targetAt = actorAt(this.xPos + gridSize, this.yPos)
//         if (!isCollision(this.xPos + gridSize, this.yPos) && this.xPos < this.width - tileCenter) {
//             this.xPos += gridSize
//         } else if (isCollision(this.xPos + gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//         // console.log('right')
//     }
//     moveDownRight = function() {
//         const targetAt = actorAt(this.xPos + gridSize, this.yPos + gridSize)
//         if (!isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.yPos < this.height - tileCenter && this.xPos < this.width - tileCenter ) {
//         this.yPos += gridSize
//         this.xPos += gridSize
//         } else if (isCollision(this.xPos + gridSize, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//         // console.log('down-right')
//     }
//     moveDown = function() {
//         const targetAt = actorAt(this.xPos, this.yPos + gridSize)
//         if (!isCollision(this.xPos, this.yPos + gridSize) && this.yPos < this.height - tileCenter) {
//             this.yPos += gridSize
//         } else if (isCollision(this.xPos, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//         // console.log('down')
//     }
//     moveDownLeft = function() {
//         const targetAt = actorAt(this.xPos - gridSize, this.yPos + gridSize)
//         if (!isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.yPos < this.height - tileCenter && this.xPos > tileCenter) {
//             this.yPos += gridSize
//             this.xPos -= gridSize
//         } else if (isCollision(this.xPos - gridSize, this.yPos + gridSize) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         // console.log('down-left')
//         }
//     }
//     moveLeft = function() {
//         const targetAt = actorAt(this.xPos - gridSize, this.yPos)
//         if (!isCollision(this.xPos - gridSize, this.yPos) && this.xPos > tileCenter) {
//             this.xPos -= gridSize
//         } else if (isCollision(this.xPos - gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//         // console.log('left')
//     }
//     moveUpLeft = function() {
//         const targetAt = actorAt(this.xPos - gridSize, this.yPos - gridSize)
//         if (!isCollision(this.xPos - gridSize, this.yPos - gridSize) && this.yPos > tileCenter && this.xPos > tileCenter) {
//             this.yPos -= gridSize
//             this.xPos -= gridSize
//         } else if (isCollision(this.xPos - gridSize, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
//             targetAt.currentHealth= this.attack(targetAt)
//             console.log(targetAt.currentHealth)
//             if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
//                 enemyDefeat(targetAt)
//             }
//         }
//     }
// }

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
        console.log(`pc coordinates ${coordinates}`)
        return coordinates
    }

    enemySpawnCoordinates = () => {
        let coordinateTest = false
        //spawn enemy(s) at least 5 tiles away from pc
        //get player coordinates
        const pcCoordsRaw = actorList[0].gridPos
        //'normalize' player coordinates
        const pcCoords = pcCoordsRaw.map(coord => (coord - tileCenter) / gridSize)
        // console.log(`normailzed pc coordinates ${pcCoords}`)
        //random X and Y, bound by the visible grid
        console.log(`pc coords: ${pcCoords}`)

        let rndX = Math.floor(Math.random() * (this.width / gridSize))
        let rndY = Math.floor(Math.random() * (this.height / gridSize))
        console.log(`initial enemy coords: ${rndX},${rndY}`)
        let coordinates = []
        while (!coordinateTest) {
            let filteredList = actorList.filter(actor => actor.xPos == rndX && actor.yPos === rndY)
            // if the difference between either (X/Y) of pc and enemy is less than 5 OR
            // if the coordinates already exist in the occupied tiles grid
            if ((Math.abs(pcCoords[0] - rndX) < 5 && Math.abs(pcCoords[1] - rndY) < 5) && filteredList) {
                //rerollX
                rndX = Math.floor(Math.random() * (this.width / gridSize))
                rndY = Math.floor(Math.random() * (this.height / gridSize))
                console.log(`re-rolling!: ${rndX},${rndY}`)

            } else {
                // we are good to go!
                coordinateTest = true
            }
        }
        //the re-un-normalized coordinates
        coordinates = [rndX * gridSize + tileCenter, rndY * gridSize + tileCenter]

        // console.log(`enemy coordinates: ${coordinates}`)
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

// since the game is turn-based we can simply use the keypress method and pass that to our movement handler
document.addEventListener('keypress', (e) => {
    playerCharacter.pcActionHandler(e.code)
})




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
// *) style the UI elements -- in progress
// *) Add character name and character class selection to local storage to be used in-game
// 1) connect skills->weapons->character
// 2) give user the ability to choose a skill to use, and execute the skill
// 3) give the charcter a weapon. have the enemies drop weapons on defeat
// 4) refactor the friggin move functions - should be able to do it with ONE function (cries)

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