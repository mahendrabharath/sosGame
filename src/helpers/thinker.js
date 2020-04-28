/* steps for the nextMove
1. Get all the cells with 'S'
2. Get all the cells with 'O'
3. Have a seperate list of surrounding for each 'S' cells and 'O' cells,
4. In case of 'S' cells, try providing second level value and finding a match.
5. If a match is found by providing second level value, then go for it.
6. Else proform 4 and 5 for 'O' cells
7. If no match cell found then, provide an adjacent value to the S cell, i.e (if first cell is 'S' then provide the 4th cell with 'S')
8. If no 'S' is found then repeat the same step for 'O' 
9. If no 'S' or 'O' is available in the grid then, Provide a 'S' in a random place.
*/

import { getSurroundingCells, getThirdSurroundingCells, getSurroundingCellsByState } from "./utils";

const createSurroundingsForCells = (cells, type, patternRectWidth, patternRectHeight) => {
    const cellsSurrounding = [];

    for (var cell of cells) {
        const { x, y } = cell;
        const surroundingCells = getSurroundingCellsByState(type, x, y, patternRectWidth, patternRectHeight); // [];
        cellsSurrounding.push({ ...cell, surroundingCells })
    }
    return cellsSurrounding;
}

export const nextMoveByAI = (tracker, patternRectWidth, patternRectHeight) => {
    // console.log('Thinker', tracker);
    const cellsWithS = tracker.filter(el => el.value == 'S');
    const cellsWithO = tracker.filter(el => el.value == 'O');
    let sMatchs = [], oMatchs = [];
    const resultMoves = [];

    // if both 'S' and 'O' is empty then enter in random position.
    if (!cellsWithS.length && !cellsWithO.length) {
        const randIndex = Math.random() * tracker.length;
        const randVal = (Math.random() * 10) > 5 ? 'S' : 'O';
        const randomCell = tracker[randIndex];
        randomCell.value = randVal;
        sMatchs = randomCell;
        resultMoves.push(randomCell);
        // return { sMatchs, oMatchs }
        return resultMoves;
    }


    // --- check if there is a SOS match
    const cellsSurroundingS = createSurroundingsForCells(cellsWithS, 'S', patternRectWidth, patternRectHeight);
    const cellsSurroundingO = createSurroundingsForCells(cellsWithO, 'O', patternRectWidth, patternRectHeight);

    for (let i = 0; i < cellsSurroundingO.length; i++) {
        const { x, y, value, surroundingCells } = cellsSurroundingO[i];
        const strokePoints = checkMatchByVal(tracker, x, y, value, surroundingCells);
        cellsSurroundingO[i].strikePoints = strokePoints;
        resultMoves.push(...strokePoints);
    }

    for (let i = 0; i < cellsSurroundingS.length; i++) {
        const { x, y, value, surroundingCells } = cellsSurroundingS[i];
        const strokePoints = checkMatchByVal(tracker, x, y, value, surroundingCells, patternRectWidth, patternRectHeight);
        cellsSurroundingS[i].strikePoints = strokePoints;
        resultMoves.push(...strokePoints);
    }
    // --- check if there is a SOS match


    // console.log('AI moves are ', cellsSurroundingO, cellsSurroundingS);
    // const sMatchs = cellsSurroundingS.strikePoints;
    // const oMatchs = cellsSurroundingO.strikePoints;
    // resultMoves.push(...cellsSurroundingS.map(el => el.strikePoints), ...cellsSurroundingO.map(el => el.strikePoints))

    // if resultMoves is empty, means that there are no 'SOS' match, so provie a casual move.
    if (!resultMoves.length) {
        const allUserEnteredCells = [];
        allUserEnteredCells.push(
            ...cellsSurroundingS.filter(el => el.player !== 'Siri'), // .map(el => el.surroundingCells),
            ...cellsSurroundingO.filter(el => el.player !== 'Siri') // .map(el => el.surroundingCells)
        )

        const casualMoveCell = checkDefenceMove(tracker);
        const attackMoveCell = attackMove(tracker, allUserEnteredCells, patternRectWidth, patternRectHeight)
        // console.log('casual move ', casualMoveCell, ' attack move ', attackMoveCell);
        if (Math.random() * 10 > 5 && attackMoveCell.length) { // randomly attack, else find an empty cell and provide value
            resultMoves.push(...attackMoveCell)
        } else {
            resultMoves.push(...casualMoveCell)
        }
    }
    // return { sMatchs, oMatchs }
    return resultMoves;
}


const checkMatchByVal = (tracker, x, y, selVal, surroundingCells) => {
    const pairVal = selVal === 'S' ? 'O' : 'S';
    const tempStrikePoints = [];
    for (let i = 0; i < surroundingCells.length; i += 2) {
        const s1 = surroundingCells[i]
        const s2 = surroundingCells[i + 1];
        // debugger
        const eleIndex1 = tracker.findIndex(el => el.key === s1.key);
        const eleIndex2 = tracker.findIndex(el => el.key === s2.key);
        if (eleIndex1 < 0 || eleIndex2 < 0) continue;

        // checks if the one of the cells are with matching values. like '(SO^), (S^S), (^OS)' and the TOP and Bottom match,
        // it even checks if the selected value is 'S' then it matches for 'SOS' in diagon order.
        if ((tracker[eleIndex1].value == pairVal && tracker[eleIndex2].value == '') ||
            (tracker[eleIndex1].value == '' && tracker[eleIndex2].value == pairVal)
            ||
            (selVal == 'S' && (tracker[eleIndex1].value == '' && tracker[eleIndex2].value == selVal))
            ) {
            // getting the empty cell, so that AI can fillin the value and create a match;
            const predictEle = tracker[eleIndex1].value == '' ? tracker[eleIndex1] : tracker[eleIndex2];
            predictEle.value = pairVal;
            tempStrikePoints.push(predictEle);
            // console.log('******* First level match found at ', tracker[eleIndex1], tracker[eleIndex2], '*******')
        } // end of if
    }

    return tempStrikePoints;
}

const checkDefenceMove = (tracker) => {
    const cell = tracker.find(el => !el.value)
    cell.value = Math.random() * 10 > 5 ? 'S' : 'O';
    return [cell];
}

const attackMove = (tracker, allUserEnteredCells, patternRectWidth, patternRectHeight) => {
    // loops through all the user entered cells
    for (var cell of allUserEnteredCells) {
        const { x, y, value } = cell;
        // gets the 3rd position from a user entered cell.
        const surroundingCells = getThirdSurroundingCells(x, y, patternRectWidth, patternRectHeight);
        for (var surroundCell of surroundingCells) {
            const aiMoveEle = tracker.find(el => el.key == surroundCell.key);
            // if the 3rd position cell is not found or has a value already, then find next cell, or else return this cell.
            if (!aiMoveEle || aiMoveEle.value) continue;
            aiMoveEle.value = value; // sets the same value as user entered value;
            return [aiMoveEle];
        } // end of for - 2 
    } // end of for - 1

    return [];
}
