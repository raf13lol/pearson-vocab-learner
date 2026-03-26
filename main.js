import dictionary from "./js/dictionary.js";

document.getElementById("testDictionary").innerText = dictionary.french[Math.floor(Math.random() * dictionary.french.length)];