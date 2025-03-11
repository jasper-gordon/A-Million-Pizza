/**
 * Videos component that fetches and displays YouTube videos from a specified channel.
 * Features include video search, lazy loading of video players, and error handling.
 * 
 * @component
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

/**
 * Decodes HTML entities in text strings (e.g., converts &#39; to ')
 * @param {string} text - The text containing HTML entities
 * @returns {string} The decoded text
 */
const decodeHTMLEntities = (text) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Video interface for TypeScript support
 * @typedef {Object} Video
 * @property {string} videoId - YouTube video ID
 * @property {string} videoTitle - Decoded video title
 * @property {string} videoURL - Complete YouTube video URL
 * @property {string} thumbnail - URL of video thumbnail
 * @property {string} description - Video description
 * @property {Date} publishedAt - Video publish date
 */

export const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Validate environment variables
        if (!process.env.REACT_APP_YOUTUBE_API_KEY || !process.env.REACT_APP_YOUTUBE_CHANNEL_ID) {
          throw new Error("Missing YouTube API configuration");
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          console.error("YouTube API Error:", data.error);
          setError("Failed to load videos: " + data.error.message);
          return;
        }

        if (data.items) {
          const videoList = data.items
            .filter(item => item.id.kind === "youtube#video")
            .map(item => ({
              videoId: item.id.videoId,
              videoTitle: decodeHTMLEntities(item.snippet.title),
              videoURL: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              thumbnail: item.snippet.thumbnails.high.url,
              description: item.snippet.description,
              publishedAt: new Date(item.snippet.publishedAt)
            }));
          setVideos(videoList);
        } else {
          setError("No videos found");
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err instanceof Error ? err.message : "Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Loading state
  if (loading) return (
    <div className='Videos-Color'>
      <p style={{ textAlign: 'center', padding: '2rem' }}>Loading videos...</p>
    </div>
  );

  // Error state
  if (error) return (
    <div className='Videos-Color'>
      <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</p>
    </div>
  );

  // Filter videos based on search term
  const filteredVideos = videos.filter((video) => 
    searchTerm === "" || video.videoTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='Videos-Color'>
      {/* Search input */}
      <div className='video-search-box'>
        <input 
          className='video-search-input' 
          type="text" 
          placeholder='Search videos...' 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search videos"
        />
      </div>
      
      {/* Video grid */}
      <div className='videos-flexbox'>
        {filteredVideos.length === 0 ? (
          <p style={{ textAlign: 'center', width: '100%' }}>No videos found matching your search.</p>
        ) : (
          filteredVideos.map((video) => (
            <div className='video' key={video.videoId}>
              <div className='player-wrapper'>
                <ReactPlayer 
                  className='react-player' 
                  width='100%' 
                  height="100%" 
                  controls={true} 
                  url={video.videoURL}
                  light={video.thumbnail}
                  aria-label={video.videoTitle}
                />
              </div>
              <div className='video-title-wrapper'>
                <p className='video-title'>{video.videoTitle}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
