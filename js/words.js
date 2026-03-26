import { currentDictionary, currentLanguageName } from "./dictionary.js";
import { hideElement, showElement } from "./element.js";
import { updateStorage } from "./storage.js";

const wordsElement = document.getElementById("words");
const currentWordElement = document.getElementById("currentWord");
const currentWordTranslationElement = document.getElementById("currentWordTranslation");
const englishToLanguageElement = document.getElementById("englishToLanguage");

let translationHidden = false;

export function showWords()
{
    showElement(wordsElement);
}

export function hideWords()
{
    hideElement(wordsElement);
}

export function randomiseWord()
{
    const randomWord = currentDictionary[Math.floor(Math.random() * currentDictionary.length)];
    const wordIndex = window.saveData.englishToLanguage ? 0 : 1;
    currentWordElement.innerText = randomWord[wordIndex];
    currentWordTranslationElement.innerText = randomWord[1 - wordIndex];
}

export function toggleTranslation()
{
    translationHidden = !translationHidden;
    currentWordTranslationElement.style = translationHidden ? "display: none;" : "display: block";
}

export function toggleEnglishToLanguage()
{
    window.saveData.englishToLanguage = !window.saveData.englishToLanguage;
    updateStorage();
    randomiseWord();
    updateEnglishToLanguage();
}

export function updateEnglishToLanguage()
{
    const etl = window.saveData.englishToLanguage;
    const left = etl ? currentLanguageName : "English";
    const right = etl ? "English" : currentLanguageName;

    englishToLanguageElement.innerText = `Switch to ${left}->${right}`;
}

window.randomiseWord = randomiseWord;
window.toggleTranslation = toggleTranslation;
window.toggleEnglishToLanguage = toggleEnglishToLanguage;