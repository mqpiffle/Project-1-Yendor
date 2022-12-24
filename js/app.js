const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('message')

const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.width = 900
game.height = 900

const checkerboard = (horiz, vert) => {
    if (horiz % 2 === 0) {
        return `hsl(0 0% ${40 + (vert % 2) * 5}%`
    } else {
        return `hsl(0 0% ${45 - (vert % 2) * 5}%`
    }
}
//make a map grid

const mapDraw = () => {
    for (let i = 0; i < game.width / 25; i++) {
        for (let j = 0; j < game.height / 25; j++) {
            ctx.fillStyle = checkerboard(i, j)
            ctx.fillRect(i * 25, j * 25, 25, 25)
        }
    }
}

mapDraw()

// create character sprite and spawn

class MobileObject {
    constructor (xPos, yPos, health, energy, color) {
    this.xPos = xPos
    this.yPos = yPos
    this.health = health
    this.energy = energy
    this.color = color
    this.alive = true
    this.render = function () {
        ctx.beginPath()
        ctx.arc(12.5, 12.5, 11, 0, 2.0 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    }
}

const playerCharacter = new MobileObject(0, 0, 100, 100,'limegreen')
playerCharacter.render()