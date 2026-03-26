import { hideElement, showElement } from "./element.js";
import { overlay } from "./overlay.js";

export const languageSelection = document.getElementById("languageSelection");

export function openLanguageSelection(withOverlay = true)
{
    languageSelection.style = "display: block";
    if (withOverlay)
        showElement(overlay);
}

export function hideLanguageSelection(withOverlay = true)
{
    languageSelection.style = "display: none";
    hideElement(overlay);
}