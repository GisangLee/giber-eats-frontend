import { render } from '@testing-library/react';
import React from 'react'
import { FormError } from '../form-erorr';


describe("<FormError/>", () => {
    it("renders ok with props", () => {
        const { getByText } = render(<FormError errorMessage={ "test" }/>)

        getByText("test");
    });
});