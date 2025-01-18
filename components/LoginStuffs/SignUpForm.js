import { setCookie } from "cookies-next"
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa"
import { IoIosCloseCircleOutline } from "react-icons/io"
import ClipLoader from "react-spinners/ClipLoader"
import { UserAuth } from "../../context/AuthContext"


export const SignUpForm = () => {
    const router = useRouter()

    const [message, setmessage] = useState('');
    const [loading, setloading] = useState(false);
    const [Country, setCountry] = useState('');


    const { setSignUpFormVisible, setLoginFormVisible, setLoginModalVisible, setOTPFormVisible, EmailOTP, setEmailOTP,
        receivedOTP, setreceivedOTP } = UserAuth();



    useEffect(() => {
        getLocation();
    }, [])

    async function getLocation() {

        try {
            const response = await fetch('https://api.db-ip.com/v2/free/self')
            const data = await response.json();
            setCountry(data.countryName)
            setCookie('country', data.countryName, { maxAge: 900000 })

        } catch (error) {
            const response = await fetch(' https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
            const data = await response.json();
            setCountry(data.country_name)
            setCookie('country', data.country_name, { maxAge: 900000 })
        }

    }


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
        if (currentHost.includes("chutlunds2.com")) {
            const REDIRECT_URI3 = "https://www.chutlunds2.com/api/auth/chutlunds2/callback"
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI3}&scope=${scope}`;

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

    const loginHere = () => {
        setLoginFormVisible(true)
        setSignUpFormVisible(false)
    }



    const handleSubmit = async (event) => {

        event.preventDefault(); // Prevent the default form submission
        setloading(true)
        setmessage('')
        const formData = new FormData(event.target);

        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');



        try {
            const parcelData = { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password: password, country: Country }
            const rawResponse = await fetch(`/api/auth/register`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(parcelData),
            });

            const res = await rawResponse.json();
            console.log(res);


            if (res.message === 'Already Resgistered !') {
                setmessage('Already Resgistered !')
            }
            if (res.message === 'OTP Sent') {
                setEmailOTP(email)
                setreceivedOTP(res.data.otp)
                setOTPFormVisible(true)
                setSignUpFormVisible(false)
                // show OTP modal
            }

            setloading(false)
        } catch (error) {
            setloading(false)
            console.log(error);
            alert(error);
            return
        }

    }





    return (


        <div className="relative bg-semiblack  rounded-lg  px-6 lg:px-0 py-8  ">


            <IoIosCloseCircleOutline onClick={() => { setLoginModalVisible(false) }} className="cursor-pointer absolute text-theme_text text-[32px] lg:text-[34px] right-4 top-4" />


            <div className="flex flex-col justify-center lg:flex-row lg:space-x-8">

                <div className='lg:w-1/3'>

                    <div className=' p-4 lg:p-8  rounded-lg space-y-2 lg:space-y-4 mb-4 lg:mb-0'>
                        <div className='flex items-center space-x-2 lg:space-x-3   block'>
                            <FaCheckCircle className='text-theme_green text-[14px] lg:text-[16px] flex-shrink-0' />
                            <p className='text-theme_text font-inter text-[14px] lg:text-[16px]'>Unlimted Downloads!</p>
                        </div>

                        <div className='flex items-center space-x-2 lg:space-x-3  block'>
                            <FaCheckCircle className='text-theme_green text-[14px] lg:text-[16px] flex-shrink-0' />
                            <p className='text-theme_text font-inter text-[14px] lg:text-[16px]'>Video recommendations curated for you</p>
                        </div>
                        <div className='flex items-center space-x-2 lg:space-x-3  block'>
                            <FaCheckCircle className='text-theme_green text-[14px] lg:text-[16px] flex-shrink-0' />
                            <p className='text-theme_text font-inter text-[14px] lg:text-[16px]'>Subscribe to channels and pornstars</p>
                        </div>
                        <div className='flex items-center space-x-2 lg:space-x-3  block'>
                            <FaCheckCircle className='text-theme_green text-[14px] lg:text-[16px] flex-shrink-0' />
                            <p className='text-theme_text font-inter text-[14px] lg:text-[16px]'>Create and enjoy playlists</p>
                        </div>

                    </div>

                    <p className='mb-6 font-inter text-theme_text text-center text font-dancing text-2xl'>Unleash your desires!   </p>
                    <img src='/logo.png' alt="chutlunds" className='hidden lg:flex h-[350px] mx-auto absolute -bottom-[180px] ' />


                </div>

                <div className="lg:mt-4">
                    <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="flex space-x-3 w-full">
                            <div className='w-1/2'>
                                <label htmlFor="first-name" className="text-sm font-medium leading-6 text-theme_text">First Name</label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="firstName"
                                        type="text"
                                        autoComplete="given-name"
                                        required
                                        placeholder='First Name'
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-theme_text border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor="last-name" className="text-sm font-medium leading-6 text-theme_text">Last Name</label>
                                <div className="mt-2">
                                    <input
                                        id="last-name"
                                        name="lastName"
                                        type="text"
                                        autoComplete="family-name"
                                        required
                                        placeholder='Last Name'
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-theme_text border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 w-full ">
                            <div className='w-2/3'>
                                <label htmlFor="email" className="text-sm font-medium leading-6 text-theme_text">Email address</label>
                                <div className="mt-2">
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

                            <div className='w-1/3'>
                                <label htmlFor="password" className="text-sm font-medium leading-6 text-theme_text">Create Password</label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        minLength={6} // Set the minimum length here
                                        placeholder='Password'
                                        className="w-full text-xs font-inter rounded-lg bg-transparent py-2 px-2 text-theme_text border-[1px] border-gray-300 placeholder:text-gray-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="relative mt-[20px] flex w-full h-[35px] justify-center rounded-md bg-gray-200 px-3 py-1.5 shadow-sm ">

                                {loading &&
                                    <div className='w-fit absolute'>
                                        <ClipLoader color="#232b2b" size={25} />
                                    </div>
                                }
                                {!loading && <p className=" text-sm font-inter leading-6 text-theme_text font-inter font-semibold"> Join Xhamster!</p>}
                            </button>
                        </div>
                    </form>

                    <p className="text-red-500 font-inter text-xs text-center mt-2 min-h-4">{message}</p>



                    <p className="my-3 text-center text-sm text-theme_text">
                        Already have an account?
                        <span onClick={() => { loginHere() }} className="underline cursor-pointer text-theme_green"> Login here</span>
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
                            <p className='text-xs text-center font-inter font-semibold text-theme_green hover:underline cursor-pointer'>
                                Terms of Service.
                            </p>
                        </Link>
                    </div>

                </div>

            </div>
 

            <img src='/logo.png' alt="chutlunds" className='lg:hidden absolute mx-auto h-[200px] -bottom-[100px]  left-0' />

        </div>

    )
}


