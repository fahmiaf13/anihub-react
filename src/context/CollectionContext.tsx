import React, { createContext, useState, useEffect } from "react";

export interface Collection {
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
  bookmarkedCollections: Collection[];
  addToCollection: (collection: Collection) => void;
  removeFromCollection: (collection: Collection) => void;
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
  const [bookmarkedCollections, setBookmarkedCollections] = useState<Collection[]>(() => {
    // Load bookmarked collections from localStorage on component mount
    const storedCollections = localStorage.getItem("bookmarkedCollections");
    return storedCollections ? JSON.parse(storedCollections) : [];
  });

  // Save bookmarked collections to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookmarkedCollections", JSON.stringify(bookmarkedCollections));
  }, [bookmarkedCollections]);

  const addToCollection = (collection: Collection) => {
    setBookmarkedCollections((prevCollections) => {
      const collectionIds = prevCollections.map((c) => c.id);
      if (!collectionIds.includes(collection.id)) {
        return [...prevCollections, collection];
      }
      return prevCollections;
    });
  };

  const removeFromCollection = (collection: Collection) => {
    setBookmarkedCollections((prevCollections) => prevCollections.filter((c) => c.id !== collection.id));
  };

  return <CollectionContext.Provider value={{ bookmarkedCollections, addToCollection, removeFromCollection }}>{children}</CollectionContext.Provider>;
};

export { CollectionProvider };
