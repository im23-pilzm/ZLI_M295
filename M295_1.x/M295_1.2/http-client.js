const http = require("http");

const url = process.argv[2];

http.get(url, (response) => {
    response.setEncoding("utf-8");

    response.on("data", function (chunk) {
        console.log(chunk);
    });

    response.on("error", function(err) {
        console.error(err.message);
    });

    response.on("end", function (){
        console.log();
    });
}).on("error", function (err) {
    console.error(err.message);
});




