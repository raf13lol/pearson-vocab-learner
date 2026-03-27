export function showElement(element, displayStyle = 'block')
{
    element.style = `display: ${displayStyle}`;
}

export function hideElement(element)
{
    element.style = "display: none";
}