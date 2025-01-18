import React from 'react'
import Link from 'next/link'
import categoriesJSON from "../JsonData/categoryImages/data.json"


function Category_slider({ trendingCategories }) {

    const normalizeName = (name) => name.toLowerCase().replace(/ /g, "_").replace(".png", "");

    // Get normalized channel names from trendingChannels
    const trendingCategoryNames = trendingCategories.map(categoryObj => normalizeName(categoryObj.categoryName));

    // Filter channelsJSON based on normalized trendingChannelNames
    const filteredCategories = categoriesJSON.filter(categoryObj =>
        trendingCategoryNames.includes(normalizeName(categoryObj.name))
    );


    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden mb-6'>

            {filteredCategories.map(category => {

                return (
                    <Link href={`/category/${category.name.substring(0, category.name.indexOf('.png')).toLowerCase()}`} key={category.name} >
                        <div className='flex flex-col justify-center items-center mx-1 '>
                            <div className='w-[90px]'>
                                <img className='shadow-md rounded-full object-cover aspect-square '
                                    alt={category.name.substring(0, category.name.indexOf('.png')).toLowerCase()}
                                    src={`${process.env.CLOUDFLARE_STORAGE}category_images/${category.name.toLowerCase().substring(0, category.name.indexOf('.png'))}.png`}

                                />
                            </div>
                            <h2 className='text-xs text-center font-poppins text-theme_text font-semibold mt-1 whitespace-nowrap'>{category.name.substring(0, category.name.indexOf('.png')).toUpperCase()}</h2>
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider