const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Library API",
        description: "API documentation for the Library project",
    },
    host: "localhost:3000",
    schemes: ["http"],
    tags: [
        {
            name: "Books",
            description: "Endpoints related to books",
        },
        {
            name: "Lends",
            description: "Endpoints related to lends",
        },
    ],
    definitions: {
        Book: {
            isbn: "978-3-16-148410-0",
            title: "The Great Gatsby",
            year: 1925,
            author: "F. Scott Fitzgerald",
        },
        Lend: {
            id: 1,
            customer_id: "C12345",
            isbn: "978-3-16-148410-0",
            borrowed_at: "2023-10-01T10:00:00Z",
            returned_at: null,
        },
    },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./libary_one.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);