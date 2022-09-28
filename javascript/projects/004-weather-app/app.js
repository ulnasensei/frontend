const input = document.querySelector("#input");
const searchButton = document.querySelector("#search");
const results = document.querySelector("#results");
const validateApiKey = (key, expireCheck = false, isFirstTime = false) => {
    return axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=greenland&units=metric&appid=${key}`,
            { validateStatus: false }
        )
        .then((response) => {
            if (response.status == "200") {
                localStorage.setItem("owm", btoa(key));
                if (isFirstTime) {
                    Swal.fire({
                        icon: "success",
                        title: "API key is valid.",
                        html: "Please enjoy this applicaton :)",
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }
                return true;
            } else {
                Swal.fire({
                    icon: "error",
                    title: expireCheck
                        ? "It looks like your API key has expired."
                        : "API key is invalid.",
                    footer: expireCheck
                        ? '<a href="https://openweathermap.org/" about="_blank">Click here to get a new one.</a>'
                        : '<p class="text-center">Don\'t have an OpenWeatherMap API key? <br><a href="https://openweathermap.org/" about="_blank">Click here to get one.</a></p>',
                });
                localStorage.removeItem("owm");
                return false;
            }
        });
};
async function setApiKey() {
    if (localStorage.getItem("owm")) {
        const key = atob(localStorage.getItem("owm"));
        if (validateApiKey(key, true, false)) {
            startEventListeners();
            return key;
        } else {
            return null;
        }
    } else {
        let { value: key } = await Swal.fire({
            title: "Please enter your OpenWeatherMap API key.",
            input: "text",
            inputLabel: "It will be stored in the localStorage.",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            },
        });
        if (key) {
            if (validateApiKey(key, false, true)) {
                startEventListeners();
                return key;
            } else {
                return null;
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "You can not use this application unless you provide a valid API key.",
            });
        }
    }
}
const startEventListeners = () => {
    searchButton.addEventListener("click", () => {
        input.focus();
        if (input.value) {
            getWeather(input.value);
            input.value = "";
        }
    });
    input.addEventListener("keydown", (e) => {
        if (e.code == "Enter") searchButton.click();
    });
    results.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-close")) {
            const id = e.target.parentNode.id;
            resultsArray.splice(resultsArray.indexOf(id), 1);
            results.removeChild(document.getElementById(id));
        }
    });
};
let apiKey;
(async function () {
    apiKey = await setApiKey();
})();
const resultsArray = [];
const getWeather = (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    axios
        .get(url, { validateStatus: false })
        .then((response) => {
            if (response.status == "200") {
                if (!resultsArray.includes(response.data.id)) {
                    resultsArray.push(response.data.id);
                    createWeatherCard(response.data);
                } else {
                    alert(`You already added ${response.data.name}`);
                }
            } else if (response.status == "404") {
                alert(`${location} not found`);
            } else {
                throw new Error(response);
            }
        })
        .catch((error) => console.log(error));
};
const createWeatherCard = (data) => {
    const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;
    const city = data.name;
    const country = data.sys.country;
    const temp = Math.round(Number(data.main.temp));
    const weather = data.weather[0].main;
    const id = data.id;

    const cardHTML = `<div class="card result rounded-4 pt-3 pb-3 m-2" id="${id}">
    <div class="card-body">
        <div class="city fs-5">
            ${city} <sup class="bg-warning p-1 rounded country">${country}</sup>
        </div>
        <div class="temp text-center">${temp}&deg;C</div>
        <div class="symbol text-center mb-2"><img class="weatherIcon" src="${iconUrl}"></div>
        <div class="weather mt-5 text-center">${weather}</div>
        
    </div><button type="button" class="fs-5 btn-close" aria-label="Close"></button>
</div>`;
    results.innerHTML = cardHTML + results.innerHTML;
};
