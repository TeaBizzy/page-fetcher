const request = require("request");
const args = process.argv.slice(2);
const fs = require("fs");

const URL = args[0];
const filePath = args[1];

// Make a request to the specified URL:
request(`${URL}}`, (error, response, body) => {
  if (error) {
    console.log(`Encountered ERROR ${response}`);
    return;
  }

  if (filePath) {
    fs.writeFile(filePath, body, onWritingDone); // Writes the file to the filepath
  }
});

// Logs a message for the user to know the file was written successfully.
const onWritingDone = function() {
  const fileStats = fs.statSync(filePath).size;
  console.log(`Downloaded and saved ${fileStats} bytes to ${filePath}`);
};
