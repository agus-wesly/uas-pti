import { Link } from "react-router-dom";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import userIcon from "../assets/user.svg";
import logout from "../assets/logout.svg";
import message from "../assets/message.svg";
import home from "../assets/home.svg";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await axios.get("/logout");
      console.log(resp);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-prim-white flex items-center text-[16px] justify-between px-[30px] sticky top-0 w-full z-10">
        <h1 className="sm:text-[40px] md:text-[60px] font-semibold py-5">Scrt.ly</h1>
        <ul className="hidden md:flex flex-row items-center flex-1 justify-end font-Aksidenz text-[20px] font-semibold ">
          <li className="mr-[30px] ">
            {user ? (
              <div className="flex flex-row items-center justify-end gap-9">
                <div className="userinfo-container">
                  <img src={userIcon} alt="usericon" className="object-contain w-6 h-6 mr-2" />
                  <p>{user}</p>
                </div>
                <div className="userinfo-container">
                  <img src={home} alt="home" className="object-contain w-6 h-6 mr-2" />
                  <Link to={"/"}>Home</Link>
                </div>
                <div className="userinfo-container">
                  <img src={message} alt="message" className="object-contain w-6 h-6 mr-2" />
                  <Link to={"/messages"}>Message</Link>
                </div>
              </div>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </li>
          <li className="">
            {user ? (
              <div className="flex flex-row items-center">
                <img src={logout} alt="message" className="object-contain w-6 h-6 mr-2" />
                <div className="logout hover:text-green cursor-pointer" onClick={() => setToggleLogout((prev) => !prev)}>
                  Logout
                </div>
              </div>
            ) : (
              <Link to={"/register"}>Register</Link>
            )}
          </li>
        </ul>
        <button className="flex items-center md:hidden cursor-pointer w-[40px] h-[40px] color-black">
          <img src={toggle ? close : menu} onClick={() => setToggle((prev) => !prev)} alt="menu" className="object-contain" />
        </button>
        <div
          className={`${
            toggle ? " visible translate-x-0" : "invisible translate-x-full"
          } flex transition all ease-in md:hidden w-[120px] min-h-[120px] rounded-md backdrop-blur-lg  font-Inter justify-center absolute top-24 right-5 flex-col bg-green-mongo text-slate-100 items-center animated min-w-[135px]`}
        >
          <div className="mb-3">
            {user ? (
              <>
                <div className="flex flex-row gap-3 items-center my-3">
                  <img src={userIcon} alt="usericon" className="object-contain w-6 h-6" />
                  <p>{user}</p>
                </div>
                <div className="flex flex-row gap-3 items-center my-3">
                  <img src={home} alt="usericon" className="object-contain w-6 h-6" />
                  <Link to={"/"}>Home</Link>
                </div>
                <div className="flex flex-row gap-3 items-center my-3">
                  <img src={message} alt="usericon" className="object-contain w-6 h-6" />
                  <Link to={"/messages"}>Message</Link>
                </div>
                <div className="w-full flex">
                  <div className="logout bg-red-500 w-full py-1 text-center" onClick={() => setToggleLogout((prev) => !prev)}>
                    Logout
                  </div>
                </div>
              </>
            ) : (
              <Link to={"/login"}>Login</Link>
            )}
          </div>
          <p>
            {!user && (
              <Link className="hover:text-green" to={"/register"}>
                Register
              </Link>
            )}
          </p>
        </div>
      </nav>
      <div className={`overlay ${toggleLogout ? "overlay-visible" : null}`}>
        <div className="confirm-logout">
          <p>Are you sure to logout ?</p>
          <div className="btn-container">
            <button onClick={() => setToggleLogout(false)}>Cancel</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
