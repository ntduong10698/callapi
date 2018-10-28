import React from 'react';
import Booking from './Booking';
import Comment from './Comment';
import Customer from './Customer';
import Gallery from './Gallery';
import Hotel from './Hotel';
import Location from './Location';
import Provider from './Provider';
import RateTour from './RateTour';
import Ticket from './Ticket';
import Tour from './Tour';
import Vehicle from './Vehicle';
import VehicleType from './VehicleType';
const routes = [
    {
        path: '/Booking',
        exact: true,
        main: () => <Booking/>
    },
    {
        path: '/Comment',
        exact: false,
        main: () => <Comment/>
    },
    {
        path: '/Customer',
        exact: false,
        main: () => <Customer/>
    },
    {
        path: '/Gallery',
        exact: false,
        main: () => <Gallery/>
    },
    {
        path: '/Hotel',
        exact: false,
        main: () => <Hotel/>
    },
    {
        path: '/Location',
        exact: false,
        main: () => <Location/>
    },
    {
        path: '/Provider',
        exact: false,
        main: () => <Provider/>
    },
    {
        path: '/RateTour',
        exact: false,
        main: () => <RateTour/>
    },
    {
        path: '/Ticket',
        exact: false,
        main: () => <Ticket/>
    },
    {
        path: '/Tour',
        exact: false,
        main: () => <Tour/>
    },
    {
        path: '/VehicleType',
        exact: false,
        main: () => <VehicleType/>
    },
    {
        path: '/Vehicle',
        exact: false,
        main: () => <Vehicle/>
    }    
];

export default routes;