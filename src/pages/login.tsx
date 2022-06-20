import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { ApolloError, gql, useMutation } from '@apollo/client';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import { FormError } from '../components/form-erorr';

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

    const { register, getValues, formState: { errors }, handleSubmit, watch } = useForm<ILoginForm>();
    const [ accountsError, setAccountsError ] = useState("");

    const onCompleted = (data: loginMutation) => {
        const { login: { ok, error, token } } = data;

        if (ok) {
            console.log(token);
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
            <div className="h-screen flex items-center justify-center bg-gray-800">
                <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">

                    <h3 className="text-3xl text-gray-800">로그인</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 mt-5 px-5'>
                        { errors.email && errors.email.type === "required" && <FormError errorMessage={ errors.email.message }/>}
                        { errors.email && errors.email.type === "pattern" && <FormError errorMessage="이메일 형식이 아닙니다."/>}
                        <input { ...register("email", { required: "필수항목입니다.", pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/ } ) } name="email" placeholder='이메일' className="input mb-3"/>

                        <input { ...register("password", { required: "필수항목입니다.", minLength: { value:8, message: "최소 8자리 이상이어야 합니다."}} )} name="password" placeholder='비밀번호' className="input" type="password"/>
                        { errors.password && errors.password.type === "required" && <FormError errorMessage={ errors.password.message }/>}
                        { errors.password && errors.password.type === "minLength" && <FormError errorMessage={ errors.password.message }/>}

                        <button className="btn mt-3">{ loading ? "Loading...." : "로그인"}</button>
                        { accountsError && <FormError errorMessage={ accountsError }/>}
                        
                    </form>

                </div>
            </div>
        </>
    );
};