export function initSaveData()
{
    window.saveData = {};
    saveOrWriteData(false);
    writeSettings();
    updateSettingsDisplay();
}

export function updateSettingsDisplay()
{
    document.getElementsByTagName("html")[0].dataset.lightMode = window.saveData["darkMode"] ? 0 : 1;
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