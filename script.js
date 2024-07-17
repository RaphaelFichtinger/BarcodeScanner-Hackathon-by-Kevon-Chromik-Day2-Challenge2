
let base_value = 0;


const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 250,
        height: 250,
    },
    fps: 60,
});

scanner.render(success, error);

function success(result) {
    scanner.clear();
    document.getElementById('reader').remove();
    searchProduct(result);
}


function error(err) {
    console.error(err);
}


function searchProduct(result) {
    let API_URL = `https://world.openfoodfacts.net/api/v2/product/{${result}}`;
    getData(API_URL);
}


async function getData(API_URL) {
    document.getElementById("loading-screen").style.display = "flex";
    
    try {
        let data = await fetch(API_URL);
        let response = await data.json();
        let name = response.product.product_name;
        let image = response.product.image_front_url;
        let energyKcal = response.product.nutriments['energy-kcal'].toFixed(2);
        let protein = response.product.nutriments['proteins_100g'].toFixed(2);
        let sugar = response.product.nutriments['sugars_100g'].toFixed(2);
        let fat = response.product.nutriments['fat_100g'].toFixed(2);
        let carbohydrates = response.product.nutriments['carbohydrates_100g'].toFixed(2);
        document.getElementById("overlay-main").classList.remove("d-none");
        document.getElementById('overlay-main').innerHTML = template1(name, image, carbohydrates, energyKcal, protein, sugar, fat);
        console.log(response.product);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    } finally {
        document.getElementById("loading-screen").style.display = "none";
    }
}



function addToList(energyKcal) {
    base_value += parseFloat(energyKcal); 
    let valueContainer = document.getElementById("value-container");
    valueContainer.innerHTML = `Total calories: ${base_value} kcal`;
}


function calculateCalories() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    let bmr;

    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }


    document.getElementById('calories-need').innerHTML = `<p>Your daily calorie needs are ${Math.round(bmr)} kcal.</p>`;

}
