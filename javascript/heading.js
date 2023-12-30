// Hämta dashboardHeading från HTML
const headingElement = document.getElementById('dashboardHeading');
let inputElement;

// Hämta tidigare sparade rubriken från LocalStorage
const storedHeading = localStorage.getItem('dashboardHeading');
if (storedHeading) {
    headingElement.innerText = storedHeading;
};

// Skapa funktion som vid klick på rubriken visar ett input-fält för att ändra rubriken
headingElement.addEventListener('click', function(){
    // Skapa ett input-element och bestäm type och value
    inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = headingElement.innerText;

    // Klass för att kunna stylea input-fältet
    inputElement.classList.add('inputArea');

    // Ersätt tidigare rubriken med det som skrivits i input-fältet
    headingElement.replaceWith(inputElement);
    inputElement.focus();

    // Ändra rubriken vid klick på enter
    inputElement.addEventListener('keyup', function(event){
        if (event.key === 'Enter') {
            // Spara den nya rubriken i LocalStorage
            const newHeading = inputElement.value;
            localStorage.setItem('dashboardHeading', newHeading);

            headingElement.innerText = inputElement.value;
            inputElement.replaceWith(headingElement);
        }
    });
});

// Ändra HTML title till samma som användarens valda rubrik
const titleElement = document.getElementById('pageTitle');

function updateTitle(newTitle) {
    titleElement.innerText = newTitle;
}

headingElement.addEventListener('click', function(){
    updateTitle(inputElement.value);
});