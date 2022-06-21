import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

export const NotFound = () => {

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <Helmet>
                <title>찾을 수 없는 페이지 입니다. | Giber Eats</title>
            </Helmet>
            <h2 className='font-semibold text-xl mb-3'>404 NOT FOUND</h2>
            <h4 className='font-medium text mb-5'>페이지가 존재하지 않습니다.</h4>
            <Link to="/" className='hover:underline text-lime-500'>홈으로 돌아가기 &rarr;</Link>
        </div>
    )
};