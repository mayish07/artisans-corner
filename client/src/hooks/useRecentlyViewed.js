import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (e) {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p._id !== product._id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentlyViewed([]);
  };

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
}