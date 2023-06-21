// *********** UI STUFF ***********

const body = document.getElementById("body");

// I need to do something to create stateful bits of the UI
// ie: hp/energy/xp bars, turn counter, and message log that update every turn
// maybe using a class for game UI will work??

class GameUI {
  constructor(characterClass) {
    this.characterClass = characterClass;
    this.pc = actorList[0];
    this.turn = 0;
    this.turnDisplay = null;
    this.message = "";
  }
  // Build UI
  topBar = function () {
    console.log(`turn counter ${this.turn}`);
    const gameTop = document.createElement("div");
    gameTop.id = "game-top-ui";
    gameTop.className = "UI-game-element";
    const gameTopCharInfoContainer = document.createElement("div");
    gameTopCharInfoContainer.id = "game-top-char-info-container";
    gameTopCharInfoContainer.className = "UI-game-element";
    const gameTopCharName = document.createElement("div");
    gameTopCharName.id = "game-top-char-name";
    gameTopCharName.className = "UI-game-sub-element";
    const gameTopCharNameLabel = document.createElement("p");
    gameTopCharNameLabel.id = "game-top-char-name-label";
    gameTopCharNameLabel.className = "UI-game-display-label";
    gameTopCharNameLabel.innerText = "Name:";
    const gameTopCharNameText = document.createElement("h2");
    gameTopCharNameText.id = "game-top-char-name-text";
    gameTopCharNameText.className = "UI-game-display-text";
    gameTopCharNameText.innerText = localStorage.getItem("charName");
    const gameTopCharClass = document.createElement("div");
    gameTopCharClass.id = "game-top-char-class";
    gameTopCharClass.className = "UI-game-sub-element";
    const gameTopCharClassLabel = document.createElement("p");
    gameTopCharClassLabel.id = "game-top-char-class-label";
    gameTopCharClassLabel.className = "UI-game-display-label";
    gameTopCharClassLabel.innerText = "Class:";
    const gameTopCharClassText = document.createElement("h2");
    gameTopCharClassText.id = "game-top-char-class-text";
    gameTopCharClassText.className = "UI-game-display-text";
    gameTopCharClassText.innerText = localStorage.getItem("charClass");
    const gameTopCharLevel = document.createElement("div");
    gameTopCharLevel.id = "game-top-char-level";
    gameTopCharLevel.className = "UI-game-sub-element";
    const gameTopCharLevelLabel = document.createElement("p");
    gameTopCharLevelLabel.id = "game-top-char-level-label";
    gameTopCharLevelLabel.className = "UI-game-display-label";
    gameTopCharLevelLabel.innerText = "Level:";
    const gameTopCharLevelText = document.createElement("h2");
    gameTopCharLevelText.id = "game-top-char-level-text";
    gameTopCharLevelText.className = "UI-game-display-text";
    gameTopCharLevelText.innerText = "1";
    const gameTopTrackBarsContainer = document.createElement("div");
    gameTopTrackBarsContainer.id = "game-top-track-bars-container";
    gameTopTrackBarsContainer.className = "UI-game-element";
    const gameHealthBar = document.createElement("div");
    gameHealthBar.id = "game-top-health-bar";
    gameHealthBar.className = "UI-game-track-bar";
    const gameHealthRemainingBar = document.createElement("div");
    gameHealthRemainingBar.id = "game-top-health-remaining-bar";
    gameHealthRemainingBar.className = "UI-game-track-level-bar";
    const gameEnergyBar = document.createElement("div");
    gameEnergyBar.id = "game-top-energy-bar";
    gameEnergyBar.className = "UI-game-track-bar";
    const gameEnergyRemainingBar = document.createElement("div");
    gameEnergyRemainingBar.id = "game-top-energy-remaining-bar";
    gameEnergyRemainingBar.className = "UI-game-track-level-bar";
    const gameXpBar = document.createElement("div");
    gameXpBar.id = "game-top-xp-bar";
    gameXpBar.className = "UI-game-track-bar";
    const gameXpToNextLevelBar = document.createElement("div");
    gameXpToNextLevelBar.id = "game-top-xp-to-next-level-bar";
    gameXpToNextLevelBar.className = "UI-game-track-level-bar";
    const gameTopAltInfoContainer = document.createElement("div");
    gameTopAltInfoContainer.id = "game-top-alt-info-container";
    gameTopAltInfoContainer.className = "UI-game-element";
    const gameTopTurnCounter = document.createElement("div");
    gameTopTurnCounter.className = "UI-game-sub-element";
    const gameTopTurnCounterLabel = document.createElement("p");
    gameTopTurnCounterLabel.id = "game-top-turn-counter-label";
    gameTopTurnCounterLabel.className = "UI-game-display-label";
    gameTopTurnCounterLabel.innerText = "Turn:";
    const gameTopTurnCounterText = document.createElement("h2");
    gameTopTurnCounterText.id = "game-top-turn-counter-text";
    gameTopTurnCounterText.className = "UI-game-display-text";
    gameTopTurnCounterText.textContent = `${this.turn}`;

    const gameCurrentWeapon = document.createElement("div");
    gameCurrentWeapon.id = "game-current-weapon";
    // gameCurrentWeapon.className = 'UI-game-sub-element'
    const gameCurrentWeaponTextContainer = document.createElement("div");
    gameCurrentWeaponTextContainer.id = "game-current-weapon-text-container";
    // gameCurrentWeaponTextContainer.className = 'UI-game-sub-element'
    const gameCurrentWeaponLabel = document.createElement("p");
    gameCurrentWeaponLabel.id = "game-current-weapon-label";
    gameCurrentWeaponLabel.className = "UI-game-display-label";
    gameCurrentWeaponLabel.innerText = "Current Weapon:";
    const gameCurrentWeaponText = document.createElement("h3");
    gameCurrentWeaponText.id = "game-current-weapon-text";
    gameCurrentWeaponText.className = "UI-game-display-text-smol";
    gameCurrentWeaponText.innerText = `${this.characterClass.weapon.displayTitle}`;
    const gameCurrentWeaponImage = document.createElement("img");
    gameCurrentWeaponImage.id = "game-current-weapon-image";
    gameCurrentWeaponImage.src = "../images/sword_and_shield_rusty_1.png";
    gameCurrentWeaponImage.height = "32";
    gameCurrentWeaponImage.width = "32";

    gameTop.innerHTML = "";
    gameTop.appendChild(gameTopCharInfoContainer);
    gameTopCharInfoContainer.appendChild(gameTopCharName);
    gameTopCharName.appendChild(gameTopCharNameLabel);
    gameTopCharName.appendChild(gameTopCharNameText);
    gameTopCharInfoContainer.appendChild(gameTopCharClass);
    gameTopCharClass.appendChild(gameTopCharClassLabel);
    gameTopCharClass.appendChild(gameTopCharClassText);
    gameTopCharInfoContainer.appendChild(gameTopCharLevel);
    gameTopCharLevel.appendChild(gameTopCharLevelLabel);
    gameTopCharLevel.appendChild(gameTopCharLevelText);
    gameTop.appendChild(gameTopTrackBarsContainer);
    gameTopTrackBarsContainer.appendChild(gameHealthBar);
    gameHealthBar.appendChild(gameHealthRemainingBar);
    gameTopTrackBarsContainer.appendChild(gameEnergyBar);
    gameEnergyBar.appendChild(gameEnergyRemainingBar);
    gameTopTrackBarsContainer.appendChild(gameXpBar);
    gameXpBar.appendChild(gameXpToNextLevelBar);
    gameTop.appendChild(gameTopAltInfoContainer);
    gameTopAltInfoContainer.appendChild(gameTopTurnCounter);
    gameTopTurnCounter.appendChild(gameTopTurnCounterLabel);
    gameTopTurnCounter.appendChild(gameTopTurnCounterText);

    gameTopAltInfoContainer.appendChild(gameCurrentWeapon);
    gameCurrentWeapon.appendChild(gameCurrentWeaponTextContainer);
    gameCurrentWeaponTextContainer.appendChild(gameCurrentWeaponLabel);
    gameCurrentWeaponTextContainer.appendChild(gameCurrentWeaponText);
    gameCurrentWeapon.appendChild(gameCurrentWeaponImage);

    this.turnDisplay = gameTopTurnCounterText;

    return gameTop;
  };

