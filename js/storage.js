export function initSaveData()
{
    window.saveData = {};
    saveLoadData(false);
    updateStorage();
    updateSettings();
}

export function updateSettings()
{
    document.getElementsByTagName("html")[0].dataset.lightMode = window.saveData["darkMode"] ? 0 : 1;
}

export function updateStorage()
{
    saveLoadData(true);
}

function saveLoadData(write)
{
    if (write)
        localStorage.setItem("data", JSON.stringify(window.saveData));
    else
        window.saveData = JSON.parse(localStorage.getItem("data") ?? "{}");
    
    loadDefaultValue("darkMode", true);
    loadDefaultValue("noDelay", false);
    loadDefaultValue("language", undefined);
    loadDefaultValue("higherTier", true);
    loadDefaultValue("englishToLanguage", false);
}

function loadDefaultValue(key, defaultValue)
{
    window.saveData[key] = window.saveData[key] ?? defaultValue;
}