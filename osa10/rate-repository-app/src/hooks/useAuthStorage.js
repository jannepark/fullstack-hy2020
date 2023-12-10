import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;

// // useAuthStorage.js
// import { useContext } from 'react';
// import AuthStorageContext from '../contexts/AuthStorageContext';

// export const useAuthStorage = () => {
//   return useContext(AuthStorageContext);
// };
