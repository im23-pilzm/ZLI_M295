const fs = require('fs');

const filePath = process.argv[2];

const fileCont = fs.readFileSync(filePath);

const fileContString = fileCont.toString();

const numberOfNewLines = fileContString.split("\n").length - 1;

console.log(numberOfNewLines);