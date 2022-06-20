import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from '../404';
import { Login } from '../pages/login';
import { CreateAccount } from '../pages/signup';

export const LoggedoutRouter = () =>{

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/create-account" element={<CreateAccount/>}></Route>
                <Route path="/" element={<Login/>}></Route>
                <Route path="*" element={ <NotFound/> }></Route>
            </Routes>
        </BrowserRouter>
    );
};