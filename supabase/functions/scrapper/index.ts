import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
console.log("Hello from Functions!");

serve(async (req: Request) => {
  try {
    const url = "https://www.ecb.europa.eu/euro/coins/comm/html/index.es.html";
    let data = [];

    const browser = await puppeteer.launch({
      headless: true,
      product: "chrome",
    });

    let page = await browser.newPage();

    console.log(`Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  } catch (error) {
    console.log(error);
  }

  return new Response("hi", {
    headers: { "Content-Type": "application/json" },
  });
});
// import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
// import puppeteer from "https://deno.land/x/puppeteer@5.5.1/mod.ts";

// console.log("Hello from Functions!");

// serve(async (req: Request) => {
//   const url = "https://www.ecb.europa.eu/euro/coins/comm/html/index.es.html";
//   let data: Array<object> = [];
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     ignoreHTTPSErrors: true,
//   });

//   try {
//     let page = await browser.newPage();
//     console.log(`Navigating to ${url}...`);
//     await page.goto(url, {
//       waitUntil: "domcontentloaded",
//     });

//     console.log(`Getting links to scrap...`);

//     const links = await page.$$eval("a.box", (links) => {
//       return links.map((link) => link.href);
//     });

//     for (const link of links) {
//       console.log(`Navigating to ${link}...`);
//       await page.goto(link, {
//         waitUntil: "domcontentloaded",
//       });

//       const coinHandles = await page.$$(".box", (a) => a.innerHTML);

//       console.log("Scrapping...");
//       for (const coinHandle of coinHandles) {
//         // const parent = await coinHandle.getProperty("parentNode");
//         // const image = await parent.$eval("img", (node) => node.currentSrc);
//         // console.log(image);

//         let country = "";
//         try {
//           country = await coinHandle.$eval("h3", (node) => node.textContent);
//         } catch {
//           country = "";
//         }

//         let image = "";
//         try {
//           image = await coinHandle.$eval(".coins img", (node) => node.src);
//         } catch {
//           image = await coinHandle.$eval(
//             ".coins .coin-cropper",
//             (node) =>
//               `https://www.ecb.europa.eu${node.attributes["data-image"].textContent}`
//           );
//         }

//         // Motivo
//         let reason = "";
//         try {
//           reason = await coinHandle.$eval(
//             "p:nth-of-type(1)",
//             (node) => node.textContent
//           );
//         } catch {
//           reason = "";
//         }

//         let description = "";
//         try {
//           description = await coinHandle.$eval(
//             "p:nth-of-type(2)",
//             (node) => node.textContent
//           );
//         } catch {
//           description = "";
//         }

//         let issueVolum = "";
//         try {
//           issueVolum = await coinHandle.$eval(
//             "p:nth-of-type(3)",
//             (node) => node.textContent
//           );

//           if (!issueVolum.includes("monedas")) {
//             issueVolum = await coinHandle.$eval(
//               "p:nth-of-type(4)",
//               (node) => node.textContent
//             );
//           }
//         } catch {
//           issueVolum = "";
//         }

//         let issueDate = "";
//         try {
//           issueDate = await coinHandle.$eval(
//             "p:nth-of-type(4)",
//             (node) => node.textContent
//           );

//           if (issueDate.includes("monedas")) {
//             issueDate = await coinHandle.$eval(
//               "p:nth-of-type(5)",
//               (node) => node.textContent
//             );
//           }
//         } catch {
//           issueDate = "";
//         }

//         data.push({
//           country: country.length ? country : "",
//           description: description.length
//             ? description.split(":")[1].trim()
//             : "",
//           image: image.length ? image : "",
//           issueDate: issueDate.length ? issueDate.split(":")[1].trim() : "",
//           issueVolum: issueVolum.length ? issueVolum.split(":")[1].trim() : "",
//           reason: reason.length ? reason.split(":")[1].trim() : "",
//           year: link.length
//             ? link.split("/")[7].split("_")[1].split(".")[0]
//             : "",
//         });
//       }
//     }
//     await browser.close();
//     return new Response(data, {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (e) {
//     console.log("--------- ERROR --------", e);
//     await browser.close();
//   }
// });

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
