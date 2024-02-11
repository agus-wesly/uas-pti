import axios from "../api/axios";
import { setCredentials } from "../features/userSlice";
import { useDispatch } from "react-redux";

const useRefresh = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axios.get("/refresh");

    if (response?.data?.token) {
      dispatch(setCredentials({ token: response.data.token, user: response.data.user, userId: response.data.userId }));
    }
    return response.data;
  };
  return refresh;
};

export default useRefresh;
