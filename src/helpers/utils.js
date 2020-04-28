const r = num => num - Math.floor(num) === 0 ? num : num.toFixed(2);

const roundCordinatesInKeys = (ele) => {
    const { key } = ele;
    const roundedKey = key.split('-').map(el => r(Number(el))).join('-')
    ele.key = roundedKey;
    return ele
}

export const getSurroundingCells = (x, y, width, height) => {
    let surroundingCells = [];

    surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
    surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
    surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
    surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key

    surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
    surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
    surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
    surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key

    surroundingCells = surroundingCells.map(roundCordinatesInKeys)
    return surroundingCells;
}

export const getSecondSurroundingCells = (x, y, width, height) => {
    let surroundCell2 = [];

    surroundCell2.push({ pos: 'top', key: `${x}-${y - height * 2}` }) // cell's top key
    surroundCell2.push({ pos: 'topRight', key: `${x + width * 2}-${y - height * 2}` }) // cell's top right corner key
    surroundCell2.push({ pos: 'right', key: `${x + width * 2}-${y}` }); // cell's right key
    surroundCell2.push({ pos: 'bottomRight', key: `${x + width * 2}-${y + height * 2}` }) // cell's bottom right corner key
    surroundCell2.push({ pos: 'bottom', key: `${x}-${y + height * 2}` }) // cell's bottom key
    surroundCell2.push({ pos: 'bottomLeft', key: `${x - width * 2}-${y + height * 2}` }) // cell's bottom left corner key
    surroundCell2.push({ pos: 'left', key: `${x - width * 2}-${y}` }); // cell's left key
    surroundCell2.push({ pos: 'topLeft', key: `${x - width * 2}-${y - height * 2}` }) // cell's top left corner key
    
    surroundCell2 = surroundCell2.map(roundCordinatesInKeys)

    return surroundCell2;
}

export const copyData = obj => JSON.parse(JSON.stringify(obj));

export const getSurroundingCellsByState = (type, x, y, width, height) => {
    let surroundingCells = [];
    if (type === 'S') {
        // A set of positions around (x,y) for 2 cells, Ex:. Top cell and 2ndTop cell from (x,y)
        surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
        surroundingCells.push({ pos: 'right2', key: `${x + width * 2}-${y}` }); // cell's right key
        surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
        surroundingCells.push({ pos: 'left2', key: `${x - width * 2}-${y}` }); // cell's left key
        surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
        surroundingCells.push({ pos: 'top2', key: `${x}-${y - height * 2}` }) // cell's top key
        surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key
        surroundingCells.push({ pos: 'bottom2', key: `${x}-${y + height * 2}` }) // cell's bottom key

        surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
        surroundingCells.push({ pos: 'bottomRight2', key: `${x + width * 2}-${y + height * 2}` }) // cell's bottom right corner key
        surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
        surroundingCells.push({ pos: 'topLeft2', key: `${x - width * 2}-${y - height * 2}` }) // cell's top left corner key
        surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
        surroundingCells.push({ pos: 'bottomLeft2', key: `${x - width * 2}-${y + height * 2}` }) // cell's bottom left corner key
        surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key
        surroundingCells.push({ pos: 'topRight2', key: `${x + width * 2}-${y - height * 2}` }) // cell's top right corner key

        surroundingCells = surroundingCells.map(roundCordinatesInKeys)

        return surroundingCells;
    }

    // const surroundingCells = [];
    // For 'O' cell match, we need to check only one level, so 3nd top is avoided. as 'O' is in middle of two 'S'
    surroundingCells.push({ pos: 'right', key: `${x + width}-${y}` }); // cell's right key
    surroundingCells.push({ pos: 'left', key: `${x - width}-${y}` }); // cell's left key
    surroundingCells.push({ pos: 'top', key: `${x}-${y - height}` }) // cell's top key
    surroundingCells.push({ pos: 'bottom', key: `${x}-${y + height}` }) // cell's bottom key

    surroundingCells.push({ pos: 'bottomRight', key: `${x + width}-${y + height}` }) // cell's bottom right corner key
    surroundingCells.push({ pos: 'topLeft', key: `${x - width}-${y - height}` }) // cell's top left corner key
    surroundingCells.push({ pos: 'bottomLeft', key: `${x - width}-${y + height}` }) // cell's bottom left corner key
    surroundingCells.push({ pos: 'topRight', key: `${x + width}-${y - height}` }) // cell's top right corner key

    surroundingCells = surroundingCells.map(roundCordinatesInKeys)

    return surroundingCells;
}


export const getThirdSurroundingCells = (x, y, width, height) => {
    const surroundCell2 = [];


    surroundCell2.push({ pos: 'top', key: `${x}-${r(y - height * 3)}` }) // cell's top key
    surroundCell2.push({ pos: 'topRight', key: `${r(x + width * 3)}-${r(y - height * 3)}` }) // cell's top right corner key
    surroundCell2.push({ pos: 'right', key: `${r(x + width * 3)}-${y}` }); // cell's right key
    surroundCell2.push({ pos: 'bottomRight', key: `${r(x + width * 3)}-${r(y + height * 3)}` }) // cell's bottom right corner key
    surroundCell2.push({ pos: 'bottom', key: `${x}-${r(y + height * 3)}` }) // cell's bottom key
    surroundCell2.push({ pos: 'bottomLeft', key: `${r(x - width * 3)}-${r(y + height * 3)}` }) // cell's bottom left corner key
    surroundCell2.push({ pos: 'left', key: `${r(x - width * 3)}-${y}` }); // cell's left key
    surroundCell2.push({ pos: 'topLeft', key: `${r(x - width * 3)}-${r(y - height * 3)}` }) // cell's top left corner key

    return surroundCell2;
}

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
