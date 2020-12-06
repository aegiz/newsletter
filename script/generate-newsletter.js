"use strict";

var Mustache = require("mustache");
var fs = require("fs");

var template = fs.readFileSync("template.mustache").toString();
var data = JSON.parse(fs.readFileSync("data.json").toString());

var h = Mustache.render(template, data);

console.log(h);
