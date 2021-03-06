import { gql } from "@apollo/client";

export const RESTAURANT_FRAGMENT = gql`
    fragment restaurantParts on Restaurant {
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
`;

export const CATEGORY_FRAGMENT = gql`
    fragment categoryParts on Category {
        id
        name
        coverImg
        slug
        restaurantCount
    }
`;


export const DISH_FRAGMENT = gql`
    fragment dishParts on Dish {
        id
        name
        price
        photo
        desc
        options {
            name
            extra
            choices {
                name
                extra
            }
        }
    }
`;