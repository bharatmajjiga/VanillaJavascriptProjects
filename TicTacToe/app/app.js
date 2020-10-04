//selectors
let inputElements = document.querySelectorAll("[data-input]");
let notification = document.querySelector(".notification");
let count = 9;
const status = { 
    0: 'GAME STARTED',
    1: 'GAME OVER! CLICK TO START OVER',
    2: 'GAME TIED! CLICK TO START OVER'
};

//Event Listeners
notification.addEventListener('click', () => {
    let code = notification.getAttribute("data-code");
    if(code === "1" || code === "2") {
        inputElements.forEach(inputElement => {
            inputElement.value = "";
            inputElement.disabled = false;
            notification.setAttribute("data-code", 0);
        });
        updateNotification();
    }        
})

inputElements.forEach(inputElement => {
    inputElement.addEventListener('keyup', (e) => {
        let elem = e.target;
        let value = elem.value;

                    
        if( (value !== "x" && value !== "o") ) {
            elem.value = '';
        }
        else {
            --count;
        }

        if(elem.value.length === 1) {
            elem.disabled = true;
        }
    })
});



inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', (e) => {

        if(count === 1) {
            notification.setAttribute("data-code", 2);
            updateNotification();
            return;
        }
        let elem = e.target;
        let attrValue = elem.getAttribute("data-input");
        switch(attrValue) {
            case "1":
                checkForGameOver(1, 2, 3);
                checkForGameOver(1, 4, 7);
                checkForGameOver(1, 5, 9);
                break;
            case "2":
                checkForGameOver(2, 5, 8);
                checkForGameOver(2, 1, 3);
                break;
            case "3":
                checkForGameOver(3, 6, 9)
                checkForGameOver(3, 5, 7);
                checkForGameOver(3, 2, 1);
                break;
            case "4":
                checkForGameOver(4, 1, 7);
                checkForGameOver(4, 5, 6);
                break;
            case "5":
                checkForGameOver(5, 1, 9);
                checkForGameOver(5, 3, 7);
                checkForGameOver(5, 2, 8);
                break;
            case "6":
                checkForGameOver(6, 3, 9);
                checkForGameOver(6, 5, 4);
                break;
            case "7":
                checkForGameOver(7, 5, 3);
                checkForGameOver(7, 8, 9);
                checkForGameOver(7, 4, 1);
                break;
            case "8":
                checkForGameOver(8, 5, 2);
                checkForGameOver(8, 7, 9);
                break;
            case "9":
                checkForGameOver(9, 5, 1);
                checkForGameOver(9, 8, 7);
                checkForGameOver(9, 6, 3);
                break;
            default:
                break;
        }
    });
});

function checkForGameOver(a, b, c) {
    let selectorA = `[data-input="${a}"]`;
    let selectorB = `[data-input="${b}"]`;
    let selectorC = `[data-input="${c}"]`;
    if( ( document.querySelector(selectorA).value === document.querySelector(selectorB).value ) && ( document.querySelector(selectorB).value === document.querySelector(selectorC).value ) ) {
        inputElements.forEach(inputElement => {
            inputElement.disabled = true;
        });
        notification.setAttribute("data-code", 1);
        updateNotification();
    }        
}


function updateNotification() {
    let code = notification.getAttribute("data-code");
    notification.textContent = status[code];
}