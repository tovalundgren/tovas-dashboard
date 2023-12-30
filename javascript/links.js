document.addEventListener('DOMContentLoaded', function () {
    const addLinkbtn = document.getElementById('addLinkBtn');
    // Räkna antal länkar
    let linkCount = document.querySelectorAll('.linkItem').length;

    // Funktion för att hantera länkar från localStorage
    function linksLocalStorage(linkName) {
        // Hämta befintliga länkar från localStorage eller använd en tom array om det inte finns några
        const links = JSON.parse(localStorage.getItem('links')) || [];
        // Filtrera ut de länkar som ska tas bort
        const updatedLinks = links.filter(linkData => linkData.linkName !== linkName);
        // Spara de uppdaterade länkarna till localStorage
        localStorage.setItem('links', JSON.stringify(updatedLinks));
    }

    // Funktion för att skapa element för en länk och lägg till på sidan
    function createLinkItem(linkData) {
        const linkItem = document.createElement('div');
        linkItem.className = 'linkItem';

        const favIcon = document.createElement('img');
        favIcon.className = 'favIcon';
        
        // Hämta länkens favicon (finns det andra alternativ som är bättre än blob?)
        fetch(`https://icon.horse/icon/${linkData.linkURL}`)
            .then(response => response.blob())
            .then(blob => {
                const favIconURL = URL.createObjectURL(blob);
                favIcon.src = favIconURL;
            })
            .catch(error => console.error('Error hämtning av länkens favicon', error));

        const link = document.createElement('a');
        link.href = linkData.linkURL;
        link.className = 'link';
        link.textContent = linkData.linkName;

        const deleteLinkBtn = document.createElement('button');
        deleteLinkBtn.className = 'deleteLinkBtn';
        deleteLinkBtn.textContent = '-';
        
        // EventListener för att ta bort länk när man klickar på deleteknappen
        deleteLinkBtn.addEventListener('click', function () {
            linkItem.remove();
            linksLocalStorage(linkData.linkName);
            // Minska antalet länkar
            linkCount--;
        });

        // Lägg till länk och deleteknapp till linkItem och lägg allt ovanför addLinkBtn
        linkItem.appendChild(favIcon);
        linkItem.appendChild(link);
        linkItem.appendChild(deleteLinkBtn);
        addLinkbtn.parentNode.insertBefore(linkItem, addLinkbtn);
    }

    // Funktion för att ladda upp sparade länkar från localStorage när sidan laddas
    function loadStoredLinks() {
        const links = JSON.parse(localStorage.getItem('links')) || [];
        links.forEach(linkData => createLinkItem(linkData));
        // Uppdatera antalet länkar
        linkCount += links.length;
    }

    // EventListener för att lägga till länk med URL och namn när man klickar på lägg till knappen
    addLinkbtn.addEventListener('click', function () {
        // Kontrollera att antalet länkar är färre än 4
        if (linkCount < 4) {
            const linkURL = prompt('Skriv länken:');
            const linkName = prompt('Skriv namnet på länken:');

            // Hämta sparade länkar från localStorage om både länk och namn är angivna
            if (linkName && linkURL) {
                const links = JSON.parse(localStorage.getItem('links')) || [];
                links.push({ linkName, linkURL });
                localStorage.setItem('links', JSON.stringify(links));

                createLinkItem({ linkName, linkURL });
                linkCount++;
            }
        // Meddela användaren att max antal länkar är 4 st
        } else {
            alert('Du kan lägga till max 4 länkar. Varje länk har en deleteknapp i högra hörnet, så fritt fram att rensa först :)');
        }
    });

    // Ladda sparade länkar från localStorage när sidan laddas
    loadStoredLinks();
});