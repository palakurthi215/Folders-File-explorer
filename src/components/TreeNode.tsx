import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Node, isFolder, isFile } from '../types';
import { formatSize, calculateFolderSize } from '../utils/treeUtils';

type Props = {
  node: Node;
  path: string;
};

const TreeNode: React.FC<Props> = ({ node, path }) => {
  const [expanded, setExpanded] = useState(false);
  const isDir = isFolder(node);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDir) setExpanded(!expanded);
  };

  const icon = isDir ? (expanded ? '📂' : '📁') : '📄';
  const size = isFile(node) ? formatSize(node.size) : '';

  return (
    <li className="list-none ml-4">
      <div
        className={`flex items-center gap-2 py-1 ${isDir ? 'cursor-pointer' : ''}`}
        onClick={toggleExpand}
      >
        <span>{icon}</span>
        <Link
          to={`/tree/${encodeURIComponent(path)}`}
          onClick={(e) => e.stopPropagation()}
          className="text-blue-600 hover:underline"
        >
          {node.name}
        </Link>
        {size && <span className="text-sm text-gray-500">({size})</span>}
        {isDir && (
          <span className="text-sm text-gray-500">
            ({formatSize(calculateFolderSize(node))})
          </span>
        )}
      </div>
      {isDir && expanded && node.children.length > 0 && (
        <ul className="pl-4">
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} path={`${path}/${child.name}`} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;