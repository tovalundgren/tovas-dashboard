// Hämta body och randomBackgroundBtn från HTML id
const body = document.getElementById('body');
const randomBackgroundBtn = document.getElementById('randomBackgroundBtn');
const restoreBackgroundBtn = document.getElementById('restoreBackgroundBtn');
// Personlig accessKey från Unsplash API
const accessKey = 'yfxIB12TVt7JgSkKjx9bZ82C5Lc3s38AyrhZ6c_rRpg';
// Hämta info om fotograf från HTML id
const photographerInfo = document.getElementById('photographerInfo');

// Hämta tidigare bakgrundsbild från localStorage
const storedBackground = localStorage.getItem('body');
const storedPhotographerInfo = localStorage.getItem('photographerInfo');
if (storedBackground) {
    body.style.backgroundImage = storedBackground;
}
if (storedPhotographerInfo) {
    photographerInfo.innerHTML = storedPhotographerInfo;
}

// Hämta original bakgrundsbilden från CSS
const originalBackground = getComputedStyle(body).backgroundImage;

// Skapa funktion för att ändra bakgrundsbild i bodyn när knappen klickas på. Lägg även till bildkälla och länk till fotografen
randomBackgroundBtn.addEventListener('click', function () {
    fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.regular;
            const photographerName = data.user.name;
            const photographerProfile = data.user.links.html;

            const newBackground = `url(${imageUrl})`;
            // Spara den nya bakgrundsbilden i LocalStorage
            localStorage.setItem('body', newBackground);
            localStorage.setItem('photographerInfo', `Foto av ${photographerName}. Besök profil: <a href="${photographerProfile}" class=photographerLink target="_blank">${photographerProfile}</a>`);
            body.style.backgroundImage = newBackground;
            photographerInfo.innerHTML = `Foto av ${photographerName}. Besök profil: <a href="${photographerProfile}" class=photographerLink target="_blank">${photographerProfile}</a>`;

            photographerInfo.innerHTML = `Foto av ${photographerName}. Besök profil: <a href="${photographerProfile}" class=photographerLink target="_blank">${photographerProfile}</a>`;
        })
        // Error om bilden inte kan hämtas
        .catch(error => console.error('Error hämtning av random bild:', error));
});

const searchInput = document.getElementById('searchInput');

// Event listener för enter i Välj tema själv
searchInput.addEventListener('keydown', function (event) {
    // Kolla om knappen är enter????? OOOOOOOOBBBBBSSS
    if (event.key === 'Enter') {
        // Hämta användarens söktext
        const searchQuery = searchInput.value;

        // Gör en API förfrågan baserat på sökningen
        fetch(`https://api.unsplash.com/photos/random?query=${searchQuery}&client_id=${accessKey}`)
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.urls.regular;
                const photographerName = data.user.name;
                const photographerProfile = data.user.links.html;

                const newBackground = `url(${imageUrl})`;
                localStorage.setItem('body', newBackground);
                localStorage.setItem('photographerInfo', `Foto av ${photographerName}. Besök profil: <a href="${photographerProfile}" class=photographerLink target="_blank">${photographerProfile}</a>`);
                body.style.backgroundImage = newBackground;
                photographerInfo.innerHTML = `Foto av ${photographerName}. Besök profil: <a href="${photographerProfile}" class=photographerLink target="_blank">${photographerProfile}</a>`;
            })
            .catch(error => console.error('Error hämtning av sökt bild:', error));
    }
});

// Event listener för att återställa till originalbilden
restoreBackgroundBtn.addEventListener('click', function(){
    // Ta bort nuvarande bild och källa från LocalStorage och ersätt med originalbilden
    localStorage.removeItem('body');
    localStorage.removeItem('photographerInfo');
    body.style.backgroundImage = originalBackground;
    photographerInfo.innerHTML = '';
});
