/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchRestaurant_restaurants_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface searchRestaurant_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  isPromoted: boolean;
  coverImg: string;
  category: searchRestaurant_searchRestaurant_restaurants_category | null;
}

export interface searchRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOuput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  restaurants: searchRestaurant_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurant {
  searchRestaurant: searchRestaurant_searchRestaurant;
}

export interface searchRestaurantVariables {
  input: SearchRestaurantInput;
}
