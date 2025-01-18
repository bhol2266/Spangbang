import Script from 'next/script';

function rough() {
    return (

        <div className="">
 
            {/* <a href="/category">Click me</a> */}


            <Script
                src="/sc.js"
                strategy="lazyOnload"
                onLoad={() => {
                    console.log("Popunder Ad configuration script loaded successfully.");
                }}
            />

        </div>

    )
}

export default rough;