  bottomBar = function () {
    const gameBottom = document.createElement("div");
    gameBottom.id = "game-bottom-ui";
    gameBottom.className = "UI-game-element";
    // BOTTOM game info element (character skills/actions, output log)
    const gameBottomSkillsContainer = document.createElement("div");
    gameBottomSkillsContainer.id = "game-bottom-skills-container";
    gameBottomSkillsContainer.className = "UI-game-element";
    // skills need to be displayed based on the weapon picked up
    // ie playerCharacter.weapon.skills[0]
    const gameSkillContainer1 = document.createElement("div");
    gameSkillContainer1.id = "game-skill-container-1";
    gameSkillContainer1.className = "UI-game-sub-element";
    gameSkillContainer1.classList.add("skill-container");
    const gameSkillText1 = document.createElement("p");
    gameSkillText1.className = "game-skill-text";
    gameSkillText1.innerText = `${this.characterClass.weapon.skills[0].name}`;
    const gameSkillImage1 = document.createElement("img");
    gameSkillImage1.src = `${this.characterClass.weapon.skills[0].icon}`;
    gameSkillImage1.width = "64";
    gameSkillImage1.height = "64";
    const gameSkillContainer2 = document.createElement("div");
    gameSkillContainer2.id = "game-skill-container-2";
    gameSkillContainer2.className = "UI-game-sub-element";
    gameSkillContainer2.classList.add("skill-container");
    const gameSkillText2 = document.createElement("p");
    gameSkillText2.className = "game-skill-text";
    gameSkillText2.innerText = `${this.characterClass.weapon.skills[1].name}`;
    const gameSkillImage2 = document.createElement("img");
    gameSkillImage2.src = `${this.characterClass.weapon.skills[1].icon}`;
    gameSkillImage2.width = "64";
    gameSkillImage2.height = "64";
    const gameSkillContainer3 = document.createElement("div");
    gameSkillContainer3.id = "game-skill-container-3";
    gameSkillContainer3.className = "UI-game-sub-element";
    gameSkillContainer3.classList.add("skill-container");
    const gameSkillText3 = document.createElement("p");
    gameSkillText3.className = "game-skill-text";
    gameSkillText3.innerText = `${this.characterClass.weapon.skills[2].name}`;
    const gameSkillImage3 = document.createElement("img");
    gameSkillImage3.src = `${this.characterClass.weapon.skills[2].icon}`;
    gameSkillImage3.width = "64";
    gameSkillImage3.height = "64";

    const gameBottomOutputLog = document.createElement("div");
    gameBottomOutputLog.id = "game-bottom-output-log";

    gameBottom.innerHTML = "";
    gameBottom.appendChild(gameBottomSkillsContainer);

    gameBottomSkillsContainer.appendChild(gameSkillContainer1);
    gameSkillContainer1.appendChild(gameSkillText1);
    gameSkillContainer1.appendChild(gameSkillImage1);
    gameBottomSkillsContainer.appendChild(gameSkillContainer2);
    gameSkillContainer2.appendChild(gameSkillText2);
    gameSkillContainer2.appendChild(gameSkillImage2);
    gameBottomSkillsContainer.appendChild(gameSkillContainer3);
    gameSkillContainer3.appendChild(gameSkillText3);
    gameSkillContainer3.appendChild(gameSkillImage3);

    gameBottom.appendChild(gameBottomOutputLog);

    return gameBottom;
  };

