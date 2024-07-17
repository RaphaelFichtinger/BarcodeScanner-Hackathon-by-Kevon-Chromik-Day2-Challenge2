
function template1(name, image, carbohydrates, energyKcal, protein, sugar, fat) {
    return `
    <div id=main-container>
    <p>refresh page to scan aganin</p>
    <p class="overlay-heading">${name}</p>
    <img id="main-img" src="${image}">
        <div id="sub-container">
            <h3>per (100g / 100ml):</h3>
            <div class="line"></div>
            <p>carbohydrates: ${carbohydrates} g</p>
            <div class="line"></div>
            <p>calories: ${energyKcal} kcal</p>
            <div class="line"></div>
            <p>proteins: ${protein} g</p>
            <div class="line"></div>
            <p>sugar: ${sugar} g</p>
            <div class="line"></div>
            <p>fat: ${fat} g</p>
        </div>
        <div id="value-container"></div>
    </div>
    `
}