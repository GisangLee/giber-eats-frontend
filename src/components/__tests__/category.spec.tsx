import { render } from '@testing-library/react';
import React from 'react'
import { CategoryCompoent } from '../category';

describe("<Category/>", () => {
    it("renders ok category", () => {
        const { debug, getByText, container } = render(<CategoryCompoent id={"1"} coverImg={""} name={"test"}/>)

        getByText("test");
        expect(container.firstChild).toHaveClass("flex flex-col group items-center cursor-pointer");
        expect(container.childElementCount).toEqual(1);
    });
});