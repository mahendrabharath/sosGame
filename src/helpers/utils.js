export const getSurroundingCells = (x, y, width, height) => {
    const surroundingCells = [];

    surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
    surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
    surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
    surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key

    surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
    surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
    surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
    surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key

    return surroundingCells;
}

export const getSecondSurroundingCells = (x, y, width, height) => {
    const surroundCell2 = [];

    surroundCell2.push({ pos: 'top', key: `${x}-${y - height * 2}` }) // cell's top key
    surroundCell2.push({ pos: 'topRight', key: `${x + width * 2}-${y - height * 2}` }) // cell's top right corner key
    surroundCell2.push({ pos: 'right', key: `${x + width * 2}-${y}` }); // cell's right key
    surroundCell2.push({ pos: 'bottomRight', key: `${x + width * 2}-${y + height * 2}` }) // cell's bottom right corner key
    surroundCell2.push({ pos: 'bottom', key: `${x}-${y + height * 2}` }) // cell's bottom key
    surroundCell2.push({ pos: 'bottomLeft', key: `${x - width * 2}-${y + height * 2}` }) // cell's bottom left corner key
    surroundCell2.push({ pos: 'left', key: `${x - width * 2}-${y}` }); // cell's left key
    surroundCell2.push({ pos: 'topLeft', key: `${x - width * 2}-${y - height * 2}` }) // cell's top left corner key

    return surroundCell2;
}

export const copyData = obj => JSON.parse(JSON.stringify(obj));

// const surroundingCells = [];

// surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
// surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key
// surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
// surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
// surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key
// surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
// surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
// surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
// console.log('created in Cell',{ surroundingCells })




// const surroundCell2 = [];

// surroundCell2.push({ pos: 'top', key: `${x}-${y - height * 2}` }) // cell's top key
// surroundCell2.push({ pos: 'topRight', key: `${x + width * 2}-${y - height * 2}` }) // cell's top right corner key
// surroundCell2.push({ pos: 'right', key: `${x + width * 2}-${y}` }); // cell's right key
// surroundCell2.push({ pos: 'bottomRight', key: `${x + width * 2}-${y + height * 2}` }) // cell's bottom right corner key
// surroundCell2.push({ pos: 'bottom', key: `${x}-${y + height * 2}` }) // cell's bottom key
// surroundCell2.push({ pos: 'bottomLeft', key: `${x - width * 2}-${y + height * 2}` }) // cell's bottom left corner key
// surroundCell2.push({ pos: 'left', key: `${x - width * 2}-${y}` }); // cell's left key
// surroundCell2.push({ pos: 'topLeft', key: `${x - width * 2}-${y - height * 2}` }) // cell's top left corner key

// console.log({ surroundCell2 })


// for (const surrondKey of surroundingCells) {
//     setGlowClass(surrondKey, true)
// }

// for (const surrondKey of surroundCell2) {
//     setGlowClass(surrondKey, true)
// }

// setTimeout(() => {
//     for (const surrondKey of surroundingCells) {
//         setGlowClass(surrondKey, false)
//     }
// }, 1000);
