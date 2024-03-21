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

  //M05-T02
  it("should return status code 400 when adding a post without providing pet name - M05-01", async () => {
    const today = new Date().toISOString().split("T")[0];
    const specificDate = "2024-03-12"; // You can adjust this as needed

    // Inside the test case
    const reqData = {
      userId: "userId",
      status: "status",
      name: "",
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
    expect(res.status).toBe(400);
  }, 10000);

  //M05-T03
  it("It should return 200 and array length > 0 when retrieving all lost found posts", async () => {
    // Make HTTP GET request retrieve all ost found posts
    const res = await request(app)
      .get("/petbay/api/v1/lost-found/lost-found-posts/")
      .send();

    // Assertions
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  //M05-T04
  it("should return 200 and a non-empty object when retrieving a specific post by passing the postId", async () => {
    // Make HTTP GET request to retrieve a post by Id
    const res = await request(app)
      .get(
        "/petbay/api/v1/lost-found/post-details/645c2f7a-f47e-4893-9dd0-817e2333196b"
      )
      .send();

    // Assertions
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object"); // Ensure res.body is an object
    expect(Object.keys(res.body).length).toBeGreaterThan(0); // Check if object is non-empty
  });

  afterAll((done) => {
    server.close(done);
  });
});
