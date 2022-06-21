/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantQuery
// ====================================================

export interface restaurantQuery_restaurant_restaurant_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface restaurantQuery_restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  isPromoted: boolean;
  coverImg: string;
  category: restaurantQuery_restaurant_restaurant_category | null;
}

export interface restaurantQuery_restaurant {
  __typename: "RestaurantOuput";
  ok: boolean;
  error: string | null;
  restaurant: restaurantQuery_restaurant_restaurant | null;
}

export interface restaurantQuery {
  restaurant: restaurantQuery_restaurant;
}

export interface restaurantQueryVariables {
  input: RestaurantInput;
}
