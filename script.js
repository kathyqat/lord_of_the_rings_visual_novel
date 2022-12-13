// Story objects defined in story.js file and linked in index.htmk making it availiable in this script.js file
const images = [
  ShadowOfThePast.picture,
  PassingOfTheElves.picture,
  TheOldForest.picture,
  FlightToFordBruinen.picture,
];

const scenes = [
  ShadowOfThePast,
  PassingOfTheElves,
  TheOldForest,
  FlightToFordBruinen,
];

let info = ShadowOfThePast;
let selection = info.intro;
let counter = 1;

const div = document.querySelector("div");

if (true) {
  mainPage();
}

function mainPage() {
  div.setAttribute("id", "main");
  div.style.backgroundImage = "none";
  createScenes(4);
  addButtonEvents(".scenes", (e) => navigateToScene(e.target));
  endScreen();
}

function createScenes(number) {
  for (let i = 0; i < number; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", `scene${i}`);
    button.setAttribute("class", "scenes");
    button.setAttribute("type", "button");
    button.textContent = scenes[i].name;
    div.appendChild(button);
  }
}

function addButtonEvents(type, event) {
  const buttons = document.querySelectorAll(`${type}`);
  buttons.forEach((button) => {
    button.addEventListener("click", event);
  });
}

function endScreen() {
  const endButton = document.createElement("button");
  endButton.setAttribute("id", "endButton");
  endButton.textContent = "Finish";
  div.appendChild(endButton);

  endButton.addEventListener("click", () => {
    removeButtons();
    div.setAttribute("id", "endScreen");

    const p1 = document.createElement("p");
    p1.setAttribute("class", "endScreen");
    p1.textContent = "Thank you Professor Randall!";
    div.appendChild(p1);

    const p2 = document.createElement("p");
    p2.setAttribute("class", "endScreen");
    div.appendChild(p2);
  });
}

function navigateToScene(option) {
  div.removeAttribute("id", "main");
  const sceneID = option.getAttribute("id");
  removeButtons();
  backToMain();
  buildscenePage(sceneID);
  skipButton();
}

function removeButtons() {
  const removedButtons = document.querySelectorAll("button");
  removedButtons.forEach((button) => {
    div.removeChild(button);
  });
}

function reset() {
  div.removeChild(backAgainButton);
  const image = document.querySelector("img");
  div.removeChild(image);
  const textDiv = document.querySelector("#text");
  div.removeChild(textDiv);
  const skipButton = document.querySelector("#skipButton");
  div.removeChild(skipButton);
  const optionsDiv = document.querySelector("#options");
  if (optionsDiv) {
    div.removeChild(optionsDiv);
  }
  mainPage();
  counter = 1;
}

function backToMain() {
  const backAgainButton = document.createElement("button");
  backAgainButton.setAttribute("id", "backAgainButton");
  backAgainButton.setAttribute("type", "button");
  backAgainButton.textContent = "Back Again";
  div.appendChild(backAgainButton);

  backAgainButton.addEventListener("click", () => {
    reset();
  });
}

function skipButton() {
  const skipButton = document.createElement("button");
  skipButton.setAttribute("id", "skipButton");
  skipButton.setAttribute("type", "button");
  skipButton.textContent = "Skip";
  div.appendChild(skipButton);
  skipButton.addEventListener("click", () => skipAll(selection));
}

function skipAll(option) {
  const optionsDiv = document.querySelector("#options");
  if (!optionsDiv) {
    counter = option.length - 1;
    dialogueBox.textContent = option[counter];
    counter++;
    updateDialogue(option);
  }
}

function buildscenePage(scene) {
  div.setAttribute("id", "optionsMenu");

  checkscene(scene);
  selection = info.intro;

  const image = document.createElement("img");
  image.setAttribute("src", `${info.picture}`);
  image.setAttribute("class", `images`);
  div.appendChild(image);

  const textDiv = document.createElement("div");
  textDiv.setAttribute("id", "text");
  div.appendChild(textDiv);

  const backButton = document.createElement("button");
  backButton.setAttribute("id", "backButton");
  backButton.setAttribute("type", "button");
  backButton.textContent = "Back";
  textDiv.appendChild(backButton);
  backButton.addEventListener("click", () => goBack(info.intro));

  const dialogueBox = document.createElement("p");
  dialogueBox.setAttribute("id", "dialogueBox");
  dialogueBox.textContent = info.intro[0];
  textDiv.appendChild(dialogueBox);

  const nextButton = document.createElement("button");
  nextButton.setAttribute("id", "nextButton");
  nextButton.setAttribute("type", "button");
  nextButton.textContent = "There";
  textDiv.appendChild(nextButton);
  nextButton.addEventListener("click", () => updateDialogue(info.intro));

  const nameLabel = document.createElement("p");
  nameLabel.setAttribute("id", "name");
  nameLabel.textContent = info.name;
  textDiv.appendChild(nameLabel);
}

function goBack(option) {
  if (counter > 1) {
    counter--;
  }
  const optionsDiv = document.querySelector("#options");
  if (optionsDiv) {
    div.removeChild(optionsDiv);
  }
  dialogueBox.textContent = option[counter - 1];
}

function updateDialogue(option) {
  if (counter <= option.length) {
    if (counter == option.length) {
      const optionsDiv = document.querySelector("#options");

      if (!optionsDiv) {
        displayOptions();
      }

      const image = document.querySelector("img");
      image.setAttribute("id", "small");

      backAgainButton;
    } else {
      dialogueBox.textContent = option[counter];
      counter++;
    }
  }
}

function displayOptions() {
  const optionsDiv = document.createElement("div");
  optionsDiv.setAttribute("id", "options");
  div.appendChild(optionsDiv);

  for (let i = 0; i < 4; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", `option${i}`);
    button.setAttribute("class", "options");
    button.setAttribute("type", "button");
    button.textContent = options[i];
    optionsDiv.appendChild(button);
  }
  addButtonEvents(".options", (e) => selectOption(e.target));
}

function selectOption(option) {
  const optionsDiv = document.querySelector("#options");
  div.removeChild(optionsDiv);
  const image = document.querySelector("img");
  image.setAttribute("src", `images/${option.textContent.toLowerCase()}1.png`);
  image.removeAttribute("id", "small");

  const dialogueBox = document.querySelector("#dialogueBox");
  const optionID = option.getAttribute("id");
  recreateNextButton();
  checkOption(optionID);
  dialogueBox.textContent = selection[0];
  counter = 1;
  backButton.addEventListener("click", () => goBack(selection));
  nextButton.addEventListener("click", () => updateDialogue(selection));
}

function recreateNextButton() {
  const textDiv = document.querySelector("#text");
  let nextButton = document.querySelector("#nextButton");
  textDiv.removeChild(nextButton);
  nextButton = document.createElement("button");
  nextButton.setAttribute("id", "nextButton");
  nextButton.setAttribute("type", "button");
  nextButton.textContent = "There";
  textDiv.appendChild(nextButton);
}

function checkscene(option) {
  switch (option) {
    case "scene0":
      info = ShadowOfThePast;
      break;
    case "scene1":
      info = PassingOfTheElves;
      break;
    case "scene2":
      info = TheOldForest;
      break;
    case "scene3":
      info = FlightToFordBruinen;
      break;
    default:
  }
}

function checkOption(option) {
  switch (option) {
    case "option0":
      selection = info.option0;
      break;
    case "option1":
      selection = info.option1;
      break;
    case "option2":
      selection = info.option2;
      break;
    case "option3":
      selection = info.option3;
      break;
    default:
  }
}

const options = ["Hobbit", "Elf", "Dwarf", "Gollum"];
