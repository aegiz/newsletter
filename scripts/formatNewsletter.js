/*
 * This files creates the actual newsletter HTML content
 */

"use strict";

const fs = require("fs");
const Mustache = require("mustache");

const template = fs.readFileSync("template.mustache").toString();
const data = JSON.parse(fs.readFileSync("./output/data.json").toString());
const h = Mustache.render(template, data);

fs.writeFileSync("./output/index.html", h);

console.log("=============================================");
console.log("Well done, HTML generate!");
console.log("Now,");
console.log("1. Make a backup of this HTML file in the newsletter folder");
console.log(
  "2. Upload the HTML content to sendinblue and create the preview with the hastags"
);
console.log("=> https://my.sendinblue.com/dashboard");
console.log("3. Update the Notion with Links and Keywords");
console.log("=> https://my.sendinblue.com/dashboard");
console.log("4. Plan post on social media with Buffer");
console.log(
  "=> https://publish.buffer.com/profile/602ff17e6ab0810efb6e9ce6/tab/queue"
);
console.log("=============================================");
