import { setCookie } from "cookies-next"
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CiLogin } from "react-icons/ci"
import { IoIosCloseCircleOutline } from "react-icons/io"
import ClipLoader from "react-spinners/ClipLoader"
import { UserAuth } from "../../context/AuthContext"

export const LoginForm = () => {

    const [message, setmessage] = useState('');
    const [loading, setloading] = useState(false);
    const router = useRouter()

    const { setSignUpFormVisible, setLoginFormVisible, setPasswordResetVisible, setLoginModalVisible, setOTPFormVisible, setEmailOTP, setreceivedOTP } = UserAuth();


    const SignInButton = async (auth_provider) => {
     
        var authUrl = ""
        const scope = 'profile email';

        const currentHost = window.location.host;
        if (currentHost.includes("localhost:3000")) {
            const REDIRECT_URI1 = "http://localhost:3000/api/auth/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI1}&scope=${scope}`;

        }
        if (currentHost.includes("chutlunds.com")) {
            const REDIRECT_URI2 = "https://www.chutlunds.com/api/auth/chutlunds/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI2}&scope=${scope}`;

        }
        if (currentHost.includes("chutlunds1.com")) {
            const REDIRECT_URI3 = "https://www.chutlunds1.com/api/auth/chutlunds1/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI3}&scope=${scope}`;

        }
        if (currentHost.includes("chutlunds2.com")) {
            const REDIRECT_URI4 = "https://www.chutlunds2.com/api/auth/chutlunds2/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI4}&scope=${scope}`;

        }
        if (currentHost.includes("xhamster.gg")) {
            const REDIRECT_URI5 = "https://www.xhamster.gg/api/auth/xhamster/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI5}&scope=${scope}`;

        }

        if (currentHost.includes("milfymadness.com")) {
            const REDIRECT_URI6 = "https://www.milfymadness.com/api/auth/milfymadness/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI6}&scope=${scope}`;

        }
        window.location.href = authUrl;

    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        setmessage('')
        setloading(true)

        // Get form data
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const parcelData = { email: email.trim(), password: password }
            const rawResponse = await fetch(`/api/auth/loginCredentials`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();


            if (res.message === 'User not found') {
                setmessage('Email not registered!!')
                setloading(false)
                return

            }
            if (res.message === 'Password Incorrect') {
                setmessage('Password wrong')
                setloading(false)
                return

            }
            if (res.message === 'OTP Sent') {
                setEmailOTP(email)
                setreceivedOTP(res.data.otp)
                setOTPFormVisible(true)
                setLoginFormVisible(false)
                setloading(false)
                return
            }


            setCookie('email', email.trim(), { maxAge: 900000 });
            setCookie('Firstname', res.data.firstName.trim().split(' ')[0], { maxAge: 900000 });
            setCookie('membership', false, { maxAge: 900000 });
            setCookie('countryUpdated_DB', false, { maxAge: 900000 });
            setCookie('account', 'credential', { maxAge: 900000 });

            window.location.reload()

        } catch (error) {
            setloading(false)
            console.log(error);
            return
        }

    }





    return (


        <div className="relative bg-semiblack  rounded-lg  px-6  py-10  ">


            <IoIosCloseCircleOutline onClick={() => { setLoginModalVisible(false) }} className="cursor-pointer absolute text-theme_text text-[32px] lg:text-[34px] right-4 top-4" />

            <div className="flex flex-col justify-center">

                <img src='https://assets.sb-cd.com/static/common/Images/logo.svg' alt="chutlunds-logo" className=' mx-auto  h-[40px]  lg:-mt-2' />
                <p className='mb-6  text-theme_text text-center text font-dancing text-ll'>Unleash your desires!   </p>


                <div className="">
                    <form className="space-y-5" action="#" method="POST" onSubmit={handleSubmit}>
                        <div className=''>
                            <label htmlFor="email" className="text-sm font-medium leading-6 text-theme_text pl-1">Email address</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder='Email'
                                    className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-theme_text border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className='  '>
                            <label htmlFor="password" className="text-sm font-medium leading-6 text-theme_text pl-1">Password</label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder='Password'
                                    className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-theme_text border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                />
                            </div>
                        </div>

                        <button type="submit" className="relative mt-[20px] flex w-full h-[40px] justify-center items-center space-x-1 rounded-md bg-theme_pink px-3 py-1.5 shadow-sm ">

                            {loading &&
                                <div className='w-fit absolute top-2'>
                                    <ClipLoader color="#232b2b" size={25} />
                                </div>
                            }
                            {!loading && <CiLogin className="text-white text-xl mt-1" />}

                            {!loading && <p className=" text-sm leading-6 text-white font-inter font-semibold mt-1">Login</p>}
                        </button>


                        <p className="text-theme_pink font-inter text-xs text-center min-h-4">{message}</p>


                    </form>


                    <p onClick={() => { setPasswordResetVisible(true); setLoginFormVisible(false) }} className="cursor-pointer mt-6 mb-2 text-center text-sm text-theme_text">
                        Forgot your password?
                    </p>
                    <p className="mb-2 text-center text-sm text-theme_text">
                        Don't have an account?
                        <span onClick={() => { setSignUpFormVisible(true); setLoginFormVisible(false) }} className="underline cursor-pointer text-theme_pink">Register here</span>
                    </p>



                    <div className="w-full flex items-center justify-center my-2">
                        <hr className="flex-grow border-gray-300 my-2 " />

                        <p className='my-4 w-fit mx-2 font-inter text-theme_text text-xs'>  or continue with</p>

                        <hr className="flex-grow border-gray-300 my-2" />
                    </div>

                    <div className="w-full flex mb-5  mx-auto  space-x-4 ">
                        <div onClick={() => SignInButton('google')} className="group hover:bg-slate-200 w-full  flex items-center justify-center space-x-2 cursor-pointer py-1.5  rounded-md border-[1px] border-gray-200">
                            <img src='/login/google.png' className='lg:h-[38px] object-contain h-[22px] w-[22px] cursor-pointer ml-1' alt="Google" />
                            <h2 className=' font-inter text-theme_text text-[11px] lg:text-[14px] group-hover:text-theme_text'>Google</h2>
                        </div>

                        <div onClick={() => SignInButton('google')} className="group hover:bg-slate-200 w-full flex items-center justify-center space-x-2 cursor-pointer py-1.5  rounded-md border-[1px] border-gray-200">
                            <img src='/login/facebook.png' className='lg:h-[40px] object-contain h-[24px] w-[24px] cursor-pointer ml-1' alt="Facebook" />
                            <h2 className=' font-inter text-theme_text text-[11px] lg:text-[14px] group-hover:text-theme_text'>Facebook</h2>
                        </div>
                    </div>


                    <div className=''>
                        <p className='text-xs text-center text-theme_text font-inter whitespace-nowrap overflow-hidden text-ellipsis'>
                            By Registering, I certify that I am over 18 years old and I agree to
                        </p>
                        <Link href="/terms">
                            <p className='text-xs text-center font-inter font-semibold text-theme_pink hover:underline cursor-pointer'>
                                Terms of Service.
                            </p>
                        </Link>
                    </div>

                </div>

            </div>
        </div>

    )
}


