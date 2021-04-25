const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://dadstaxi.azurefd.net/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

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
        dom.innerHTML = `Page load time: ${timetaken}ms`;
    }, diffAverage);

    //take screenshot
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    //return the screenshot to the client
    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
};