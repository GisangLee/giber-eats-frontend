import React from 'react'

interface IRestaurantProps {
    id: string;
    coverImg: string;
    name: string;
    categoryName?: string;
}

export const Restaurant:React.FC<IRestaurantProps> = ({ coverImg, name, categoryName, id }) => {
    return (
        <div key={ id } className="flex flex-col">
            <div className='py-28 bg-cover bg-center mb-3' style={{ backgroundImage: `url(${coverImg})` }}></div>
            <h3 className='text-lg'>{name}</h3>
            { categoryName && <span className='border-t mt-2 py-2 text-xs opacity-50 border-gray-400'>{ categoryName }</span> }
        </div>
    );
};