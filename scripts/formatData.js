/*
 * This file create data.js from Airtable
 */

"use strict";

const fs = require("fs");
const Airtable = require("airtable");

let data = {
  intro: {
    content: "",
  },
  hero: {},
  randomArticles: [],
  animalCorner: [],
  recipe: {},
};

const credentials = require("./creds/credentials");
const base = new Airtable({ apiKey: credentials.airtable.apiKey }).base(
  credentials.airtable.base
);

base("Newsletter content")
  .select({
    maxRecords: 100,
    view: "Grid view",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      records.forEach(function (record) {
        let cleanRecord = record.fields;
        cleanRecord.image = record.fields.image[0].thumbnails.large.url;
        const sectionType = record.get("sectionType");
        if (sectionType === "hero") {
          data.hero = cleanRecord;
        } else if (sectionType === "randomArticles") {
          data.randomArticles.push(cleanRecord);
        } else if (sectionType === "recipe") {
          data.recipe = cleanRecord;
        } else if (sectionType === "animalCorner") {
          data.animalCorner.push(cleanRecord);
        } else {
          console.log("Error with section type: ", sectionType);
        }
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
      // Make sure to remove the recipe key if none of the articles are from this type
      if (Object.keys(data.recipe).length === 0) {
        delete data.recipe;
      }
      fs.writeFileSync("./output/data.json", JSON.stringify(data));
      console.log("=============================================");
      console.log(
        "All good with retrieving the data from Airtable, now fill the data.json intro bro!"
      );
      console.log("=============================================");
    }
  );
