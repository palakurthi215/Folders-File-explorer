export type FileNode = {
    name: string;
    type: 'file';
    size: number;
  };
  
  export type FolderNode = {
    name: string;
    type: 'folder';
    children: Node[];
  };
  
  export type Node = FileNode | FolderNode;
  
  // Type guards
  export const isFile = (node: Node): node is FileNode => node.type === 'file';
  export const isFolder = (node: Node): node is FolderNode => node.type === 'folder';