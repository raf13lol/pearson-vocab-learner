export function shuffle(array, count = -1)
{
    array = [... array];

    if (count < 0)
        count += array.length + 1;

    let currentIndex = array.length;
    let whileCount = count;
    while (whileCount-- > 0)
    {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[randomIndex], array[currentIndex]] = [array[currentIndex], array[randomIndex]];
    }

    return array.slice(array.length - count);
}