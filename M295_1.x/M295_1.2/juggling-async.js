const concat = require("concat-stream");
const http = require("http");

const urls = process.argv.slice(2);
const results = [];
let completed = 0;




urls.forEach((url, index) => {
    http.get(url, (response) => {
        response.pipe(concat((data) => {
            results[index] = data.toString();
            completed++;

            if (completed === urls.length){
                results.forEach(result => console.log(result))
            }
        }));
    }).on("error", (err) => {
        console.log(err)
    })
})