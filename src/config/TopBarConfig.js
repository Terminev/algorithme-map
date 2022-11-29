import RolesList from "./RoleList";
import * as URL from "./UrlConstants";

export default  [
  {
    img: "/images/home-top-bar.svg",
    title: "Home",
    path: URL.HOME_VIEW_PATH,
    permission: [
      RolesList.CONNECTED,
    ],
  }
]