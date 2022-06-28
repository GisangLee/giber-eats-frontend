import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-erorr';
import { createRestaurant, createRestaurantVariables } from '../../__generated__/createRestaurant';
import { MY_RESTAURANTS_QUERY } from './restaurants';

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: CreateRestaurantInputType!) {
        createRestaurant(input: $input){
            error
            ok
            restaurantId
        }
    }
`;

interface IFormProps {
    name: string;
    address: string;
    categoryName: string;
    file:FileList;
};

export const AddRestaurants = () => {
    const client = useApolloClient();
    const navigate = useNavigate();

    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onCompleted = (data:createRestaurant) => {
        const { createRestaurant: { ok, error, restaurantId } } = data;
        if (ok) {

            const { name, categoryName, address } = getValues();

            setUploading(false);
            const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });

            client.writeQuery({
                query: MY_RESTAURANTS_QUERY,
                data: {
                    myRestaurants: {
                        ...queryResult.myRestaurants,
                        restaurants: [
                            {
                                address,
                                category: {
                                    name: categoryName,
                                    __typename: "Category",
                                },
                                coverImg: imageUrl,
                                id: restaurantId,
                                isPromoted: false,
                                name,
                                __typename: "Restaurant",

                            },
                            ...queryResult.myRestaurants.restaurants
                        ]
                    }
                }
            });

            navigate("/");

        }
    };

    const [ createRestaurantMutation, { loading, error, data:createRestaurantResult }] = useMutation<createRestaurant, createRestaurantVariables>(CREATE_RESTAURANT_MUTATION, {
        onCompleted
    });

    const { register, getValues, formState: { errors, isValid }, handleSubmit } = useForm<IFormProps>({
        mode: "onChange"
    });

    const onSubmit = async () => {
        try {
            setUploading(true);

            const { file, name, categoryName, address } = getValues();
            const actualFile = file[0];
    
            const formBody = new FormData();
    
            formBody.append("file", actualFile);
    
            const { url: coverImg } = await (
                await fetch("http://localhost:4000/uploads/", {
                    method: "POST",
                    body: formBody
                })
            ).json();

            setImageUrl(coverImg);

            createRestaurantMutation({
                variables: {
                    input: {
                        name,
                        address,
                        categoryName,
                        coverImg
                    },
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container flex flex-col items-center mt-52">
            <Helmet>
                <title>가게 생성하기 | Giber Eats</title>
            </Helmet>
            <h1>가게 올리기</h1>
            <form action="" onSubmit={ handleSubmit(onSubmit) } className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
                <input className='input' { ...register("name", { required: "필수항목입니다."} )} placeholder='name' name="name" type="text"/>
                <input className='input' { ...register("address", { required: "필수 항목입니다." } ) } placeholder='address' name="address" type="text"/>
                <input className='input' { ...register("categoryName", { required: "필수 항목입니다." } ) } placeholder='categoryName' name="categoryName" type="text"/>
                <div>
                    <input { ...register("file", { required: "필수 항목입니다. " } ) } type="file" name="file" accept='image/*' />
                </div>
                <Button loading={ uploading } canClick={ isValid } actionText={ "가게 생성하기" }/>
                { createRestaurantResult && createRestaurantResult.createRestaurant && createRestaurantResult.createRestaurant.error && (
                    <FormError errorMessage={ createRestaurantResult.createRestaurant.error }/>
                )}
            </form>
        </div>
    );
};