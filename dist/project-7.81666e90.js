async function fetchDogBreeds() {
    const dogUrl = "https://dog.ceo/api/breeds/list/all";
    const response = await fetch(dogUrl);
    const dogBreedObj = await response.json();
    const dogBreedListObj = dogBreedObj.message;
    //console.log(dogBreedListObj);
    const finalList = [];
    for(const key in dogBreedListObj){
        const breedArray = dogBreedListObj[key];
        if (breedArray.length === 0) finalList.push(key);
        for(let i = 0; i < breedArray.length; i++)finalList.push(key + "-" + breedArray[i]);
    }
    return finalList;
}
/* populate drop down */ async function populateDropDown() {
    const dogBreeds = await fetchDogBreeds();
    //console.log(dogBreeds);
    const dropDown = document.getElementById("dropDown");
    dogBreeds.forEach((dogBreed)=>{
        const option = document.createElement("option");
        option.value = dogBreed;
        option.textContent = dogBreed;
        dropDown.appendChild(option);
    });
}
populateDropDown();
/* Fetch Random Dog */ const content = document.querySelector(".content");
const dogButtonRandom = document.getElementById("random-fetch");
dogButtonRandom.addEventListener("click", addNewDogRandom);
async function addNewDogRandom() {
    const dogUrl = "https://dog.ceo/api/breeds/image/random";
    const response = await fetch(dogUrl);
    const dogObject = await response.json();
    console.log(dogObject);
    const imgUrl = dogObject.message;
    addImageElement(imgUrl);
}
const breedFetchButton = document.getElementById("breed-fetch");
breedFetchButton.addEventListener("click", addNewDogBreed);
async function addNewDogBreed() {
    const dropDownValue = document.getElementById("dropDown").value;
    let url = constructUrl(dropDownValue);
    console.log(url);
    const response = await fetch(url);
    const dogObj = await response.json();
    const imgUrl = dogObj.message;
    addImageElement(imgUrl);
}
function addImageElement(imgUrl) {
    const imgElement = document.createElement("img");
    imgElement.src = imgUrl;
    imgElement.alt = "dog image from api";
    imgElement.classList.add("image");
    content.prepend(imgElement);
    addEventToImage(imgElement);
}
function constructUrl(dropDown) {
    if (dropDown.includes("-")) {
        const [first, second] = dropDown.split("-");
        return `https://dog.ceo/api/breed/${first}/${second}/images/random`;
    } else return `https://dog.ceo/api/breed/${dropDown}/images/random`;
}
function addEventToImage(imgElement) {
    imgElement.addEventListener("click", function() {
        alert(imgElement.src);
    });
}

//# sourceMappingURL=project-7.81666e90.js.map
