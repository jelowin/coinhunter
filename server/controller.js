const pageScraper = require("../server/scrapper");

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    const data = await pageScraper.scraper(browser);
    return data;
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
