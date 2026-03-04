import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Node, FolderNode } from '../types/index';
import { flattenTree, searchTree } from '../utils/treeUtils';

type TreeContextType = {
  tree: FolderNode | null;
  setTree: (tree: FolderNode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Array<{ node: Node; path: string }>;
  getNodeByPath: (path: string) => Node | null;
  flattenTreeMap: Record<string, Node>;
};

const TreeContext = createContext<TreeContextType | undefined>(undefined);

const STORAGE_KEY = 'filetree-explorer';

export const TreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tree, setTree] = useState<FolderNode | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem(`${STORAGE_KEY}-query`) || '';
  });

  useEffect(() => {
    if (tree) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [tree]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-query`, searchQuery);
  }, [searchQuery]);


  const flattenTreeMap = useMemo(() => {
    return tree ? flattenTree(tree) : {};
  }, [tree]);

  const getNodeByPath = (path: string): Node | null => {
    return flattenTreeMap[path] || null;
  };

  const searchResults = useMemo(() => {
    if (!tree || !searchQuery.trim()) return [];
    return searchTree(tree, searchQuery.trim());
  }, [tree, searchQuery]);

  return (
    <TreeContext.Provider
      value={{
        tree,
        setTree,
        searchQuery,
        setSearchQuery,
        searchResults,
        getNodeByPath,
        flattenTreeMap,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = () => {
  const ctx = useContext(TreeContext);
  if (!ctx) throw new Error('useTree must be used within TreeProvider');
  return ctx;
};