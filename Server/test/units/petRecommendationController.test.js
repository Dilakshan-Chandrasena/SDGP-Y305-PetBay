const request = require("supertest");
const { app, server } = require("../../index");
const { db } = require("../../config/firebase");

describe("HTTP Endpoint Tests", () => {
  beforeEach(() => {});

  it("should return 200 and correct breed recommendation", async () => {
    const reqData = {
      userId: "lopxSRJzlieIOU6ajN1iaDRmFsD2",
      breedName: "Affenpinscher",
    };
    const res = await request(app)
      .post("/petbay/api/v1/breed-recommendation")
      .send(reqData);
    const trueBody ={
        "breedName": "Affenpinscher",
        "description": "The Affenpinscher breed originated as skilled ratters, initially tasked with pest control in homes, stables, and shops. Through selective breeding, their size decreased, leading them to become companion pets. They are known for their mischievous personalities and love to get into trouble. Affenpinschers are also not afraid to stand up to larger dogs and will often fight back if they feel threatened.\n\nAffenpinschers love their humans but prefer the company of adults. They don't take well to rough play or being held on a lap for too long. However, they are loving, loyal, and protective dogs that will make great additions to any family.",
        "imageLink": "https://drive.google.com/file/d/1VV6TQcx_-0Wbs5SiczEOF7bn7OCL8TOR/view?usp=drive_link",
        "dogSize": "Small",
        "avgHeight": 25.4,
        "avgWeight": 3.6,
        "avgLifeSpan": 13,
        "breedGroup": "Companion Dogs",
        "overallMatchingPercentage": 69,
        "comparisonResults": [
            {
                "characteristic": "Adapts Well To Apartment Living",
                "userPreferenceRating": 1,
                "breedCharacteristicRating": 5,
                "matchingPercentage": 20
            },
            {
                "characteristic": "Good For Novice Owners",
                "userPreferenceRating": 3,
                "breedCharacteristicRating": 4,
                "matchingPercentage": 80
            },
            {
                "characteristic": "Tolerates Being Alone",
                "userPreferenceRating": 3,
                "breedCharacteristicRating": 1,
                "matchingPercentage": 60
            },
            {
                "characteristic": "Kid-Friendly",
                "userPreferenceRating": 4,
                "breedCharacteristicRating": 1,
                "matchingPercentage": 40
            },
            {
                "characteristic": "Friendly Toward Strangers",
                "userPreferenceRating": 5,
                "breedCharacteristicRating": 3,
                "matchingPercentage": 60
            },
            {
                "characteristic": "Easy To Groom",
                "userPreferenceRating": 2,
                "breedCharacteristicRating": 3,
                "matchingPercentage": 80
            },
            {
                "characteristic": "Size",
                "userPreferenceRating": 3,
                "breedCharacteristicRating": 1,
                "matchingPercentage": 60
            },
            {
                "characteristic": "Easy To Train",
                "userPreferenceRating": 2,
                "breedCharacteristicRating": 2,
                "matchingPercentage": 100
            },
            {
                "characteristic": "Intelligence",
                "userPreferenceRating": 4,
                "breedCharacteristicRating": 4,
                "matchingPercentage": 100
            },
            {
                "characteristic": "Tendency To Bark Or Howl",
                "userPreferenceRating": 3,
                "breedCharacteristicRating": 2,
                "matchingPercentage": 80
            },
            {
                "characteristic": "Energy Level",
                "userPreferenceRating": 3,
                "breedCharacteristicRating": 4,
                "matchingPercentage": 80
            }
        ]
    }
    expect(res.status).toBe(200);
    expect(res.body).toEqual(trueBody);
  });

  it("should return true for breedPreferencesSet field when breedpreferences are set by user",async()=>{

    const res = await request(app).get("/petbay/api/v1/breed-recommendation/lopxSRJzlieIOU6ajN1iaDRmFsD2")
    const trueBody = {"preferenceStatus": true}

    expect(res.body).toEqual(trueBody);

  })


  it("should return false for breedPreferencesSet field when breedpreferences are not set by user",async()=>{

    const res = await request(app).get("/petbay/api/v1/breed-recommendation/E6b6MPyMi2TgiR23S3HeTNXFhdq2")
    const trueBody = {"preferenceStatus": false}

    expect(res.body).toEqual(trueBody);

  })

  afterAll((done) => {
    server.close(done);
  });
});
