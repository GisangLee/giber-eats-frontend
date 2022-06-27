/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAccountMutation_Test
// ====================================================

export interface createAccountMutation_Test_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface createAccountMutation_Test {
  createAccount: createAccountMutation_Test_createAccount;
}

export interface createAccountMutation_TestVariables {
  createAccountInput: CreateAccountInput;
}
