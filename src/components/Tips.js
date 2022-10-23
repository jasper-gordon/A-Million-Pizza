import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomizedAccordion from './CustomizedAccordion';


const accordionItems = [
  {
  label: "What tomatoes do you use?",
  content: "The best tomaotes depend on whatever you prefer. There are many great local and national brands. My favorite are Biancodinapoli and Alta Cucina",
  expandedId: "panel1",
  controls: "panel1d-content",
  header: "panel1d-header"
  },

  {
    label: "What flour do you use?",
    content: "Bread flour!",
    expandedId: "panel2",
    controls: "panel2d-content",
    header: "panel2d-header"
    }
]


export const Tips = () => {
  return (
    <>
  <div className='BackColor'>
 
    <CustomizedAccordion accordionInfo = {accordionItems} />
    </div>
  </>
  )
}
