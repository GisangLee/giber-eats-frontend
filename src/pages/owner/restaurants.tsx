import { gql, useApolloClient, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import { myRestaurants } from '../../__generated__/myRestaurants';


export const MY_RESTAURANTS_QUERY = gql`
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
    const { data: myRestaurantsResult, loading, error } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY);
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

                { !loading && myRestaurantsResult && myRestaurantsResult.myRestaurants && myRestaurantsResult.myRestaurants.ok && 
                    myRestaurantsResult.myRestaurants.restaurants.length >= 1 &&

                    <div className='grid md:grid-cols-3 gap-x-5 gap-y-10 mt-16'>
                        { myRestaurantsResult.myRestaurants.restaurants.map(restaurant => {
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
                }
            </div>
            
        </div>
    );
};