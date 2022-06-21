import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/headers';
import { NotFound } from '../404';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';


const ClientRoutes = [
    <Route key={1}  path='/' element={ <Restaurants /> }></Route>,
    <Route key={2}  path='/confirm' element={ <ConfirmEmail /> }></Route>,
    <Route key={3}  path='/edit-profile' element={ <EditProfile /> }></Route>
]

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
                { meQueryResult.me.role === "Client" ? ClientRoutes : ""}
                <Route path="*" element={ <NotFound/> }/>
            </Routes>
        </BrowserRouter>
    );
};