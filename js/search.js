import * as dictionary from "./dictionary.js";
import * as visibility from "./visibility.js";

export const parentElement = document.getElementById("search");
const searchBarElement = document.getElementById("searchBar");

const searchMeaningElement = document.getElementById("searchMeaning");
const searchWordElement = document.getElementById("searchWord");
const searchWordClassElement = document.getElementById("searchWordClass");

const searchLoadingElement = document.getElementById("searchLoading");
const searchNoQueryElement = document.getElementById("searchNoQuery");
const searchNoResultsElement = document.getElementById("searchNoResults");

const searchResultsElement = document.getElementById("searchResults");
const searchResultTableElement = document.getElementById("searchResultTable");

export let currentLanguageLoaded = undefined;

let loadedElements = [];
let toBeShown = [];
let shownElements = [];

let currentSearch = "";
let currentFilter = "meaning";
let largestDictionaryLength = 0;

let loading = false;

function reloadSearchBarInput()
{
    const search = searchBarElement.value.trim();
    if (currentSearch == search)
        return;
    currentSearch = search;
    reloadSearch();
}

function reloadFilter()
{
    if (!!document.querySelector("#searchMeaning:checked"))
        currentFilter = "meaning";
    else if (!!document.querySelector("#searchWord:checked"))
        currentFilter = "word";
    else if (!!document.querySelector("#searchWordClass:checked"))
        currentFilter = "wordClass";
    else
        searchMeaningElement.click();
    reloadSearch();
}

function reloadSearch()
{
    if (loading)
        return;
    if (currentSearch.length == 0)
    {
        visibility.hideElement(searchNoResultsElement);
        visibility.hideElement(searchResultsElement);
        visibility.showElement(searchNoQueryElement);
        return;
    }
    visibility.hideElement(searchNoQueryElement);

    const words = dictionary.currentDictionary;
    let index = 0;
    switch (currentFilter)
    {
        case "meaning":
            index = 0;
            break;
        case "word":
            index = 1;
            break;
        case "wordClass":
            index = 2;
            break;
    }

    toBeShown = [];
    
    const allResults = currentSearch == "*";
    let anyResults = allResults;
    let isOdd = true;
    for (let i = 0; i < words.length; i++)
    {
        let show = allResults || words[i][index].includes(currentSearch);
        if (show)
        {
            show += !(isOdd = !isOdd);
            anyResults = true;
        }
        toBeShown[i] = show;
    }

    if (!anyResults)
    {
        visibility.hideElement(searchResultsElement);
        visibility.showElement(searchNoResultsElement);
        return;
    }
    visibility.hideElement(searchNoResultsElement);

    visibility.showElement(searchResultsElement);
    reloadElements();
}

export function changeElementsLanguage()
{
    const words = dictionary.currentDictionary;
    loading = true;

    visibility.hideElement(searchResultsElement);
    visibility.hideElement(searchNoQueryElement);
    visibility.hideElement(searchNoResultsElement);
    visibility.showElement(searchLoadingElement);

    loadedElements = [];

    requestAnimationFrame(() => {
        let html = "";
        for (let i = 0; i < words.length; i++)
        {
            const wordInfo = words[i];
            html += `<tr><td>${wordInfo[0]}</td><td>${wordInfo[1]}</td><td>${wordInfo[2]}</td></tr>`;
        }

        loading = false;
        searchResultTableElement.innerHTML = html;
        currentLanguageLoaded = dictionary.currentLanguage; 

        requestAnimationFrame(() => {
            visibility.hideElement(searchLoadingElement);
            reloadSearch();
        });
    });
}

function reloadElements()
{
    if (loading)
        return;

    const words = dictionary.currentDictionary;
    const children = searchResultTableElement.children;

    let i;
    for (i = 0; i < words.length; i++)
    {
        const show = toBeShown[i];
        if (show == shownElements[i])
            continue;
        if (!loadedElements[i])
            loadedElements[i] = children[i];

        visibility.setElementVisibility(loadedElements[i], show, 'table-row');
        
        if (show)
            loadedElements[i].className = (show == 2) ? "odd-row" : "";
    }

    shownElements = [...toBeShown];

    for (; i < largestDictionaryLength; i++)
        visibility.hideElement(loadedElements[i]);
}

reloadFilter();

searchBarElement.oninput = reloadSearchBarInput;
searchMeaningElement.oninput = reloadFilter;
searchWordElement.oninput = reloadFilter;
searchWordClassElement.oninput = reloadFilter;