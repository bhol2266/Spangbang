import { ClockIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from "react";

import videosContext from '../context/videos/videosContext';
import PopunderAds from './Ads/Popunder';
import { bannedKeywords } from '../JsonData/BannedKeywords';
function VideoThumbnail({ details, type }) {


    const containsBannedKeywords = bannedKeywords.some(keyword => details.title.toLowerCase().includes(keyword.toLowerCase()));

    const [videoPage, setVideoPage] = useState(false);
    const [showPoster, setShowPoster] = useState(true);
    const [spinnerLoader, setSpinnerLoader] = useState(false);

    const video = details;
    const key = details.href.substring(details.href.indexOf('video/') + 6);
    const keyTitle = video.href.substring(video.href.indexOf('com/') + 4);
    const keyy = keyTitle.substring(0, keyTitle.indexOf('/video'));
    const title = keyTitle.substring(keyTitle.indexOf('video/') + 6);


    const { viewType, setViewType } = useContext(videosContext);


    useEffect(() => {
        if (window.location.href.includes("/video")) {
            setVideoPage(true);
        }
    }, []);

    const onClickHandler = () => {
        const videoData = {
            Title: video.title,
            duration: video.duration,
            likedPercent: video.likedPercent,
            thumbnail: video.thumbnail,
            views: video.views,
        };
        localStorage.setItem('videoplayer', JSON.stringify(videoData));
    };

    const stopMovie = (e) => {
        e.target.load();
        setShowPoster(true);
        setSpinnerLoader(false);
    };

    const playMovie = (e) => {
        e.target.play();
        setShowPoster(false);
        setSpinnerLoader(true);
    };

    return (
        <div>
            <a href={`https://www.cumzcraze1.com/video/${keyy}*${title}`} onClick={onClickHandler} data-title={video.title}>
                <div className="animate-fade flex flex-col items-start justify-center cursor-pointer rounded-md overflow-hidden transform transition duration-150 mb-3 2xl:mb-4">
                    <div className={`relative w-full overflow-hidden  ${viewType === "grid" ? "aspect-custom md:aspect-video" : "aspect-video"} ${containsBannedKeywords ? "hidden" : ""}`}>
                        <img
                            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                            src={video.thumbnail}
                            alt="Video Thumbnail"
                        />
                        <div className="absolute bottom-1.5 right-2 bg-black bg-opacity-60 text-white text-xs md:text-sm lg:text-md 2xl:text-lg  px-2 py-1 rounded">
                            <span className="font-sans pr-1 font-black italic scale-125">{video.videoBadge}</span>
                            <span className="font-inter">{video.duration}</span>
                        </div>
                        <video
                            className={`absolute top-0 left-0 w-full h-full object-cover ${showPoster ? 'opacity-0' : 'opacity-100'}`}
                            onMouseOver={playMovie}
                            onMouseLeave={stopMovie}
                            src={video.previewVideo}
                            preload="none"
                            muted
                        />
                    </div>

                    {type === "premium" && (
                        <img src='/crown.png' className='absolute top-0 right-0 h-6 lg:h-8 m-2 bg-white bg-opacity-70 p-0.5 rounded-md' alt="Premium" />
                    )}

                    <span className="font-inter text-[13px] md:text-[15px]  px-1 lg:pl-2 py-1 text-gray-300 line-clamp-1">
                        {video.title}
                    </span>

                    <div className="flex items-center justify-start w-full pl-0.5 sm:pl-1 md:pb-2 lg:pl-2 font-arial -mt-1 lg:-mt-1.5">
                        <div className="flex items-center">
                            <p className='text-[12px] md:text-[14px]  text-gray-400  font-inter'>{video.views} Views</p>
                        </div>
                        <div className="flex items-center ml-3">
                            <img className="w-[15px] h-[15px]  xl:w-[22px] xl:h-[22px]" src='/icons/thumb.png' alt="Likes" />
                            <p className='text-[12px] md:text-[14px]   font-inter sm:ml-1 xl:ml-2 text-gray-400'>{video.likePercentage}</p>
                        </div>
                        <div className="hidden sm:flex items-center ml-2">
                            <ClockIcon className="icon  w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] text-gray-400" />
                            <p className='text-[12px] md:text-[14px]   font-inter text-gray-400'>{video.uploadedTime}</p>
                        </div>
                    </div>
                </div>
            </a>

            <PopunderAds />

        </div>
    );
}

export default VideoThumbnail;
