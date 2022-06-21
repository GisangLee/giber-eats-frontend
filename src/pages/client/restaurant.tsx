import { gql, useQuery } from '@apollo/client';
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { restaurantQuery, restaurantQueryVariables } from '../../__generated__/restaurantQuery';

const RESTAURANT_QUERY = gql`
    query restaurantQuery($input: RestaurantInput!) {
        restaurant(input: $input) {
            ok
            error
            restaurant {
                ...restaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

type IRestaurant = {
    id: string;
};

export const RestaurantDetail = () => {
    const { id } = useParams() as IRestaurant;
    console.log(id);
    
    const { data: restaurantQueryResult, loading, error } = useQuery<restaurantQuery, restaurantQueryVariables>(RESTAURANT_QUERY, {
        variables: {
            input: {
                restaurantId: parseInt(id)
            },
        },
    });

    console.log(restaurantQueryResult, loading, error );
    return (
        <>
            <Helmet>
                <title>Restaurant Detail | Giber Eats</title>
            </Helmet>
            { !loading && restaurantQueryResult && restaurantQueryResult.restaurant.restaurant && restaurantQueryResult.restaurant.restaurant.category && (
                <div className='py-48 bg-cover bg-no-repeat bg-center bg-gray-800' style={{backgroundImage: `url(${restaurantQueryResult.restaurant.restaurant.coverImg})`}}>
                    <div className='bg-white w-3/12 py-8 pl-48'>
                        <h4 className='text-4xl mb-3'>{ restaurantQueryResult.restaurant.restaurant.name }</h4>
                        <h5 className='text-sm font-light mb-2'>{ restaurantQueryResult.restaurant.restaurant.category.name }</h5>
                        <h6 className='text-sm font-light'>{ restaurantQueryResult.restaurant.restaurant.address }</h6>
                    </div>

                </div>
            )}
        </>
    );
};