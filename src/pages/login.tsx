import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useForm, SubmitHandler } from 'react-hook-form';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { isLoggedInVar, authToken } from '../apollo';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import { FormError } from '../components/form-erorr';
import giberLogo from "../images/logo.svg";
import { Button } from '../components/button';
import { LOCALSTORAGE_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput){
            ok
            error
            token
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}


export const Login = () => {

    const { register, getValues, formState: { errors, isValid }, handleSubmit, watch } = useForm<ILoginForm>({
        mode: "onChange"
    });
    const [ accountsError, setAccountsError ] = useState("");

    const onCompleted = (data: loginMutation) => {
        const { login: { ok, error, token } } = data;

        if (ok && token) {

            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authToken(token);
            isLoggedInVar(true);

        }else {
            if (error) {
                setAccountsError(error);
            }
        }
    };

    const onError = (error:ApolloError) => {
        
    };

    const [loginMutation, { loading, error, data: loginMutationResult }] = useMutation<
        loginMutation, loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
        onError,
    });
    
    const onSubmit: SubmitHandler<ILoginForm> = data => {
        if (!loading) {
            const { email, password } = getValues();

            loginMutation({
                variables: {
                    loginInput: { email, password },
                },
            });
        }
    };

    return (
        <>
            <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
                <Helmet>
                    <title>????????? | Giber Eats</title>
                </Helmet>
                <div className='w-full max-w-screen-sm flex flex-col px-5 items-center'>
                    <img src={ giberLogo} className=" w-60 mb-10"/>
                    <h4 className='w-full text-left text-3xl mb-5'>Welcome</h4>

                    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 mt-5 w-full mb-3'>
                        { errors.email && errors.email.type === "required" && <FormError errorMessage={ errors.email.message }/>}
                        { errors.email && errors.email.type === "pattern" && <FormError errorMessage="????????? ????????? ????????????."/>}
                        <input { ...register("email", { required: "?????????????????????.", pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ } ) } name="email" placeholder='?????????' className="input"/>

                        <input { ...register("password", { required: "?????????????????????.", minLength: { value:8, message: "?????? 8?????? ??????????????? ?????????."}} )} name="password" placeholder='????????????' className="input" type="password"/>
                        { errors.password && errors.password.type === "required" && <FormError errorMessage={ errors.password.message }/>}
                        { errors.password && errors.password.type === "minLength" && <FormError errorMessage={ errors.password.message }/>}

                        <Button
                            canClick={ isValid }
                            actionText={ "?????????" }
                            loading={ loading }
                        />
                        { accountsError && <FormError errorMessage={ accountsError }/>}
                    </form>
                    <div>
                        ??????????????? ???????????? ??????? <Link to="/create-account" className=' hover:underline text-lime-600'>????????????</Link>??? ????????? ?????????.
                    </div>
                </div>
            </div>
        </>
    );
};