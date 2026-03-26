import dictionary, { currentDictionary, currentLanguageName, setCurrentDictionary } from "./js/dictionary.js";
import { hideElement } from "./js/element.js";
import { hideLanguageSelection, openLanguageSelection } from "./js/languageSelection.js";
import { overlay } from "./js/overlay.js";
import { initSaveData, updateStorage } from "./js/storage.js";
import { hideWords, randomiseWord, showWords, toggleTranslation, updateEnglishToLanguage } from "./js/words.js";

initSaveData();
hideElement(overlay);
hideLanguageSelection();
toggleTranslation();

if (window.saveData.language == undefined)
{
    openLanguageSelection(false);
    hideWords();
}
else
    selectLanguage(window.saveData.language, true);


function selectLanguage(language, loading = false)
{
    const newLanguageName = language[0].toUpperCase() + language.slice(1);
    if (!loading)
    {
        hideLanguageSelection();
        window.saveData.language = language;
        updateStorage();
        showWords();
    }

    const languageNameReplacements = document.getElementsByClassName("languageNameReplace");
    for (const element of languageNameReplacements)
    {
        let replace = currentLanguageName ?? "{LANGUAGE}";
        element.innerHTML = element.innerHTML.replace(replace, newLanguageName);
    }
    setCurrentDictionary(language);

    randomiseWord();
    updateEnglishToLanguage();
}

window.selectLanguage = selectLanguage;
window.openLanguageSelection = openLanguageSelection;

document.getElementById("loading").remove();