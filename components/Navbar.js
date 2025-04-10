import { updatekeywords, updateloggedIn } from "../config/firebase/lib";
import { deleteCookie, getCookie } from "cookies-next";
import { useContext, useEffect, useRef, useState, } from 'react';
import ReactCountryFlag from "react-country-flag";
import { UserAuth } from "../context/AuthContext";
import videosContext from '../context/videos/videosContext';
import { MdLiveTv } from "react-icons/md";

import { Fragment } from 'react';



import {
    MenuIcon,
    SearchIcon
} from '@heroicons/react/outline';
import { } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';

var navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Category', href: '/category', current: false },
    { name: 'Creators', href: '/creators', current: false },
    { name: 'Pornstars', href: '/pornstar', current: false },
    { name: 'Channels', href: '/channels', current: false },
    { name: 'Sex Chat', href: 'https://play.google.com/store/apps/details?id=com.bhola.livevideochat4&hl=en-IN', current: false },
    { name: 'ThePornDude', href: 'https://theporndude.com', current: false },
    // { name: 'Live Cams', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
    // { name: 'Meet & Fuck', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {

    const { user, setUser, setLoginModalVisible } = UserAuth();



    const router = useRouter();
    const currentPath = router.pathname;

    const context = useContext(videosContext);
    const { currentLocation, countryBlocked } = context;

    const [location, setlocation] = useState(currentLocation)
    const [searchKey, setsearchKey] = useState('')
    const [showSuggested, setshowSuggested] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("location") && !currentLocation) {
            setlocation(JSON.parse(localStorage.getItem("location")))
        }


    }, [])

    useEffect(() => {
        // Check for the email cookie using cookies-next
        const email = getCookie('email');

        if (email) {
            setUser(email);
        } else {
            setUser(null);
        }
    }, []);


    const signOut_method = async () => {


        const email = getCookie('email');
        deleteCookie('membership');
        deleteCookie('countryUpdated_DB');
        deleteCookie('account');
        deleteCookie('email');
        deleteCookie('Firstname');


        await updateloggedIn(email, false)
        window.location.reload(); // Manually refresh the page
    }



    const [searchBarVisibility, setsearchBarVisibility] = useState('hidden');
    const [tags, settags] = useState([])
    const searchInputref = useRef('')


    const handleSearchIconClick = () => {
        if (searchBarVisibility === 'hidden') {
            setsearchBarVisibility('flex')
        } else {
            setsearchBarVisibility('hidden')

        }
        // router.push('/search')
    }

    const goSearch = (e) => {
        e.preventDefault();
        setshowSuggested(false);
        //updatekeywords :this is beacuse when user serach anything ,/search/key page, the useEffect doent trigger again, so updating from here also
        updatekeywords(e.target[0].value.trim());
        if (e.target[0].value) {
            router.push(`/search/${e.target[0].value.trim()}`)
        }

    }



    const handleClickFlag = () => {
        router.push({
            pathname: '/VideosList',
            query: {
                key: location.country_name,
                name: `Trending Porn videos in ${location.country_name}`
            }
        })
    }

    const getSuggestedTags = (e) => {
        setshowSuggested(true)
        setsearchKey(e.target.value)
        settags([])


        if (e.target.value.trim().length <= 2) {
            return
        } else {
            var tagsData = [];
            const abcdArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


            const FIRST_LETTER = e.target.value.charAt(0).trim().toUpperCase();
            tagsData = require(`../JsonData/tags/${FIRST_LETTER}.json`)

            for (let index = 0; index < abcdArray.length; index++) {
                if (abcdArray[index].trim() == FIRST_LETTER) {
                } else {
                    var Data = require(`../JsonData/tags/${abcdArray[index]}.json`)
                    tagsData = tagsData.concat(Data)
                }
            }
            var filteredTagArray = tagsData.filter(keyword => {
                if (keyword.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                    return keyword
                }
            })
            settags(filteredTagArray)
        }
    }

    return (

        <div className='font-inter  shadow bg-theme_navbar'>

            <div className=" p-2  lg:hidden">

                <Disclosure as="nav" >
                    {({ open }) => (
                        <>
                            <div className='flex  items-center justify-between'>

                                <div className='flex items-center space-x-1' >

                                    <Link href='/'>
                                        <img src='https://assets.sb-cd.com/static/common/Images/logo.svg' alt="logo" className=' h-[40px] object-cover object-top' />
                                    </Link>


                                    {location &&
                                        <div className='cursor-pointer' onClick={handleClickFlag}>
                                            <ReactCountryFlag
                                                svg
                                                countryCode={location.countryCode}
                                                style={{
                                                    fontSize: '25px',
                                                    lineHeight: '25px',
                                                }}
                                                aria-label="United States"
                                            />
                                        </div>
                                    }

                                </div>






                                <div className='flex items-center'>

                                    <div onClick={handleSearchIconClick} className=' lg:hidden mr-2 cursor-pointer p-2  hover:bg-theme_pink  rounded-md '>
                                        <SearchIcon className='h-6 w-6 text-theme_text' />
                                    </div>

                                    <Menu as="div" className="relative mx-1 mr-2">
                                        <div>
                                            <Menu.Button className=" ">

                                                {!user &&
                                                    <img alt="user-logo" src='/login/user.png' className='cursor-pointer h-5 w-5 mt-1.5'></img>
                                                }

                                                {user &&
                                                    <img alt="user-logo" src='/login/userOnline.png' className='cursor-pointer h-5 w-5 mt-1.5'></img>
                                                }
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="flex flex-col  justify-start bg-semiblack origin-top-right absolute -right-[50px] lg:-right-[125px] mt-3  w-[200px] rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none z-20 pb-4">



                                                {!user &&
                                                    <Menu.Item>
                                                        <button onClick={() => setLoginModalVisible(true)} className='block_popunder text-white w-[150px] h-[30px] text-[11px] font-inter px-[25px] py-[7px] bg-theme_pink hover:bg-theme_pink_hover rounded mt-[24px] mx-auto'>
                                                            Sign In / Sign Up
                                                        </button>
                                                    </Menu.Item>


                                                }

                                                {user &&
                                                    <h2 className='font-Opensans  text-[12px] cursor-pointer text-center font-semibold my-2'>Hi, {getCookie("Firstname")}</h2>
                                                }


                                                {user &&
                                                    <Menu.Item>
                                                        <button onClick={signOut_method} className='text-theme_text w-[150px] h-[30px] text-[11px] font-inter px-[25px] py-[7px] bg-theme_pink hover:bg-theme_pink_hover rounded mt-[8px] mx-auto'>
                                                            Sign Out
                                                        </button>
                                                    </Menu.Item>
                                                }

                                                <Menu.Item>
                                                    <h2 className='cursor-pointer text-[11px] font-DMsans text-theme_text  w-fit mx-auto mb-28px mt-[14px]'>Need Help ?</h2>
                                                </Menu.Item>

                                            </Menu.Items>
                                        </Transition>
                                    </Menu>


                                    <Disclosure.Button className="lg:hidden items-center justify-center rounded-md text-white hover:bg-theme_pink p-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>



                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Disclosure.Panel className="">




                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {navigation.map((item) => (


                                            <a href={item.href} key={item.name} rel="dofollow">
                                                <Disclosure.Button
                                                    as="a"
                                                    className={classNames(
                                                        item.current ? 'bg-theme_pink_hover text-white font-semibold' : 'text-theme_text hover:bg-button ',
                                                        'block px-3 py-2 rounded-md text-base font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            </a>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>

                <div className={`flex flex-col relative p-1 ${searchBarVisibility}  transition ease-in-out delay-150 mt-2 `}>


                    <form className="flex w-full items-center " onSubmit={goSearch}>
                        <div className="flex-grow mr-4 rounded-[15px] bg-button">
                            <input
                                value={searchKey}
                                onChange={getSuggestedTags}
                                ref={searchInputref}
                                className="w-full h-[35px] px-4 text-sm text-white bg-transparent  outline-none"
                                type="text"
                                placeholder="Search your favourite videos"
                            />
                        </div>
                        <div className="w-[18%]">
                            <button
                                type="submit"
                                className="w-full px-2 py-1.5 text-sm text-button font-bold bg-button_yellow rounded-[15px] hover:bg-theme_pink_hover"
                            >
                                Search
                            </button>
                        </div>



                    </form>
                    {showSuggested &&
                        <div className=' max-h-[300px] mt-1.5 z-50  overflow-scroll scrollbar-hide bg-[#11181F]'>
                            {tags.map(tag => {
                                return (
                                    <div key={tag} onClick={() => {
                                        setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                    }} className='flex items-center space-x-2 p-2  cursor-pointer  pl-4  hover:text-theme_pink text-white opacity-70 hover:bg-semiblack'>
                                        {/* <img src='/login/history.png' className='h-[20px]' /> */}
                                        <p className='text-[13px] fontinter  '>{tag}</p>

                                    </div>
                                )
                            })}
                        </div>
                    }



                </div>



            </div>

            <div className='flex justify-around items-center lg:hidden font-arial shadow-lg mb-2 bg-[#18222B]'>
                <Link href='/' legacyBehavior>
                    <a
                        className={`sm:text-lg xl:text-[28px] text-md text-theme_text text-center p-1  ${currentPath === '/' ? 'scale-105 font-bold' : 'opacity-80 border-transparent'}`}
                        rel="dofollow"
                    >
                        Home
                    </a>
                </Link>

                <Link href='/category' legacyBehavior>
                    <a
                        className={`sm:text-lg xl:text-[28px] text-md text-theme_text text-center p-1  ${currentPath === '/category' ? 'scale-105 font-bold' : 'opacity-80 border-transparent'}`}
                        rel="dofollow"
                    >
                        Categories
                    </a>
                </Link>

                <Link href='/channels' legacyBehavior>
                    <a
                        className={`group flex items-center justify-center space-x-1 -mb-1 pb-1  ${currentPath === '/channels' ? 'scale-105 font-bold' : 'opacity-80 border-transparent'}`}
                        rel="dofollow"
                    >
                        <MdLiveTv className='h-5 w-5 text-gray-400' />

                        <span className={`sm:text-lg xl:text-[28px] text-md text-theme_text text-center mb-0`}>
                            Channels
                        </span>
                    </a>
                </Link>

                <Link href='/membership' legacyBehavior>
                    <a
                        className='sm:text-md text-sm text-white rounded-[22px] text-center px-3 p-1 m-1 bg-theme_red hover:scale-105 transition-transform duration-30 block_popunder'
                        rel="dofollow"
                    >
                        Join Now
                    </a>
                </Link>
            </div>

            {/* Large Sreeen NavBar  */}

            <div className='flex-col hidden lg:flex  ' >


                {/* Navbar */}
                <div className=' flex items-center justify-between  pt-2 pb-2 text-white '>

                    <div className='flex items-center space-x-1 md:space-x-3  ml-2' >
                        <Link href='/'>
                            <img className=" h-[40px]" src='https://assets.sb-cd.com/static/common/Images/logo.svg' alt='logo_text'   ></img>
                        </Link>

                        <a target="_blank" href={countryBlocked ? "https://go.xxxiijmp.com/?userId=9ea31ff27db3b7242eabcc2d26ac0eaf38f093c68528e70c2e7f5a72df55c42e" : "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers"} rel="noopener noreferrer">
                            <div className='ml-[30px] flex  items-center  cursor-pointer hover:scale-105  transition-all space-x-2  xl:flex'>
                                <img
                                    src='/livesex.png'
                                    height={35}
                                    width={35}
                                    alt='livesex'
                                ></img>
                                <p className='font-bold text-white'>Live Sex</p>
                            </div>
                        </a>


                        {location &&

                            <div className='cursor-pointer  ml-[80px]' onClick={handleClickFlag}>
                                <ReactCountryFlag
                                    svg
                                    countryCode={location.countryCode}
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '25px',
                                    }}
                                    aria-label="United States"
                                />
                            </div>
                        }

                    </div>


                    <form className=' flex items-center ' onSubmit={goSearch}>



                        <div className='relative select-none'>
                            <div className="flex bg-button items-center w-[250px] lg:w-[300px] 2xl:w-[700px]  rounded-[30px] p-0.5 2xl:p-1 2xl:px-4 px-4">
                                <SearchIcon className="h-5 2xl:h-6 text-white" />
                                <input
                                    value={searchKey}
                                    onChange={getSuggestedTags}
                                    ref={searchInputref}
                                    className="flex-grow bg-transparent outline-none rounded-[15px] pl-2 h-10 text-[16px] text-white"
                                    type="text"
                                    placeholder="Search your favourite videos"
                                />
                            </div>
                            {showSuggested &&
                                <div className=' rounded-[20px] absolute top-[45px] left-0 right-0 max-h-[300px] z-50  overflow-scroll scrollbar-hide bg-[#11181F]'>
                                    {tags.map(tag => {
                                        return (
                                            <div key={tag} onClick={() => {
                                                setsearchKey(tag); setshowSuggested(false); router.push(`/search/${tag.trim()}`)
                                            }} className='flex items-center space-x-2 py-2  px-[50px] cursor-pointer hover:text-theme_pink text-white opacity-70 hover:bg-semiblack '>
                                                <p className='text-[15px] font-inter '>{tag}</p>

                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                        <button type="submit" className={`ml-2 bg-button_yellow hover:bg-theme_pink_hover text-button font-bold text-sm h-10 px-8 m-1.5 rounded-[20px] transition-all duration-300 ease-in-out ${searchKey ? 'opacity-100 visible' : 'opacity-0 hidden 2xl:flex'}`}    >
                            Search
                        </button>


                    </form>
                    <div className='flex space-x-4 items-center justify-end font-theme '>


                        <div className='flex items-center pr-4'>
                            {/* <UserIcon className='h-8 w-8' /> */}
                            {!user &&
                                <div className='flex items-center space-x-2  font-inter'>
                                    <p onClick={() => setLoginModalVisible(true)} className=' m-2 text-white font-semibold   hover:bg-theme_pink_hover px-8 rounded-[22px] py-[5px]  cursor-pointer block_popunder  '>Login</p>
                                    {/* <p onClick={() => { router.push('/account/register') }} className='m-1 underline rounded   pl-2 pr-2  cursor-pointer hover:text-white'>Register</p> */}
                                </div>
                            }

                            {user &&
                                <div className='flex items-center space-x-2  font-inter'>
                                    <p className='m-2 rounded  pl-2 pr-2 cursor-pointer text-nowrap'>Hi, {getCookie("Firstname")}</p>
                                    <button className='font-inter bg-green-500 py-[5px] px-8  rounded-[22px] mr-3' onClick={signOut_method}>Logout</button>
                                </div>
                            }
                            <Link href='/membership' legacyBehavior>
                                <a
                                    rel="dofollow"
                                >
                                    <button className="bg-red-500 text-white rounded-[22px] font-semibold text-center px-5 p-1.5 m-1 text-md block_popunder hover:scale-105 transition-transform duration-300 text-nowrap">
                                        Join Now
                                    </button>
                                </a>
                            </Link>





                        </div>
                    </div>

                </div>






                <div className='w-full bg-[#18222B]  text-white items-center justify-around   flex  px-1 shadow-lg pl-[30px]'>
                    {navigation.map(item => {
                        const isActive = currentPath === item.href;

                        return (
                            <Link href={item.href} legacyBehavior key={item.name}>
                                <a rel="dofollow"
                                    className={`text-lg 2xl:texxl  opacity-100 cursor-pointer p-1 
                    ${isActive ? 'font-bold scale-110' : 'opacity-70 font-medium border-transparent hover:border-theme_pink'}
                    transition-colors duration-300`}
                                >
                                    {item.name}
                                </a>
                            </Link>
                        )
                    })}


                </div>

            </div>


        </div>
    )
}

export default Navbar
