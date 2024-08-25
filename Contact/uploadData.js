const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load JSON data
const data = require("./data.json");

const collectionName = "debateSchools"; // Change this to your collection name

// Upload data to Firestore
data.forEach(async (item) => {
  try {
    await db.collection(collectionName).add(item);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
});
