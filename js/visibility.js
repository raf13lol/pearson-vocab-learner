export function showElement(element, displayStyle = 'block')
{
    element.style = `display: ${displayStyle}`;
}

export function hideElement(element)
{
    element.style = "display: none";
}

export function setElementVisibility(element, visible, displayStyle = 'block')
{
    if (visible)
        showElement(element, displayStyle);
    else
        hideElement(element);
}