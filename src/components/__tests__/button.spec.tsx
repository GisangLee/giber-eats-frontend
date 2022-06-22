
import { render } from '@testing-library/react';
import React from 'react'
import { Button } from '../button';

describe('<button/>', () => {
    it("should render with props", () => {
        const { debug, getByText, rerender } = render(<Button canClick={true} loading={false} actionText={"TEST"}/>)
        getByText("TEST");
        
        rerender(<Button canClick={true} loading={true} actionText={"Loading...."}/>)
        getByText("Loading....");
    });

    it("should display loading", () => {
        const { getByText, container } = render(<Button canClick={false} loading={true} actionText={"TEST"}/>)
        expect(container.firstChild).toHaveClass("pointer-events-none");
    });
});