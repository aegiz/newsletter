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
console.log("Now, go to Airtable and do some cleaning:");
console.log(
  "=> https://airtable.com/tbldn3ooyAJ7Twn9v/viwaTBZ586CuhmrzV?blocks=hide"
);
console.log("Then, upload the HTML content to sendinblue:");
console.log("=> https://my.sendinblue.com/dashboard");
console.log("=============================================");
