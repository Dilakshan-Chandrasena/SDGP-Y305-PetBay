const request = require("supertest");
const { app, server } = require("../../index");
const { db } = require("../../config/firebase");
const { storage } = require("../../config/firebaseCloudStorage");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

jest.mock("../../config/firebase");
jest.mock("../../config/firebaseCloudStorage");
jest.mock("firebase/storage");

describe("HTTP Endpoint Tests for Pet Profiles", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // M01-T04
  it("should return status 200 sending valid userId to retrieve pets owned by the user", async () => {
    // Mock Firestore methods
    db.collection.mockReturnValueOnce({
      doc: jest.fn().mockReturnValueOnce(
        {
          get: jest
            .fn()
            .mockReturnValueOnce({ data: jest.fn().mockReturnValueOnce({}) }),
        },
        { where: jest.fn().mockReturnValueOnce() }
      ),
      set: jest.fn().mockResolvedValueOnce(),
      where: jest.fn().mockReturnValueOnce(),
    });

    // Make HTTP POST request retrieve pets ownded by a user
    const response = await request(app)
      .get(
        "/petbay/api/v1/pet-profiles/owned-pets/67PC4hQkSGQbW2EVIXQrrjaNdM32"
      )
      .send();

    // Assertions
    console.log(response);
    expect(response.status).toBe(200);
  });

  it("should return status code 400 no user id passed when adding a pet correctly", async () => {
    // Mock Firestore methods
    const mockSet = jest.fn();
    db.collection.mockReturnValueOnce({
      doc: jest.fn().mockReturnValueOnce({ set: mockSet }),
    });

    // Mock Cloud Storage methods
    const mockUploadBytesResumable = jest.fn();
    const mockGetDownloadURL = jest
      .fn()
      .mockReturnValueOnce("url");
    ref.mockReturnValueOnce({});
    uploadBytesResumable.mockImplementationOnce(mockUploadBytesResumable);
    getDownloadURL.mockImplementationOnce(mockGetDownloadURL);

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

  it("should return status code 400 no name passed when adding a pet correctly", async () => {
    // Mock Firestore methods
    const mockSet = jest.fn();
    db.collection.mockReturnValueOnce({
      doc: jest.fn().mockReturnValueOnce({ set: mockSet }),
    });

    // Mock Cloud Storage methods
    const mockUploadBytesResumable = jest.fn();
    const mockGetDownloadURL = jest
      .fn()
      .mockReturnValueOnce("url");
    ref.mockReturnValueOnce({});
    uploadBytesResumable.mockImplementationOnce(mockUploadBytesResumable);
    getDownloadURL.mockImplementationOnce(mockGetDownloadURL);

    const requestData = {
      userId: "userId",
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

  
  it("should return status code 400 no breed passed when adding a pet correctly", async () => {
    // Mock Firestore methods
    const mockSet = jest.fn();
    db.collection.mockReturnValueOnce({
      doc: jest.fn().mockReturnValueOnce({ set: mockSet }),
    });

    // Mock Cloud Storage methods
    const mockUploadBytesResumable = jest.fn();
    const mockGetDownloadURL = jest
      .fn()
      .mockReturnValueOnce("url");
    ref.mockReturnValueOnce({});
    uploadBytesResumable.mockImplementationOnce(mockUploadBytesResumable);
    getDownloadURL.mockImplementationOnce(mockGetDownloadURL);

    const requestData = {
      userId: "userId",
      name: "name",
      gender: "gender",
      address: "address",
      age: "age",
      height: "height",
      weight: "weight",
      petImageURL: "",
      id: "",
    };

    const file = "../test-assets/Cloe1.jpg"

    const response = await request(app)
      .post("/petbay/api/v1/pet-profiles/add-pet").attach('image',file).field(requestData);

    expect(response.status).toBe(400);
  });


  it("should return status code 400 no gender passed when adding a pet correctly", async () => {
    // Mock Firestore methods
    const mockSet = jest.fn();
    db.collection.mockReturnValueOnce({
      doc: jest.fn().mockReturnValueOnce({ set: mockSet }),
    });

    // Mock Cloud Storage methods
    const mockUploadBytesResumable = jest.fn();
    const mockGetDownloadURL = jest
      .fn()
      .mockReturnValueOnce("url");
    ref.mockReturnValueOnce({});
    uploadBytesResumable.mockImplementationOnce(mockUploadBytesResumable);
    getDownloadURL.mockImplementationOnce(mockGetDownloadURL);

    const requestData = {
      userId: "userId",
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


  

  afterAll((done) => {
    server.close(done);
  });
});
