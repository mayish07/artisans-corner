// client/src/context/CompareContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

const STORAGE_KEY = 'compareList';
const MAX_COMPARE = 4;

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompareList(JSON.parse(stored));
      } catch (e) {
        setCompareList([]);
      }
    }
  }, []);

  const addToCompare = (product) => {
    if (compareList.length >= MAX_COMPARE) return false;
    if (compareList.some(p => p._id === product._id)) return false;
    const updated = [...compareList, product];
    setCompareList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  };

  const removeFromCompare = (productId) => {
    const updated = compareList.filter(p => p._id !== productId);
    setCompareList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isInCompare = (productId) => {
    return compareList.some(p => p._id === productId);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);