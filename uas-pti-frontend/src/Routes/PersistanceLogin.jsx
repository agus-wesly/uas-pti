import { Outlet } from "react-router-dom";
import { getToken } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import useRefresh from "../hooks/useRefresh";

const PersistanceLogin = () => {
  const token = useSelector(getToken);
  const [loading, setLoading] = useState(true);
  const refresh = useRefresh();

  useEffect(() => {
    const startRefresh = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    !token ? startRefresh() : setLoading(false);
  }, [refresh, token]);

  return <>{loading ? <Loading /> : <Outlet />}</>;
};

export default PersistanceLogin;
