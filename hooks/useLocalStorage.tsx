// import localforage from 'localforage';
// import { useCallback, useState, useEffect } from 'react';

// interface UseLocalStorageProps {
//   rfInstance: any;
//   characterId: number;
// }

// const useLocalStorage = ({
//   rfInstance,
//   characterId,
// }: UseLocalStorageProps): [any, any] => {
//   const [storedValue, setStoredValue] = useState([]);

//   const getValue = useCallback(() => {
//     return localforage
//       .getItem(LOCAL_STORE_KEY[characterId])
//       .then((value) => value || [])
//       .catch((reason) => alert({ message: `Error: ${reason}` }));
//   }, [characterId]);

//   useEffect(() => {
//     getValue().then((value) => {
//       console.log('getvalue', value);
//       setStoredValue(value);
//     });
//   }, [characterId]);

//   const setValue = (value: any) => {
//     console.log('rfInstance', rfInstance);
//     console.log('rfInstance.toObject()', rfInstance.toObject());
//     console.log('characterId', characterId);
//     return localforage
//       .setItem(LOCAL_STORE_KEY[characterId], rfInstance.toObject())
//       .then((value) => {
//         console.log('setavlue', value);
//         setStoredValue(value);
//       })
//       .catch((reason) => alert({ message: `Error: ${reason}` }));
//   };

//   return [storedValue, setValue];
// };

// export default useLocalStorage;
