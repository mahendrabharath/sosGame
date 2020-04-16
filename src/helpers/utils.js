export const getSurroundingCells = (x, y, width, height) => {
    const surroundingCells = [];

    surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
    surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
    surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
    surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key

    surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
    surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
    surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
    surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key

    return surroundingCells;
}