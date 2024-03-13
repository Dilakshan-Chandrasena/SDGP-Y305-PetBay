const request = require("supertest");
const { app, server } = require("../../index");
const { db } = require("../../config/firebase");

// Mock Firestore methods
jest.mock("../../config/firebase");

describe("HTTP Endpoint Tests", () => {
  beforeEach(() => {
    // Clear any mock implementations and reset mock data before each test
    jest.clearAllMocks();
  });

//M01-T01   
  it("should return status 200 when sending available user", async () => {

    db.collection.mockReturnValueOnce({
      doc: jest
        .fn()
        .mockReturnValueOnce({
          get: jest
            .fn()
            .mockReturnValueOnce({ data: jest.fn().mockReturnValueOnce({}) }),
        }),
      set: jest.fn().mockResolvedValueOnce(),
    });

    const response = await request(app)
      .get("/petbay/api/v1/users/MkZfJZ0wxgVWEmODgjzSJgaEEq7")
      .send();

    expect(response.status).toBe(200);
  });

//M01-T02
  it("should return status 400 when sending unavailable user", async () => {
    // Mock Firestore methods
    db.collection.mockReturnValueOnce({
      doc: jest.fn().mockReturnThis(undefined),
      set: jest.fn().mockResolvedValueOnce(undefined),
      get: jest
        .fn()
        .mockReturnValueOnce({ data: jest.fn().mockReturnValueOnce(null) }),
    });

    // Make HTTP POST request to create a new user
    const response = await request(app)
      .get("/petbay/api/v1/users/MkZfJZ0wxgVWEmODgjzS")
      .send();

    // Assertions
    expect(response.status).toBe(400);
  });

//M01-T03
it("should return status 200 when update user breed preferences", async () => {
    // Mock Firestore methods
    db.collection.mockReturnValueOnce({
        doc: jest
          .fn()
          .mockReturnValueOnce({
            get: jest
              .fn()
              .mockReturnValueOnce({ data: jest.fn().mockReturnValueOnce({}) }),
          }),
        set: jest.fn().mockResolvedValueOnce(),
        doc: jest
        .fn()
        .mockReturnValueOnce({
          update: jest
            .fn()
            .mockReturnValueOnce({}),
        }),
      });

  
    const response = await request(app)
      .put("/petbay/api/v1/users/preferences/set/f7M5mXWPlKXo3gnyVdI7hkyOHXZ2")
      .send({
        "breedPreferences": [
        {
            "characteristic": "Adapts Well To Apartment Living",
            "userRating": 3
        },
        {
            "characteristic": "Good For Novice Owners",
            "userRating": 2
        },
        {
            "characteristic": "Tolerates Being Alone",
            "userRating": 5
        },
        {
            "characteristic": "Kid-Friendly",
            "userRating": 5
        },
        {
            "characteristic": "Friendly Toward Strangers",
            "userRating": 3
        },
        {
            "characteristic": "Easy To Groom",
            "userRating": 4
        },
        {
            "characteristic": "Size",
            "userRating": 3
        },
        {
            "characteristic": "Easy To Train",
            "userRating": 2
        },
        {
            "characteristic": "Intelligence",
            "userRating": 4
        },
        {
            "characteristic": "Tendency To Bark Or Howl",
            "userRating": 1
        },
        {
            "characteristic": "Energy Level",
            "userRating": 3
        }
    ]
    }
    );


    expect(response.status).toBe(200);
  });

// M01-T04
  it("should return status 200 sending valid userId to retrieve pets owned by the user", async () => {
    // Mock Firestore methods
    db.collection.mockReturnValueOnce({
        doc: jest
          .fn()
          .mockReturnValueOnce({
            get: jest
              .fn()
              .mockReturnValueOnce({ data: jest.fn().mockReturnValueOnce({}) }),
          }),
        set: jest.fn().mockResolvedValueOnce(),
      });

    const response = await request(app)
      .get("/petbay/api/v1/users/owned-pets/f7M5mXWPlKXo3gnyVdI7hkyOHXZ2")
      .send();

    // Assertions
    expect(response.status).toBe(200);
  });
  afterAll((done) => {
    server.close(done);
  });
});
