import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import { useAuthUserMutation } from "../features/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const [authUser, { isLoading }] = useAuthUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authUser({ user, pwd }).unwrap();
      dispatch(setCredentials({ user, ...response }));
      setUser("");
      setPwd("");
      navigate("/");
    } catch (err) {
      if (err.originalStatus === 401) setErrMsg("Invalid username or password");
      else {
        setErrMsg("Login failed");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Login to your account</h1>
          <div className={`${errMsg ? "alert-message bg-red-400 text-red-800 font-bold" : "hide"}`}>{errMsg}</div>
          <div className="input-container">
            <label htmlFor="username" className="label-username">
              Username
            </label>
            <input type="text" id="username" ref={userRef} value={user} onChange={(e) => setUser(e.target.value)} autoComplete="off" />
          </div>

          <div className="input-container">
            <label htmlFor="password" className="label-password">
              Password
            </label>
            <input type="password" name="password" id="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          </div>

          <div className="bottom-container">
            <button disabled={!user || !pwd || isLoading}>Login</button>
            <div>
              Don't have an account ? <Link to={"/register"}>Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
