import { render } from '@testing-library/react';
import React from 'react'
import { Restaurant } from '../restaurant';


describe("<Restaurant/>", () => {
    it("renders ok with props", () => {
        const { debug, container, getByText } = render(<Restaurant coverImg={""} id={"1"} name={"test"} categoryName={"kimchi"}/>)
        
        getByText("test");
        getByText("kimchi");
        expect(container.firstChild).toHaveClass("flex flex-col");
        expect(container.childElementCount).toEqual(1);
        expect(container.firstChild).toHaveClass("flex flex-col");
    });
});