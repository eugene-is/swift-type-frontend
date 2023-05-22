// import React, { useState, useEffect } from 'react';

// export const useKeyButtonColor = () => {
//   const [activeKeys, setActiveKeys] = useState([]);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       const { key } = event;
//       setActiveKeys((prevActiveKeys) => [...prevActiveKeys, key]);
//     };

//     const handleKeyUp = (event) => {
//       const { key } = event;
//       setActiveKeys((prevActiveKeys) => prevActiveKeys.filter((k) => k !== key));
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   return activeKeys;
// };

// export const KeyButton = ({ id, letters, sup = '', spec = '' }) => {
//   const activeKeys = useKeyButtonColor();
//   const isActive = activeKeys.includes(id);

//   const buttonStyle = {
//     backgroundColor: isActive ? 'red' : 'transparent',
//   };

//   if (sup) {
//     return (
//       <div
//         className={`${styles.keyButtonClass} ${styles.keyButton}`}
//         id={id}
//         data-letters={letters}
//         style={buttonStyle}
//       >
//         {letters} <sup>{sup}</sup>
//       </div>
//     );
//   } else {
//     return (
//       <div
//         className={`${styles.keyButtonClass} ${styles.gg} ${styles.keyButton}`}
//         id={id}
//         data-spec={letters}
//         style={buttonStyle}
//       >
//         {letters} <sup>{spec}</sup>
//       </div>
//     );
//   }
// };
