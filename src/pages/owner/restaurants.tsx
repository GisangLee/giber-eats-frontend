import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurants } from '../../__generated__/myRestaurants';


const MY_RESTAURANTS = gql`
    query myRestaurants {
        myRestaurants {
            ok
            error
            restaurants {
                ...restaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

export const MyRestaurants = () => {
    const { data: myRestaurantsResult, loading, error } = useQuery<myRestaurants>(MY_RESTAURANTS);

    return (
        <div>
            <Helmet>
                <title>내 가게 | Giber Eats</title>
            </Helmet>
            <div className='max-w-screen-2xl mx-auto mt-32'>
                <h2 className='text-4xl font-medium mb-10'>내 가게들</h2>
                { !loading && myRestaurantsResult && myRestaurantsResult.myRestaurants && myRestaurantsResult.myRestaurants.ok &&
                    myRestaurantsResult.myRestaurants.restaurants.length === 0 &&
                    <>
                        <h4 className='text-xl mb-5'>가게가 없습니다.</h4>
                        <Link className='text-lime-600 hover:underline' to="/add-restaurant">
                            가게 올리기
                        </Link>
                    </>
                }
            </div>
            
        </div>
    );
};