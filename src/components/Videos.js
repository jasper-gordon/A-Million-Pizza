import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import YouTube from "react-youtube";
import VideoData from "./youtube_vidoes.json";
import {useState} from 'react'
import ReactPlayer from 'react-player/youtube';


export const Videos = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const opts = {
    width: '550',
    height: '309',
    
  }
  return (
   <>
    <div className='Videos-Color'>
    <div className='video-search-box' >
    <input className='video-search-input' type="text" placeholder='Search...' onChange={(event) => {
      setSearchTerm(event.target.value);
    }}/>
    </div>
    
  <div className='videos-flexbox'>
    
    {/* Search feature that filters JSON data and then maps into div */}

      {VideoData.filter((val)=>{
      if (searchTerm == "") {
        return val
      } else if (val.videoTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    }).map((val, index) => {
    return <div className='video' key={index}>
      {/* <YouTube className='pizzavideo' videoId={val.videoId} opts = {opts}></YouTube> */}
      <div className='player-wrapper'>
      <ReactPlayer className='react-player' width='100%' height="100%" url={val.videoURL} />
      </div>
      <p className='video-title'>{val.videoTitle}</p> 
      </div>
    
})}
  </div>
  

    </div>
    
    </>
  )
}
