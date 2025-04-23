import Home from '../pages/Home/HomePage';
import Login from "../pages/Login/Login.jsx";
import AddMember from "../pages/AddMember/AddMember";
import AddDevice from "../pages/AddDevice/AddDevice";
import Dashboard from "../pages/Dashboard/DashboardPage";
import Profile from "../pages/Profile/ProfilePage";
import Notification from "../pages/Notification/Notification";

const routes = [
    {
        path: '/',
        component: Home,
        protected: false,
    },
    {
        path: '/home',
        // component: Home,
        protected: true,
        allowedRoles: ['admin'],
    },
    {
        path: '/add-device',
        component: AddDevice,
        // protected: true,
        // allowedRoles: ['staff'],
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/add-member',
        component: AddMember,
        // protected: false,
        // allowedRoles: ['admin'],
    },
    {
        path: '/profile',
        component: Profile,
        // protected: true,
        // allowedRoles: ['admin'],
    },
    {
        path: '/dashboard',
        component: Dashboard,
        // protected: true,
        // allowedRoles: ['staff'],
    },
    {
        path: '/print-history',
        // component: History,
        protected: true,
        allowedRoles: ['admin'],
    },
    {
        path: '/notification',
        component: Notification,
        // protected: true,
        // allowedRoles: ['staff'],
    },
    {
        path : '/sign-in',
        // component: SignInPage,
    },
];

export default routes;


