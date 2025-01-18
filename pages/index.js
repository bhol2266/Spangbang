import { deleteCookie, getCookie } from "cookies-next";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from "react-country-flag";

import BannerAds from '../components/Ads/BannerAds';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import Category_slider from '../components/category_slider';
import Channels_slider from '../components/channels_slider';
import Pornstar_slider from '../components/pornstar_slider';

import Homepage_Title from '../components/Homepage_Title';
import { getFirstKeyword, getSubscribedChannels, getSubscribedPornstars, updateCountry } from '../config/firebase/lib';
import { getLanguge } from '../config/getLanguge';
import { fetchVideos, getViewChannels, getViewPornstars, shuffle } from '../config/utils';
import videosContext from '../context/videos/videosContext';
import Link from "next/link";

export default function Home({ video_collection, trendingChannels, tags, trendingCategories, trendingPornstars }) {
  const { currentLocation, setcurrentLocation, viewType, setViewType } = useContext(videosContext);
  const [countryVideos, setcountryVideos] = useState([]);
  const [countryLanguage, setcountryLanguage] = useState('');
  const [lang, setLang] = useState('');
  const [TrendingChannels, setTrendingChannels] = useState(trendingChannels);
  const [TrendingPornstars, setTrendingPornstars] = useState(trendingPornstars);


  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const router = useRouter();




  async function fetchLocation() {
    const location_localstorage = localStorage.getItem("location");
    if (location_localstorage !== null) {
      const parsedLocation = JSON.parse(location_localstorage);
      setcurrentLocation(parsedLocation);
      countryUpdated_DB(parsedLocation.countryName);

      setLang(getLanguge(parsedLocation.countryName));
      setcountryLanguage(lang);
      const countryVideos = await fetchVideos(lang);

      setcountryVideos(countryVideos)
    } else {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        const data = await response.json();
        setcurrentLocation(data);

        setLang(getLanguge(data.countryName));
        setcountryLanguage(lang);
        const countryVideos = await fetchVideos(lang);

        console.log(countryVideos);



        setcountryVideos(countryVideos)
        await countryUpdated_DB(data.countryName);
        localStorage.setItem("location", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function countryUpdated_DB(country) {
    const countryUpdated_DB = getCookie('countryUpdated_DB');
    const email = getCookie('email');
    const accountType = getCookie('account');
    if (typeof countryUpdated_DB !== 'undefined' && typeof email !== 'undefined' && accountType !== 'credential') {
      if (countryUpdated_DB) {
        return;
      }
      await updateCountry(email.trim(), country);
    }
  }

  async function createRecommendedVideos() {
    const keyword = await getFirstKeyword()
    if (keyword) {
      const videos = await fetchVideos(keyword.trim())
      setRecommendedVideos(videos)
    } else {
      const cookiesKeywords = getCookie('keywords');
      if (!cookiesKeywords) {
        return
      }
      const keywordsArray = JSON.parse(cookiesKeywords);

      if (Array.isArray(keywordsArray) && keywordsArray.length > 0) {
        let finalKeyword = keywordsArray[0];
        const videos = await fetchVideos(finalKeyword.trim())
        setRecommendedVideos(videos)

      } else {
        console.log("No keywords available in cookies.");
        finalKeyword = null;
      }
    }

  }

  async function checkSubscribed_Channels_Pornstars() {



    const viewchannels = getViewChannels();
    const viewPornstars = getViewPornstars();

    console.log(viewchannels);


    if (viewchannels) {
      const combinedChannels = [...viewchannels, ...trendingChannels];

      const seen = new Set();

      // Filter out duplicates, keeping the first occurrence
      const uniqueChannels = combinedChannels.filter(channel => {
        if (seen.has(channel.channelName)) {
          return false; // Skip this channel if it's already seen
        } else {
          seen.add(channel.channelName); // Add to seen Set
          return true; // Keep this channel
        }
      });

      setTrendingChannels(uniqueChannels);
    }


    if (viewPornstars) {
      const combinedPornstars = [...viewPornstars, ...trendingPornstars];
      const seen = new Set();

      // Filter out duplicates, keeping the first occurrence
      const uniquePornstars = combinedPornstars.filter(pornstar => {
        if (seen.has(pornstar.pornstarName)) {
          return false; // Skip this channel if it's already seen
        } else {
          seen.add(pornstar.pornstarName); // Add to seen Set
          return true; // Keep this channel
        }
      });



      setTrendingPornstars(uniquePornstars);
    }

  }




  useEffect(() => {
    let videoRoute = getCookie("videoRoute");
    if (typeof videoRoute !== 'undefined') {
      deleteCookie('videoRoute');
      router.push(videoRoute);
    }
    fetchLocation();
    createRecommendedVideos()

    checkSubscribed_Channels_Pornstars()
  }, []);





  const toggleViewType = () => {
    const newViewType = viewType === 'grid' ? 'horizontal' : 'grid';
    setViewType(newViewType);

  };

  return (
    <div className=" ">
      <Head>
        <title>Watch hot porn videos for free at MilfyMadness!</title>
        <meta name="description" content="Looking for free porn videos and exclusive XXX movies? Look no further than MilfyMadness. With instant streaming of over 6 million hardcore sex videos from both professionals and amateurs, our high-quality porn tube has everything you need to satisfy your desires. Whether you're looking for sensual solo scenes or wild group sex, MilfyMadness has it all. Join us now and start exploring our vast collection of adult content." />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
        <meta property="og:title" content="Watch hot porn videos for free at MilfyMadness!" />
        <meta property="og:description" content="Looking for free porn videos and exclusive XXX movies? Look no further than MilfyMadness. With instant streaming of over 6 million hardcore sex videos from both professionals and amateurs, our high-quality porn tube has everything you need to satisfy your desires. Whether you're looking for sensual solo scenes or wild group sex, MilfyMadness has it all. Join us now and start exploring our vast collection of adult content." />
        <link rel="canonical" href={`https://www.MilfyMadness.com/`} />

      </Head>


      <div className='flex justify-between items-center my-4 md:hidden basicMargin'>
        <span className='text-[20px] text-theme_text  font-inter '>Trending Channels</span>
        <img
          className='h-[20px] w-[20px] cursor-pointer sm:hidden'
          src={viewType === 'horizontal' ? './grid.png' : './horizontal.png'}
          onClick={toggleViewType}
          alt="Toggle View"
        />
      </div>
      <Channels_slider trendingChannels={TrendingChannels} />


      <div className="w-full overflow-x-auto whitespace-nowrap py-2 scrollbar-hide md:hidden select-none">
        {tags.map((tag, index) => (
          <Link legacyBehavior key={tag.tag} href={`/search/${tag.tag.trim()}`} passHref>
            <a className="bg-gray-200 text-semiblack px-3 py-1.5 rounded-lg m-1 ml-2 inline-block text-sm hover:bg-gray-300">
              {tag.tag}
            </a>
          </Link>
        ))}
      </div>

      <main className="flex-row flex  mt-1 md:mt-2 md:space-x-3">
        {/* <Sidebar /> */}
        <div className='w-full overflow-hidden'>
          <h1 className="lg:text-xl text-lg text-white my-3 font-inter basicMargin w-fit border-b-[3px] border-theme_green">Trending Free Porn Videos</h1>
          <Videos data={video_collection[0].finalDataArray} />
          <a href={`/trending`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Trending Videos" />
          </a>



          {recommendedVideos.length > 0 &&
            <div>
              <Homepage_Title title="Recommended Videos" />
              <Videos data={recommendedVideos.slice(0, 20)} />
              {/* <a href={`/upcoming`}>
                <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Upcoming Videos" />
              </a> */}
            </div>
          }

          {countryVideos.length !== 0 && (
            <>
              <div className="flex items-center space-x-2 items-center basicMargin ">
                <Homepage_Title title={`Popular Porn Videos in ${currentLocation.countryCode}`} />

                <ReactCountryFlag
                  svg
                  countryCode={currentLocation.countryCode}
                  style={{
                    fontSize: '25px',
                    lineHeight: '25px',
                  }}
                  aria-label={currentLocation.countryCode}
                />
              </div>
              <Videos data={shuffle(countryVideos).slice(0, 12)} />
              <a href={`/search/${lang.toLowerCase().trim()}`}>
                <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-6 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Popular Porn Videos" />
              </a>
            </>
          )}

          <div className='md:hidden'>
            <Homepage_Title title="Trending Pornstars" />
            <Pornstar_slider trendingPornstars={TrendingPornstars} />
          </div>


          <Homepage_Title title="Upcoming" />
          <Videos data={video_collection[1].finalDataArray} />
          <a href={`/upcoming`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Upcoming Videos" />
          </a>

          <div className='md:hidden'>
            <Homepage_Title title="Trending Categories" />
            <Category_slider trendingCategories={trendingCategories.slice(1)} />
          </div>

          <Homepage_Title title="Featured" />
          <Videos data={video_collection[2].finalDataArray} />
          <a href={`/channels`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Featured Videos" />
          </a>

          <Homepage_Title title="Popular" />
          <Videos data={video_collection[3].finalDataArray} />
          <a href={`/popular`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Popular Videos" />
          </a>

          <Homepage_Title title="New Videos" />
          <Videos data={video_collection[4].finalDataArray} />
          <a href={`/new_videos`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More New Videos" />
          </a>

          <Homepage_Title title="Random" />
          <Videos data={video_collection[5].finalDataArray} />
          <a href={`/random`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-4 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Random Videos" />
          </a>
        </div>
      </main>

      <footer>
        <a className='' href="https://www.fuckvideo.live/">.</a>
        <a className='' href="https://www.chutlunds.com/">.</a>
        <a className='' href="https://www.desikahaniya.in/">.</a>
        <BannerAds />

      </footer>
    </div>

  );
}

export async function getStaticProps({ req, res }) {
  const parcelData = { href: "https://spankbang.party/" };

  const API_URL = `${process.env.BACKEND_URL}getHomePageVideos`;

  const rawResponse = await fetch(API_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(parcelData),
  });
  const ress = await rawResponse.json();

  return {
    props: {
      video_collection: ress.result.finalDataArray_Array,
      trendingChannels: ress.result.trendingChannels,
      tags: ress.result.tags,
      trendingCategories: ress.result.trendingCategories,
      trendingPornstars: ress.result.trendingPornstars,
    },
  };
}
