/*
 ************************
 ***** Global vars ******
 ************************
 */

var backgroundImage;
var init = true;
var blobUrl;

/*
 ************************
 **** Functional code ***
 ************************
 */

var initialization = function (request) {
  $("#base").css("backgroundImage", "url(" + backgroundImage + ")");
  $("#cropped").css("backgroundImage", "url(" + backgroundImage + ")");
  $("#link").val(request.url);
  $("#title").text(request.title);
  $("#alt").val(request.title.split(" ").shift());
  $("#description").text(request.description);
  init = false;
};

var gettingAllInputs = function () {
  // Create an empty canvas element
  var l = parseInt($("#cropped").css("left"), 10);
  var t = parseInt($("#cropped").css("top"), 10);
  var w = parseInt($("#cropped").css("width"), 10);
  var h = parseInt($("#cropped").css("height"), 10);
  var canvas = document.getElementById("final");
  canvas.width = w;
  canvas.height = h;
  // Copy the image contents to the canvas
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = backgroundImage;
  img.onload = function () {
    ctx.drawImage(img, l, t, w, h, 0, 0, w, h);
    var ImageURL = canvas.toDataURL("image/jpeg");
    fetch(ImageURL)
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob);
        blobUrl = URL.createObjectURL(blob);
        var form = new FormData();
        form.append("image", blob);
        callImgur(form, callAirtable);
      });
  };
};

var callImgur = function (form, callback) {
  $(".loader").show();

  console.log("** Making the call to Imgur: ** ");

  var settings = {
    url: "https://api.imgur.com/3/image",
    data: form,
    type: "POST",
    contentType: false,
    processData: false,
    headers: {
      Authorization: "Client-ID " + credentials.imgur,
    },
  };
  $.ajax(settings).done(function (res) {
    $(".helper").text(res.message);
    $(".loader").hide();

    callback({
      sectionType: $("#sectionType").val(),
      alt: $("#alt").val(),
      link: $("#link").val(),
      itemType: $("#itemType").val(),
      title: $("#title").val(),
      description: $("#description").val(),
      image: [
        {
          url: res.data.link,
        },
      ],
    });
  });
};

var callAirtable = function (airtableInput) {
  $(".loader").show();
  console.log("** Making the call to Airtable: ** ");

  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: credentials.airtable.apiKey }).base(
    credentials.airtable.base
  );

  base("Newsletter content").create(
    [
      {
        fields: airtableInput,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        $(".helper").text(err.message);
        return;
      }
      console.log(records[0]);
      $(".helper").text("Success!");
      $(".helper-link").show();
      $(".download").show();
      $(".loader").hide();
    }
  );
};

/*
 ************************
 ********* INIT *********
 ************************
 */

chrome.extension &&
  chrome.extension.onMessage.addListener(function (request) {
    backgroundImage = request.image || {};
    if (init) {
      initialization(request);
    } else {
      gettingAllInputs();
    }
  });

/*
 ************************
 ** User Interactions ***
 ************************
 */

$(function () {
  // Click on the Call CTA
  $("a[href=#call]").click(function () {
    chrome.extension.sendMessage({ action: "capture" });
    return false;
  });
  // Click on the Cancel CTA
  $("a[href=#close]").click(function () {
    chrome.tabs.getCurrent(function (tab) {
      chrome.tabs.remove(tab.id);
    });
    return false;
  });

  // Click on the Download CTA
  $("a[href=#download]").click(function () {
    chrome.downloads.download({
      url: blobUrl,
      filename: "screenshot.png",
    });
    return false;
  });

  var croppedImage = $("#cropped");
  croppedImage
    .draggable({
      grid: [5, 5],
      containment: "document",
    })
    .resizable({
      aspectRatio: true,
      grid: [5, 5],
      containment: "document",
      handles: "n, e, s, w, ne, se, sw, nw",
    })
    .bind("drag", function (event, ui) {
      var left = ui.offset.left;
      var top = ui.offset.top;
      croppedImage.css({
        backgroundPosition: left * -1 + "px " + top * -1 + "px",
      });
    })
    .bind("resize", function (event, ui) {
      var l = parseInt($(ui.element).css("left"), 10);
      var t = parseInt($(ui.element).css("top"), 10);
      var w = parseInt($(ui.element).css("width"), 10);
      var h = parseInt($(ui.element).css("height"), 10);
      $(ui.element).css({
        backgroundPosition: l * -1 + "px " + t * -1 + "px",
      });
      $(".dimensions", croppedImage).text(w + "x" + h);
    });
});
