
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQueryParam } from '../../hooks/useQueryParam';
import { gql, useLazyQuery } from '@apollo/client';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { searchRestaurant, searchRestaurantVariables } from '../../__generated__/searchRestaurant';
import { Restaurant } from '../../components/restaurant';
import { Link } from 'react-router-dom';

const SEARCH_RESTAURANT = gql`
    query searchRestaurant($input: SearchRestaurantInput!) {
        searchRestaurant(input: $input){
            ok
            error
            totalPages
            restaurants {
                ...restaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
    const urlParam = useQueryParam();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const [queyExecutionFn, { loading, error, data:searchRestaurantResult }] = useLazyQuery<searchRestaurant, searchRestaurantVariables>(SEARCH_RESTAURANT);

    const onNextPage = () => setPage(current => current + 1);

    const onPrevPage = () => setPage(current => current - 1);

    useEffect(() => {
        const searchTerm = urlParam.get("term");
        
        if (!searchTerm) {
            return navigate("/", { replace: true })
        }

        queyExecutionFn({
            variables: {
                input: {
                    page,
                    query: searchTerm
                },
            },
        });


    }, [navigate])

    console.log(loading, searchRestaurantResult);
    return (
        <>
            <Helmet>
                <title>검색 | Giber Eats</title>
            </Helmet>
            
            { !loading && searchRestaurantResult && searchRestaurantResult.searchRestaurant.restaurants && (
                <div className='max-w-screen-2xl mx-auto mt-8 pb-20'>
                    <div className='grid md:grid-cols-3 gap-x-5 gap-y-7 mt-16'>
                    { searchRestaurantResult.searchRestaurant.restaurants.map(restaurant => {
                        if(restaurant.category) {
                            return (
                                <Link key={ restaurant.id } to={ `/restaurant/${ restaurant.id }` }>
                                    <Restaurant coverImg={ restaurant.coverImg } id={ restaurant.id + "" } name={ restaurant.name } categoryName={ restaurant.category.name }/>
                                </Link>
                            );
                        }else if (!restaurant.category) {
                            return (
                                <Link key={ restaurant.id } to={ `/restaurant/${ restaurant.id }` }>
                                    <Restaurant coverImg={ restaurant.coverImg } id={ restaurant.id + "" } name={ restaurant.name }/>
                                </Link>
                            );
                        }
                    })}
                    </div>
                    <div className='grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10'>
                        { page > 1 ? <button className='focus:outline-none font-medium text-2xl' onClick={ onNextPage }>&larr;</button> : <div></div> }

                        <span className='mx-5'>페이지 { page } of { searchRestaurantResult.searchRestaurant.totalPages }</span>

                        { page !== searchRestaurantResult.searchRestaurant.totalPages ? (
                            <button className='focus:outline-none font-medium text-2xl' onClick={ onPrevPage }>&rarr;</button>
                        ) : <div></div> }
                    </div>
                </div>
            )}
        </>
    );
};