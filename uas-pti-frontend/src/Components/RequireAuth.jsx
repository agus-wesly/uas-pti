import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../features/userSlice";

const RequireAuth = () => {
  const token = useSelector(getToken);

  const location = useLocation();

  return token ? <Outlet /> : <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default RequireAuth;
