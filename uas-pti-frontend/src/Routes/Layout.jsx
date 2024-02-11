import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="overflow-x-hidden">
      <Outlet />
    </div>
  );
};

export default Layout;
