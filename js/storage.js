export function initSaveData()
{
    window.saveData = {};
    saveOrWriteData(false);
    writeSettings();
    updateSettingsDisplay();
}

const root = document.getElementsByTagName("html")[0];
const lightModeButton = document.getElementById("lightModeButton");
const languageButton = document.getElementById("languageButton");
const noDelayButton = document.getElementById("noDelayButton");

export function updateSettingsDisplay()
{
   root.dataset.lightMode = window.saveData.darkMode ? 0 : 1;

   lightModeButton.src = `./assets/${window.saveData.darkMode ? "sun" : "moon"}-regular-full.svg`;
   languageButton.src = `./assets/language-${window.saveData.darkMode ? "dark" : "light"}-full.svg`;

   noDelayButton.innerText = (window.saveData.noDelay ? "Enable" : "Disable") + " next-question delay"; 
}

export function writeSettings()
{
    saveOrWriteData(true);
}

function saveOrWriteData(write)
{
    if (write)
    {
        localStorage.setItem("data", JSON.stringify(window.saveData));
        return;
    }
    
    window.saveData = JSON.parse(localStorage.getItem("data") ?? "{}");
    loadDefaultValue("darkMode", true);
    loadDefaultValue("noDelay", false);
    loadDefaultValue("language", undefined);
    loadDefaultValue("englishToLanguage", false);
    loadDefaultValue("test", {});
}

function loadDefaultValue(key, defaultValue)
{
    window.saveData[key] = window.saveData[key] ?? defaultValue;
}

function toggleDarkMode()
{
    window.saveData.darkMode = !window.saveData.darkMode;
    updateSettingsDisplay();
    writeSettings();
}

function toggleNoDelay()
{
    window.saveData.noDelay = !window.saveData.noDelay;
    updateSettingsDisplay();
    writeSettings();
}

window.toggleDarkMode = toggleDarkMode;
window.toggleNoDelay = toggleNoDelay;