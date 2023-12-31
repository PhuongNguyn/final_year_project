/*!

=========================================================
* Purity UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// import
// To be changed
// import Tables from "../views/Dashboard/Tables";
import { GiSadCrab } from "react-icons/gi";
import {
  CartIcon,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  StatsIcon,
} from "./components/Icons/Icons";
import { lazy } from "react";
const Calendar = lazy(() => import("./views/Applications/Calendar/index"));
const DataTables = lazy(() => import("./views/Applications/DataTables/index"));
const Kanban = lazy(() => import("./views/Applications/Kanban/index"));
const Wizard = lazy(() => import("./views/Applications/Wizard/index"));

import SignInIllustration from "./views/Authentication/SignIn/SignInIllustration";
import Product from "./views/Product";
import ProductDetail from "./views/ProductDetail";
import Classes from "./views/Classes";

const CRM = lazy(() => import("./views/Dashboard/CRM"));
const Default = lazy(() => import("./views/Dashboard/Default"));
const OrderDetails = lazy(() =>
  import("./views/Ecommerce/Orders/OrderDetails/index")
);
const OrderList = lazy(() =>
  import("./views/Ecommerce/Orders/OrderList/index")
);

const Billing = lazy(() => import("./views/Pages/Account/Billing/index"));
const Invoice = lazy(() => import("./views/Pages/Account/Invoice/index"));
const Settings = lazy(() => import("./views/Pages/Account/Settings/index"));
const Alerts = lazy(() => import("./views/Pages/Alerts/index"));
const Charts = lazy(() => import("./views/Pages/Charts/index"));
const Pricing = lazy(() => import("./views/Pages/Pricing/index"));
const Overview = lazy(() => import("./views/Pages/Profile/Overview/index"));
const Projects = lazy(() => import("./views/Pages/Profile/Projects/index"));
const Teams = lazy(() => import("./views/Pages/Profile/Teams/index"));
const General = lazy(() => import("./views/Pages/Projects/General/index"));
const Timeline = lazy(() => import("./views/Pages/Projects/Timeline/index"));
const Reports = lazy(() => import("./views/Pages/Users/Reports/index"));
const Widgets = lazy(() => import("./views/Pages/Widgets/index"));
const Roles = lazy(() => import("./views/Roles"));
const Categories = lazy(() => import("./views/Categories"));

const dashRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon color="inherit" />,
    authIcon: <HomeIcon color="inherit" />,
    collapse: true,
    items: [
      {
        name: "Default",
        path: "/dashboard/default",
        component: Default,
        layout: "/admin",
      },
      {
        name: "CRM",
        path: "/dashboard/crm",
        component: CRM,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Quản lý người dùng",
    path: "/users",
    collapse: true,
    icon: <PersonIcon color="inherit" />,
    items: [
      {
        name: "Người dùng",
        path: "/users/user-list",
        component: Reports,
        layout: "/admin",
      },
      {
        name: "Quyền hạn",
        path: "/users/roles",
        component: Roles,
        layout: "/admin",
      },
    ],
  },
  {
    name: "Quản lý sản phẩm",
    path: "/products",
    collapse: true,
    icon: <GiSadCrab color="inherit" />,
    items: [
      {
        name: "Khoá học",
        path: "/products/products-list",
        component: Product,
        layout: "/admin",
      },
      {
        name: "Lớp học",
        path: "/classes/class-list",
        component: Classes,
        layout: "/admin",
      },
      {
        name: "Bài học",
        path: "/products/products-detail",
        component: ProductDetail,
        layout: "/admin",
      },
      {
        name: "Danh mục",
        path: "/products/categories-list",
        component: Categories,
        layout: "/admin",
      },
      // {
      //   name: "Đơn vị tính",
      //   path: "/products/unit",
      //   component: Unit,
      //   layout: "/admin",
      // },
    ],
  },
  // {

  //   name: "Quản lý kho",
  //   path: "/warehouse",
  //   collapse: true,
  //   icon: <HomeIcon color="inherit" />,
  //   items: [
  //     {
  //       name: "Kho",
  //       path: "/warehouse/warehouse-list",
  //       component: Warehouse,
  //       layout: "/admin",
  //     },
  //   ]
  // },
  // {
  //   name: "Pages",
  //   path: "/pages",
  //   collapse: true,
  //   icon: <DocumentIcon color="inherit" />,
  //   items: [
  //     {
  //       name: "Profile",
  //       path: "/profile",
  //       collapse: true,
  //       authIcon: <HomeIcon color="inherit" />,
  //       items: [
  //         {
  //           name: "Profile Overview",
  //           secondaryNavbar: true,
  //           path: "/pages/profile/overview",
  //           component: Overview,
  //           layout: "/admin",
  //         },
  //         {
  //           name: "Teams",
  //           secondaryNavbar: true,
  //           path: "/pages/profile/teams",
  //           component: Teams,
  //           layout: "/admin",
  //         },
  //         {
  //           name: "All Projects",
  //           secondaryNavbar: true,
  //           path: "/pages/profile/profile-projects",
  //           component: Projects,
  //           layout: "/admin",
  //         },
  //       ],
  //     },
  //     // {
  //     //   name: "Users",
  //     //   path: "/users",
  //     //   collapse: true,
  //     //   authIcon: <PersonIcon color="inherit" />,
  //     //   items: [
  //     //     {
  //     //       name: "Reports",
  //     //       path: "/pages/users/reports",
  //     //       component: Reports,
  //     //       layout: "/admin",
  //     //     },
  //     //     {
  //     //       name: "New User",
  //     //       path: "/pages/users/new-user",
  //     //       component: NewUser,
  //     //       layout: "/admin",
  //     //     },
  //     //   ],
  //     // },
  //     {
  //       name: "Account",
  //       path: "/account",
  //       collapse: true,
  //       authIcon: <PersonIcon color="inherit" />,
  //       items: [
  //         {
  //           name: "Settings",
  //           path: "/pages/account/settings",
  //           component: Settings,
  //           layout: "/admin",
  //         },
  //         {
  //           name: "Billing",
  //           component: Billing,
  //           path: "/pages/account/billing",
  //           layout: "/admin",
  //         },
  //         {
  //           name: "Invoice",
  //           component: Invoice,
  //           path: "/pages/account/invoice",
  //           layout: "/admin",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Projects",
  //       path: "/projects",
  //       collapse: true,
  //       authIcon: <StatsIcon color="inherit" />,
  //       items: [
  //         {
  //           name: "General",
  //           path: "/pages/projects/general",
  //           component: General,
  //           layout: "/admin",
  //         },
  //         {
  //           name: "Timeline",
  //           path: "/pages/projects/timeline",
  //           component: Timeline,
  //           layout: "/admin",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Pricing Page",
  //       component: Pricing,
  //       secondaryNavbar: true,
  //       path: "/pages/pricing-page",
  //       layout: "/auth",
  //     },
  //     {
  //       name: "Widgets",
  //       component: Widgets,
  //       path: "/pages/widgets",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Charts",
  //       component: Charts,
  //       path: "/pages/charts",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Alerts",
  //       path: "/pages/alerts",
  //       component: Alerts,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   name: "Applications",
  //   path: "/applications",
  //   icon: <StatsIcon color="inherit" />,
  //   collapse: true,

  //   items: [
  //     {
  //       name: "Kanban",
  //       component: Kanban,
  //       authIcon: <DocumentIcon color="inherit" />,
  //       path: "/applications/kanban",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Wizard",
  //       component: Wizard,
  //       authIcon: <CartIcon color="inherit" />,
  //       path: "/applications/wizard",
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Data Tables",
  //       path: "/applications/data-tables",
  //       authIcon: <PersonIcon color="inherit" />,
  //       component: DataTables,
  //       layout: "/admin",
  //     },
  //     {
  //       name: "Calendar",
  //       component: Calendar,
  //       authIcon: <StatsIcon color="inherit" />,
  //       path: "/applications/calendar",
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   name: "Ecommerce",
  //   path: "/ecommerce",
  //   icon: <CartIcon color="inherit" />,
  //   collapse: true,

  //   items: [
  //     {
  //       name: "Orders",
  //       path: "/orders",
  //       collapse: true,
  //       authIcon: <StatsIcon color="inherit" />,
  //       items: [
  //         {
  //           name: "Order List",
  //           component: OrderList,
  //           path: "/ecommerce/orders/order-list",
  //           layout: "/admin",
  //         },
  //         {
  //           name: "Order Details",
  //           component: OrderDetails,
  //           path: "/ecommerce/orders/order-details",
  //           layout: "/admin",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    name: "Authentication",
    path: "/authentication",
    icon: <PersonIcon color="inherit" />,
    collapse: true,
    invisible: true,
    items: [
      {
        name: "Sign In",
        component: SignInIllustration,
        path: "/login",
        layout: "/auth",
      },
      // {
      //   name: "Sign Up",
      //   path: "/authentication/sign-up",
      //   collapse: true,
      //   authIcon: <DocumentIcon color="inherit" />,
      //   items: [
      //     {
      //       name: "Basic",
      //       secondaryNavbar: true,
      //       component: SignUpBasic,
      //       path: "/authentication/sign-up/basic",
      //       layout: "/auth",
      //     },
      //     {
      //       name: "Cover",
      //       component: SignUpCover,
      //       path: "/authentication/sign-up/cover",
      //       layout: "/auth",
      //     },
      //     {
      //       name: "Illustration",
      //       component: SignUpIllustration,
      //       path: "/authentication/sign-up/illustration",
      //       layout: "/auth",
      //     },
      //   ],
      // },
    ],
  },
];

export default dashRoutes;
