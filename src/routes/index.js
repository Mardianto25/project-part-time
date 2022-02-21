import {lazy} from 'react';

const HomeManagement = lazy( () => import('../components/home') );
const AboutManagement = lazy( () => import('../components/about') );
const UserManagement = lazy( () => import('../components/user') );
const DetailManagement = lazy( () => import('../components/detail') );

const routes = [
    {title: 'Home', container: HomeManagement, exact: true, path: '/'},
    {title: 'About', container: AboutManagement, exact: true, path: '/about'},
    {title: 'Users', container: UserManagement, exact: true, path: '/users/:usersId'},
    {title: 'Detail', container: DetailManagement, exact: true, path: '/detail/:postId'},

];
export default routes;