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

export function updateSettingsDisplay()
{
   root.dataset.lightMode = window.saveData.darkMode ? 0 : 1;

   const mode = window.saveData.darkMode ? "dark" : "light";
   languageButton.src = `./assets/lang-${mode}-mode.png`;
   lightModeButton.src = `./assets/from-${mode}-mode.png`;
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
}

function loadDefaultValue(key, defaultValue)
{
    window.saveData[key] = window.saveData[key] ?? defaultValue;
}