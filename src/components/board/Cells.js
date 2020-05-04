import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { getSurroundingCells, copyData, getSecondSurroundingCells, AIName } from '../../helpers/utils';
import { nextMoveByAI } from '../../helpers/thinker';

// cell style
const patternRectStyle = {
    style: {
        fill: '#f0f8ff08',
        stroke: 'aquamarine',
        strokeWidth: '2px'
    }
}

// on hover cell style
const patternRectHoverStyle = {
    style: {
        fill: 'rgba(136, 206, 173, 0.96)',
        stroke: 'aquamarine',
        strokeWidth: '7px'
    }
}

// component for gathering all the cells.
const Cells = props => {
    const { start, boardWidth, boardHeight, patternRectHeight, patternRectWidth, changePlayer, player, setScoreToPlayer, score } = props;
    let tempCells = [];
    const [tracker, setTracker] = useState([]);
    const [renderCount, setRenderCount] = useState(0)
    const [siriContinues, setSiriContinues] = useState(0);
    const trackerTemp = [];
    const [strikeOuts, setStrikeOuts] = useState([])

    // if player is still AI, when AI scores then continue with AI moves
    useEffect(() => {
        if (tracker.length && player == AIName) {
            setSiriContinues(0);

        }
    }, [player]);

    // useEffect(() => {
    //     if (player == AIName) {
    //         // console.log('Siri plays')
    //         const AImove = nextMoveByAI(copyData(tracker), patternRectWidth, patternRectHeight);
    //         if (siriContinues < 5) {
    //             setTimeout(() => {
    //                 console.log('AI move called ', AImove)
    //                 setGlowClass(AImove[0].x, AImove[0].y, AImove[0].value)
    //             }, 1500);
    //         } else {
    //             setTimeout(() => {
    //             console.log('AI move called ', AImove)
    //             setGlowClass(AImove[0].x, AImove[0].y, AImove[0].value)
    //             }, 500);
    //         }

    //         console.log('Siri plays ******* ');
    //     }
    // }, [tracker]);

    const setTrackerValue = (id, value, surroundingCells) => {
        // console.log('tracker is ', tracker)
        const eleIndex = tracker.findIndex(el => el.key === id);
        const newTracker = [...tracker];
        newTracker[eleIndex].value = value;
        setTracker(copyData(newTracker));
    }

    const setGlowClass = (x, y, selVal) => {
        let tempStrikePoints = [], newTracker = [];
        console.log(x, y);
        // removeGlow2()
        // if the given element is 'O', them iterate over elements around 'O', as its the center piece.
        if (selVal === 'O') {
            const oMatches = matchByO(x, y, selVal);
            tempStrikePoints = copyData(oMatches.tempStrikePoints)
            newTracker = copyData(oMatches.newTracker);
        } else {
            const sMatches = matchByS(x, y, selVal);
            tempStrikePoints = copyData(sMatches.tempStrikePoints)
            newTracker = copyData(sMatches.newTracker);
        }


        setStrikeOuts(oldVals => [...oldVals, ...tempStrikePoints]);
        // removeGlow(surroundingCells, x, y, firstLevelMatchIndexes);
        setScoreToPlayer(tempStrikePoints.length);
        const eleIndex = tracker.findIndex(el => el.key === x + '-' + y);
        newTracker[eleIndex].value = selVal;

        // if the user doesn't scores then, change the player.
        if (tempStrikePoints.length == 0) {
            changePlayer();
        } // end if

        // if player is Siri, and it scored points, then continue Siri as the striker
        if (player === AIName && tempStrikePoints.length) {
            setSiriContinues(prev => prev + 1);
        }
        setTracker(newTracker);
    } // end of setGlowClass

    const matchByO = (x, y, selVal) => {
        const surroundingCells = getSurroundingCells(x, y, patternRectWidth, patternRectHeight); // [];
        let firstLevelMatchIndex = -1;
        let secondLevelMatchIndex = -1;
        const pairVal = selVal === 'S' ? 'O' : 'S';
        const tempStrikePoints = [];
        let newTracker = copyData(tracker.map(t => ({ ...t, glowClass: 0 })))

        for (let i = 0; i < surroundingCells.length; i += 2) {
            const s1 = surroundingCells[i]
            const s2 = surroundingCells[i + 1];

            const eleIndex1 = tracker.findIndex(el => el.key === s1.key);
            const eleIndex2 = tracker.findIndex(el => el.key === s2.key);
            if (eleIndex1 < 0 || eleIndex2 < 0) continue;
            newTracker[eleIndex1].glowClass = s1.pos;
            newTracker[eleIndex2].glowClass = s2.pos;
            if (newTracker[eleIndex1].value == pairVal && newTracker[eleIndex2].value == pairVal) {
                firstLevelMatchIndex = eleIndex1;
                secondLevelMatchIndex = eleIndex2;
                const strikePointObj = {
                    keys: [x + '-' + y, newTracker[eleIndex1].key, newTracker[eleIndex2].key],
                    player,
                    strikePoints: {
                        x1: newTracker[eleIndex1].x,
                        y1: newTracker[eleIndex1].y,
                        x2: newTracker[eleIndex2].x,
                        y2: newTracker[eleIndex2].y,
                        midX: x,
                        midY: y
                    }
                } // end obj
                tempStrikePoints.push(strikePointObj);
                console.log('******* First level match found at ', newTracker[eleIndex1], newTracker[eleIndex2], '*******')
            } // end of if
        }

        // setStrikeOuts(oldVals => [...oldVals, ...tempStrikePoints]);
        // setScoreToPlayer(tempStrikePoints.length);
        // removeGlow(surroundingCells, x, y, false);
        // setTracker(copyData(newTracker));
        return { newTracker, tempStrikePoints };
    }

    const matchByS = (x, y, selVal) => {
        let newTracker = copyData(tracker.map(t => ({ ...t, glowClass: 0 })))

        // let firstLevelMatchIndex = -1;
        let secondLevelMatchIndex = -1;


        let firstLevelMatchIndexes = [];
        let secondLevelMatchIndexes = [];
        let firstLevelMatchPositions = [];

        const tempStrikePoints = [];
        // gets the first level surrounding cells, from the user clicked cell
        const surroundingCells = getSurroundingCells(x, y, patternRectWidth, patternRectHeight); // [];
        const pairVal = selVal === 'S' ? 'O' : 'S';
        // lloops through the surrounding cells
        for (const cell of surroundingCells) {
            const eleIndex = tracker.findIndex(el => el.key === cell.key);
            if (eleIndex < 0) continue;
            newTracker[eleIndex].glowClass = cell.pos;
            // if the surrounding cell has a match i.e, for SOS, User clicked cell is first 'S', so 'O' should be available in the surrounding
            if (newTracker[eleIndex].value == pairVal) {
                firstLevelMatchIndexes.push(eleIndex); // if 'O' is availble then push the Index and position in an array.
                firstLevelMatchPositions.push(cell.pos);
                console.log('******* First level match found at ', newTracker[eleIndex], '*******')
            }
        }


        // checks for match at second level
        if (firstLevelMatchIndexes.length) {
            const secondSurrounding = getSecondSurroundingCells(x, y, patternRectWidth, patternRectHeight)
                .filter(arg => firstLevelMatchPositions.includes(arg.pos)); // filtering out by the position of first surrounding. so it avoids checking in non sequential areas
            for (const cell of secondSurrounding) {
                const eleIndex = tracker.findIndex(el => el.key === cell.key);
                if (eleIndex < 0) continue;

                newTracker[eleIndex].glowClass = cell.pos;
                if (newTracker[eleIndex].value == selVal) {
                    secondLevelMatchIndex = eleIndex;
                    secondLevelMatchIndexes.push(eleIndex);
                    // gets the index of the match. since the match is checked by position filtered items, it ll be in the same order as firstLevelMatchINdexes
                    const matchOCell = tracker[firstLevelMatchIndexes.shift()];

                    tempStrikePoints.push({
                        keys: [matchOCell.key, newTracker[eleIndex].key, x + '-' + y],
                        strikePoints: {
                            x1: x,
                            y1: y,
                            x2: newTracker[eleIndex].x,
                            y2: newTracker[eleIndex].y,
                            midX: matchOCell.x,
                            midY: matchOCell.y
                        }
                    })
                    console.log('******* second level match found *******')
                }
            }
        }

        console.log('temporary strikes are ', tempStrikePoints);

        //If given element is 'S'

        // setStrikeOuts(oldVals => [...oldVals, ...tempStrikePoints]);
        // removeGlow(surroundingCells, x, y, firstLevelMatchIndexes);
        // setScoreToPlayer(tempStrikePoints.length);
        // setTracker(copyData(newTracker));

        return { newTracker, tempStrikePoints };
    }


    // removes the className for glow after a second.
    // const removeGlow = (surroundingCells, x, y, firstLevelMatchIndexes) => {
    //     let newTracker = copyData(tracker);
    //     // removes the set classes after the animation is complete
    //     setTimeout(() => {
    //         // newTracker = [];
    //         for (const cell of surroundingCells) {
    //             const eleIndex = tracker.findIndex(el => el.key === cell.key);
    //             if (eleIndex < 0) continue;
    //             newTracker[eleIndex].glowClass = false;
    //         }
    //         if (firstLevelMatchIndexes.length) {
    //             const secondSurrounding = getSecondSurroundingCells(x, y, patternRectWidth, patternRectHeight)
    //             for (const cell of secondSurrounding) {
    //                 const eleIndex = tracker.findIndex(el => el.key === cell.key);
    //                 if (eleIndex < 0) continue;
    //                 newTracker[eleIndex].glowClass = false;
    //             }
    //         }
    //         setTracker(copyData(newTracker));
    //     }, 1000);
    // }

    const removeGlow2 = () => {
        const newTracker = copyData(tracker);
        const mutatedTracker = newTracker.map(t => ({ ...t, glowClass: '' }));
        // setTimeout(() => setTracker(mutatedTracker), 1000);
        setTracker(mutatedTracker);
    }

    const getValueById = id => tracker.find(el => el.key === id);

    const initialize = () => {
        const tempTrackerFinal = [];
        // creating a (a X b) matrix for the board
        // first set the board y axis are initial height, then iterate over the cell height
        for (let y = start.y; y <= boardHeight; y += patternRectHeight) {
            // first set the board x axis as initial width, then iterate overt the cell's width
            for (let x = start.x; x <= boardWidth; x += patternRectWidth) {
                const newEle = {
                    key: x + '-' + y,
                    x, y,
                    value: '',
                    player: '',
                    striked: true,
                    glowClass: 0
                };
                trackerTemp.push(newEle);
                tempTrackerFinal.push(newEle);
            }
        }

        setTracker(copyData(tempTrackerFinal));
    }

    useEffect(() => {
        initialize();
    }, [])

    // console.log('Trackers before render ', tracker);

    const getPolylinePoints = strikePoints => {
        const { x1, y1, x2, y2 } = strikePoints;
        // patternRectWidth, patternRectHeight
        return `${x1 + (patternRectWidth / 2)},${y1 + (patternRectHeight / 2)} ${x2 + (patternRectWidth / 2)},${y2 + (patternRectHeight / 2)}`;
    }

    const getCirclePoints = strikePoints => {
        const { midX: x, midY: y } = strikePoints;
        // patternRectWidth, patternRectHeight
        return { cx: (x + (patternRectWidth / 2)), cy: (y + (patternRectHeight / 2)) };
    }

    return <g>
        {tracker.map((el, i) => <Cell
            setGlowClass={setGlowClass}
            glowClass={el.glowClass}
            getValueById={getValueById}
            setTrackerValue={setTrackerValue}
            key={el.x + '-' + el.y} x={el.x} y={el.y}
            width={patternRectWidth}
            value={el.value}
            height={patternRectHeight}
            {...patternRectStyle}
            index={i}
        />)}
        <g>
            {strikeOuts.map(({ strikePoints, keys }, i) => <g key={i}><polyline key={i} points={getPolylinePoints(strikePoints)}
                style={{ fill: 'none', stroke: 'black', strokeWidth: '2' }} />
                {/* <circle {...getCirclePoints(strikePoints)} className='demo-dot' r="5" stroke="black" fill="red" /> */}
            </g>)}

        </g>
    </g>
}


export default Cells;