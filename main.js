import * as dictionary from "./js/dictionary.js";
import * as languageSelection from "./js/languageSelection.js";
import * as storage from "./js/storage.js";
import * as visibility from "./js/visibility.js";
import * as words from "./js/words.js";

storage.initSaveData();
visibility.hideElement(languageSelection.element);
words.toggleTranslation();

if (window.saveData.language == undefined)
    openLanguageSelect();
else
    selectLanguage(window.saveData.language, true);

function selectLanguage(language, loading = false)
{
    const newLanguageName = language[0].toUpperCase() + language.slice(1);
    if (!loading)
    {
        window.saveData.language = language;
        storage.writeSettings();

        visibility.hideElement(languageSelection.element);
        visibility.showElement(words.parentElement);
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

function openLanguageSelect()
{
    visibility.showElement(languageSelection.element);
    visibility.hideElement(words.parentElement);
}

function toggleDarkMode()
{
    window.saveData.darkMode = !window.saveData.darkMode;
    storage.updateSettingsDisplay();
    storage.writeSettings();
}

window.selectLanguage = selectLanguage;
window.openLanguageSelect = openLanguageSelect;
window.toggleDarkMode = toggleDarkMode;

document.getElementById("loading").remove();