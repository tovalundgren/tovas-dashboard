async function getRandomDogImage(){
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    return await response.json();
}

async function updateDogImage() {
    const dogImageElement = document.getElementById('dogImage');
    const imageData = await getRandomDogImage();
    dogImageElement.src = imageData.message;
    setTimeout(updateDogImage, 3000);
}

updateDogImage();