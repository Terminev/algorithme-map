import React from "react";
import {isLoggedIn} from "../utils/RoleChecker";
import Login from "../views/login/Login";
import PrivateRoutes from "./PrivateRoutes";


const Router = () => {
  console.log(isLoggedIn())
  return (
    <>
      {isLoggedIn() ? <PrivateRoutes/> : <div className={"page-connection"}><Login /></div>}
    </>
  );
};

export default Router;