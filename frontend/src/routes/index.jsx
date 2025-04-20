import HomePage from '../pages/Home/HomePage';
import SignInPage from '../pages/CreateAccount.jsx';
import Login from "../pages/Login.jsx";
import AddMember from "../pages/AddMember/AddMember";
import AddDevice from "../pages/AddDevice/AddDevice";
import Chart from "../pages/Dashboard/DashboardPage";

const routes = [
    {
        path: '/',
        component: HomePage,
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
        // component: AddDevice,
        // protected: true,
        // allowedRoles: ['staff'],
    },
    {
        path: '/login',
        component: Login,
        // layout: false,
        // layoutStaff: false,
        // protected: false,
    },
    {
        path: '/add-member',
        component: AddMember,
        // protected: false,
        // allowedRoles: ['admin'],
    },
    {
        path: '/profile',
        // component: Profile,
        protected: true,
        allowedRoles: ['admin'],
    },
    {
        path: '/dashboard',
        // component: Chart,
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
        path: '/print-history-staff',
        // component: PrintHistoryStaff,
        protected: true,
        allowedRoles: ['staff'],
    },
    {
        path : '/sign-in',
        component: SignInPage,
    },
];

export default routes;


