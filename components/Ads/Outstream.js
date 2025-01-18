import Script from "next/script";


function Outstreams() {



    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();




    return (

        <div className="">
            <div id="ts_ad_video_1lcvn"></div>

            {/* <Script src="//cdn.tsyndicate.com/sdk/v1/outstream.video.js" strategy="beforeInteractive" />
            <Script
                id={uniqid}
                dangerouslySetInnerHTML={{
                    __html: ` TSOutstreamVideo({
                        spot: "4207bed0c7f14a47b43f92c2fff17111",
                        containerId: "ts_ad_video_1lcvn",
                        cookieExpires: "4",
                         extid: "{extid}",
                    });`,
                }}
            /> */}



            {/* Exoclick Ad   */}
            <ins className="eas6a97888e37" data-zoneid="5517802"></ins>
            <Script src="https://a.magsrv.com/ad-provider.js" strategy="beforeInteractive" />
            <Script
                id={uniqid}
                dangerouslySetInnerHTML={{
                    __html: `  (AdProvider = window.AdProvider || []).push({"serve": {}});`,
                }}
            />


        </div>
    )
}

export default Outstreams;
