import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRegisterUserMutation } from "../features/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Register = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [validUser, setValidUser] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    const USER_REGEX = /^[A-Za-z][a-z0-9]{3,8}$/;
    const match = USER_REGEX.test(user);
    if (match) setValidUser(true);
    else setValidUser(false);
  }, [user]);

  useEffect(() => {
    const PASS_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,9}$/;
    const match = PASS_REGEX.test(pwd);
    if (match) setValidPwd(true);
    if (!match) setValidPwd(false);
    if (pwd === confirmPwd) setValidConfirmPwd(true);
    else setValidConfirmPwd(false);
  }, [pwd, confirmPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ user, pwd }).unwrap();
      setUser("");
      setPwd("");
      setConfirmPwd("");
      setSuccessMsg("Account successfully created");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.originalStatus === 409) setErrMsg("Username already exist !");
      else if (error.originalStatus === 500) setErrMsg("Server is busy, please try again later");
      else setErrMsg("Register failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <div className={`${errMsg ? "alert-message bg-red-400 text-red-800 font-bold" : "hide"}`}>{errMsg}</div>
          <div className={`${successMsg ? "alert-message bg-blue-400 text-blue-800 font-bold" : "hide"}`}>{successMsg}</div>
          <div className="input-container">
            <label htmlFor="username" className="label-username">
              Username
            </label>
            <input ref={userRef} autoComplete="off" type="text" name="username" id="username" value={user} onChange={(e) => setUser(e.target.value)} />
            <div className={`${!validUser && user ? "visible" : "hide"} instruction`}>
              Your Username must be : <br />
              <ul>
                <li>Begin with letters</li>
                <li>Minimum length : 4 & maximum length : 8</li>
                <li>Letters and numbers are allowed</li>
              </ul>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="password" className="label-password">
              Password
            </label>
            <input type="password" name="password" id="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
            <div className={`${!validPwd && pwd ? "visible" : "hide"} instruction`}>
              Your Password must be : <br />
              <ul>
                <li>Contain at least 1 number, 1 Uppercase and 1 letter</li>
                <li>Minimum length : 5 & maximum length : 9</li>
                <li>No symbol</li>
              </ul>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="confirmpwd" className="label-password">
              Confirm Password
            </label>
            <input type="password" name="confirmpwd" id="confirmpwd" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            <div className={`${!validConfirmPwd && confirmPwd ? "visible" : "hide"} instruction`}>Must be same with the password</div>
          </div>

          <div className="bottom-container">
            <button className={`${!validUser || !validPwd || !validConfirmPwd || isLoading ? "invalid" : "valid"}`} disabled={!validUser || !validPwd || !validConfirmPwd}>
              Sign Up
            </button>
            <div>
              Have an account ? <Link to={"/login"}>Log in now</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
