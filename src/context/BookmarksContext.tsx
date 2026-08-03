import React, { createContext, useContext, useEffect, useState } from 'react';

interface BookmarksContextType {
  bookmarkedSlugs: string[];
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  recentlyViewedSlugs: string[];
  addRecentlyViewed: (slug: string) => void;
  clearRecentlyViewed: () => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yojna_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('yojna_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('yojna_bookmarks', JSON.stringify(bookmarkedSlugs));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedSlugs]);

  useEffect(() => {
    try {
      localStorage.setItem('yojna_recently_viewed', JSON.stringify(recentlyViewedSlugs));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewedSlugs]);

  const toggleBookmark = (slug: string) => {
    setBookmarkedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      } else {
        return [slug, ...prev];
      }
    });
  };

  const isBookmarked = (slug: string) => bookmarkedSlugs.includes(slug);

  const addRecentlyViewed = (slug: string) => {
    setRecentlyViewedSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      return [slug, ...filtered].slice(0, 12); // keep top 12
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedSlugs([]);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedSlugs,
        toggleBookmark,
        isBookmarked,
        recentlyViewedSlugs,
        addRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
