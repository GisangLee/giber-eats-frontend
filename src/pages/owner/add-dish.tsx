import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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

    const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm<IFormProps>({
        mode: "onChange"
    });

    const onSubmit = () => {``
        const { name, price, desc } = getValues();

        if (restaurantId) {
            createDishMutation({
                variables: {
                    input: {
                        name,
                        price: parseInt(price),
                        desc,
                        restaurantId: parseInt(restaurantId)
                    }
                }
            });

            navigate(-1);
        }
    }


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
                <Button loading={ loading } canClick={ isValid } actionText={ "메뉴 생성하기" }/>
            </form>
        </div>
    );
};