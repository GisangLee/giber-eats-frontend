import React from 'react'
import { act, render, waitFor } from '@testing-library/react';
import { NotFound } from '../../404';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

describe("<NotFound/>", () => {
    it("renders ok NotFound", () => {
        const { getByText, container } = render(
            <HelmetProvider>
                <BrowserRouter>
                    <NotFound/>
                </BrowserRouter>
            </HelmetProvider>
        );

        getByText("404 NOT FOUND");
        getByText("페이지가 존재하지 않습니다.");
        getByText(`홈으로 돌아가기 →`);

        expect(container.firstChild).toHaveClass("h-screen flex flex-col items-center justify-center");
        expect(container.childElementCount).toEqual(1);

    });
});