// const {getFirestore, doc, setDoc} = require('firebase/firestore');
const functions = require("firebase-functions");
// const firebase = require('firebase');
require("firebase/firestore");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const db = admin.initializeApp().firestore();


const { google } = require("googleapis");

exports.getViews = functions
  .runWith({
    secrets: ["YOUTUBE_API"],
  })
  .https.onCall(async (data, context) => {
    const count = await getViewCount({});
    return count;
  });

exports.updateViewCount = functions.pubsub
.schedule("every 10 minutes")
.onRun((context) => {
  this.logCount()
  console.log("Count updated at:", new Date() )
});

exports.logCount = functions
  .runWith({
    secrets: ["YOUTUBE_API"],
  })
  .https.onRequest(async (req, res) => {
    const viewData = await getViewCount(
      process.env.YOUTUBE_API,
      process.env.YOUTUBE_CHANNEL_ID
    );
    const addData = await admin
      .firestore()
      .collection("viewCount")
      .doc("Count")
      .set({ "View Count": viewData })
      .then(() => {
        res.end();

      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });

// not a Cloud Function
const getViewCount = async (key, channel) => {
  const youtube = google.youtube({
    version: "v3",
    auth: key,
  });

  const count = await youtube.channels.list({
    id: channel,
    part: "statistics",
  });

  const countData = count.data.items[0].statistics.viewCount;
  return countData;
};
