import Login from '../Login';
import Home from '../Home';
import Room from '../Room';

const appRoutes = {
    auth: {
        path: '/auth',
        title: 'React boilerplate login',
        description: 'React boilerplate login',
        requireLogin: false,
        Component: Login,
    },
    home: {
        path: '/',
        title: 'React boilerplate home',
        description: 'React boilerplate home',
        requireLogin: true,
        Component: Home,
    },
    room: {
        path: '/rooms/:_id',
        title: 'React boilerplate room',
        description: 'React boilerplate room',
        requireLogin: true,
        Component: Room,
    },
};
export default appRoutes;
