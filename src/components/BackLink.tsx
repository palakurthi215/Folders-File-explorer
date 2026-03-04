import { Link } from 'react-router-dom';

type Props = {
  to: string;
  children: React.ReactNode;
};

const BackLink: React.FC<Props> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm mb-6"
    >
      <span aria-hidden="true">← </span> {children}
    </Link>
  );
};

export default BackLink;