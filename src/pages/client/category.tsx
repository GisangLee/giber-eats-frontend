import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
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

    const { data, loading } = useQuery<categoryQuery, categoryQueryVariables>(CATEGORY_QUERY, {
        variables: {
            input: {
                page: 1,
                slug: params.slug + ""
            },
        },
    });

    console.log(data);

    
    return (
        <div>Cate</div>
    );
};