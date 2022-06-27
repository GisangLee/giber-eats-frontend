import { gql, useMutation } from '@apollo/client';
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { createRestaurant, createRestaurantVariables } from '../../__generated__/createRestaurant';

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: CreateRestaurantInputType!) {
        createRestaurant(input: $input){
            error
            ok
        }
    }
`;

interface IFormProps {
    name: string;
    address: string;
    categoryName: string;
};

export const AddRestaurants = () => {

    const [ createRestaurantMutation, { loading, error, data:createRestaurantResult }] = useMutation<createRestaurant, createRestaurantVariables>(CREATE_RESTAURANT_MUTATION);  

    const { register, getValues, formState: { errors, isValid }, handleSubmit } = useForm<IFormProps>({
        mode: "onChange"
    });

    const onSubmit = () => {
        console.log(getValues());
    };

    return (
        <div className="container">
            <Helmet>
                <title>가게 생성하기 | Giber Eats</title>
            </Helmet>
            <h1>가게 올리기</h1>
            <form action="" onSubmit={ handleSubmit(onSubmit) }>
                <input className='input' { ...register("name", { required: "필수항목입니다."} )} placeholder='name' name="name" type="text"/>
                <input className='input' { ...register("address", { required: "필수 항목입니다." } ) } placeholder='address' name="address" type="text"/>
                <input className='input' { ...register("categoryName", { required: "필수 항목입니다." } ) } placeholder='categoryName' name="categoryName" type="text"/>
                <Button loading={ loading } canClick={ isValid } actionText={ "가게 생성하기" }/>
            </form>
        </div>
    );

};