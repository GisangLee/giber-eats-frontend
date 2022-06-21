/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: restaurantParts
// ====================================================

export interface restaurantParts_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface restaurantParts {
  __typename: "Restaurant";
  id: number;
  name: string;
  address: string;
  isPromoted: boolean;
  coverImg: string;
  category: restaurantParts_category | null;
}
