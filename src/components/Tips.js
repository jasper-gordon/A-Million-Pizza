import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';






export const Tips = () => {
  return (
    <>
  <div className='BackColor'>
  <h3> Tips Page </h3>
  <p>The goal of this page is to provide a variety of tips, how-to's, 
    and answer FAQ's about everything from making dough, to sourcing ingredients, to cooking that perfect pie.
  </p>
  <h1> To Do:</h1>
   <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Add drop down menu with FAQ's" />
      <FormControlLabel control={<Checkbox />} label="Figure out how to teach pizza" />
      <FormControlLabel control={<Checkbox />} label="Link favorite products" />
    </FormGroup> 
    </div>
  </>
  )
}
