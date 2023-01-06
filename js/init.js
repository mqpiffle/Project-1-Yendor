const initializeGame = () => {
    baseUI = new GameUI()
    baseUI.init()
    // hmmm...now the game can't figure out canvas? because it doesn't exist
    const floorOne = new GameWorld()
    floorOne.mapDraw()

    playerCharacter = new PlayerCharacter(`pc0`, 0, floorOne.pcSpawnCoordinates())
    playerCharacter.render()

    actorList.push(playerCharacter)
    floorOne.enemySpawn(5)
}