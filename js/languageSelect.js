import * as storage from "./storage.js";

export const parentElement = document.getElementById("languageSelect");

function selectLanguage(language)
{
    if (window.updateLanguage(language))
    {
        window.saveData.language = language;
        storage.writeSettings();
    }

    window.switchState("previous");
}

window.selectLanguage = selectLanguage;