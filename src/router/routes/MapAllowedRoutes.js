import React, {memo} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";

function MapAllowedRoutes({routes, isAddNotFound}) {
  return (
  <Router>
    <Routes>
      {routes.map((route) => {
        console.log(route)
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
          />
        )
      })}
      {isAddNotFound && <Route path="*"></Route>}
    </Routes>
  </Router>
  )
}

export default memo(MapAllowedRoutes);