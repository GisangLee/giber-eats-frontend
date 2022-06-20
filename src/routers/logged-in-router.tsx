import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { meQuery } from '../__generated__/meQuery';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/headers';
import { NotFound } from '../404';


const ClientRoutes = [
    <Route path='/' element={ <Restaurants /> }></Route>
]

const ME_QUERY = gql`
    query meQuery {
        me {
            id
            email
            role
            verified
        }
    }
`


export const LoggedInRouter = () => {
    const {data: meQueryResult, loading, error } = useQuery<meQuery>(ME_QUERY);
    console.log(meQueryResult);
    console.log(error);

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