import React from "react";
import roleList from "./RoleList";
import Home from "../views/Home/Home";

export default [
  {
    component: <Home />,
    path: "/",
    title: "Login view",
    permission: [
      roleList.CONNECTED
    ],
  },
]