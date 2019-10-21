import Header from 'components/Header';
import { ReactNode } from 'react';

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

type Props = {
  children: ReactNode;
};

export default MainLayout;
