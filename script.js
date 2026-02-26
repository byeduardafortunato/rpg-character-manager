// RPG Character Manager
// Step 1: Capture form data
// Etapa 1: Capturar dados do formulário

// Get form element
// Pega o formulário
const form = document.getElementById("characterForm");

// Listen to submit event
// Escuta o envio do formulário
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload / Evita recarregar a página

    // Create character object
    // Cria objeto do personagem com os dados do formulário
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

    // Show data in console (test)
    // Mostra no console para teste
    console.log("Character created:", character);

    // Clear form after submit
    // Limpa o formulário após salvar
    form.reset();
});
