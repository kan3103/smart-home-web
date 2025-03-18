import Dashboard from '../pages/Home/HomePage';
import SignInPage from '../pages/CreateAccount.jsx';
import Login from "../pages/Login.jsx";

const routes = [
    {
        path: '/',
        component: Dashboard,
        protected: false,
    },
    {
        path: '/home',
        // component: Home,
        protected: true,
        allowedRoles: ['admin'],
    },
    {
        path: '/home-staff',
        // component: HomeStaff,
        protected: true,
        allowedRoles: ['staff'],
    },
    {
        path: '/login',
        component: Login,
        // layout: false,
        // layoutStaff: false,
        // protected: false,
    },
    {
        path: '/add-printing',
        // component: AddMember,
        protected: true,
        allowedRoles: ['admin'],
    },
    {
        path: '/profile',
        // component: Profile,
        protected: true,
        allowedRoles: ['admin'],
    },
    {
        path: '/profile-staff',
        // component: ProfileStaff,
        protected: true,
        allowedRoles: ['staff'],
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


