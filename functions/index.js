/**
 * File defines all firebase cloud functions comprising the backend.
 *
 * @Author Jasper Gordon
 * @Modified 11/20/22
 *
 */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { getFunctions, connectFunctionsEmulator } =  require ("firebase/functions");
const { defineBoolean } = require("firebase-functions/params");
const { doc } = require("firebase/firestore");
require("firebase/firestore");


admin.initializeApp();

const { google } = require("googleapis");

const database = admin.database();



// Set up the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API,
});

// Get the total view count from your channel
async function getViewCount() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.youtube.channel_id}&key=${process.env.youtube.api_key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const viewCount = data.items[0].statistics.viewCount;
    console.log(viewCount); // add this line to print out the view count
    return viewCount;
  } catch (error) {
    console.error(error);
  }
}


// Update Firebase with the view count
async function updateViewCount() {
  const viewCount = await getViewCount();
  await db.ref('viewCount').set(viewCount);
}

async function testGetViewCount() {
  const viewCount = await getViewCount();
  console.log(`View count: ${viewCount}`);
}

testGetViewCount();






















// /**
//  * Function calls getViewCount to get Youtube View Count
//  * 
//  * @param - 
//  * @returns - Int: View count 
//  */
// exports.getViews = functions
//   .runWith({
//     secrets: ["YOUTUBE_API"],
//   })
//   .https.onCall(async (data, context) => {
//     const count = await getViewCount(
//       process.env.YOUTUBE_API,
//       process.env.YOUTUBE_CHANNEL_ID
//     );
//     return count;
//   });


// /**
//  * Function updates Firestore view count every 60 minutes
//  * 
//  * @param - 
//  * @returns - N/A 
//  */
// exports.updateViewCount = functions.pubsub
//   .schedule("every 60 minutes")
//   .onRun((context) => {
//     try {
//       this.logCount(5);
//       console.log("Count updated at:", new Date());
//     } catch (error) {
//       console.error("Error getting view count: ", error);
//     }
//   });



// /**
//  * Function calls getViewCount to get Youtube View Count
//  * 
//  * @param - 
//  * @returns - Int: View count 
//  */
// exports.logCount = functions
//   .runWith({
//     secrets: ["YOUTUBE_API"],
//   })
//   .https.onCall(async (data, context) => {
//     const viewData = await getViewCount(
//       process.env.YOUTUBE_API,
//       process.env.YOUTUBE_CHANNEL_ID
//     );
//     const addData = await admin
//       .firestore()
//       .collection("viewCount")
//       .doc("Count")
//       .set({ "View Count": viewData })
//       .then(() => {
//         return viewData;
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });
//   });

// // not a Cloud Function
// const getViewCount = async (key, channel) => {
//   const youtube = google.youtube({
//     version: "v3",
//     auth: key,
//   });

//   const count = await youtube.channels.list({
//     id: channel,
//     part: "statistics",
//   });

//   const countData = count.data.items[0].statistics.viewCount;
//   return countData;
// };

// exports.returnViews = functions.https.onCall(async (data, context) => {
//   const addData = await admin
//     .firestore()
//     .collection("viewCount")
//     .doc("Count")
//     .get()
//     .then((result) => {
//       return result;
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// });

// exports.logTester = functions.https.onCall(async (data, context) => {
//   try {
//     this.logCount(5);
//     console.log("Count updated at:", new Date());
//     return;
//   } catch (error) {
//     console.error("Error getting view count: ", error);
//   }
// });
