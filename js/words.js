import * as dictionary from "./dictionary.js";
import * as storage from "./storage.js";
import * as visibility from "./visibility.js";

export const parentElement = document.getElementById("words");
const currentWordElement = document.getElementById("currentWord");
const currentWordTranslationElement = document.getElementById("currentWordTranslation");
const englishToLanguageElement = document.getElementById("englishToLanguage");

let translationHidden = false;
let currentWordClass = undefined;

export function randomiseWord()
{
    const randomWord = dictionary.currentDictionary[Math.floor(Math.random() * dictionary.currentDictionary.length)];
    const wordIndex = window.saveData.englishToLanguage ? 0 : 1;

    currentWordElement.innerText = randomWord[wordIndex];
    currentWordTranslationElement.innerText = randomWord[1 - wordIndex];
    currentWordClass = randomWord[2];
     // refresh text properly
    toggleTranslation();
    toggleTranslation();
}

export function toggleTranslation()
{
    const wordClassReplacement = "\n" + currentWordClass;
    const elementWithWordClass = window.saveData.englishToLanguage ? currentWordTranslationElement : currentWordElement;

    translationHidden = !translationHidden;
    elementWithWordClass.innerText = elementWithWordClass.innerText.replace(wordClassReplacement, "");

    if (translationHidden)
        visibility.hideElement(currentWordTranslationElement);
    else
    {
        visibility.showElement(currentWordTranslationElement)
        elementWithWordClass.innerText += wordClassReplacement;
    }
}

export function toggleEnglishToLanguage()
{
    window.saveData.englishToLanguage = !window.saveData.englishToLanguage;
    storage.writeSettings();
    updateEnglishToLanguage();

    randomiseWord();
   
}

export function updateEnglishToLanguage()
{
    const etl = window.saveData.englishToLanguage;
    const left = etl ? dictionary.currentLanguageName : "English";
    const right = etl ? "English" : dictionary.currentLanguageName;

    englishToLanguageElement.innerText = `Switch to ${left}->${right}`;
}

window.randomiseWord = randomiseWord;
window.toggleTranslation = toggleTranslation;
window.toggleEnglishToLanguage = toggleEnglishToLanguage;