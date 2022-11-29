import React from "react";
import MapAllowedRoutes from "./routes/MapAllowedRoutes";
import PrivateRouteConfig from "../config/PrivateRouteConfig";

function PrivateRoutes() {

  let allowedRoutes = [];
  let allowedSidebar = [];
  allowedRoutes = PrivateRouteConfig;

  return (
    <>
      <div className={"page-container"}>
        <MapAllowedRoutes
          routes={allowedRoutes}
          basePath="/"
          isAddNotFound
        />
      </div>
    </>
  )
}

export default PrivateRoutes;