// RPG Character Manager
// Step 4: Add view more functionality
// Etapa 4: Botão para expandir detalhes

const form = document.getElementById("characterForm");
const characterList = document.getElementById("characterList");

let characters = JSON.parse(localStorage.getItem("characters")) || [];

// Render characters
function renderCharacters() {
    characterList.innerHTML = "";

    characters.forEach((character, index) => {

        const card = document.createElement("div");
        card.classList.add("character-card");

        // NAME (highlighted)
        const nameElement = document.createElement("h3");
        nameElement.textContent = character.name;

        // Race and Profession (basic info visible)
        const basicInfo = document.createElement("p");
        basicInfo.textContent = `${character.race} | ${character.profession}`;

        // View More button
        const viewButton = document.createElement("button");
        viewButton.textContent = "View More";

        // Hidden details container
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

        // Toggle details
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
