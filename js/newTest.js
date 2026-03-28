import * as dictionary from "./dictionary.js";
import * as test from "./test.js";

export const parentElement = document.getElementById("newTest");
export const englishToLanguageCheckbox = document.getElementById("englishToLanguageCheckbox");

function createNewTest(difficulty)
{
    test.newTestForLanguage(dictionary.currentLanguage, difficulty, !!document.querySelector("#englishToLanguageCheckbox:checked"));
    window.switchState("test");
}

window.createNewTest = createNewTest;