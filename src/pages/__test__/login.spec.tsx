import React from 'react'
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider, gql } from '@apollo/client';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { Login } from '../login';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';


describe("<Login/>", () => {
    let renderResult: RenderResult;
    let mockClient: MockApolloClient;

    beforeEach(async () => {
        await act(async () => {
            mockClient = await createMockClient();
            renderResult = render(
                <HelmetProvider>
                    <BrowserRouter>
                        <ApolloProvider client={ mockClient }>
                            <Login/>
                        </ApolloProvider>
                    </BrowserRouter>
                </HelmetProvider>
            )
        });
    });

    it("check title text", async () => {
        await act(async () => {
            await expect(document.title).toBe("로그인 | Giber Eats");
        })
    });

    it("displays email & password validation errors", async () => {
        const { getByPlaceholderText, debug, getByText } = renderResult;

        const email = getByPlaceholderText("이메일");
        const password = getByPlaceholderText("비밀번호");

        await act(async () => {
            await userEvent.type(email, "this@wont");
            await userEvent.type(password, "qwe");
        });

        getByText("이메일 형식이 아닙니다.");
        getByText("최소 8자리 이상이어야 합니다.");

        await act(async () => {
            userEvent.clear(email);
            userEvent.clear(password);
        });
    });

    it("display email required errors", async () => {
        const { getByText, getByRole, getByPlaceholderText } = renderResult;

        const password = getByPlaceholderText("비밀번호");
        const submitButton = getByRole("button");

        await act(async () => {
            await userEvent.type(password, "qwe123qwe123");
            await userEvent.click(submitButton);
        });

        getByText("필수항목입니다.");
    });

    it("display password required errors", async () => {
        const { getByText, getByRole, getByPlaceholderText } = renderResult;

        const email = getByPlaceholderText("이메일");
        const submitButton = getByRole("button");

        await act(async () => {
            await userEvent.type(email, "this@wont");
            await userEvent.click(submitButton);
        });

        getByText("필수항목입니다.");
    });

    it("submit form and calls mutation", async () => {
        const { getByPlaceholderText, getByRole, debug } = renderResult;
        jest.spyOn(Storage.prototype, "setItem");

        const email = getByPlaceholderText("이메일");
        const password = getByPlaceholderText("비밀번호");
        const submitBtn = getByRole("button");

        const formData = {
            email: "masterkorea01@naver.com",
            password:"qwe123qwe123"
        };
        
        const LOGIN_MUTATION = gql`
            mutation loginMutation($loginInput: LoginInput!) {
                login(input: $loginInput){
                    ok
                    error
                    token
                }
            }
        `;

        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                login: {
                    ok: true,
                    token:"XXX",
                    error: null,
                },
            },
        });

        mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

        await act(async () => {
            await userEvent.type(email, formData.email);
            await userEvent.type(password, formData.password);
            await userEvent.click(submitBtn);
        });

        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
            loginInput: {
                email: formData.email,
                password: formData.password
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith("giber-token", "XXX");
    });

    it("login mutation error", async () => {
        const { getByPlaceholderText, getByRole, getByText } = renderResult;

        const email = getByPlaceholderText("이메일");
        const password = getByPlaceholderText("비밀번호");
        const submitBtn = getByRole("button");

        const formData = {
            email: "masterkorea01@naver.com",
            password:"qwe123qwe123123"
        };
        
        const LOGIN_MUTATION = gql`
            mutation loginMutation($loginInput: LoginInput!) {
                login(input: $loginInput){
                    ok
                    error
                    token
                }
            }
        `;

        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                login: {
                    ok: false,
                    token: null,
                    error: "mutation error"
                },
            },
        });

        mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

        await act(async () => {
            await userEvent.type(email, formData.email);
            await userEvent.type(password, formData.password);
            await userEvent.click(submitBtn);
        });

        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
            loginInput: {
                email: formData.email,
                password: formData.password
            }
        });

        getByText("mutation error");
    });
}); 