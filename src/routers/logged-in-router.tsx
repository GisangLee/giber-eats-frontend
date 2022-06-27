import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/headers';
import { NotFound } from '../404';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';
import { RestaurantDetail } from '../pages/client/restaurant';
import { MyRestaurants } from '../pages/owner/restaurants';
import { AddRestaurants } from '../pages/owner/add-restaurants';

const clientRoutes = [
    {
        path: "/",
        component: <Restaurants/>,
    },
    {
        path: "/search",
        component: <Search/>,
    },
    {
        path: "/category/:slug",
        component: <Category/>,
    },
    {
        path: "/restaurant/:id",
        component: <RestaurantDetail/>,
    },
];

const ownerRoutes = [
    {
        path: "/",
        component: <MyRestaurants/>,
    },
    {
        path: "/add-restaurant",
        component: <AddRestaurants/>,
    },
];

const commonRoutes = [
    {
        path: "/confirm",
        component: <ConfirmEmail/>,
    },
    {
        path: "/edit-profile",
        component: <EditProfile/>,
    },
];


export const LoggedInRouter = () => {
    const {data: meQueryResult, loading, error } = useMe();

    if (!meQueryResult || loading || error) {
        return (
            <div className=' h-screen flex justify-center items-center'>
                <span className='font-medium text-xl tracking-wide'>Loading....</span>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                { commonRoutes.map((route, index) => <Route key={ index } path={ route.path } element={ route.component }></Route>) }
                { meQueryResult.me.role === "Client" &&  clientRoutes.map((route, index) => <Route key={ index } path={ route.path } element={ route.component }></Route>) }
                { meQueryResult.me.role === "Owner" &&  ownerRoutes.map((route, index) => <Route key={ index } path={ route.path } element={ route.component }></Route>) }
                <Route path="*" element={ <NotFound/> }/>
            </Routes>
        </BrowserRouter>
    );
};