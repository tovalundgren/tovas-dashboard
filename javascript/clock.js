// Funktion för att uppdatera klockan
function updateClock() {
    // Skapa ett nytt datumobjekt för att få nuvarande tid och datum
    let date = new Date();

    // Visa timmar och minuter och lägg till nollor om det behövs. Slice tar bort de två sista tecknena från stringen, så att det alltid är endast två siffror i timmar och minuter
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);

    // Visa dag, månad och år och ändra månader till svenska och 'long' för att visa hela stavningen istället för förkortning
    let day = date.getDate();
    let month = date.toLocaleString('sv-SE', { month: 'long' });
    let year = date.getFullYear();
  
    // Skapa en string som visar nuvarande tid och datum
    let clockString = '<span class="time">' + hours + ':' + minutes + '</span> <span class="date">' + day + ' ' + month + ' ' + year + '</span>';
    // Uppdatera HTML med id 'clock'
    document.getElementById('clock').innerHTML = clockString;
  }
  // Gör ett intervall för att kalla på funktionen varje sekund
  setInterval(updateClock, 1000);
  // Kalla på funktionen för att starta klockan direkt!
  updateClock();