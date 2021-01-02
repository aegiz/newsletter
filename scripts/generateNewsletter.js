/*
 * This files creates the actual newsletter HTML content
 */

// Need to add in data.json:
// - typeIconURL https://i.imgur.com/xQjdCc8.png (video) || https://i.imgur.com/m99vnQi.png (article)
// - time to read
// - What I thought of this text
// - the new image (with an hheight of ...)
// image size in the extension directly

// To remove: sectionType

"use strict";

const fs = require("fs");
const Mustache = require("mustache");

const template = fs.readFileSync("template.mustache").toString();
const data = JSON.parse(fs.readFileSync("./output/data.json").toString());
const h = Mustache.render(template, data);

fs.writeFileSync("./output/index.html", h);

console.log("=============================================");
console.log("Well done, HTML generate!");
console.log("Now, go to Airtable and do some cleaning:");
console.log(
  "=> https://airtable.com/tbldn3ooyAJ7Twn9v/viwaTBZ586CuhmrzV?blocks=hide"
);
console.log("Then, upload the HTML content to sendinblue:");
console.log("=> https://my.sendinblue.com/dashboard");
console.log("=============================================");
