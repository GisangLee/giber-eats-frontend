import React, { useEffect } from 'react'
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { verifyEmail, verifyEmailVariables } from '../../__generated__/verifyEmail';
import { useQueryParam } from '../../hooks/useQueryParam';
import { useMe } from '../../hooks/useMe';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($input: VerifyEmailInput!) {
        verifyEmail(input: $input){
            ok
            error
        }
    }
`

export const ConfirmEmail = () => {
    const { data:userData } = useMe();
    const client = useApolloClient();
    const navigate = useNavigate();

    const onCompleted = (data: verifyEmail) => {
        const { verifyEmail: { ok, error } } = data;
        
        if (ok && userData ) { 
            client.writeFragment({
                id: `User:${userData.me.id}`,

                fragment: gql`
                    fragment VerifiedUser on User {
                        verified
                    }
                `,

                data: {
                    verified: true,
                }
            });

            navigate("/");
        }
    };

    const [verifyEmailMutation, { loading }] = useMutation<verifyEmail, verifyEmailVariables>(VERIFY_EMAIL_MUTATION, {
        onCompleted,
    });
    const urlParam = useQueryParam();
    const verifyCode = urlParam.get("code");

    useEffect(() => {

        if (verifyCode) {
            verifyEmailMutation({
                variables: {
                    input: {
                        code: verifyCode
                    },
                },
            });
        }

    }, [])

    return (
        <div className='mt-52 flex flex-col items-center justify-center'>
            <Helmet>
                <title>계정 인증 | Giber Eats</title>
            </Helmet>
            <h2 className='text-lg mb-3 font-medium'>인증 중입니다....</h2>
            <h4 className='text-gray-700 text-sm'>창을 닫지말고 완료될 때까지 기다려 주세요.</h4>
        </div>
    );
};