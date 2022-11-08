const functions = require("firebase-functions");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();


const { google } = require("googleapis");
// npm-rest-client init
// const Client = require("node-rest-client").Client;
// const clientYT = new Client();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//    functions.logger.info("Hello logs!", {structuredData: true});
//    response.send("Hello from Firebase!");
//  });

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log("Uppercasing", context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true });
  });

exports.getViewCount = functions
  .runWith({ secrets: ["YOUTUBE_API"] })
  .https.onCall(async (data, context) => {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API,
    });
    const { count } = await youtube.channels.list({
      id: process.env.YOUTUBE_CHANNEL_ID,
      part: "statistics",
    });
    const viewCount = count.items[0].statistics.viewCount;
    return {
      count: viewCount,
    };
  });


  exports.getViews = functions
  .runWith({ secrets: ["YOUTUBE_API"] })
  .https.onCall( async(data, context) => {
    const youtube =  google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API,
    });

    const count = await youtube.channels.list({
      id: process.env.YOUTUBE_CHANNEL_ID,
      part: "statistics",
    });
    
    const countData = count.data.items[0].statistics.viewCount;
   
    
      
   
    return countData
  });


exports.randomNumber = functions.https.onRequest((request, response) => {
  const number = Math.round(Math.random() * 100);
  response.send(number.toString());
});

exports.randomNumberGen = functions.https.onCall((data, context) => {
  const number1 = Math.round(Math.random() * 100);
  return number1;
});
