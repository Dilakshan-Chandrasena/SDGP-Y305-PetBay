const request = require("supertest");
const { app, server } = require("../../index");

const fs = require("fs");

let postId = "";

describe("HTTP Endpoint Tests for Lost and Found", () => {
  beforeEach(() => {
    // Clear any mock implementations and reset mock data before each test
    jest.clearAllMocks();
  });

  //M05-T01
  it("should return status code 201 when adding a post correctly - M05-01", async () => {
    const today = new Date().toISOString().split("T")[0];
    const specificDate = "2024-03-12"; // You can adjust this as needed

    // Inside the test case
    const reqData = {
      userId: "userId",
      status: "status",
      name: "name",
      breed: "breed",
      color: "color",
      gender: "gender",
      area: "area",
      createdDate: today, // Use the current date
      date: specificDate, // Use the specific date
      time: "time",
      height: "height",
      features: "features",
      contact: "0789456123",
      lostFoundImageURL: "",
      id: "",
    };

    const imageContent = fs.readFileSync("./test/test-assets/test.jpeg");

    const res = await request(app)
      .post("/petbay/api/v1/lost-found/add-lostfound-posts")
      .attach("filename", imageContent, "image.jpg")
      .field(reqData);

    postId = res.body.id;
    expect(res.body.id).not.toBe("");
    expect(res.status).toBe(201);
  }, 10000);

  afterAll((done) => {
    server.close(done);
  });
});
