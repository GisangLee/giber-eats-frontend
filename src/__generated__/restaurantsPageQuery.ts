/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsIput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsPageQuery_allCategories_categories[] | null;
}

export interface restaurantsPageQuery_restaurants_restaurants_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface restaurantsPageQuery_restaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  isPromoted: boolean;
  coverImg: string;
  category: restaurantsPageQuery_restaurants_restaurants_category | null;
}

export interface restaurantsPageQuery_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: restaurantsPageQuery_restaurants_restaurants[] | null;
}

export interface restaurantsPageQuery {
  allCategories: restaurantsPageQuery_allCategories;
  restaurants: restaurantsPageQuery_restaurants;
}

export interface restaurantsPageQueryVariables {
  input: RestaurantsIput;
}
