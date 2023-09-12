// import React, { useState, useEffect } from 'react';

// let timeIntervalId;
// export default function Timer({ gameOver }) {
//     let [time, setTime] = useState(0);

//     useEffect(() => {
//         function incrementTime() {
//             setTimeOut(() => {
//                 let newTime = time + 1
//                 setTime(newTime);
//             }, 1000);
//         };
//         incrementTime()
//     }, [time])

//     console.log(timeIntervalId);
//     return (
//         <div style={{ color: "white", fontSize: 20, background: 'maroon' }}>

//             <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>

//             </span>
//             {time}
//         </div>
//     )
// }