  update = function (curHlth, maxHlth, curXP, thresholdXP) {
    this.turn++;
    this.turnDisplay.textContent = `${this.turn}`;

    // console.log(curHlth / maxHlth)

    // health bar update
    const healthBar = document.getElementById("game-top-health-remaining-bar");
    const xpBar = document.getElementById("game-top-xp-to-next-level-bar");
    let remainingHealth = (curHlth / maxHlth) * 100;
    let xpIndicator = (curXP / thresholdXP) * 100;
    if (remainingHealth < 0) {
      healthBar.style.width = `0%`;
    } else if (remainingHealth > 100) {
      healthBar.style.width = `100%`;
    } else {
      healthBar.style.width = `${remainingHealth}%`;
    }
    if (xpIndicator < 0) {
      xpBar.style.width = `0%`;
    } else if (xpIndicator > 100) {
      xpBar.style.width = `100%`;
    } else {
      xpBar.style.width = `${xpIndicator}%`;
    }
    // this.topBar()
  };

  init = function () {
    const gameContainer = document.createElement("div");
    gameContainer.id = "game-container";
    // TOP game info element (character info, hp/energy/xp bars)

    // CANVAS - where the magic happens
    const canvasContainer = document.createElement("div");
    canvasContainer.id = "canvas-container";
    const gameCanvas = document.createElement("canvas");
    gameCanvas.id = "primary-canvas";
    gameCanvas.width = "960";
    gameCanvas.height = "960";
    const gameCanvas2 = document.createElement("canvas");
    gameCanvas2.id = "secondary-canvas";
    gameCanvas2.width = "960";
    gameCanvas2.height = "960";

    // need code in here to dynamically initialize the ui based on character

    body.innerHTML = "";
    body.appendChild(gameContainer);
    gameContainer.appendChild(this.topBar());
    gameContainer.appendChild(canvasContainer);
    canvasContainer.appendChild(gameCanvas);
    canvasContainer.appendChild(gameCanvas2);
    gameContainer.appendChild(this.bottomBar());
  };
}

