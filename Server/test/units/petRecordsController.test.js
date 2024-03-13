const request = require("supertest");
const { app, server } = require("../../index");

const fs = require("fs");
let recId = "";

describe("HTTP Endpoint Tests for Pet Profiles", () => {
  beforeEach(() => {
    // Clear any mock implementations and reset mock data before each test
    jest.clearAllMocks();
  });

  //M0-T01
  it("should return status code 201 when adding a pet correctly - M02-01", async () => {
    // Mock Cloud Storage methods

    const reqData = {
      petId: "userId",
      recordName: "name",
      date: "date",
      petRecordURL: "",
      id: "",
    };

    const imageContent = fs.readFileSync("./test/test-assets/Cloe1.jpg");
    const res = await request(app)
      .post("/petbay/api/v1/pet-records/add-record")
      .attach("filename", imageContent, "image.jpg")
      .field(reqData);

    recId = res.body.id;
    expect(res.body.id).not.toBe("");
    expect(res.body.petRecordURL).not.toBe("");
    expect(res.status).toBe(201);
  }, 10000);


  
    //M02-T06
    it("should return status 200 and array length should > 0 when sending valid userId to retrieve pets owned by the user - M02-T02", async () => {

        // Make HTTP POST request retrieve pets ownded by a user
        const res = await request(app)
          .get(
            "/petbay/api/v1/pet-profiles/owned-pets/lopxSRJzlieIOU6ajN1iaDRmFsD2"
          )
          .send();
    
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
      });
    
      //M02-T07
      it("should return status 200 and array length should == 0 when sending valid userId to retrieve pets owned by the user - M02-T02", async () => {
  
        // Make HTTP POST request retrieve pets ownded by a user
        const res = await request(app)
          .get(
            "/petbay/api/v1/pet-profiles/owned-pets/E6b6MPyMi2TgiR23S3HeTNXFhdq2"
          )
          .send();
    
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.length).toEqual(0);
      });

  afterAll((done) => {
    server.close(done);
  });
});
