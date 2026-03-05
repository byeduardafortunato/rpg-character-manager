// ============================================
// RPG Character Manager
// Handles character creation, rendering,
// editing, deleting and localStorage persistence
// ============================================


// ==============================
// DOM ELEMENT REFERENCES
// ==============================

const form = document.getElementById("characterForm");
const characterList = document.getElementById("characterList");
const toggleButton = document.getElementById("toggleList");


// ==============================
// LOAD DATA FROM LOCAL STORAGE
// ==============================
// If there is saved data, load it.
// Otherwise, start with an empty array.

let characters = JSON.parse(localStorage.getItem("characters")) || [];


// ==============================
// INITIAL STATE
// ==============================
// Character list starts hidden.

characterList.style.display = "none";


// ==============================
// TOGGLE CHARACTER LIST VISIBILITY
// ==============================

toggleButton.addEventListener("click", function () {
    if (characterList.style.display === "none") {
        characterList.style.display = "block";
        toggleButton.textContent = "Hide Characters";
    } else {
        characterList.style.display = "none";
        toggleButton.textContent = "View Saved Characters";
    }
});


// ==============================
// RENDER CHARACTERS FUNCTION
// ==============================
// Responsible for displaying all characters on screen.

function renderCharacters() {

    // Clear existing content before re-rendering
    characterList.innerHTML = "";

    characters.forEach((character, index) => {

        // Create card container
        const card = document.createElement("div");
        card.classList.add("character-card");


        // ==============================
        // IMAGE DISPLAY (if exists)
        // ==============================

        if (character.imageData) {
            const img = document.createElement("img");
            img.src = character.imageData;
            img.alt = character.name;
            img.style.width = "120px";
            img.style.height = "120px";
            card.appendChild(img);
        }


        // Basic character info
        const nameElement = document.createElement("h3");
        nameElement.textContent = character.name;

        const basicInfo = document.createElement("p");
        basicInfo.textContent = `${character.race} | ${character.profession}`;


        // ==============================
        // BUTTONS
        // ==============================

        const viewButton = document.createElement("button");
        viewButton.textContent = "View More";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";


        // ==============================
        // CHARACTER DETAILS (HIDDEN)
        // ==============================

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


        // ==============================
        // VIEW MORE / HIDE FUNCTION
        // ==============================

        viewButton.addEventListener("click", function () {
            if (details.style.display === "none") {
                details.style.display = "block";
                viewButton.textContent = "Hide";
            } else {
                details.style.display = "none";
                viewButton.textContent = "View More";
            }
        });


        // ==============================
        // DELETE CHARACTER
        // ==============================

        deleteButton.addEventListener("click", function () {

            // Remove character from array
            characters.splice(index, 1);

            // Update localStorage
            localStorage.setItem("characters", JSON.stringify(characters));

            // Re-render updated list
            renderCharacters();
        });


        // ==============================
        // EDIT CHARACTER
        // ==============================

        editButton.addEventListener("click", function () {

            // Fill form with existing data
            document.getElementById("name").value = character.name;
            document.getElementById("race").value = character.race;
            document.getElementById("age").value = character.age;
            document.getElementById("gender").value = character.gender;
            document.getElementById("profession").value = character.profession;
            document.getElementById("health").value = character.health;
            document.getElementById("mana").value = character.mana;
            document.getElementById("vigor").value = character.vigor;
            document.getElementById("skill").value = character.skill;
            document.getElementById("perception").value = character.perception;
            document.getElementById("intelligence").value = character.intelligence;
            document.getElementById("mastery").value = character.mastery;

            // Remove old version from array
            characters.splice(index, 1);

            localStorage.setItem("characters", JSON.stringify(characters));

            renderCharacters();
        });


        // ==============================
        // APPEND ELEMENTS TO CARD
        // ==============================

        card.appendChild(nameElement);
        card.appendChild(basicInfo);
        card.appendChild(viewButton);
        card.appendChild(editButton);
        card.appendChild(deleteButton);
        card.appendChild(details);

        characterList.appendChild(card);
    });
}


// Initial render when page loads
renderCharacters();


// ==============================
// FORM SUBMISSION
// ==============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Limit to maximum 10 characters
    if (characters.length >= 10) {
        alert("Maximum of 10 characters reached.");
        return;
    }

    const fileInput = document.getElementById("image");
    let imageData = "";


    // ==============================
    // IF IMAGE WAS UPLOADED
    // ==============================

    if (fileInput.files.length > 0) {

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function () {

            imageData = reader.result;

            saveCharacter(imageData);
        };

        reader.readAsDataURL(file);

    } else {

        saveCharacter("");
    }
});


// ==============================
// SAVE CHARACTER FUNCTION
// ==============================
// Centralized function to avoid repetition

function saveCharacter(imageData) {

    const character = {
        name: document.getElementById("name").value,
        race: document.getElementById("race").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        profession: document.getElementById("profession").value,
        imageData: imageData,
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
}
