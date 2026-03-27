import * as dictionary from "./js/dictionary.js";
import * as elements from "./js/elements.js";
import * as storage from "./js/storage.js";
import * as test from "./js/test.js";
import * as visibility from "./js/visibility.js";
import * as words from "./js/words.js";

let currentState = "words";
let previousState = undefined;

storage.initSaveData();
updateStateVisibility();
words.toggleTranslation();

if (window.saveData.language == undefined)
    switchState("languageSelect")
else
    selectLanguage(window.saveData.language, true);

function selectLanguage(language, init = false)
{
    const newLanguageName = language[0].toUpperCase() + language.slice(1);
    if (!init)
    {
        window.saveData.language = language;
        storage.writeSettings();

        currentState = previousState;
        updateStateVisibility();
    }

    const languageNameReplacements = document.getElementsByClassName("languageNameReplace");
    for (const element of languageNameReplacements)
    {
        let replace = dictionary.currentLanguageName ?? "{LANGUAGE}";
        element.innerHTML = element.innerHTML.replace(replace, newLanguageName);
    }
    dictionary.setCurrentDictionary(language);

    words.randomiseWord();
    words.updateEnglishToLanguage();
}

function toggleDarkMode()
{
    window.saveData.darkMode = !window.saveData.darkMode;
    storage.updateSettingsDisplay();
    storage.writeSettings();
}

function switchState(newState)
{
    if (currentState == newState)
        return;

    previousState = currentState;
    currentState = newState;
    updateStateVisibility();
}

function updateStateVisibility()
{
    visibility.hideElement(words.parentElement);
    visibility.hideElement(test.parentElement);
    visibility.hideElement(elements.languageSelect);

    visibility.showElement(elements.languageButton, "inline");
    
    switch (currentState)
    {
        case "words":
            visibility.showElement(words.parentElement);
            break;
        case "test":
            visibility.showElement(test.parentElement);
            break;
        case "languageSelect":
            visibility.hideElement(elements.languageButton);

            visibility.showElement(elements.languageSelect);
            break;
    }
}

window.selectLanguage = selectLanguage;
window.toggleDarkMode = toggleDarkMode;
window.switchState = switchState;

document.getElementById("loading").remove();