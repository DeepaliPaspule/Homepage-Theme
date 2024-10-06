window.addEventListener('DOMContentLoaded', async () => {
    try {
       
        const savedApiKey = localStorage.getItem("weatherApiKey");
        const userAPIInput = document.getElementById("userAPI");

        if (savedApiKey) {
            userAPIInput.value = savedApiKey;
        }

        const saveAPIButton = document.getElementById("saveAPI");
        saveAPIButton.addEventListener("click", () => {
            const apiKey = userAPIInput.value;
            
            localStorage.setItem("weatherApiKey", apiKey);

            document.getElementById("userAPI").value = "";
        });


        const defaultApiKey = 'c8ec5c78e09448f6bce75309220907&q'; 

 
        const userApiKey = userAPIInput.value.trim();
       
        const apiKey = userApiKey || defaultApiKey;

        
        const geoLocation = 'https://ipapi.co/json/';
        const locationData = await fetch(geoLocation);
        const parsedLocation = await locationData.json();
        const currentUserLocation = parsedLocation.ip;

        const weatherApi = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${currentUserLocation}&aqi=no`;

        const data = await fetch(weatherApi);
        const parsedData = await data.json();
        const conditionText = parsedData.current.condition.text;
        const tempCelsius = Math.round(parsedData.current.temp_c);
        const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
        const humidity = parsedData.current.humidity;
        const feelsLikeCelsius = parsedData.current.feelslike_c;
        const feelsLikeFahrenheit = Math.round(feelsLikeCelsius * 9 / 5 + 32);

        document.getElementById("conditionText").textContent = conditionText;
        document.getElementById("humidityLevel").textContent = `Humidity ${humidity}%`;

        const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");
        const updateTemperatureDisplay = () => {
            if (fahrenheitCheckbox.checked) {
                document.getElementById("temp").textContent = `${tempFahrenheit}°`;
                document.getElementById("feelsLike").textContent = `Feels ${feelsLikeFahrenheit}°F`;
            } else {
                document.getElementById("temp").textContent = `${tempCelsius}°`;
                document.getElementById("feelsLike").textContent = `Feels ${feelsLikeCelsius}°C`;
            }
        };
        updateTemperatureDisplay();

        const newWIcon = parsedData.current.condition.icon;
        const weatherIcon = newWIcon.replace("//cdn", "https://cdn");
        document.getElementById("wIcon").src = weatherIcon;

        if (humidity > 40) {
            document.getElementById("slider").style.width = `calc(${humidity}% - 60px)`;
        }

        var city = parsedData.location.name;

        var maxLength = 10;
        var limitedText = city.length > maxLength ? city.substring(0, maxLength) + "..." : city;

        document.getElementById("location").textContent = limitedText;

    } catch (error) {
        console.error("Error fetching weather data:", error);

    }
});


setInterval(() => {
    var currentTime = new Date();
    let hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    let hour_rotate_angle = 30 * hours + minutes / 2
    document.getElementById("second").style.transform = `rotate(${seconds * 6}deg)`
    document.getElementById("minute").style.transform = `rotate(${minutes * 6}deg)`
    document.getElementById("hour").style.transform = `rotate(${hour_rotate_angle}deg)`

    var dayOfWeek = currentTime.getDay();
    var dayOfMonth = currentTime.getDate();
    var month = currentTime.getMonth();
    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    var monthName = monthNames[month];
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = dayNames[dayOfWeek];
    document.getElementById("date").innerText = `${dayName.substring(0, 3)}, ${monthName.substring(0, 3)} ${dayOfMonth}`
}, 1000);

const searchbar = document.getElementById('searchbar');
searchbar.addEventListener('click', function () {
    searchbar.classList.toggle('active');
});
document.addEventListener('click', function (event) {

    if (!searchbar.contains(event.target)) {
        searchbar.classList.remove('active'); 
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const enterBTN = document.getElementById("enterBtn");
    const searchInput = document.getElementById("searchQ");
    const searchEngineRadio = document.getElementsByName("search-engine");

    function performSearch() {
        var selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
        var searchTerm = searchInput.value;
        var searchEngines = {
            engine1: 'https://duckduckgo.com/?q=',
            engine2: 'https://www.google.com/search?q=',
            engine3: 'https://bing.com/?q=',
            engine4: 'https://www.youtube.com/results?search_query='
        };

        if (searchTerm !== "") {
            var searchUrl = searchEngines[selectedOption] + encodeURIComponent(searchTerm);
            window.location.href = searchUrl;
        }
    }

    enterBTN.addEventListener("click", performSearch);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    const storedSearchEngine = localStorage.getItem("selectedSearchEngine");
    if (storedSearchEngine) {
        const selectedRadioButton = document.querySelector(`input[name="search-engine"][value="${storedSearchEngine}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

    searchEngineRadio.forEach((radio) => {
        radio.addEventListener("change", () => {
            const selectedOption = document.querySelector('input[name="search-engine"]:checked').value;
            localStorage.setItem("selectedSearchEngine", selectedOption);
        });
    });
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme) {
        applySelectedTheme(storedTheme);
        const selectedRadioButton = document.querySelector(`.colorPlate[value="${storedTheme}"]`);
        if (selectedRadioButton) {
            selectedRadioButton.checked = true;
        }
    }

});

const radioButtons = document.querySelectorAll('.colorPlate');
const themeStorageKey = 'selectedTheme';

const applySelectedTheme = (colorValue) => {
    if (colorValue != "blue") {
        document.documentElement.style.setProperty('--bg-color-blue', `var(--bg-color-${colorValue})`);
        document.documentElement.style.setProperty('--accentLightTint-blue', `var(--accentLightTint-${colorValue})`);
        document.documentElement.style.setProperty('--darkerColor-blue', `var(--darkerColor-${colorValue})`);
        document.documentElement.style.setProperty('--darkColor-blue', `var(--darkColor-${colorValue})`);
        document.documentElement.style.setProperty('--textColorDark-blue', `var(--textColorDark-${colorValue})`);
    } else {
        document.documentElement.style.setProperty('--bg-color-blue', '#BBD6FD');
        document.documentElement.style.setProperty('--accentLightTint-blue', '#E2EEFF');
        document.documentElement.style.setProperty('--darkerColor-blue', '#3569b2');
        document.documentElement.style.setProperty('--darkColor-blue', '#4382EC');
        document.documentElement.style.setProperty('--textColorDark-blue', '#1b3041');
    }
    if (colorValue === "dark") {
        alert("Please note: The dark theme is currently under development and may have issues.")
    }
};

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', function () {
        if (this.checked) {
            const colorValue = this.value;
            localStorage.setItem(themeStorageKey, colorValue);
            applySelectedTheme(colorValue);
        }
    });
});

