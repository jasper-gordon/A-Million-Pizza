/**
 * Firebase Cloud Functions for A Million Pizza
 * Handles YouTube view count updates
 */

const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { google } = require("googleapis");

admin.initializeApp();

// Get the YouTube API key and channel ID from environment config
const config = functions.config();
const API_KEY = config.youtube?.api_key;
const CHANNEL_ID = config.youtube?.channel_id;

exports.updateViewCount = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
  try {
    // Set up YouTube API client
    const youtube = google.youtube({
      version: 'v3',
      auth: API_KEY
    });

    // Get channel statistics
    const response = await youtube.channels.list({
      id: CHANNEL_ID,
      part: "statistics"
    });

    if (!response.data.items || response.data.items.length === 0) {
      throw new Error('No channel data found');
    }

    const viewCount = response.data.items[0].statistics.viewCount;
    console.log("Current YouTube view count:", viewCount);

    // Update Firestore with the new count
    await admin
      .firestore()
      .collection("viewCount")
      .doc("Count")
      .set({
        "View Count": viewCount,
        "lastUpdated": admin.firestore.FieldValue.serverTimestamp()
      });

    console.log("Successfully updated view count in Firestore:", viewCount);
    return null;
  } catch (error) {
    console.error("Error in updateViewCount function:", error);
    return null;
  }
});