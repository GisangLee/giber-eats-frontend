/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: loginMutation_Test_Test
// ====================================================

export interface loginMutation_Test_Test_login {
  __typename: "LoginOutput";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface loginMutation_Test_Test {
  login: loginMutation_Test_Test_login;
}

export interface loginMutation_Test_TestVariables {
  loginInput: LoginInput;
}
