import React, {memo} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";

function MapAllowedRoutes({routes, isAddNotFound, socket}) {
  return (
  <Router>
    <Routes>
      {routes.map((route) => {
        const {
          path,
          component: Component,
          children,
          title,
          permission,
          ...rest
        } = route;
        return (
          <Route
            {...rest}
            key={path}
            path={path}
            element={Component}
            socket={socket}
          />
        )
      })}
      {isAddNotFound && <Route path="*"></Route>}
    </Routes>
  </Router>
  )
}

export default memo(MapAllowedRoutes);