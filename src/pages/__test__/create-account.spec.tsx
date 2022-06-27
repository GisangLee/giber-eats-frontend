import React from 'react'
import { ApolloProvider, gql } from '@apollo/client';
import { RenderResult } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { act, mockComponent } from 'react-dom/test-utils';
import { CreateAccount } from '../signup';
import { render } from '../../test.utils';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
    const realModule = jest.requireActual("react-router-dom");

    return {
        ...realModule,
        useNavigate: () => mockPush,
    };
});

jest.mock("react", () => {
    const readlModule = jest.requireActual("react");
    return {
        ...readlModule,
    };
});

describe("<CreateAccount/>", () => {
    let mockClient: MockApolloClient;
    let renderResult: RenderResult;

    beforeEach(async () => {
        await act(async () => {
            mockClient = await createMockClient();
            
            renderResult = render(
                <ApolloProvider client={ mockClient }>
                    <CreateAccount/>
                </ApolloProvider>
            );
        });
    });

    it("rendsers ok", async () => {
        await act(async () => {
            await expect(document.title).toBe("회원가입 | Giber Eats");
        });
    });

    it("displays email and password validation errors", async () => {
        const { getByText, getByPlaceholderText, getByRole } = renderResult;

        const email = getByPlaceholderText("이메일");
        const password = getByPlaceholderText("비밀번호");

        await act(async () => {
            await userEvent.type(email, "wta@asd");
            await userEvent.type(password, "qwe");
        });

        getByText("이메일 형식이 아닙니다.");
        getByText("최소 8자리 이상이어야 합니다.");

        await act(async () => {
            await userEvent.clear(email);
            await userEvent.clear(password);
        });
    });

    it("email required errors", async () => {
        const { getByText, getByPlaceholderText, getByRole } = renderResult;

        const password = getByPlaceholderText("비밀번호");
        const submitBtn = getByRole("button");

        await act(async () => {
            await userEvent.type(password, "qwe");
            await userEvent.click(submitBtn);
        });

        getByText("필수항목입니다.");

        await act(async () => {
            await userEvent.clear(password);
        });
    });

    it("password required errors", async () => {
        const { getByText, getByPlaceholderText, getByRole } = renderResult;

        const email = getByPlaceholderText("이메일");
        const submitBtn = getByRole("button");

        await act(async () => {
            await userEvent.type(email, "masterkorea01@naver.com");
            await userEvent.click(submitBtn);
        });

        getByText("필수항목입니다.");

        await act(async () => {
            await userEvent.clear(email);
        });
    });

    it("already exists error", async () => {
        const { getByText, getByPlaceholderText, getByRole } = renderResult;

        const email = getByPlaceholderText("이메일");
        const password = getByPlaceholderText("비밀번호");
        const submitBtn = getByRole("button");

        const formData = {
            email: "masterkorea01@naver.com",
            password:"qwe123qwe123"
        };

        const CREATE_ACCOUNT_MUTATION = gql`
            mutation createAccountMutation_Test_Test($createAccountInput: CreateAccountInput!) {
                createAccount(input: $createAccountInput) {
                    ok
                    error
                }
            }
        `;

        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                createAccount: {
                    ok: false,
                    error: "already exists",
                },
            },
        });

        mockClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedMutationResponse);

        await act(async () => {
            await userEvent.type(email, formData.email);
            await userEvent.type(password, formData.password);
            await userEvent.click(submitBtn);
        });

        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
            createAccountInput: {
                email: formData.email,
                password: formData.password,
                role: "Client"
            }
        });

        getByText("already exists");
    })

    it("mutation success", async () => {
        const { getByText, getByPlaceholderText, getByRole } = renderResult;

        const email = getByPlaceholderText("이메일");
        const password = getByPlaceholderText("비밀번호");
        const submitBtn = getByRole("button");

        const formData = {
            email: "dudegs.py@gmail.com",
            password:"qwe123qwe123"
        };

        const CREATE_ACCOUNT_MUTATION = gql`
            mutation createAccountMutation_Test($createAccountInput: CreateAccountInput!) {
                createAccount(input: $createAccountInput) {
                    ok
                    error
                }
            }
        `;

        const mockedMutationResponse = jest.fn().mockResolvedValue({
            data: {
                createAccount: {
                    ok: true,
                    error: null,
                },
            },
        });

        mockClient.setRequestHandler(CREATE_ACCOUNT_MUTATION, mockedMutationResponse);

        jest.spyOn(window, "alert").mockImplementation(() => null);

        await act(async () => {
            await userEvent.type(email, formData.email);
            await userEvent.type(password, formData.password);
            await userEvent.click(submitBtn);
        });

        expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
        expect(mockedMutationResponse).toHaveBeenCalledWith({
            createAccountInput: {
                email: formData.email,
                password: formData.password,
                role: "Client"
            }
        });
        expect(mockPush).toHaveBeenCalledWith("/");
        expect(window.alert).toHaveBeenCalledWith("회원가입이 완료되었습니다.");
    })

    afterAll(() => {
        jest.clearAllMocks();
    });
});

