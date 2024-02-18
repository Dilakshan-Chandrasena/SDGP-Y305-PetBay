const { db } = require('../config/firebase');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// GET data from Firestore
exports.getReminders('/reminder', async (req, res) => {
    try {
      const snapshot = await db.collection('reminders').get();
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET data using the document ID
  exports.getReminderById('/reminder/:id', async (req, res) => {
    const documentId = req.params.id;
  
    try {
      const doc = await admin.firestore().collection('reminders').doc(documentId).get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Document not found' });
      }
  
      const data = { id: doc.id, ...doc.data() };
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Adding a new Reminder
exports.addReminder('/addReminder', async (req, res) => {
    const { dogName, reminderText, time, date } = req.body;
    try{
        await db.collection('reminders').add({
            dogName,
            reminderText,
            time,
            date,
        });
        
        res.status(201).send('Reminder added successfully');
    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Editing a reminder
exports.editReminder('/editReminder/:id', async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const documentRef = admin.firestore().collection('reminders').doc(id);

    // Check if the document exists
    const doc = await documentRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Update the document
    await documentRef.update(newData);

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete data from the database
exports.deleteReminder('/deleteReminder/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await admin.firestore().collection('reminders').doc(id).delete();
    res.json({ success: true, message: 'Data deleted successfully.' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});