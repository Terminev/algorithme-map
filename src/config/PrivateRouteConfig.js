import React from "react";
import roleList from "./RoleList";
import Home from "../views/Home/Home";
import Map from "../views/map/Map";

export default [
  {
    component: <Home />,
    path: "/",
    title: "Login view",
    permission: [
      roleList.CONNECTED
    ],
  },
  {
    component: <Map />,
    path: "/map/:id",
    title: "Map view",
    permission: [
      roleList.CONNECTED
    ],
  }
]