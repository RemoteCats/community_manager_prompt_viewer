import { useState, useEffect } from 'react';

export interface Collection {
  id: string;
  name: string;
  description?: string;
  promptIds: number[];
  createdAt: number;
  updatedAt: number;
}

const COLLECTIONS_KEY = 'cm_os_collections';

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load collections from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(COLLECTIONS_KEY);
    if (stored) {
      try {
        setCollections(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading collections:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save collections to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    }
  }, [collections, isLoaded]);

  const createCollection = (name: string, description?: string): Collection => {
    const newCollection: Collection = {
      id: `col_${Date.now()}`,
      name,
      description,
      promptIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setCollections((prev) => [...prev, newCollection]);
    return newCollection;
  };

  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === id
          ? { ...col, ...updates, updatedAt: Date.now() }
          : col
      )
    );
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((col) => col.id !== id));
  };

  const addPromptToCollection = (collectionId: string, promptId: number) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId && !col.promptIds.includes(promptId)
          ? { ...col, promptIds: [...col.promptIds, promptId], updatedAt: Date.now() }
          : col
      )
    );
  };

  const removePromptFromCollection = (collectionId: string, promptId: number) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? { ...col, promptIds: col.promptIds.filter((id) => id !== promptId), updatedAt: Date.now() }
          : col
      )
    );
  };

  const getCollection = (id: string) => collections.find((col) => col.id === id);

  const isPromptInCollection = (collectionId: string, promptId: number) => {
    const collection = getCollection(collectionId);
    return collection?.promptIds.includes(promptId) ?? false;
  };

  return {
    collections,
    createCollection,
    updateCollection,
    deleteCollection,
    addPromptToCollection,
    removePromptFromCollection,
    getCollection,
    isPromptInCollection,
  };
}
