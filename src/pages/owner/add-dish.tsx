import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { setConstantValue } from 'typescript';
import { Button } from '../../components/button';
import { createDish, createDishVariables } from '../../__generated__/createDish';
import { MY_RESTAURANT_QUERY } from './restaurant';

const CREATE_DISH_MUTATION = gql`
    mutation createDish($input: CreateDishInput!) {
        createDish(input: $input) {
            ok
            error
        }
    }
`;


type IParams = {
    restaurantId: string;
};

interface IFormProps {
    name: string;
    price: string;
    desc: string;
    [key:string]: string;
};

export const AddDish = () => {

    const { restaurantId } = useParams<IParams>();

    const navigate = useNavigate();

    const [createDishMutation, { data:createDishMutationResult, loading }] = useMutation<createDish, createDishVariables>(CREATE_DISH_MUTATION, {
        refetchQueries: [{
            query: MY_RESTAURANT_QUERY,
            variables: {
                input: {
                    id: restaurantId
                }
            }
        }]
    });

    const { register, handleSubmit, formState: { errors, isValid }, getValues, setValue  } = useForm<IFormProps>({
        mode: "onChange"
    });

    const onSubmit = () => {``
        const { name, price, desc, ...rest } = getValues();

        const optionsObj = optionNumber.map(optionId => ({
            name: rest[`${optionId}-optionName`],
            extra: +rest[`${optionId}-optionExtraPrice`]
        }));

        if (restaurantId) {
            createDishMutation({
                variables: {
                    input: {
                        name,
                        price: parseInt(price),
                        desc,
                        restaurantId: parseInt(restaurantId),
                        options: optionsObj
                    }
                }
            });

            navigate(-1);
        }
    }

    const [optionNumber, setOptionNumber] = useState<number[]>([]);

    const onAddOptionClick = () => {
        setOptionNumber(current => [Date.now(), ...current]);
    };

    const onDeleteClick = (idToDelete:number) => {
        setOptionNumber(current => current.filter(id => id !== idToDelete));

        setValue(`${idToDelete}-optionName`, "");
        setValue(`${idToDelete}-optionExtraPrice`, "");
    };


    return (
        <div className="container flex flex-col items-center mt-52">
            <Helmet>
                <title>메뉴 생성하기 | Giber Eats</title>
            </Helmet>
            <h1>메뉴 생성하기</h1>
            <form action="" onSubmit={ handleSubmit(onSubmit) } className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
                <input className='input' { ...register("name", { required: "필수항목입니다."} )} placeholder='이름' name="name" type="text"/>
                <input className='input' { ...register("price", { required: "필수 항목입니다." } ) } placeholder='가격' name="price" type="number" min={ 0 }/>
                <input className='input' { ...register("desc", { required: "필수 항목입니다." } ) } placeholder='설명' name="desc" type="text"/>

                <div className='my-10'>
                    
                    <span onClick={ onAddOptionClick } className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5">
                        메뉴 옵션 추가하기
                    </span>
                    { optionNumber.length !== 0 && (
                        optionNumber.map((id) => ( 
                            <div className="mt-5" key={ id }>
                                <input { ...register(`${id}-optionName`) } name={`${id}-optionName`} className='px-4 py-2 focus:outline-none focus:border-gray-600 border-2 mr-3' type="text" placeholder='옵션 이름'/>
                                <input { ...register(`${id}-optionExtraPrice`) } name={`${id}-optionExtraPrice`} className='px-4 py-2 focus:outline-none focus:border-gray-600 border-2' type="number" placeholder='옵션 추가 비용' min={ 0 }/>
                                <span onClick={ () => onDeleteClick(id) } role="button" className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5">옵션 삭제</span>
                            </div>
                        )
                    ))}
                    
                </div> 
                <Button loading={ loading } canClick={ isValid } actionText={ "메뉴 생성하기" }/>
            </form>
        </div>
    );
};