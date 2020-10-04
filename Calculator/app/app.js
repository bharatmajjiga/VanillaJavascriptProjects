
function insert(no) {
    document.calcform.display.value =  document.calcform.display.value + no;
}

function equals() {
    document.calcform.display.value = eval(document.calcform.display.value);
}

function back() {
    document.calcform.display.value = document.calcform.display.value.toString().substring(0, document.calcform.display.value.length-1);
}

function allClear() {
    document.calcform.display.value = "";
}