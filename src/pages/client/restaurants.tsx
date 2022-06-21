import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { restaurantsPageQuery, restaurantsPageQueryVariables } from '../../__generated__/restaurantsPageQuery';
import FoodPhoto from "../../images/food_photo.jpg";
import { Restaurant } from '../../components/restaurant';

const RESTAURANTS_QUERY = gql`
    query restaurantsPageQuery($input: RestaurantsIput!) {
        allCategories {
            ok
            error
            categories {
                id
                name
                coverImg
                slug
                restaurantCount
            }
        }

        restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants {
                id
                name
                address
                isPromoted
                coverImg
                category {
                    id
                    name
                    slug
                }
            }
        }
    }
`;


export const Restaurants = () => {

    const [page, setPage] = useState(1);

    const { data: restaurantQueryResult, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page,
            },
        },
    });

    const onNextPageClick = () => setPage(current => current + 1);

    const onPrevPageClick = () => setPage(current => current - 1);


    return (
        <div>
            <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
                <input type="Search" placeholder='검색' className='input w-3/12 rounded-md border-0'/>
            </form>

            { !loading && restaurantQueryResult && restaurantQueryResult.allCategories.categories && restaurantQueryResult.restaurants.restaurants && (
                <div className='max-w-screen-2xl mx-auto mt-8 pb-20'>
                    <div className='flex justify-around max-w-screen-xs mx-auto'>
                        { restaurantQueryResult.allCategories.categories.map(category => (
                            <div className='flex flex-col group items-center cursor-pointer' key={category.id}>
                                <div className='w-10 h-10 rounded-full bg-cover group-hover:bg-gray-100' style={{ backgroundImage: `url(${category.coverImg})`}}></div>
                                <span className='mt-1 text-sm text-center text-medium'>{category.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className='grid grid-cols-3 gap-x-5 gap-y-7 mt-16'>
                        { restaurantQueryResult.restaurants.restaurants.map(restaurant => {
                            if(restaurant.category) {
                                return (
                                    <Restaurant coverImg={ restaurant.coverImg } id={ restaurant.id + "" } name={ restaurant.name } categoryName={ restaurant.category.name }/>
                                );
                            }else if (!restaurant.category) {
                                return (
                                    <Restaurant coverImg={ restaurant.coverImg } id={ restaurant.id + "" } name={ restaurant.name }/>
                                );
                            }
                        })}
                    </div>

                    <div className='grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10'>
                        { page > 1 ? <button className='focus:outline-none font-medium text-2xl' onClick={ onPrevPageClick }>&larr;</button> : <div></div> }

                        <span className='mx-5'>페이지 { page } of { restaurantQueryResult.restaurants.totalPages }</span>

                        { page !== restaurantQueryResult.restaurants.totalPages ? (
                            <button className='focus:outline-none font-medium text-2xl' onClick={ onNextPageClick }>&rarr;</button>
                        ) : <div></div> }
                    </div>
                </div>
            )}
        </div>
    );
};