const userTextDiv = document.getElementById("userText");
const storedValue = localStorage.getItem("userText");
if (storedValue) {
    userTextDiv.textContent = storedValue;
}
userTextDiv.addEventListener("input", function () {
    localStorage.setItem("userText", userTextDiv.textContent);
});

const element = document.getElementById("toolsCont");
const shortcuts = document.getElementById("shortcutsContainer");
document.getElementById("0NIHK").onclick = () => {

    if (element.style.display === "flex") {
        shortcuts.style.display = 'flex';
        element.style.opacity = "0";
        element.style.gap = "0";
        element.style.transform = "translateX(-100%)";
        setTimeout(() => {
            element.style.display = "none";
        }, 500);
    } else {
        shortcuts.style.display = 'none';
        element.style.display = "flex";
        setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateX(0)";
        }, 1);
        setTimeout(() => {
            element.style.gap = "12px";
        }, 300);
    }
}

const menuButton = document.getElementById("menuButton");
const menuBar = document.getElementById("menuBar");
const menuCont = document.getElementById("menuCont");
const optCont = document.getElementById("optCont");

const closeMenuBar = () => {
    setTimeout(() => {
        menuBar.style.opacity = 0
        menuCont.style.transform = "translateX(100%)"
    }, 14);
    setTimeout(() => {
        optCont.style.opacity = 1
        optCont.style.transform = "translateX(100%)"
    }, 7);
    setTimeout(() => {
        menuBar.style.display = "none";
    }, 555);
}
menuButton.addEventListener("click", () => {
    if (menuBar.style.display === 'none' || menuBar.style.display === '') {
        menuBar.style.display = "block";
        setTimeout(() => {
            menuBar.style.opacity = 1
            menuCont.style.transform = "translateX(0px)"
        }, 7);
        setTimeout(() => {
            optCont.style.opacity = 1
            optCont.style.transform = "translateX(0px)"
        }, 11);
    } else {
        menuBar.style.display = "none";
    }

    menuBar.addEventListener("click", (event) => {
        if (event.target === menuBar) {
            closeMenuBar()
        }
    });
});


document.getElementById("menuCloseButton").onclick = () => {
    closeMenuBar()
}

document.addEventListener("DOMContentLoaded", function () {
    const shortcuts = document.getElementById("shortcutsContainer");
    const aiToolsCont = document.getElementById("aiToolsCont");
    const shortcutsCheckbox = document.getElementById("shortcutsCheckbox");
    const aiToolsCheckbox = document.getElementById("aiToolsCheckbox");
    const fahrenheitCheckbox = document.getElementById("fahrenheitCheckbox");


    function saveCheckboxState(key, checkbox) {
        localStorage.setItem(key, checkbox.checked ? "checked" : "unchecked");
    }

    function loadCheckboxState(key, checkbox) {
        const savedState = localStorage.getItem(key);
        if (savedState === "checked") {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    }


    function saveDisplayStatus(key, displayStatus) {
        localStorage.setItem(key, displayStatus);
    }

    function loadDisplayStatus(key, element) {
        const savedStatus = localStorage.getItem(key);
        if (savedStatus === "flex") {
            element.style.display = "flex";
        } else {
            element.style.display = "none";
        }
    }

    loadCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
    loadCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
    loadDisplayStatus("shortcutsDisplayStatus", shortcuts);
    loadDisplayStatus("aiToolsDisplayStatus", aiToolsCont);
    loadCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);

    shortcutsCheckbox.addEventListener("change", function () {
        saveCheckboxState("shortcutsCheckboxState", shortcutsCheckbox);
        if (shortcutsCheckbox.checked) {
            shortcuts.style.display = "flex";
            saveDisplayStatus("shortcutsDisplayStatus", "flex");
        } else {
            shortcuts.style.display = "none";
            saveDisplayStatus("shortcutsDisplayStatus", "none");
        }
    });

    aiToolsCheckbox.addEventListener("change", function () {
        saveCheckboxState("aiToolsCheckboxState", aiToolsCheckbox);
        if (aiToolsCheckbox.checked) {
            aiToolsCont.style.display = "flex";
            saveDisplayStatus("aiToolsDisplayStatus", "flex");
        } else {
            aiToolsCont.style.display = "none";
            saveDisplayStatus("aiToolsDisplayStatus", "none");
        }
    });

    fahrenheitCheckbox.addEventListener("change", function () {
        saveCheckboxState("fahrenheitCheckboxState", fahrenheitCheckbox);
    });

});