// const turnPosCounters = (text) => {
//     turn++

//     const gameTopTurnCounter = document.createElement('div')
//     gameTopTurnCounter.id = 'game-top-turn-counter'
//     gameTopTurnCounter.className = 'UI-game-sub-element'
//     const gameTopTurnCounterLabel = document.createElement('p')
//     gameTopTurnCounterLabel.id = 'game-top-turn-counter-label'
//     gameTopTurnCounterLabel.className = 'UI-game-display-label'
//     gameTopTurnCounterLabel.innerText = 'Turn:'
//     const gameTopTurnCounterText = document.createElement('h2')
//     gameTopTurnCounterText.id = 'game-top-turn-counter-text'
//     gameTopTurnCounterText.className = 'UI-game-display-text'

//     gameTopTurnCounter.innerHTML = text

//     setTimeout(() => {
//         gameTopTurnCounter.appendChild(gameTopTurnCounterLabel)
//         gameTopTurnCounterText.textContent = `${turn}`
//         gameTopTurnCounter.appendChild(gameTopTurnCounterText)
//         console.log(`counter updated... ${gameTopTurnCounterText.textContent}`)
//     }, 200)
//     return gameTopTurnCounter
// }

const characterSelectionScreen = () => {
  const charactersSelectionContainerDiv = document.createElement("div");
  charactersSelectionContainerDiv.id = "characters-selection-container";
  charactersSelectionContainerDiv.className = "UI-base-container";
  const charactersSelectionTitleDiv = document.createElement("div");
  charactersSelectionTitleDiv.id = "characters-selection-title-container";
  charactersSelectionTitleDiv.className = "UI-title-container";
  const title = document.createElement("h1");
  // *** insert character name form here ???
  const charactersForm = document.createElement("form");
  // this should probably be a selection form
  charactersForm.id = "characters-form-container";
  charactersForm.className = "UI-button-nav-container";
  const charactersFormInputLabel = document.createElement("label");
  charactersFormInputLabel.for = "char-name";
  charactersFormInputLabel.id = "char-name-label";
  const charactersFormInput = document.createElement("input");
  charactersFormInput.id = "char-name";
  charactersFormInput.type = "text";
  charactersFormInput.name = "char-name";
  charactersFormInput.maxLength = "9";
  const charactersSelectionButtonContainer = document.createElement("div");
  charactersSelectionButtonContainer.id = "characters-button-container";
  const warriorButton = document.createElement("button");
  warriorButton.id = "warrior-select-button";
  warriorButton.className = "UI-character-select-button";
  warriorButton.classList.add("selected-class");
  const warriorImage = document.createElement("img");
  const huntressButton = document.createElement("button");
  huntressButton.id = "huntress-select-button";
  huntressButton.className = "UI-character-select-button";
  const huntressImage = document.createElement("img");
  const wizardButton = document.createElement("button");
  wizardButton.id = "wizard-select-button";
  wizardButton.className = "UI-character-select-button";
  const wizardImage = document.createElement("img");
  const buttonNavDiv = document.createElement("div");
  buttonNavDiv.id = "characters-select-button-nav-container";
  buttonNavDiv.className = "UI-button-nav-container";
  const enterDungeonButton = document.createElement("button");
  enterDungeonButton.id = "enter-dungeon-button";
  enterDungeonButton.className = "button";
  const backButton = document.createElement("button");
  backButton.id = "characters-select-back-button";
  backButton.className = "button";

  title.innerText = "Select Character";
  enterDungeonButton.innerText = "Enter Dungeon";
  backButton.innerText = "Back";
  wizardImage.src = "images/DoY_wizard_1.png";
  warriorImage.src = "images/DoY_warrior_1.png";
  huntressImage.src = "images/DoY_huntress_1.png";
  wizardButton.value = "Wizard";
  warriorButton.value = "Warrior";
  huntressButton.value = "Huntress";
  wizardButton.type = "button";
  warriorButton.type = "button";
  huntressButton.type = "button";
  charactersFormInputLabel.innerText = "Character Name";

  body.innerHTML = "";
  body.appendChild(charactersSelectionContainerDiv);
  charactersSelectionContainerDiv.appendChild(charactersSelectionTitleDiv);
  charactersSelectionTitleDiv.appendChild(title);
  charactersSelectionContainerDiv.appendChild(charactersForm);
  // charactersSelectionContainerDiv.appendChild(charactersFormInputLabel)
  // charactersSelectionContainerDiv.appendChild(charactersFormInput)
  charactersForm.appendChild(charactersFormInputLabel);
  charactersForm.appendChild(charactersFormInput);
  charactersForm.appendChild(charactersSelectionButtonContainer);
  charactersSelectionButtonContainer.appendChild(warriorButton);
  charactersSelectionButtonContainer.appendChild(huntressButton);
  charactersSelectionButtonContainer.appendChild(wizardButton);
  wizardButton.appendChild(wizardImage);
  warriorButton.appendChild(warriorImage);
  huntressButton.appendChild(huntressImage);

  charactersSelectionContainerDiv.appendChild(buttonNavDiv);
  buttonNavDiv.appendChild(enterDungeonButton);
  buttonNavDiv.appendChild(backButton);

  const classButtonsArray = [warriorButton, huntressButton, wizardButton];
  let selectedClass = warriorButton.value;

  classButtonsArray.forEach((button) => {
    button.addEventListener("click", () => {
      // remove .selected class from previoiusly selected button
      classButtonsArray.forEach((btn) => {
        btn.classList.remove("selected-class");
      });
      // add .selected class to clicked button
      button.classList.add("selected-class");
      // pass button value to selectedClass variable to use in localStorage to set the class of the char for the game
      selectedClass = button.value;
      return selectedClass;
    });
  });

  // ***** Add character name and character class selection to local storage!!
  enterDungeonButton.addEventListener("click", () => {
    let charName = charactersFormInput.value;
    localStorage.setItem("charName", charName);
    localStorage.setItem("charClass", selectedClass);
    initializeGame();
  });
  backButton.addEventListener("click", splashScreen);
};

