import Pages from "layouts/Pages/Pages.jsx";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login";
import CodePhoto from "../views/CodePhoto/CodePhoto";

var indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/codephoto", name: "CodePhoto", component: CodePhoto },
  { path: "/login", name: "Login", component: Login },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
