const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://example.com/";
    const imageType = req.query.type || "png";
    const imageQuality = req.query.quality || 80;
    const imageWidth = req.query.width || 800;
    const imageHeight = req.query.height || 400;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const options = { fullPage: false, type: imageType, quality: Number(imageQuality), 
        clip: {x: 0, y: 0, width: Number(imageWidth), height: Number(imageHeight)}
    };
    
    //time request
    let t1 = Date.now();
    await page.goto(url);
    const diff1 = Date.now() - t1;
    console.log(`Time: ${diff1}ms`);

    //time request
    t1 = Date.now();
    await page.goto(url);
    const diff2 = Date.now() - t1;
    console.log(`Time: ${diff2}ms`);

    //time request
    t1 = Date.now();
    await page.goto(url);
    const diff3 = Date.now() - t1;
    console.log(`Time: ${diff3}ms`);

    //ignore first request as we consider this warm up and take average of 2 subsequent requests as best measure
    const diffAverage = (diff2 + diff3) /2;
    console.log(`Average Time: ${diffAverage}ms`);

    //write the time taken onto the page so it is show in the screenshot
    await page.evaluate((timetaken) => {
        let dom = document.querySelector('#messages');
        if (dom){
            dom.innerHTML = `Page load time: ${timetaken}ms.`;
        }
        else
        {
            var p = document.createElement("p");
            p.id = 'messages';
            p.style.cssText = 'font-weight:bold;';
            p.innerHTML = `Page load time: ${timetaken}ms.`;
            document.body.prepend(p);
        }
    }, diffAverage);

    //take screenshot
    const screenshotBuffer = await page.screenshot(options);
    await browser.close();

    //return the screenshot to the client
    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": `image/${imageType}`
        }
    };
};