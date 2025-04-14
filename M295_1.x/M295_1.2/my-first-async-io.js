const fs = require('fs');
const filePath = process.argv[2];

fs.readFile(filePath, callback);


function callback (err, data) {
    if (err) return console.error(err)

    const fileContString = data.toString();

    const numberOfNewLines = fileContString.split("\n").length - 1;

    console.log(numberOfNewLines);
}
