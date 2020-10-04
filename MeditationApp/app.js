//selectors
playButton = document.querySelector(".timer-play");
pauseButton = document.querySelector(".timer-pause");
selectTimeElems = document.querySelectorAll("[data-set-minutes]");
minutesElem = document.querySelector("[data-minutes]");
secondsElem = document.querySelector("[data-seconds]");
weatherButtons = document.querySelectorAll(".weather-icons");
videoElem = document.querySelector(".myVideo");
audioElem = document.querySelector(".myAudio");


let minutes = 5;
let seconds = minutes * 60;
let id;
//Event Listeners
playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', stopTimer);
selectTimeElems.forEach(selectTimeElem => {
    selectTimeElem.addEventListener('click', setTime);
});
weatherButtons.forEach(weatherButton => {
    weatherButton.addEventListener('click', playVideo);
});

//functions
function startTimer() {
    videoElem.play();
    audioElem.play();
    pauseButton.style.display = 'inline';
    playButton.style.display = 'none';
    setTimeout('Decrement()', 60);
}

function stopTimer() {
    videoElem.pause();
    audioElem.pause();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
    window.clearTimeout(id);
}

function setTime(e) {
    let elem = e.target;
    minutes = parseInt(elem.getAttribute("data-set-minutes"));
    seconds = minutes * 60;
    minutesElem.textContent = minutes;
    secondsElem.textContent ='00'

    //stop timer
    window.clearTimeout(id);
    //reset to display play button
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none';
    //reload video & audio
    videoElem.load();
    audioElem.load();
}

function Decrement() {

    if(seconds < 59) {
        secondsElem.textContent = seconds;
    }
    else {
        minutesElem.textContent = getMinutes();
        secondsElem.textContent = getSeconds();
    }

    if(minutes < 0) {
        alert('Time Up');
        minutesElem.textContent = 0;
        secondsElem.textContent = 0;
    }
    else {
        seconds--;
        id = setTimeout('Decrement()', 1000);
    }

}

function getMinutes() {
    minutes = Math.floor( seconds / 60);
    return minutes;
}

function getSeconds() {
    return seconds - Math.round(minutes * 60);
}

function playVideo(e) {
    let elem = e.target;
    
    if(elem.classList.contains('weather-beach')) {
        videoElem.setAttribute('src','video/beach.mp4')
        audioElem.setAttribute('src','sounds/beach.mp3');
    }
    else if(elem.classList.contains('weather-rain')) {
        videoElem.setAttribute('src','video/rain.mp4');
        audioElem.setAttribute('src','sounds/rain.mp3');
    }
    else {

    }
    videoElem.play();
    audioElem.play();
}