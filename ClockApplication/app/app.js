
setInterval(setClock, 1000);

//variables
const secondsHand = document.querySelector("[data-second-hand]");
const minutesHand = document.querySelector("[data-minute-hand]");
const hoursHand = document.querySelector("[data-hour-hand]");

//functions declarations
function setClock() {
    let currentDate = new Date();
    let secondRatio = currentDate.getSeconds() / 60;
    let minutesRatio = ( secondRatio + currentDate.getMinutes() ) / 60;
    let hoursRatio = ( minutesRatio + currentDate.getHours() ) / 24;

    setRotation(secondsHand, secondRatio);
    setRotation(minutesHand, minutesRatio);
    setRotation(hoursHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();