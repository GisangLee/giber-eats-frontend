import React from 'react'
import { Link } from 'react-router-dom';

interface ICategoryProps {
    id: string;
    coverImg?: string;
    name: string;
};

export const CategoryCompoent:React.FC<ICategoryProps> = ({ id, coverImg, name}) => {
    return (        
        <div className='flex flex-col group items-center cursor-pointer'>
            <div className='w-10 h-10 rounded-full bg-cover group-hover:bg-gray-100' style={{ backgroundImage: `url(${coverImg})`}}></div>
            <span className='mt-1 text-sm text-center text-medium'>{ name }</span>
        </div>
    );
};