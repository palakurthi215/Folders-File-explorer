import { Link } from 'react-router-dom';
import { Node, isFile, isFolder } from '../types';
import { formatSize, countChildren, calculateFolderSize } from '../utils/treeUtils';

type Props = {
  node: Node;
  path: string;
};

const NodeDetails: React.FC<Props> = ({ node, path }) => {
  const isDir = isFolder(node);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{node.name}</h2>
      <p className="mb-2"><span className="font-semibold">Type:</span> {isDir ? 'Folder' : 'File'}</p>
      <p className="mb-2"><span className="font-semibold">Full path:</span> {path}</p>
      {isFile(node) && (
        <p className="mb-2"><span className="font-semibold">Size:</span> {formatSize(node.size)}</p>
      )}
      {isDir && (
        <>
          <p className="mb-2"><span className="font-semibold">Direct children:</span> {countChildren(node)}</p>
          <p className="mb-4"><span className="font-semibold">Total size:</span> {formatSize(calculateFolderSize(node))}</p>
          <div>
            <span className="font-semibold">Children:</span>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {node.children.map((child) => (
                <li key={child.name}>
                  <Link
                    to={`/tree/${encodeURIComponent(`${path}/${child.name}`)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default NodeDetails;