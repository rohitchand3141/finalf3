
const your_api_key = '4R8A39MwAx2lIFtCw10VeKwrbINQbm6GR2OnnXgl'; // Replace with your NASA API key
const search = document.getElementById("search-btn");
const imageContainer = document.getElementById('current-image-container');
const imageContent = document.getElementById('current-image-content');
const box_headding = document.getElementById("black-box-headding");
const search_history = document.getElementById("search-history");
let array = [];

document.addEventListener('DOMContentLoaded',getCurrentImageOfTheDay);

function getCurrentImageOfTheDay() {
    const date = new Date().toISOString().split("T")[0];
    // console.log(date);
    callAPI(date);
}



search.addEventListener('click', getImageOfTheDay);

function getImageOfTheDay(event){
    event.preventDefault();
    var newDate = document.getElementById("search-input").value;
    let yourDate = new Date(newDate).toISOString().split("T")[0];
    // console.log(yourDate);
    box_headding.innerText = `Picture on ${yourDate}`
     callAPI(yourDate);
     saveSearch(yourDate);
     addSearchToHistory(yourDate);

}

function callAPI(date){
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}`)
        .then((response) => response.json())
        .then(data => {
            // Display the image of the day
            // console.log(data);
            imageContainer.innerHTML=``;
            const imageElement = document.createElement('img');
            imageElement.src = data.url;
            imageElement.alt = data.title;
            imageElement.style.width = "100%";
            imageElement.style.height = "500px"
            imageContainer.appendChild(imageElement);

            imageContent.innerHTML=``;
            const contentElement = document.createElement('div');
            const heading = document.createElement('h2');
            heading.innerText = data.title;
            contentElement.appendChild(heading);

            const para = document.createElement('p');
            para.innerText = data.explanation;
            contentElement.appendChild(para);


            imageContent.appendChild(contentElement);
        })
        .catch(error => {
            // Handle errors and display appropriate error message
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Error: ${error.message}`;
            imageContainer.appendChild(errorMessage);
        });
    }


function saveSearch(yourDate){
    console.log(yourDate);
    let obj = {date: yourDate};
    array.push(obj);
    localStorage.setItem('searches',JSON.stringify(array));
}

function addSearchToHistory(yourDate){
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "javascript:void(0)";
    link.textContent = yourDate;
    link.addEventListener("click",function() {
        box_headding.innerText = `Picture on ${yourDate}`
        callAPI(yourDate);
    });
    li.appendChild(link);
    search_history.appendChild(li);
}