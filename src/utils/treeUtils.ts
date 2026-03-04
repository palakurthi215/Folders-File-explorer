import { Node, FolderNode, isFolder, isFile } from '../types';

export const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const countChildren = (folder: FolderNode): number => {
  return folder.children.length;
};

export const calculateFolderSize = (folder: FolderNode): number => {
  let total = 0;
  for (const child of folder.children) {
    if (isFile(child)) {
      total += child.size;
    } else {
      total += calculateFolderSize(child);
    }
  }
  return total;
};

export const findNodeByPath = (root: FolderNode, path: string): Node | null => {
  if (!path) return root;
  const parts = path.split('/').filter(p => p);
  let current: Node = root;
  for (const part of parts) {
    if (!isFolder(current)) return null;
    const next = current.children.find(child => child.name === part)as Node | undefined;
    if (!next) return null;
    current = next;
  }
  return current;
};

export const flattenTree = (
  node: FolderNode,
  basePath = ''
): Record<string, Node> => {
  let map: Record<string, Node> = {};
  const currentPath = basePath ? `${basePath}/${node.name}` : node.name;
  map[currentPath] = node;

  for (const child of node.children) {
    if (isFolder(child)) {
      map = { ...map, ...flattenTree(child, currentPath) };
    } else {
      map[`${currentPath}/${child.name}`] = child;
    }
  }
  return map;
};

export const searchTree = (
  node: FolderNode,
  query: string,
  currentPath = ''
): Array<{ node: Node; path: string }> => {
  const results: Array<{ node: Node; path: string }> = [];
  const path = currentPath ? `${currentPath}/${node.name}` : node.name;

  if (node.name.toLowerCase().includes(query.toLowerCase())) {
    results.push({ node, path });
  }

  for (const child of node.children) {
    if (isFolder(child)) {
      results.push(...searchTree(child, query, path));
    } else {
      const childPath = `${path}/${child.name}`;
      if (child.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({ node: child, path: childPath });
      }
    }
  }
  return results;
};