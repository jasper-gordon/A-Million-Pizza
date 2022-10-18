import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import YouTube from "react-youtube";



export const Videos = () => {
  
  const opts = {
    width: '300',
    height: '169',
    
  }
  
  return (
    <>
    <div className='Videos-Color'>
  <h3> Videos Page </h3>
  <p>The goal of this page is simply to display all our videos in a clear manner
  </p>
  <h1> To Do:</h1>
   <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Navigate Youtube's API" />
      <FormControlLabel control={<Checkbox />} label="Display videos in a grid with titles" />
      <FormControlLabel control={<Checkbox />} label="Add search feature to filter videos" />
    </FormGroup> 
{/* 
  <div>
    <YouTube
    videoId='TvRwiL56JLA'
    opts = {opts}
    />
  </div> */}
    </div>
    
  </>
  )
}