const instructionsScreen = () => {
  const instructionsContainerDiv = document.createElement("div");
  instructionsContainerDiv.id = "instructions-container";
  instructionsContainerDiv.className = "UI-base-container";
  const instructionsTitleDiv = document.createElement("div");
  instructionsTitleDiv.id = "instructions-title-container";
  instructionsTitleDiv.className = "UI-title-container";
  const title = document.createElement("h1");
  title.innerText = "Instructions";
  const instructionsTextDiv = document.createElement("div");
  instructionsTextDiv.id = "instructions-text-container";
  instructionsTextDiv.className = "UI-text-container";
  const instructionsText = document.createElement("p");
  instructionsText.id = "instructions-text";
  instructionsText.className = "UI-text";
  instructionsText.innerText =
    "It is your goal to retrieve the Bauble of Yendor from the not-so-depths of the vile dungeon.  To do so you must destroy Zyxthbuul and his minions. Move by using the NumPad (diagonal moves allowed.)  Skills may be used by pressing numbers [1], [2], or [3] on the keyboard, followed by [t] to select your target then [Enter] to complete the skill or [Esc] to back out and continue your turn.  You start with one healing potion, [p], which will heal up 50 health. Fight until either you are defeated, or you have successfully obtained the Bauble.  Good Luck!";
  const buttonNavDiv = document.createElement("div");
  buttonNavDiv.id = "instructions-button-nav-container";
  buttonNavDiv.className = "UI-button-nav-container";
  const backButton = document.createElement("button");
  backButton.id = "instructions-back-button";
  backButton.className = "button";
  backButton.innerText = "Back";

  body.innerHTML = "";
  body.appendChild(instructionsContainerDiv);
  instructionsContainerDiv.appendChild(instructionsTitleDiv);
  instructionsTitleDiv.appendChild(title);
  instructionsContainerDiv.appendChild(instructionsTextDiv);
  instructionsTextDiv.appendChild(instructionsText);
  instructionsContainerDiv.appendChild(buttonNavDiv);
  buttonNavDiv.appendChild(backButton);

  backButton.addEventListener("click", splashScreen);
};

