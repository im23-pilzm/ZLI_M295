const request = require("supertest");
const app = require("./app");

describe("Book API", () => {
  describe("GET /api/books", () => {
    it("should return all books", async () => {
      const res = await request(app).get("/api/books");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(3);
    });
  });

  describe("GET /api/books/:id", () => {
    it("should return a book if valid id is passed", async () => {
      const res = await request(app).get("/api/books/1");
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("The Great Gatsby");
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(app).get("/api/books/999");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /api/books", () => {
    it("should create a new book", async () => {
      const res = await request(app).post("/api/books").send({
        title: "Test Book",
        author: "Test Author",
        year: 2023,
      });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe("Test Book");
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/books").send({
        title: "Test Book",
      });
      expect(res.status).toBe(400);
    });
  });

  describe("PUT /api/books/:id", () => {
    it("should update a book", async () => {
      const res = await request(app).put("/api/books/1").send({
        title: "Updated Title",
      });
      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Updated Title");
    });

    it("should return 404 if book not found", async () => {
      const res = await request(app).put("/api/books/999").send({
        title: "Updated Title",
      });
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/books/:id", () => {
    it("should delete a book", async () => {
      const res = await request(app).delete("/api/books/1");
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
    });

    it("should return 404 if book not found", async () => {
      const res = await request(app).delete("/api/books/999");
      expect(res.status).toBe(404);
    });
  });
});
