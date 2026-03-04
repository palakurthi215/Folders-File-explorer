import { useTree } from '../context/TreeContext';
import TreeNode from './TreeNode';

const FileTree: React.FC = () => {
  const { tree } = useTree();

  if (!tree) {
    return <p className="text-gray-500">No tree loaded – please load a JSON on the home page.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">File Tree</h2>
      <ul className="pl-0">
        <TreeNode node={tree} path={tree.name} />
      </ul>
    </div>
  );
};

export default FileTree;