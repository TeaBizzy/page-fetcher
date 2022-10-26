const request = require("request");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

const URL = args[0];
const filePath = args[1];

// Make a request to the specified URL:
request(`${URL}}`, (error, response, body) => {
  if (error) {
    console.log(`Encountered ERROR ${response}`);
    return;
  }

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.log(`WARNING a file already exists at: ${filePath}, do you want to overwrite it?`);

    rl.question("Do you want to overwrite this file?? (Y / any to exit.) \n", (response) => {
      if (response.toUpperCase() !== "Y") { // Convert the response to upper so any "y" response is accepted.
        console.log("No file written. Terminating program!");
        process.exit();
      }

      fs.writeFile(filePath, body, onWritingDone); // Writes the file to the filepath
      rl.close(); // Make sure we close this!
    });

  } else {
    fs.writeFile(filePath, body, onWritingDone); // Writes the file to the filepath
  }
  
});

// Logs a message for the user to know the file was written successfully.
const onWritingDone = function() {
  const fileStats = fs.statSync(filePath).size;
  console.log(`Downloaded and saved ${fileStats} bytes to ${filePath}`);
  process.exit();
};
