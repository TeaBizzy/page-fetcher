const request = require("request");
const args = process.argv.slice(2);
const fs = require("fs");

request(`${args[0]}}`, (error, response, body) => {
  if(error) {
    console.log(`Encountered ERROR ${response}`);
    return;
  }
  fs.writeFile(args[1], body, onWritingDone);
});

const onWritingDone = function() {
  console.log(`Downloaded and saved ${fs.statSync(args[1]).size} bytes to ${args[1]}`)
};
