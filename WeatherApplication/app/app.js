
const KELVIN = 273.15;
const timeZone = document.querySelector("[data-loc-timezone]");
const tempDegree = document.querySelector("[data-temp-degree]");
const tempDescription = document.querySelector("[data-temp-description]");
const weatherIcon = document.querySelector("[data-icon]");
const tempNotion = document.querySelector("[data-temp-notion]");
const degreeSection = document.querySelector(".degree-section");
const regionSection = document.querySelector("[data-region]");

degreeSection.addEventListener('click', changeNotion);
window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=7ab18845031c47bb8ec163009202808&q=${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const tempC = data.current.temp_c;
                const { text, icon } = data.current.condition;
                const { tz_id, name, region, country } = data.location;
                // set DOM elements from the API
                tempDegree.textContent = tempC;
                tempDescription.textContent = text;
                timeZone.textContent = tz_id;
                weatherIcon.innerHTML = `<img src="${icon}"/>`;
                regionSection.textContent = `${name}, ${region}, ${country}`
            });
        }, error => {
            console.log(error);
        }, {
            maximumAge: 10,
            //enableHighAccuracy: true
        });        
    }
});

function changeNotion() {
    let temperature = tempDegree.textContent;
    if(tempNotion.textContent === "C")
        celsiusToFahrenheit(temperature);
    else
        fahrenheitToCelsius(temperature);
}

function celsiusToFahrenheit(celsuis) {

    let fahrenheit = (celsuis * 9/5) + 32;   
    tempDegree.textContent = Math.round(fahrenheit);
    tempNotion.textContent = "F";

}

function fahrenheitToCelsius(fahrenheit) {

    let celsuis = (fahrenheit - 32) * (5/9);  
    tempDegree.textContent = Math.round(celsuis);
    tempNotion.textContent = "C";

}