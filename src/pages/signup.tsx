import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Helmet from "react-helmet";
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { FormError } from '../components/form-erorr';
import giberLogo from "../images/logo.svg";
import { Button } from '../components/button';
import { UserRole } from '../__generated__/globalTypes';
import { createAccountMutation, createAccountMutationVariables } from '../__generated__/createAccountMutation';
import { extendSchemaImpl } from 'graphql/utilities/extendSchema';

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
        createAccount(input: $createAccountInput) {
            ok
            error
        }
    }
`;

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}


export const CreateAccount = () => {

    const { register, getValues, formState: { errors, isValid }, handleSubmit, watch } = useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Client,
        },
    });

    const [ signUpError, setSignUpError ] = useState("");

    const navigate = useNavigate();

    const onCompleted = (data: createAccountMutation) => {
        const { createAccount: { ok, error } } = data;

        if (ok) {
            // redirect to login page
            navigate("/login");

        }else {
            if (error) {
                setSignUpError(error);
            }
        }
    };

    const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    
    const onSubmit: SubmitHandler<ICreateAccountForm> = data => {
        const { email, password, role } = data;

        if (!loading) {
            createAccountMutation({
                variables: {
                    createAccountInput: { email, password, role }
                }
            })
        }
    };

    console.log(watch());

    return (
        <>
            <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
                <Helmet>
                    <title>회원가입 | Giber Eats</title>
                </Helmet>
                <div className='w-full max-w-screen-sm flex flex-col px-5 items-center'>
                    <img src={ giberLogo} className=" w-60 mb-10"/>
                    <h4 className='w-full text-left text-3xl mb-5'>환영합니다.</h4>

                    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 mt-5 w-full mb-3'>
                        { errors.email && errors.email.type === "required" && <FormError errorMessage={ errors.email.message }/>}
                        { errors.email && errors.email.type === "pattern" && <FormError errorMessage="이메일 형식이 아닙니다."/>}
                        <input { ...register("email", { required: "필수항목입니다.", pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ } ) } name="email" placeholder='이메일' className="input"/>

                        <input { ...register("password", { required: "필수항목입니다.", minLength: { value:8, message: "최소 8자리 이상이어야 합니다."}} )} name="password" placeholder='비밀번호' className="input" type="password"/>
                        { errors.password && errors.password.type === "required" && <FormError errorMessage={ errors.password.message }/>}
                        { errors.password && errors.password.type === "minLength" && <FormError errorMessage={ errors.password.message }/>}

                        <select { ...register("role", { required: "필수 항목입니다." }) } name="role" className="input">
                            { Object.keys(UserRole).map((role, index) => <option key={ index }>{ role }</option> ) }
                        </select>
                        { errors.role && errors.role.type === "required" && <FormError errorMessage={ errors.role.message }/>}

                        <Button
                            canClick={ isValid }
                            actionText={ "회원가입" }
                            loading = { false }
                        />

                        { signUpError && <FormError errorMessage={ signUpError }/>}

                    </form>
                    <div>
                        이미 계정이 있으신가요? <Link to="/login" className=' hover:underline text-lime-600'>로그인</Link>을 진행해 주세요.
                    </div>
                </div>
            </div>
        </>
    );
};