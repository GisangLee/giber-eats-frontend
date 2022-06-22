import * as React from 'react';


interface IFormErrorProps {
    errorMessage: string | undefined;
};

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
    return (
        <span role="alert" className='font-medium text-red-500'>{ errorMessage }</span>
    );
};