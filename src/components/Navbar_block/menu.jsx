import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { IoLogOutOutline } from "react-icons/io5";
import { AuthUserContext } from "../../context/AuthContextApi";
import { BackendUserContext } from "../../context/FetchUserContext";

const Menu = () => {
  let { authUser , logout } = useContext(AuthUserContext)
  console.log(authUser);

  let {userData} = useContext(BackendUserContext);
  let role = userData?.role;
 
  let AnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            to={"/auth/login"}
            className={({ isActive }) =>
              `px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/auth/register"}
            className={({ isActive }) =>
              `px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Register
          </NavLink>
        </li>
      </>
    );
  };

  let AuthenticatedUser = () => {
    return (
      <>
      {role === "admin" && (<li><NavLink to={"/admin"} end  className={({ isActive }) =>
              `px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer flex   ${
                isActive ? "bg-blue-800" : ""
              }`
            }>Admin</NavLink></li>)}
        <li>
          <NavLink
            to={"/user/profile"}
            className={({ isActive }) =>
              `px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer flex   ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            <span>{authUser?.displayName}</span>
            <img src={authUser?.photoURL} className="w[25px] rounded-full h-[25px] ml-1"/>
          </NavLink>
        </li>
        <li>
          <button
          onClick={() => logout()}
            className={`px-4 py-2 font-semibold hover:bg-red-200 rounded-lg cursor-pointer flex items-center justify-evenly             
              `}
          >
            Log out
            <span>{<IoLogOutOutline />}</span>
          </button>
        </li>
      </>
    );
  };
  return (
    <aside className="basis-[30%] h-[70px]">
      <ul className="w-full h-[70px] flex justify-evenly items-center">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer ${
                isActive ? "bg-blue-800" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        {authUser === null ? <AnonymousUser /> : <AuthenticatedUser />}
      </ul>
    </aside>
  );
};

export default Menu;