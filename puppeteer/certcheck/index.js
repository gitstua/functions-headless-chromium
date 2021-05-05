const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://example.com/";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    //time request
    const response = await page.goto(url)
    const securityDetails = response.securityDetails()
    const expiryDate = new Date(securityDetails.validTo() * 1000)
    const validFrom = new Date(securityDetails.validFrom * 1000
    console.log(new Date(expiryDate))

    const resultsJson = { 
        expiryDate: expiryDate.toDateString(),
        validFrom: validFrom.toDateString(), 
        subjectName: securityDetails.subjectName,
        securityDetails: securityDetails };
    
    console.log(resultsJson);
    await browser.close();

    //return the screenshot to the client
    context.res = {
        body: resultsJson,
        headers: {
            "content-type": `application/json`
        }
    };
};

async function addTextToPage(page, text) {
    await page.evaluate((timetaken) => {
        let dom = document.querySelector('#messages');
        if (dom) {
            dom.innerHTML = text;
        }

        else {
            var p = document.createElement("p");
            p.id = 'messages';
            p.style.cssText = 'font-weight:bold;';
            p.innerHTML = text;
            document.body.prepend(p);
        }
    }, text);
}

