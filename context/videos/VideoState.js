import videosContext from "./videosContext";
import { useEffect, useState } from "react";
import { getViewTypeFromCookie, setViewTypeCookie } from '../../config/utils';

import { useRouter } from "next/router";
const plans = [
    {
        duration: "1 month",
        offer: "",
        price: "$2.99",
        type: "month"
    },
    {
        duration: "3 months",
        offer: "20% OFF",
        price: "$4.99",
        type: "month"
    },
    {
        duration: "12 months",
        offer: "40% OFF",
        price: "$9.99",
        type: "month"
    },

    {
        duration: "Lifetime",
        offer: "USE FOREVER",
        price: "$19.99",
        type: "once"
    },
]




const VideoState = (props) => {

    const router = useRouter();
    const [spinnerLoading, setspinnerLoading] = useState(false)
    const [paymentModalVisible, setpaymentModalVisible] = useState(false)
    const [DarkTheme, setDarkTheme] = useState('')
    const [currentLocation, setcurrentLocation] = useState(null)

    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [viewType, setViewType] = useState(getViewTypeFromCookie());  // grid or horizontal for video thumbnails

    //Login stuffs

    const [loggedIn, setloggedIn] = useState(false);

    //this the email in which otp is send during signUp and show this email in OTP sidebar
    const [OTPemail, setOTPemail] = useState(null)


    const [tagsContext, settagsContext] = useState([])



    function setSpinner(boolean) {

        setspinnerLoading(boolean)
        setTimeout(() => {
            setspinnerLoading(false)

        }, 2000);

    }
    function setDarkThemeFunc(theme) {
        setDarkTheme(theme)

    }





    return (
        <videosContext.Provider value={{ spinnerLoading, setSpinner, setDarkThemeFunc, DarkTheme, currentLocation, setcurrentLocation, OTPemail, setOTPemail, loggedIn, setloggedIn, tagsContext, settagsContext, paymentModalVisible, setpaymentModalVisible, selectedPlan, setSelectedPlan,viewType, setViewType }}>
            {props.children}
        </videosContext.Provider>
    )
}




export default VideoState;