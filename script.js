// RPG Character Manager
// Step 3: Render characters on screen
// Etapa 3: Mostrar personagens na tela

const form = document.getElementById("characterForm");
const characterList = document.getElementById("characterList");

// Get characters from localStorage or create empty array
let characters = JSON.parse(localStorage.getItem("characters")) || [];

// Function to render characters
// Função para mostrar os personagens na tela
function renderCharacters() {
    characterList.innerHTML = ""; // Clear previous content

    characters.forEach((character, index) => {
        const card = document.createElement("div");
        card.classList.add("character-card");

        // Only name for now (as requested)
        const nameElement = document.createElement("h3");
        nameElement.textContent = character.name;

        card.appendChild(nameElement);
        characterList.appendChild(card);
    });
}

// When page loads, render saved characters
renderCharacters();

// Listen to form submit
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const character = {
        name: document.getElementById("name").value,
        race: document.getElementById("race").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        profession: document.getElementById("profession").value,
        image: document.getElementById("image").value,
        health: document.getElementById("health").value,
        mana: document.getElementById("mana").value,
        vigor: document.getElementById("vigor").value,
        skill: document.getElementById("skill").value,
        perception: document.getElementById("perception").value,
        intelligence: document.getElementById("intelligence").value,
        mastery: document.getElementById("mastery").value
    };

    characters.push(character);

    localStorage.setItem("characters", JSON.stringify(characters));

    form.reset();

    renderCharacters(); // Update screen after saving
});