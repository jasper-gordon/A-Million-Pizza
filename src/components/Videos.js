import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

// HTML entity decoder function
const decodeHTMLEntities = (text) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

export const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&type=video`
        );
        const data = await response.json();
        
        if (data.error) {
          console.error("YouTube API Error:", data.error);
          setError("Failed to load videos: " + data.error.message);
          setLoading(false);
          return;
        }

        if (data.items) {
          const videoList = data.items
            .filter(item => item.id.kind === "youtube#video")
            .map(item => ({
              videoId: item.id.videoId,
              videoTitle: decodeHTMLEntities(item.snippet.title), // Decode the title
              videoURL: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              thumbnail: item.snippet.thumbnails.high.url,
              description: item.snippet.description,
              publishedAt: new Date(item.snippet.publishedAt)
            }));
          setVideos(videoList);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return (
    <div className='Videos-Color'>
      <p style={{ textAlign: 'center', padding: '2rem' }}>Loading videos...</p>
    </div>
  );

  if (error) return (
    <div className='Videos-Color'>
      <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</p>
    </div>
  );

  return (
    <>
      <div className='Videos-Color'>
        <div className='video-search-box'>
          <input 
            className='video-search-input' 
            type="text" 
            placeholder='Search...' 
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        
        <div className='videos-flexbox'>
          {videos
            .filter((video) => {
              if (searchTerm === "") {
                return true;
              }
              return video.videoTitle.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .map((video, index) => (
              <div className='video' key={video.videoId}>
                <div className='player-wrapper'>
                  <ReactPlayer 
                    className='react-player' 
                    width='100%' 
                    height="100%" 
                    controls={true} 
                    url={video.videoURL}
                    light={video.thumbnail}
                  />
                </div>
                <div className='video-title-wrapper'>
                  <p className='video-title'>{video.videoTitle}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
