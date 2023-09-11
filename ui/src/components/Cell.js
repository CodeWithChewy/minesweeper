import React from 'react';

export default function Cell({ details, updateFlag, revealCell }) {

    // const style = {
    //     background: details.revealed 
    //     ?
    // }

    return (
        <div
            onContextMenu={(e) => updateFlag(e, details.x, details.y)}
            onClick={() => revealCell(details.x, details.y)}
            style={style.cellStyle}
        >
            {details.revealed ? details.value : ""}
            {/* {details.value !== 0 && details.value} */}
        </div>
    )
}

const style = {
    cellStyle: {
        width: 40,
        height: 40,
        background: 'lightgrey',
        border: '2px solid grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }
}