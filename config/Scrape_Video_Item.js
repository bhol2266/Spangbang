


export function Scrape_Video_Item($) {


    const finalDataArray = [];

    $('.main_results .video-item').each((i, el) => {

        const thumbnail = $(el).find('picture img').attr('data-src');
        const title = $(el).find('picture img').attr('alt');
        const duration = $(el).find('.l').text();

        const views = $(el).find('.stats .v').text().trim();
        const likePercentage = $(el).find('.stats .r').text().trim();
        const uploadedTime = $(el).find('.stats .d').text().trim();
        const videoBadge = $(el).find('.video-badge.h').text().trim();

        const previewVideo = $(el).find('picture img').attr('data-preview');
        const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

        if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
            finalDataArray.push({
                thumbnail: thumbnail,
                title: title,
                duration: duration,
                views: views,
                likePercentage: likePercentage,
                uploadedTime: uploadedTime,
                videoBadge: videoBadge,
                previewVideo: previewVideo,
                href: href,
            });
        }
    });
    if (finalDataArray.length == 0) {
        $('.video-item').each((i, el) => {

            const thumbnail = $(el).find('picture img').attr('data-src');
            const title = $(el).find('picture img').attr('alt');
            const duration = $(el).find('.l').text();

            const views = $(el).find('.stats .v').text().trim();
            const likePercentage = $(el).find('.stats .r').text().trim();
            const uploadedTime = $(el).find('.stats .d').text().trim();
            const videoBadge = $(el).find('.video-badge.h').text().trim();

            const previewVideo = $(el).find('picture img').attr('data-preview');
            const href = `https://spankbang.com${$(el).find('a').attr('href')}`;

            if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
                finalDataArray.push({
                    thumbnail: thumbnail,
                    title: title,
                    duration: duration,
                    views: views,
                    likePercentage: likePercentage,
                    uploadedTime: uploadedTime,
                    videoBadge: videoBadge,
                    previewVideo: previewVideo,
                    href: href,
                });
            }
        });
    }


    return finalDataArray;
}








//this because, for pornstar page the above code will not works because the classes names are changed in pornstar page

export function Scrape_Video_Item_Pornstar($) {


    const finalDataArray = [];

    const cleanText = (text) => text ? text.trim().replace(/\s+/g, ' ') : '';


    $('.flex.flex-col > a').each((index, element) => {
        const thumbnail = $(element).find('img').attr('data-src');
        const title = cleanText($(element).attr('title'));

        // Extract and clean the duration, views, likePercentage, uploadedTime, and videoBadge from sibling elements
        const siblingDiv = $(element).siblings('.flex.flex-col');

        // Extract text data and clean it
        const data = cleanText(siblingDiv.find('div.text-body-sm.text-tertiary').find('div').eq(0).text()); //'600 100% 9 months'
        // Using split with a regular expression
        const [views, likePercentage, uploadedTime] = data.split(/(\d+%)/).filter(Boolean).map(s => s.trim());


        // Extract video badge
        const videoBadge = cleanText($(element).find('div.absolute.left-2.top-2').text());

        // Extract preview video source and href
        const previewVideo = $(element).find('video source').attr('data-src');
        var href = $(element).attr('href');
        if (!href.includes("https://spankbang.com")) href = "https://spankbang.com" + href

        if (title && previewVideo != undefined) {
            finalDataArray.push({
                thumbnail: thumbnail,
                title: title,
                duration: cleanText($(element).find('div.absolute.right-2.top-2').text()),
                views: views,
                likePercentage: likePercentage,
                uploadedTime: uploadedTime,
                videoBadge: videoBadge,
                previewVideo: previewVideo,
                href: href
            });
        }
    });

    return finalDataArray;
}


