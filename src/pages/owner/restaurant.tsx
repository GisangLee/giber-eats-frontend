import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurant, myRestaurantVariables } from '../../__generated__/myRestaurant';

export const MY_RESTAURANT_QUERY = gql`
    query myRestaurant($input: MyRestaurantInput!) {
        myRestaurant(input:$input) {
            ok
            error
            restaurant {
                ...restaurantParts
                menu {
                    ...dishParts
                }
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${DISH_FRAGMENT}
`;

type IParams = {
    id: string;
};

export const MyRestaurant = () => {
    const { id } = useParams<IParams>();

    if (id) {

        const { data:myRestaurantQueryResult } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
            variables: {
                input: {
                    id: parseInt(id)
                },
            },
        });
        
        console.log(myRestaurantQueryResult);
        
            return (
                <div className="container flex flex-col items-center mt-52">
                    { myRestaurantQueryResult && myRestaurantQueryResult.myRestaurant.restaurant && myRestaurantQueryResult.myRestaurant.restaurant.menu && (
                        <>
                            <Helmet>
                                <title>내 가게 모두 보기| Giber Eats</title>
                            </Helmet>
                            <div className='bg-gray-700 py-28 bg-center bg-cover' style={ { backgroundImage: `url(${myRestaurantQueryResult.myRestaurant.restaurant.coverImg})` } }></div>
                            <div className='container mt-10'>
                                <h2 className='text-4xl font-medium mb-10'>
                                    { myRestaurantQueryResult.myRestaurant.restaurant.name || "Loading... " }
                                </h2>
                                <Link to="add-dish" className='mr-8 text-white bg-gray-800 py-3 px-10'>
                                    메뉴 추가 &rarr;
                                </Link>
                                <Link to="" className='text-white bg-lime-700 py-3 px-10'>
                                    프로모션 신청하기 &rarr;
                                </Link>
                            </div>
                            <div className='mt-10'>
                                { myRestaurantQueryResult.myRestaurant.restaurant.menu.length === 0 ? (
                                    <h4 className='text-xl mb-5'>메뉴가 없습니다.</h4>
                                ) : null }
                            </div>
                        </>
                    )}
                </div>
            );
    }

    return (
        <div>
            Loading...
        </div>
    )
};