import Script from "next/script";

function PopunderAds() {
    let currentHost = '';

    if (typeof window !== "undefined") {
        currentHost = window.location.host;
    }

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();



    // Check if the app is running on localhost
    const isLocalhost = currentHost.includes('localhost')

    // Only render the Script component if not on localhost
    return (
        <div className="flex items-center justify-center">
            {!isLocalhost && (
                // <Script
                //     type="text/javascript"
                //     src="//cdn.tsyndicate.com/sdk/v1/p.js"
                //     data-ts-spot="f2a620cec4b04527ad64dae7221354ce"
                //     data-ts-extid="{extid}"
                //     data-ts-session-duration="300"
                //     data-ts-count="5"
                //     data-ts-mode="selective"
                //     data-ts-ignore-filter="block_popunder"
                //     async
                //     defer
                // />

//Exoclick ads
                <>
                    <Script
                        src="/popunderAds.js"
                        strategy="lazyOnload"
                        onLoad={() => {
                            console.log("Popunder Ad configuration script loaded successfully.");
                        }}
                    />

                </>

            )}
        </div>
    );
}

export default PopunderAds;
