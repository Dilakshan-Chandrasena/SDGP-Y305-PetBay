const request = require("supertest");
const { app, server } = require("../../index");

const fs = require("fs");
let recId = "";

describe("HTTP Endpoint Tests for Pet Profiles", () => {
  beforeEach(() => {
    // Clear any mock implementations and reset mock data before each test
    jest.clearAllMocks();
  });

  //M04-T01
  it("should return status code 201 when adding a pet correctly - M02-01", async () => {
    // Mock Cloud Storage methods

    const reqData = {
      petId: "90a61707-7450-42a0-a42a-ed880ef73c3a",
      recordName: "name",
      date: "date",
      petRecordURL: "",
      id: "",
    };

    const imageContent = fs.readFileSync("./test/test-assets/test.jpeg");
// Make HTTP POST request to add a pet record
    const res = await request(app)
      .post("/petbay/api/v1/pet-records/add-record")
      .attach("filename", imageContent, "image.jpg")
      .field(reqData);

    recId = res.body.id;
    expect(res.body.id).not.toBe("");
    expect(res.body.petRecordURL).not.toBe("");
    expect(res.status).toBe(201);
  }, 10000);

  //M04-T02
  it("should return status 200 and array length should > 0 when sending valid petId that has recs to retrieve petrecs", async () => {
    // Make HTTP GET request retrieve pet records of a pet
    const res = await request(app)
      .get(
        "/petbay/api/v1/pet-records/records/90a61707-7450-42a0-a42a-ed880ef73c3a"
      )
      .send();

    // Assertions
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  //M04-T03
  it("should return status 200 and array length should == 0 when sending valid petId that has no recs to retrieve petrecs", async () => {
    // Make HTTP GER request retrieve pet records of a pet
    const res = await request(app)
      .get(
        "/petbay/api/v1/pet-records/records/8001a59d-0c58-4036-bd96-5cad301d50c6"
      )
      .send();

    // Assertions
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(0);
  });

  it("should return status 200 and array length should == 0 when sending valid petId that has no recs to retrieve petrecs", async () => {
    // Make HTTP DELETE request to delete a pet by id
    const res = await request(app)
      .delete(
        `/petbay/api/v1/pet-records/${recId}`
      )
      .send();

    // Assertions
    const deleteRecordId = res.body.recordId;
    expect(res.status).toBe(200);
    expect(deleteRecordId).toEqual(recId)
    

  });

  afterAll((done) => {
    server.close(done);
  });
});
