import { useParams, Navigate } from 'react-router-dom';
import { useTree } from '../context/TreeContext';
import NodeDetails from '../components/NodeDetails';
import Layout from '../components/Layout';
import BackLink from '../components/BackLink';

const NodeDetailPage: React.FC = () => {
  const { nodePath } = useParams<{ nodePath: string }>();
  const { getNodeByPath, tree } = useTree();

  if (!tree) {
    return <Navigate to="/" replace />;
  }

  if (!nodePath) {
    return <Navigate to="/tree" replace />;
  }

  const decodedPath = decodeURIComponent(nodePath);
  const node = getNodeByPath(decodedPath);

  if (!node) {
    return (
      <Layout>
        <BackLink to="/tree">Back to tree</BackLink>
        <p className="text-red-600 mb-4">Node not found at path: {decodedPath}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <BackLink to="/tree">Back to tree</BackLink>
      <NodeDetails node={node} path={decodedPath} />
    </Layout>
  );
};

export default NodeDetailPage;