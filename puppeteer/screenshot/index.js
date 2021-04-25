const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://google.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //set a timer then request the page
    const t1 = Date.now();
    await page.goto(url);
    const diff1 = Date.now() - t1;
    console.log(`Time: ${diff1}ms`);
    
    //write the time taken onto the page so it is show in the screenshot
    await page.evaluate((diff1) => {
        let dom = document.querySelector('#messages');
        dom.innerHTML = `Page load time: ${diff1}ms`;
    });

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