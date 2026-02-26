// RPG Character Manager
// Step 2: Save characters in localStorage
// Etapa 2: Salvar personagens no localStorage

// Get form element
// Pega o formulário
const form = document.getElementById("characterForm");

// Get characters from localStorage or create empty array
// Pega personagens salvos ou cria lista vazia
let characters = JSON.parse(localStorage.getItem("characters")) || [];

// Listen to submit event
// Escuta envio do formulário
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload / Evita recarregar

    // Create character object
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

    // Add new character to array
    characters.push(character);

    // Save updated array in localStorage
    localStorage.setItem("characters", JSON.stringify(characters));

    console.log("Character saved:", character);
    console.log("All characters:", characters);

    // Clear form
    form.reset();
});