const aboutScreen = () => {
  const aboutContainerDiv = document.createElement("div");
  aboutContainerDiv.id = "about-container";
  aboutContainerDiv.className = "UI-base-container";
  const aboutTitleDiv = document.createElement("div");
  aboutTitleDiv.id = "about-title-container";
  aboutTitleDiv.className = "UI-title-container";
  const title = document.createElement("h1");
  title.innerText = "About";
  const aboutTextDiv = document.createElement("div");
  aboutTextDiv.id = "about-text-container";
  aboutTextDiv.className = "UI-text-container";
  const aboutText = document.createElement("p");
  aboutText.id = "about-text";
  aboutText.className = "UI-text";
  aboutText.innerText =
    "Dungeon of YENDOR draws inspiration from two of my favorite game genres: rougelikes and hack-and-slash ARPGs.  In essence, it's your character's quest to find the Bauble of Yendor, a very ancient magical artifact, which has been heisted by the powerful necromancer Zyxthbuul. The character will delve into a not-so-deep dungeon (3 floors) in hopes of retrieving the Bauble, happily slaying monsters and collecting loot (of course) along the way.  But beware!  Death is most final, and will only lead to starting over until the Bauble is retrieved and returned to the Lords of YENDOR.";
  const buttonNavDiv = document.createElement("div");
  buttonNavDiv.id = "instructions-button-nav-container";
  buttonNavDiv.className = "UI-button-nav-container";
  const backButton = document.createElement("button");
  backButton.id = "instructions-back-button";
  backButton.className = "button";
  backButton.innerText = "Back";

  body.innerHTML = "";
  body.appendChild(aboutContainerDiv);
  aboutContainerDiv.appendChild(aboutTitleDiv);
  aboutTitleDiv.appendChild(title);
  aboutContainerDiv.appendChild(aboutTextDiv);
  aboutTextDiv.appendChild(aboutText);
  aboutContainerDiv.appendChild(buttonNavDiv);
  buttonNavDiv.appendChild(backButton);

  backButton.addEventListener("click", splashScreen);
};

const splashScreen = () => {
  actorList = [];
  playerCharacter = null;
  localStorage.clear();

  const startSplashDiv = document.createElement("div");
  startSplashDiv.id = "start-splash";
  startSplashDiv.className = "UI-base-container";
  const mainTitleDiv = document.createElement("div");
  mainTitleDiv.id = "main-title-container";
  mainTitleDiv.className = "UI-title-container";
  const title = document.createElement("h1");
  const buttonNavDiv = document.createElement("div");
  buttonNavDiv.id = "splash-button-nav-container";
  buttonNavDiv.className = "UI-button-nav-container";
  const instructionsButton = document.createElement("button");
  instructionsButton.id = "instructions-button";
  instructionsButton.className = "button";
  const aboutButton = document.createElement("button");
  aboutButton.id = "about-button";
  aboutButton.className = "button";
  const startGameButton = document.createElement("button");
  startGameButton.id = "start-game-button";
  startGameButton.className = "button";

  title.innerText = "The Dungeon of Yendor";
  instructionsButton.innerText = "Instructions";
  aboutButton.innerText = "About";
  startGameButton.innerText = "Start Game";

  body.innerHTML = "";
  body.appendChild(startSplashDiv);
  startSplashDiv.appendChild(mainTitleDiv);
  mainTitleDiv.appendChild(title);
  startSplashDiv.appendChild(buttonNavDiv);
  buttonNavDiv.appendChild(instructionsButton);
  buttonNavDiv.appendChild(aboutButton);
  buttonNavDiv.appendChild(startGameButton);

  instructionsButton.addEventListener("click", instructionsScreen);
  aboutButton.addEventListener("click", aboutScreen);
  startGameButton.addEventListener("click", characterSelectionScreen);
};

