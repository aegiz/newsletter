# We 👏 Can 👏 Still 👏 Have 👏 Nice 👏 Things Newsletter

A Github repo to save all the code related to the newsletter automation.

## Flow

TLDR: See this whole ([Youtube demo](https://youtu.be/C_rV2boYOi0) for a detailed presentation.

For every newsletter:

- During the week I am bookmarking interesting articles via the Pocket Chrome extension

Then at the end of the week:

- I will sort these links and mark the ones to keep as "favorites"
- For every favorite, I will then visit the associated link's page and use the dedicate Chrome extension I made (hosted in the /extension folder of this repo)
- While doing so, all the relevant data are pushed to an Airtable spreadsheet.
- Then I will:

  1. Run locally the script `scripts/getData.js`, which gets me all the data from Airtable
  2. Fill the missing content in `scripts/output/data.json` (for example, the intro text)
  3. Run the script `scripts/generateNewsletter.js`. This will generate the html content for the email.

Last actions:

  1. Make a backup of this HTML file in the `newsletters` folder
  2. Upload the HTML content to sendinblue. Plan the newsletter and create the preview with the hastags from Airtable.
  3. Update the Notion with Links and hastags.
  4. Plan post on social media with [Buffer](https://publish.buffer.com/profile/602ff17e6ab0810efb6e9ce6/tab/queue)


## Improvements:

1. Add [this](https://twitter.com/JeanAbbiateci/status/1355921305514684420) in the body of the newsletter.
2. Create a script that parse automatically all the images and create a story ready to publish on Insta ([this](https://www.instagram.com/p/CMZpxHXBdMG/?igshid=1g6b21wsw3q1) is what we are aiming for)
