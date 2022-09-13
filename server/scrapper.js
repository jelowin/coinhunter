const scraperObject = {
  url: "https://www.ecb.europa.eu/euro/coins/comm/html/index.es.html",
  async scraper(browser) {
    try {
      let data = [];
      let page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url, {
        waitUntil: "domcontentloaded",
      });

      console.log(`Getting links to scrap...`);

      const links = await page.$$eval("a.box", (links) => {
        return links.map((link) => link.href);
      });

      for (const link of links) {
        console.log(`Navigating to ${link}...`);
        await page.goto(link, {
          waitUntil: "domcontentloaded",
        });

        const coinHandles = await page.$$(".box", (a) => a.innerHTML);

        console.log("Scrapping...");
        for (const coinHandle of coinHandles) {
          // const parent = await coinHandle.getProperty("parentNode");
          // const image = await parent.$eval("img", (node) => node.currentSrc);
          // console.log(image);

          let country = "";
          try {
            country = await coinHandle.$eval("h3", (node) => node.textContent);
          } catch {
            country = "";
          }

          let image = "";
          try {
            image = await coinHandle.$eval(".coins img", (node) => node.src);
          } catch {
            image = await coinHandle.$eval(
              ".coins .coin-cropper",
              (node) =>
                `https://www.ecb.europa.eu${node.attributes["data-image"].textContent}`
            );
          }

          // Motivo
          let reason = "";
          try {
            reason = await coinHandle.$eval(
              "p:nth-of-type(1)",
              (node) => node.textContent
            );
          } catch {
            reason = "";
          }

          let description = "";
          try {
            description = await coinHandle.$eval(
              "p:nth-of-type(2)",
              (node) => node.textContent
            );
          } catch {
            description = "";
          }

          let issueVolum = "";
          try {
            issueVolum = await coinHandle.$eval(
              "p:nth-of-type(3)",
              (node) => node.textContent
            );

            if (!issueVolum.includes("monedas")) {
              issueVolum = await coinHandle.$eval(
                "p:nth-of-type(4)",
                (node) => node.textContent
              );
            }
          } catch {
            issueVolum = "";
          }

          let issueDate = "";
          try {
            issueDate = await coinHandle.$eval(
              "p:nth-of-type(4)",
              (node) => node.textContent
            );

            if (issueDate.includes("monedas")) {
              issueDate = await coinHandle.$eval(
                "p:nth-of-type(5)",
                (node) => node.textContent
              );
            }
          } catch {
            issueDate = "";
          }

          data.push({
            country: country.length ? country : "",
            description: description.length
              ? description.split(":")[1].trim()
              : "",
            image: image.length ? image : "",
            issueDate: issueDate.length ? issueDate.split(":")[1].trim() : "",
            issueVolum: issueVolum.length
              ? issueVolum.split(":")[1].trim()
              : "",
            reason: reason.length ? reason.split(":")[1].trim() : "",
            year: link.length
              ? link.split("/")[7].split("_")[1].split(".")[0]
              : "",
          });
        }
      }
      await browser.close();
      return data;
    } catch (e) {
      console.log("--------- ERROR --------", e);
      await browser.close();
    }

    // let pagePromise = (link) =>
    //   new Promise(async (resolve, reject) => {
    //     console.log(link);
    //     let dataObj = {};
    //     let newPage = await browser.newPage();
    //     await newPage.goto(link);
    //     await page.screenshot({ path: `${link}.webp`, type: "webp" });
    //     // dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
    //     // dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
    //     // dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
    //     //   // Strip new line and tab spaces
    //     //   text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
    //     //   // Get the number of stock available
    //     //   let regexp = /^.*\((.*)\).*$/i;
    //     //   let stockAvailable = regexp.exec(text)[1].split(' ')[0];
    //     //   return stockAvailable;
    //     // });
    //     // dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
    //     // dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
    //     // dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
    //     resolve(dataObj);
    // });

    // for (const link of links) {
    //       let currentPageData = await pagePromise(link);
    //       // scrapedData.push(currentPageData);
    //       console.log(currentPageData);
    // }
    // });
  },
};

module.exports = scraperObject;
