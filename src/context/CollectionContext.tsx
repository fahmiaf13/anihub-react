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

export interface IGroup {
  id: number;
  name: string;
  collections: ICollection[];
}

interface CollectionContextValue {
  groups: IGroup[];
  addToGroup: (collection: ICollection, groupId: number) => void;
  createNewGroup: (groupName: string, collection: ICollection[]) => void;
  renameGroup: (groupId: number, newName: string) => void;
  deleteGroup: (groupId: number) => void;
}

export const CollectionContext = createContext<CollectionContextValue>({
  groups: [],
  addToGroup: () => {},
  createNewGroup: () => {},
  renameGroup: () => {},
  deleteGroup: () => {},
});

interface ICollectionProvider {
  children: React.ReactNode;
}

const CollectionProvider: React.FC<ICollectionProvider> = ({ children }) => {
  const [groups, setGroups] = useState<IGroup[]>(() => {
    const storedGroups = localStorage.getItem("groups");
    return storedGroups ? JSON.parse(storedGroups) : [];
  });

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const addToGroup = (collection: ICollection, groupId: number) => {
    setGroups((prevGroups) => prevGroups.map((group) => (group.id === groupId ? { ...group, collections: [...group.collections, collection] } : group)));
  };

  const createNewGroup = (groupName: string, collection: ICollection[]) => {
    const newGroup: IGroup = {
      id: groups.length + 1,
      name: groupName,
      collections: collection,
    };

    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups, newGroup];
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
      return updatedGroups;
    });
  };

  const renameGroup = (groupId: number, newName: string) => {
    setGroups((prevGroups) => prevGroups.map((group) => (group.id === groupId ? { ...group, name: newName } : group)));
  };

  const deleteGroup = (groupId: number) => {
    setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
  };

  return (
    <CollectionContext.Provider
      value={{
        groups,
        addToGroup,
        createNewGroup,
        renameGroup,
        deleteGroup,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export { CollectionProvider };
