import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { restaurantsPageQuery, restaurantsPageQueryVariables } from '../../__generated__/restaurantsPageQuery';
import FoodPhoto from "../../images/food_photo.jpg";
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { CategoryCompoent } from '../../components/category';


const RESTAURANTS_QUERY = gql`
    query restaurantsPageQuery($input: RestaurantsIput!) {
        allCategories {
            ok
            error
            categories {
                ...categoryParts
            }
        }

        restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            restaurants {
                ...restaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
    searchTerm: string;
};

export const Restaurants = () => {

    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const { data: restaurantQueryResult, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page,
            },
        },
    });

    const onNextPageClick = () => setPage(current => current + 1);

    const onPrevPageClick = () => setPage(current => current - 1);

    const { register, handleSubmit, getValues } = useForm<IFormProps>();

    const onSearchSubmit = () => {
        const { searchTerm } = getValues();

        navigate({
            pathname: "/search",
            search: `?term=${searchTerm}` 
        })
    };


    return (
        <div>   
            <Helmet>
                <title>Home | Giber Eats</title>
            </Helmet>
            <form className="bg-gray-800 bg-cover bg-no-repeat bg-center w-full py-40 flex items-center justify-center" onSubmit={ handleSubmit(onSearchSubmit) } style={{ backgroundImage: `url(${FoodPhoto})`}}>
                <input {...register("searchTerm", { required: true })} type="Search" placeholder='검색' className='input w-3/4 md:w-3/12 rounded-md border-0'/>
            </form>

            { !loading && restaurantQueryResult && restaurantQueryResult.allCategories.categories && restaurantQueryResult.restaurants.restaurants && (
                <div className='max-w-screen-2xl mx-auto mt-8 pb-20'>
                    <div className='flex justify-around max-w-screen-xs mx-auto'>
                        { restaurantQueryResult.allCategories.categories.map(category => {
                            if (category.coverImg) {
                                return (
                                    <CategoryCompoent id={ category.id + "" } coverImg={ category.coverImg } name={ category.name } slug={ category.slug }/>
                                );
                            }else {
                                return (
                                    <CategoryCompoent id={ category.id + "" } name={ category.name } slug={ category.slug } />
                                );
                            }
                        })}
                    </div>

                    <div className='grid md:grid-cols-3 gap-x-5 gap-y-7 mt-16'>
                        { restaurantQueryResult.restaurants.restaurants.map(restaurant => {
                            if(restaurant.category) {
                                return (
                                    <Restaurant key={ restaurant.id } coverImg={ restaurant.coverImg } id={ restaurant.id + "" } name={ restaurant.name } categoryName={ restaurant.category.name }/>
                                );
                            }else if (!restaurant.category) {
                                return (
                                    <Restaurant key={ restaurant.id } coverImg={ restaurant.coverImg } id={ restaurant.id + "" } name={ restaurant.name }/>
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