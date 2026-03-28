import * as array from "./array.js";
import * as dictionary from "./dictionary.js";
import * as storage from "./storage.js";
import * as visibility from "./visibility.js";

export const parentElement = document.getElementById("test");
const progressElement = document.getElementById("testProgress");
const questionElement = document.getElementById("testQuestion");
const buttonsElement = document.getElementById("testButtons");

let onInputHandler = undefined;
let testInfo = undefined;
let answerSubmitted = false;

export function updateTestInfo()
{
    testInfo = window.saveData.test[dictionary.currentLanguage];
}

export function initTestForLanguage(language, difficulty)
{
    if (!window.saveData.test[language])
        newTestForLanguage(language, difficulty, true);

    updateTestInfo();
    generateButtons(window.saveData.test[language].difficulty);
    updateDisplay();
}
export function newTestForLanguage(language, difficulty)
{
    const languageDictionary = dictionary.default[language];
    let previousTestInfo = window.saveData.test[language] ?? {};
    if (previousTestInfo.difficulty != difficulty)
        previousTestInfo = {};

    const indices = [];
    for (let i = 0; i < languageDictionary.length; i++)
        indices.push(i);

    window.saveData.test[language] = {
        words: array.shuffle(indices),
        options: [],
        index: 0,
        correctIndex: 0,
        streak: previousTestInfo.streak ?? 0,
        difficulty: difficulty,
    }
    generateQuestion();
    storage.writeSettings();
}

export function generateQuestion()
{
    const correctIndex = Math.floor(Math.random() * testInfo.difficulty);
    // prevent repeat correct answers via the toSpliced
    testInfo.options = array.shuffle(testInfo.words.toSpliced(testInfo.index, 1), testInfo.difficulty);
    testInfo.options[correctIndex] = testInfo.words[testInfo.index];
    testInfo.correctIndex = correctIndex;
    storage.writeSettings();
}

export function generateButtons(buttonCount)
{
    for (let i = 0; i < Math.max(buttonCount, buttonsElement.children.length); i++)
    {
        if (i >= buttonCount)
        {
            buttonsElement.children[i].remove();
            continue;
        }
        const buttonElement = document.createElement("button");

        buttonElement.onclick = submitAnswer.bind(undefined, i);
        buttonsElement.appendChild(buttonElement);
    }
}

function submitAnswer(answerIndex)
{
    if (answerSubmitted)
        return;
    // needed for if delay is enabled
    const correctIndex = testInfo.correctIndex;
    const isCorrect = answerIndex == correctIndex;
    if (isCorrect)
    {
        testInfo.streak++;
        testInfo.index++;
    }
    else
    {
        const removedIndex = testInfo.words.splice(testInfo.index, 1)[0];
        testInfo.words.push(removedIndex);
        testInfo.streak = 0;
    }

    generateQuestion();

    if (window.saveData.noDelay)
    {
        updateDisplay();
        return;
    }
    answerSubmitted = true;
    
    // if right answer, class will get overwritten
    buttonsElement.children[answerIndex].className = "incorrect-answer";
    buttonsElement.children[correctIndex].className = "correct-answer";
    setTimeout(() => {
        answerSubmitted = false;
        updateDisplay();
    }, 1000);
}

function updateDisplay()
{
    progressElement.innerText = `${testInfo.index + 1}/${dictionary.currentDictionary.length}`;
    questionElement.innerText = dictionary.currentDictionary[testInfo.words[testInfo.index]][1];

    for (let i = 0; i < testInfo.difficulty; i++)
    {
        const button = buttonsElement.children[i]; 
        button.innerText = dictionary.currentDictionary[testInfo.options[i]][0];
        button.className = "";
    }
}

function keydownEvent(ev)
{
    let keyCode = ev.keyCode;
    if (keyCode >= 97)
        keyCode -= 97 - 49;

    let answerIndex = keyCode - 49;
    if (answerIndex < 0 || answerIndex >= testInfo.difficulty) 
        return;
    submitAnswer(answerIndex);
}

export function registerKeydownEvent()
{
    addEventListener("keydown", keydownEvent, {capture: true});
}

export function unregisterKeydownEvent()
{
    removeEventListener("keydown", keydownEvent, {capture: true});
}

window.submitAnswer = submitAnswer;