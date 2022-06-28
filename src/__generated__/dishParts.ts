/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: dishParts
// ====================================================

export interface dishParts_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface dishParts_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: dishParts_options_choices[] | null;
}

export interface dishParts {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  desc: string | null;
  options: dishParts_options[] | null;
}