const winScreen = () => {
  const winScreenContainerDiv = document.createElement("div");
  winScreenContainerDiv.id = "win-screen-container";
  winScreenContainerDiv.className = "UI-base-container";
  const winScreenTitleDiv = document.createElement("div");
  winScreenTitleDiv.id = "win-screen-title-container";
  winScreenTitleDiv.className = "UI-title-container";
  const title = document.createElement("h1");
  title.innerText = "SUCCESS!!!";
  const winScreenTextDiv = document.createElement("div");
  winScreenTextDiv.id = "win-screen-text-container";
  winScreenTextDiv.className = "UI-text-container";
  const winScreenText = document.createElement("p");
  winScreenText.id = "about-text";
  winScreenText.className = "UI-text";
  winScreenText.innerText =
    "You have retrieved the Bauble of YENDOR!! Now return the Bauble to its rightful owners, the Lords of YENDOR!!";
  const buttonNavDiv = document.createElement("div");
  buttonNavDiv.id = "instructions-button-nav-container";
  buttonNavDiv.className = "UI-button-nav-container";
  const backButton = document.createElement("button");
  backButton.id = "instructions-back-button";
  backButton.className = "button";
  backButton.innerText = "I kinda want to keep it...";

  body.innerHTML = "";
  body.appendChild(winScreenContainerDiv);
  winScreenContainerDiv.appendChild(winScreenTitleDiv);
  winScreenTitleDiv.appendChild(title);
  winScreenContainerDiv.appendChild(winScreenTextDiv);
  winScreenTextDiv.appendChild(winScreenText);
  winScreenContainerDiv.appendChild(buttonNavDiv);
  buttonNavDiv.appendChild(backButton);

  backButton.addEventListener("click", splashScreen);
};

const loseScreen = () => {
  const loseScreenContainerDiv = document.createElement("div");
  loseScreenContainerDiv.id = "lose-screen-container";
  loseScreenContainerDiv.className = "UI-base-container";
  const loseScreenTitleDiv = document.createElement("div");
  loseScreenTitleDiv.id = "lose-screen-title-container";
  loseScreenTitleDiv.className = "UI-title-container";
  const title = document.createElement("h1");
  title.innerText = "You have been DEFEATED!";
  const loseScreenTextDiv = document.createElement("div");
  loseScreenTextDiv.id = "lose-screen-text-container";
  loseScreenTextDiv.className = "UI-text-container";
  const loseScreenText = document.createElement("p");
  loseScreenText.id = "lose-screen-text";
  loseScreenText.className = "UI-text";
  loseScreenText.innerText =
    "The dark forces of Zyxthbuul were clearly more than you could handle. Your soul will now be used to strengthen his eldritch horde!";
  const buttonNavDiv = document.createElement("div");
  buttonNavDiv.id = "instructions-button-nav-container";
  buttonNavDiv.className = "UI-button-nav-container";
  const backButton = document.createElement("button");
  backButton.id = "instructions-back-button";
  backButton.className = "button";
  backButton.innerText = "Get me outta here...";

  body.innerHTML = "";
  body.appendChild(loseScreenContainerDiv);
  loseScreenContainerDiv.appendChild(loseScreenTitleDiv);
  loseScreenTitleDiv.appendChild(title);
  loseScreenContainerDiv.appendChild(loseScreenTextDiv);
  loseScreenTextDiv.appendChild(loseScreenText);
  loseScreenContainerDiv.appendChild(buttonNavDiv);
  buttonNavDiv.appendChild(backButton);

  backButton.addEventListener("click", splashScreen);
};
// these function
