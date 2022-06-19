import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';

interface ILoginForm {
    email?: string;
    password?: string;
}

export const Login = () => {

    const { register, getValues, setError, formState: { errors }, handleSubmit } = useForm<ILoginForm>();
    
    const validateInputValue = (email:string, password:string) => {

        if (!email) {

        }
        
        const emailRegex= /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

        if (emailRegex.test(email)) {

        }

        if (password.length < 9) {

        }
    };

    const onSubmit: SubmitHandler<ILoginForm> = (data:object) => {
        console.log(data);
        
        //const { email, password } = data;
        //validateInputValue(email, password);
        console.log("errors", errors.email);
        console.log("errors", errors.password);
    };

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gray-800">
                <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">

                    <h3 className="text-3xl text-gray-800">로그인</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 mt-5 px-5'>
                        <input {...register("email", { required: true, pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/}) } name="email" required placeholder='이메일' className="input mb-3" type="email"/>
                        { errors.email && <span className='font-medium text-red-500'>{ errors.email.message }</span> }

                        <input {...register("password", { required: true, minLength: { value: 8, message: "최소 8자리 이상이어야 합니다."} }) } name="password" required placeholder='비밀번호' className="input" type="password"/>
                        { errors.password && <span className='font-medium text-red-500'>{ errors.password.message }</span> }
                        <button className="btn mt-3">로그인</button>
                    </form>

                </div>
            </div>
        </>
    );
};