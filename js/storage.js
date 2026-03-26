export function initSaveData()
{
    window.saveData = {};
    saveLoadData(false);
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
    saveLoadSetting(write, "darkMode", true);
    saveLoadSetting(write, "noDelay", false);
}

function saveLoadSetting(write, key, defaultValue)
{
    if (write)
    {
        localStorage.setItem(key, window.saveData[key]);
        return;
    }
    window.saveData[key] = localStorage.getItem(key) ?? defaultValue;
}