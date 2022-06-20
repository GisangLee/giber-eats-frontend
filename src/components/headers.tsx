import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { useMe } from '../hooks/useMe';
import giberLogo from "../images/logo.svg";
import { Link } from 'react-router-dom';



export const Header:React.FC = () => {
    const { data } = useMe();
    
    return (
        <>
            {data && !data.me.verified && (
                <div className=' bg-red-500 py-3 px-3 text-center text-sm text-white'>
                    <span>이메일을 확인하여 인증을 완료해 주세요.</span>
                </div>
            )}

            <header className='py-4'>
                <div className='w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex items-center'>
                    <img src={ giberLogo } className="w-24"/>
                    { data && data.me && (
                        <Link to="/myprofile">
                            <span className='text-xs'>
                                <FontAwesomeIcon icon={ faUser } className="text-xl"/>
                            </span>
                        </Link>
                    )}
                </div>
            </header>
        </>
    );
};