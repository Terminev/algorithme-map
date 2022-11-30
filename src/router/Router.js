import React from "react";
import {isLoggedIn} from "../utils/RoleChecker";
import Login from "../views/login/Login";
import PrivateRoutes from "./PrivateRoutes";


const Router = ({socket}) => {
  return (
    <>
      {isLoggedIn() ? <PrivateRoutes socket={socket}/> : <div className={"page-connection"}><Login /></div>}
    </>
  );
};

export default Router;