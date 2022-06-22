import React from 'react';
import { act, render } from '@testing-library/react';
import { App } from '../app';
import { isLoggedInVar } from '../../apollo';

jest.mock("../../routers/logged-out-router", () => {
    return {
        LoggedoutRouter: () => <span>logged-out</span>,
    };
});

jest.mock("../../routers/logged-in-router", () => {
    return {
        LoggedInRouter: () => <span>logged-in</span>,
    };
});

describe("<App/>", () => {
    it("renders logged out router", () => {
        const { getByText } = render(<App/>);
        getByText("logged-out");
    });

    it("renders logged in router", async () => {
        const { getByText } = render(<App/>);

        await act(() => {
            isLoggedInVar(true);
        });

        getByText("logged-in");
    });

});