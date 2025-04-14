const concat = require("concat-stream");
const http = require("http");

http.get(process.argv[2], (response) => {
    response.pipe(concat((data) => {
        const result = data.toString();
        console.log(result.length);
        console.log(result)
    }));
}).on("error", (err) => {
    console.log(err)
})
