/**
 * File defines all firebase cloud functions comprising the backend.
 *
 * @Author Jasper Gordon
 * @Modified 11/20/22
 *
 */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { doc } = require("firebase/firestore");
require("firebase/firestore");

admin.initializeApp();

const { google } = require("googleapis");

/**
 * Function calls getViewCount to get Youtube View Count
 * 
 * @param - 
 * @returns - Int: View count 
 */
exports.getViews = functions
  .runWith({
    secrets: ["YOUTUBE_API"],
  })
  .https.onCall(async (data, context) => {
    const count = await getViewCount(
      process.env.YOUTUBE_API,
      process.env.YOUTUBE_CHANNEL_ID
    );
    return count;
  });


/**
 * Function updates Firestore view count every 60 minutes
 * 
 * @param - 
 * @returns - N/A 
 */
exports.updateViewCount = functions.pubsub
  .schedule("every 60 minutes")
  .onRun((context) => {
    try {
      this.logCount(5);
      console.log("Count updated at:", new Date());
    } catch (error) {
      console.error("Error getting view count: ", error);
    }
  });



/**
 * Function calls getViewCount to get Youtube View Count
 * 
 * @param - 
 * @returns - Int: View count 
 */
exports.logCount = functions
  .runWith({
    secrets: ["YOUTUBE_API"],
  })
  .https.onCall(async (data, context) => {
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
        return viewData;
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

exports.returnViews = functions.https.onCall(async (data, context) => {
  const addData = await admin
    .firestore()
    .collection("viewCount")
    .doc("Count")
    .get()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

exports.logTester = functions.https.onCall(async (data, context) => {
  try {
    this.logCount(5);
    console.log("Count updated at:", new Date());
    return;
  } catch (error) {
    console.error("Error getting view count: ", error);
  }
});
