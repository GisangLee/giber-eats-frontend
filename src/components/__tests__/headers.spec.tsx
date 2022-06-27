import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import { Header } from '../headers';
import { gql } from '@apollo/client';

const ME_QUERY = gql`
    query meQuery_Test {
        me {
            id
            email
            role
            verified
        }
    }
`;
const mocks = [
    {
      request: {
        query: ME_QUERY,
      },
      result: {
        data: {
            me: {
                id: 1,
                email: "",
                role: "",
                verified: true,
            }
        },
      },
    },
];

const verifyMock = [
    {
      request: {
        query: ME_QUERY,
      },
      result: {
        data: {
            me: {
                id: 1,
                email: "",
                role: "",
                verified: false,
            }
        },
      },
    },
];

describe("<Header/>", () => {
    it("renders header", async () => {
        const { debug } = render(
            <MockedProvider mocks={ mocks }>
                <BrowserRouter>
                    <Header/>
                </BrowserRouter>
            </MockedProvider>
        );
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); 
        });
    });

    it("renders verify banner", async () => {
        const { debug, getByText } = render(
            <MockedProvider mocks={ verifyMock }>
                <BrowserRouter>
                    <Header/>
                </BrowserRouter>
            </MockedProvider>
        );
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0)); 
        });

        getByText("이메일을 확인하여 인증을 완료해 주세요.");
    });
});