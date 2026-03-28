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

   const mode = window.saveData.darkMode ? "dark" : "light";
   lightModeButton.src = `./assets/from-${mode}-mode.png`;
   languageButton.src = `./assets/lang-${mode}-mode.png`;
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
    loadDefaultValue("isWIPSaveData", true);

    // TODO: uncomment when released
    // if (window.saveData.isWIPSaveData)
    // {
    //     localStorage.setItem("data", "{}");
    //     saveOrWriteData(false);
    // }
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