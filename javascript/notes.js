// Hämta textarea och notes från HTML id
const textarea = document.getElementById('textarea');
const notes = document.getElementById('notes');

// Hämta tidigare sparade anteckningar
const storedNotes = localStorage.getItem('userNotes');
if (storedNotes) {
    textarea.value = storedNotes;
};

// Spara anteckningar i LocalStorage vid input
textarea.addEventListener('input', function(){
    localStorage.setItem('userNotes', textarea.value);
});

// Återgå till original storleken när man klickar utanför textarea
document.addEventListener('click', function(event){
    if (!notes.contains(event.target)) {
        textarea.style.width = '100%';
        textarea.style.height = '100%';
    };
});