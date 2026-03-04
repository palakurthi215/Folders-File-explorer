type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {children}
    </div>
  );
};

export default Layout;