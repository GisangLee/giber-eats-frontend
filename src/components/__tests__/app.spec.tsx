import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../app';

jest.mock("../../routers/logged-out-router", () => {
    return {
        LoggedoutRouter: () => <span>로그아웃</span>
    };
});

describe("<App/>", () => {
    it("renders OK", () => {
        const { debug, getByAltText } = render(<App/>);
        getByAltText("로그아웃");
    });
});