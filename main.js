import * as dictionary from "./js/dictionary.js";
import * as elements from "./js/elements.js";
import * as languageSelect from "./js/languageSelect.js";
import * as newTest from "./js/newTest.js";
import * as search from "./js/search.js";
import * as storage from "./js/storage.js";
import * as test from "./js/test.js";
import * as visibility from "./js/visibility.js";
import * as words from "./js/words.js";

console.log("icons from fontawesome btw");

let currentState = "words";
let previousState = undefined;

storage.initSaveData();

if (window.saveData.language == undefined)
    switchState("languageSelect")
else
    updateLanguage(window.saveData.language, true);

updateStateVisibility();
words.toggleTranslation();

function updateLanguage(language)
{
    const newLanguage = language != dictionary.currentLanguage;
    if (!newLanguage)
        return false;

    const newLanguageName = language[0].toUpperCase() + language.slice(1);
    const languageNameReplacements = document.getElementsByClassName("languageNameReplace");
    for (const element of languageNameReplacements)
    {
        let replace = dictionary.currentLanguageName ?? "{LANGUAGE}";
        element.innerHTML = element.innerHTML.replace(replace, newLanguageName);
    }
    dictionary.setCurrentDictionary(language);

    words.randomiseWord();
    words.updateEnglishToLanguage();
    
    return true;
}

function switchToTestState()
{
    if (!window.saveData.test[dictionary.currentLanguage])
    {
        switchState("newTest");
        return;
    }
    switchState("test");
}

function switchState(newState)
{
    if (newState == "previous")
        newState = previousState;

    if (currentState == newState)
        return;
    if (currentState == "test")
        test.unregisterKeydownEvent();

    previousState = currentState;
    currentState = newState;
    updateStateVisibility();
}

function updateStateVisibility()
{
    visibility.hideElement(words.parentElement);
    visibility.hideElement(test.parentElement);
    visibility.hideElement(newTest.parentElement);
    visibility.hideElement(search.parentElement);
    visibility.hideElement(languageSelect.parentElement);
    
    visibility.hideElement(elements.backButton);
    visibility.showElement(elements.languageButton, "inline");

    visibility.setElementVisibility(elements.sidebarButtons, window.saveData.language != undefined, "inline");

    switch (currentState)
    {
        case "words":
            visibility.showElement(words.parentElement);
            break;
        case "test":
            test.loadTestForCurrentLanguage();
            test.registerKeydownEvent();
            visibility.showElement(test.parentElement);
            break;
        case "newTest":
            englishToLanguageCheckbox.checked = window.saveData.englishToLanguage;
            visibility.showElement(newTest.parentElement);
            visibility.showElement(elements.backButton);
            break;
        case "search":
            visibility.showElement(search.parentElement);
            if (search.currentLanguageLoaded != dictionary.currentLanguage)
                requestAnimationFrame(search.changeElementsLanguage);
            break;
        case "languageSelect":
            visibility.hideElement(elements.languageButton);

            visibility.showElement(languageSelect.parentElement);
            if (window.saveData.language != undefined)
                visibility.showElement(elements.backButton)
            break;
    }
}

window.updateLanguage = updateLanguage;
window.switchState = switchState;
window.switchToTestState = switchToTestState;

document.getElementById("loading").remove();