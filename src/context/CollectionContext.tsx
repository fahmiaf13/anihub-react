import React, { createContext, useState, useEffect } from "react";

export interface ICollection {
  id: number;
  coverImage: {
    large: string;
  };
  title: {
    english: string;
    romaji: string;
    native: string;
  };
}

interface CollectionContextValue {
  bookmarkedCollections: ICollection[];
  addToCollection: (collection: ICollection) => void;
  removeFromCollection: (collection: ICollection) => void;
}

export const CollectionContext = createContext<CollectionContextValue>({
  bookmarkedCollections: [],
  addToCollection: () => {},
  removeFromCollection: () => {},
});

interface ICollectionProvider {
  children: React.ReactNode;
}

const CollectionProvider: React.FC<ICollectionProvider> = ({ children }) => {
  const [bookmarkedCollections, setBookmarkedCollections] = useState<ICollection[]>(() => {
    // Load bookmarked collections from localStorage on component mount
    const storedCollections = localStorage.getItem("bookmarkedCollections");
    return storedCollections ? JSON.parse(storedCollections) : [];
  });

  // Save bookmarked collections to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookmarkedCollections", JSON.stringify(bookmarkedCollections));
  }, [bookmarkedCollections]);

  const addToCollection = (collection: ICollection) => {
    setBookmarkedCollections((prevCollections) => {
      const collectionIds = prevCollections.map((c) => c.id);
      if (!collectionIds.includes(collection.id)) {
        return [...prevCollections, collection];
      }
      return prevCollections;
    });
  };

  const removeFromCollection = (collection: ICollection) => {
    setBookmarkedCollections((prevCollections) => prevCollections.filter((c) => c.id !== collection.id));
  };

  return <CollectionContext.Provider value={{ bookmarkedCollections, addToCollection, removeFromCollection }}>{children}</CollectionContext.Provider>;
};

export { CollectionProvider };
