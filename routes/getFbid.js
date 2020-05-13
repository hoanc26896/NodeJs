const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

/* GET FB UUID */
router.get("/", async function (req, res, next) {
  const fbid = await getFBId();
  res.send(fbid);
});

async function getFBId() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.facebook.com/mcmisthy");
  const content = await page.content();
  const metaTag = content.match(/\<meta property="al:ios:url".*?\>/g)[0];
  const start = metaTag.lastIndexOf("=");
  const end = metaTag.lastIndexOf('"');
  const fbId = metaTag.slice(start + 1, end);
  await browser.close();
  return fbId;
}

module.exports = router;
