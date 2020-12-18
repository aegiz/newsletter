# newsletter

A project to save all the code related to my new newsletter: We Can Still Have Nice Things

# Main concept

For every newsletter:

- Ever week I will bookmark articles via the Chrome extension (in the "extension" folder). While doing so, these articles are pushed to Airtable.

- Then when I am ready to publish the newsletter I will:

  1. Run the script `formatData.js`, this will get me all the data from Airtable
  2. Fill the missing content (the intro)
  3. Run the script `generateNewsletter.js`, this will generate the html content for the email.

- Then in Airtable I will:

  1. Backup the content of the "Newsletter content" tab into a new tab
  2. Clear the whole "Newsletter content" tab

- Finally, I will go to Sendinblue and upload the HTML there.
