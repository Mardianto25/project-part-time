import React, {Fragment, Suspense} from 'react';
import {Helmet} from 'react-helmet';
// import Notifications from 'react-notify-toast';
import Loading from '../components/loading';

import NavbarTheme from './widgets/navbar';


const MainLayout = ({Container, title}) => {
    return (
        <Fragment>
            <Helmet>
                <title>Project Test - {title}</title>
            </Helmet>
            <Suspense fallback={
                <Loading />
            }>
            <NavbarTheme />
            <div className='container'>
                <Container />
            </div>
            
            </Suspense>
        </Fragment>
    );
};

export default MainLayout;