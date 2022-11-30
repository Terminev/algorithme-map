import React from "react";
import MapAllowedRoutes from "./routes/MapAllowedRoutes";
import PrivateRouteConfig from "../config/PrivateRouteConfig";

function PrivateRoutes({socket}) {

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
          socket={socket}
        />
      </div>
    </>
  )
}

export default PrivateRoutes;