import Header from "../Header";
import { ReactNode, useEffect } from "react";

const MainLayout: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    console.log("mount");
    return () => console.log("unmount");
  }, []);
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
