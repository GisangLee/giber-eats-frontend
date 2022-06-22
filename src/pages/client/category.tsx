import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import { categoryQuery, categoryQueryVariables } from '../../__generated__/categoryQuery';

const CATEGORY_QUERY = gql`
    query categoryQuery($input: CategoryInput!) {
        category(input: $input) {
            ok
            error
            totalPages
            totalResults
            category {
                ...categoryParts
            }
            restaurants {
                ...restaurantParts

            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
`;

type ICategoryParams = {
    slug:string;
};

export const Category = () => {

    const params = useParams<ICategoryParams>();
    const [page, setPage] = useState(1);

    const onNextPage = () => setPage(current => current + 1);
    const onPrevPage = () => setPage(current => current - 1);

    const { data:categoryQueryResult , loading } = useQuery<categoryQuery, categoryQueryVariables>(CATEGORY_QUERY, {
        variables: {
            input: {
                page: 1,
                slug: params.slug + ""
            },
        },
    });

    
    return (
        <>
            <Helmet>
                <title>카테고리 | Giber Eats</title>
            </Helmet>

            { !loading && categoryQueryResult && categoryQueryResult.category.restaurants && (
                <div className='max-w-screen-2xl mx-auto mt-8 pb-20'>
                    <div className='grid md:grid-cols-3 gap-x-5 gap-y-7 mt-16'>
                    { categoryQueryResult.category.restaurants.map(restaurant => {
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

                    <span className='mx-5'>페이지 { page } of { categoryQueryResult.category.totalPages }</span>

                    { page !== categoryQueryResult.category.totalPages ? (
                        <button className='focus:outline-none font-medium text-2xl' onClick={ onPrevPage }>&rarr;</button>
                    ) : <div></div> }
                    </div>
                </div>
            )}
        </>
    );
};