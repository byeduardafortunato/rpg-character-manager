// RPG Character Manager
// Step 5: Toggle List

const form = document.getElementById("characterForm");
const characterList = document.getElementById("characterList");
const toggleButton = document.getElementById("toggleList");

let characters = JSON.parse(localStorage.getItem("characters")) || [];

// Hide list initially
characterList.style.display = "none";

// Toggle show/hide list
toggleButton.addEventListener("click", function () {
    if (characterList.style.display === "none") {
        characterList.style.display = "block";
        toggleButton.textContent = "Hide Characters";
    } else {
        characterList.style.display = "none";
        toggleButton.textContent = "View Saved Characters";
    }
});

// Render characters
function renderCharacters() {
    characterList.innerHTML = "";

    characters.forEach((character, index) => {

        const card = document.createElement("div");
        card.classList.add("character-card");

        const nameElement = document.createElement("h3");
        nameElement.textContent = character.name;

        const basicInfo = document.createElement("p");
        basicInfo.textContent = `${character.race} | ${character.profession}`;

        const viewButton = document.createElement("button");
        viewButton.textContent = "View More";

        const details = document.createElement("div");
        details.style.display = "none";

        details.innerHTML = `
            <p>Age: ${character.age}</p>
            <p>Gender: ${character.gender}</p>
            <p>Health: ${character.health}</p>
            <p>Mana: ${character.mana}</p>
            <p>Vigor: ${character.vigor}</p>
            <p>Skill: ${character.skill}</p>
            <p>Perception: ${character.perception}</p>
            <p>Intelligence: ${character.intelligence}</p>
            <p>Mastery: ${character.mastery}</p>
        `;

        viewButton.addEventListener("click", function () {
            if (details.style.display === "none") {
                details.style.display = "block";
                viewButton.textContent = "Hide";
            } else {
                details.style.display = "none";
                viewButton.textContent = "View More";
            }
        });

        card.appendChild(nameElement);
        card.appendChild(basicInfo);
        card.appendChild(viewButton);
        card.appendChild(details);

        characterList.appendChild(card);
    });
}

// Load on page start
renderCharacters();

// Submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (characters.length >= 10) {
        alert("Maximum of 10 characters reached.");
        return;
    }

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
    renderCharacters();
});
