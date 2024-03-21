const request = require("supertest");
const { app, server } = require("../../index");

describe("HTTP Endpoint Tests", () => {
    beforeEach(() => {
      // Clear any mock implementations and reset mock data before each test
      jest.clearAllMocks();
    });

    //M01-T02
    it('should return reminders for the given user ID', async () => {
      // Make GET request to the API endpoint
      const response = await request(app)
        .get('/petbay/api/v1/reminders/reminder/GqySC81d8zgQKL2uLWmNbXCeKTr2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        // Assuming 200 is the expected status code for success
        .expect(200); 
  
      // Assert the response body or structure
      expect(response.status).toBe(200);
    });

    //M01-T02
    it('should return 404 for invalid user ID', async () => {
      // Make GET request to the API endpoint with an invalid user ID
      const response = await request(app)
        .get('/petbay/api/v1/reminders/reminder/testuser123')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404); // Expecting 404 for invalid user
  
      // Assert the response body or structure
      expect(response.status).toBe(404);
    });

    //M01-T03
    it('should return 201 when a reminder is added successfully', async () => {
      // Reminder Data
      const newReminder = {
        userId: 'E6b6MPyMi2TgiR23S3HeTNXFhdq2',
        reminderText: 'Test Reminder',
        time: "11:00",
        date: "2024-05-05"
      };
  
      // Make POST request to the API endpoint to add the reminder
      const response = await request(app)
        .post('/petbay/api/v1/reminders/addReminder')
        .send(newReminder)
        .set('Accept', 'application/json')
        .expect(201); // Expecting 201 for successful creation
  
      // Assert the response body or structure
      expect(response.status).toBe(201);
    });

    //M01-T04
    it('should return 200 when a reminder is deleted successfully', async () => {
      // Define the reminder ID to be deleted
      const reminderId = 'reminderToDelete';
  
      // Make DELETE request to the API endpoint to delete the reminder
      const response = await request(app)
        .delete('/petbay/api/v1/reminders/deleteReminder/E6b6MPyMi2TgiR23S3HeTNXFhdq2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200); // Expecting 200 for successful deletion
  
      // Assert the response body or structure
      expect(response.status).toBe(200);
    });

    it('should return 400 when a user cannot be added', async () => {
      // Define the invalid user data (e.g., missing required fields)
      const invalidUserData = {
        userId: "",
      };
  
      // Make POST request to the API endpoint to add the user
      const response = await request(app)
        .post('/petbay/api/v1/reminders/addReminder')
        .send(invalidUserData)
        .set('Accept', 'application/json')
        .expect(400); // Expecting 400 for bad request
  
      // Assert the response body or structure
      expect(response.status).toBe(400);
    });

  afterAll((done) => {
    server.close(done);
  });
});