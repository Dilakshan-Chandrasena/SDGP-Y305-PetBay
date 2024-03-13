const request = require("supertest");
const { app, server } = require("../../index");

const fs = require('fs');

let petId ="";

describe("HTTP Endpoint Tests for Pet Profiles", () => {
  beforeEach(() => {
     // Clear any mock implementations and reset mock data before each test
     jest.clearAllMocks();
  });

  //M02-T01
  it("should return status code 201 when adding a pet correctly - M02-01", async () => {
 

    const reqData = {
      userId: "userId",
      name: "name",
      breed: "breed",
      gender: "gender",
      address: "address",
      age: "age",
      height: "height",
      weight: "weight",
      petImageURL: "",
      id: "",
    };

    const imageContent = fs.readFileSync('./test/test-assets/test.jpeg');
    const res = await request(app)
      .post("/petbay/api/v1/pet-profiles/add-pet")
      .attach('filename', imageContent, 'image.jpg')
      .field(reqData);
    
    petId = res.body.id;
    expect(res.body.id).not.toBe("")  
    expect(res.status).toBe(201);
  },10000);



  //M02-T02
  it("should return status code 400 no user id passed when adding a pet correctly - M02-T03", async () => {


    const requestData = {
      name: "userId",
      breed: "userId",
      gender: "gender",
      address: "userId",
      age: "userId",
      height: "userId",
      weight: "userId",
      petImageURL: "",
      id: "",
    };

    const response = await request(app)
      .post("/petbay/api/v1/pet-profiles/add-pet")
      .send(requestData);

    expect(response.status).toBe(400);
  });

  //M02-T03
  it("should return status code 400 no name passed when adding a pet correctly", async () => {


    const requestData = {
      userId: "lopxSRJzlieIOU6ajN1iaDRmFsD2",
      breed: "breed",
      gender: "gender",
      address: "address",
      age: "age",
      height: "height",
      weight: "weight",
      petImageURL: "",
      id: "",
    };

    const response = await request(app)
      .post("/petbay/api/v1/pet-profiles/add-pet")
      .send(requestData);

    expect(response.status).toBe(400);
  });

  //M02-T04
  it("should return status code 400 no gender passed when adding a pet correctly", async () => {

    const requestData = {
      userId: "lopxSRJzlieIOU6ajN1iaDRmFsD2",
      name: "name",
      breed: "breed",
      address: "address",
      age: "age",
      height: "height",
      weight: "weight",
      petImageURL: "",
      id: "",
    };

    const response = await request(app)
      .post("/petbay/api/v1/pet-profiles/add-pet")
      .send(requestData);

    expect(response.status).toBe(400);
  });

  //M02-T05
  it("should return 404 when fetching pet by not existing id", async () => {

    const response = await request(app).get(
      "/petbay/api/v1/pet-profiles/not-exists"
    );
    expect(response.status).toBe(404);
  });


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
    
    
    //M02-T08
    it("should return 200 when delteing an existing pet by id", async()=>{
      const res = await request(app)
      .delete(
       `/petbay/api/v1/pet-profiles/${petId}`
      );

    // Assertions
    expect(res.status).toBe(200);
    })

  afterAll((done) => {
    server.close(done);
  });
});
