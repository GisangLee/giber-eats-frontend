import * as React from 'react';
import { useForm } from 'react-hook-form';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Button } from '../../components/button';
import { useMe } from '../../hooks/useMe';
import { editProfile, editProfileVariables } from '../../__generated__/editProfile';
import { Helmet } from 'react-helmet-async';

const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile($input: EditProfileInput!){
        editProfile(input: $input) {
            ok
            error
        }
    }
`;

interface IEditProfileProps {
    email?: string;
    password?: string;
};

export const EditProfile = () => {

    const { data: userData } = useMe();
    const client = useApolloClient();

    const onCompleted = (data: editProfile) => {
        const { editProfile: { ok } } = data;
    
        if (ok && userData) {
            // update apollo cache
            const { me: { email: prevEmail, id }} = userData;

            const { email: newEmail } = getValues();

            if (prevEmail !== newEmail) {
                client.writeFragment({
                    id: `User:${ id }`,

                    fragment: gql`
                        fragment editedUser on User {
                            email
                            verified
                        }
                    `,
                    data: {
                        email: newEmail,
                        verified: false,
                    },
                });
            }
        }
    };

    const [ editProfileMutatio, { loading, error, data: editProfileResult }] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION, {
        onCompleted,
    });

    const getUserData = (): object => {

        if (userData) {
            return {
                email: userData.me.email,
            };
        }

        return {
            email: "",
        };

    };

    const { register, getValues, formState: { errors, isValid }, handleSubmit, watch } = useForm<IEditProfileProps>({

        mode: "onChange",
        defaultValues: {
            ...getUserData(),
        }
    });
    
    const onSubmit = () => {
        const { email, password } = getValues();

        editProfileMutatio({
            variables: {
                input: {
                    email,
                    ...(password !== "" && { password })
                },
            },
        });
    }

    return (
        <div className=' mt-52 flex flex-col justify-center items-center'>
            <Helmet>
                <title>프로필 수정 | Giber Eats</title>
            </Helmet>
            <h4 className='font-semibold text-2xl mb-3'>프로필 수정</h4>
            <form action="" onSubmit={ handleSubmit(onSubmit) } className='grid grid-gap-3 max-w-screen-sm mt-5 w-full mb-5'>
                <input { ...register("email", { pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }) } name="email" className='input' type="email" placeholder='이메일'/>
                <input { ...register("password", { minLength: { value: 8, message: "최소 8자리 이상이어야 합니다." } }) } className='input' name="password" type="password" placeholder='비밀번호'/>
                <Button canClick={ isValid } loading={ loading } actionText={ "수정하기" }/>
            </form>
        </div>
    );
};