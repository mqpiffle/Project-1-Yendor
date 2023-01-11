class EnemyCharacter {
    constructor(uid, actorListArrayPos, gridPos) {
        this.canvas = gameWorld.canvas
        this.ctx = gameWorld.ctx
        this.width = gameWorld.width
        this.height = gameWorld.height

        this.uid = uid
        this.characterType = 'ENEMY'
        this.enemyType = 'GOBLIN'
        this.xpValue = 25
        this.actorListArrayPos = actorListArrayPos
        this.gridPos = gridPos
        this.xPos = this.gridPos[0]
        this.yPos = this.gridPos[1]
        this.gridX = this.xPos / gridSize + tileCenter
        this.gridY = this.yPos / gridSize + tileCenter
        this.alive = true
        this.maxHealth = 120
        this.currentHealth = 120
        this.maxEnergy = 100
        this.currentEnergy = 100
        this.physAttack = 10
        this.magAttack = 0
        this.attackType = ''
        this.physResist = 0
        this.magResist = 0
    }
    render = function (displayColor) {
        this.ctx.font = '24px sans-serif'
        // ctx.textBaseLine = 'middle'this.ctx = GameWorld.ctx
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = displayColor
        this.ctx.fillText(`${this.actorListArrayPos}`, this.xPos, this.yPos + 8)
    }
    // attackHandler = function() {
    //     //we're just going with melee and physAttack for now

    // }
    attack = function(target)  {
        let defenderHealth = target.currentHealth
        const incomingDamage = this.physAttack - (this.physAttack * target.physResist) + this.magAttack - (this.magAttack * target.magResist)
        defenderHealth = defenderHealth - incomingDamage
        console.log(`${this.uid} deals ${incomingDamage} to ${target.uid}`)
        return defenderHealth
    }

    moveUp = function() {
        const targetAt = actorAt(this.xPos, this.yPos - gridSize)
        if (!isCollision(this.xPos, this.yPos - gridSize) && this.yPos > tileCenter) {
            this.yPos -= gridSize
        } else if (isCollision(this.xPos, this.yPos - gridSize) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
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
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
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
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
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
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
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
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
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
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        // console.log('down-left')
        }
    }
    moveLeft = function() {
        const targetAt = actorAt(this.xPos - gridSize, this.yPos)
        if (!isCollision(this.xPos - gridSize, this.yPos) && this.xPos > tileCenter) {
            this.xPos -= gridSize
        } else if (isCollision(this.xPos - gridSize, this.yPos) && this.enemyType === targetAt.characterType) {
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
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
            targetAt.currentHealth= this.attack(targetAt)
            console.log(targetAt.currentHealth)
            if (targetAt.characterType === 'ENEMY' && targetAt.currentHealth<= 0) {
                enemyDefeat(targetAt)
            }
        }
    }

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
            actorList[0].currentHealth = this.attack(actorList[0])
        } else {
            //else move towards the pc
            this.movementHandler()
        }
    }
}