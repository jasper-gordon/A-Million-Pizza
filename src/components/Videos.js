import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import YouTube from "react-youtube";
import VideoData from "./youtube_vidoes.json";
import {useState} from 'react'


console.log(VideoData);
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
    }).map((val, key) => {
    return <div className='video'>
  
      <YouTube videoId={val.videoId} opts = {opts}></YouTube>
      {val.videoTitle} 
      </div>
    
})}
  </div>
  

    </div>
    
    </>
  )
}
