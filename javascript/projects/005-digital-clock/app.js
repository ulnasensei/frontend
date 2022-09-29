const display = document.querySelector("#clock");
display.innerText = new Date().toLocaleTimeString("en-GB");

setInterval(() => {
    display.innerText = new Date().toLocaleTimeString("en-GB");
}, 150);
// set to 150ms so the clock won't follow from behind. Anything more than 150ms gives a noticable delay.
