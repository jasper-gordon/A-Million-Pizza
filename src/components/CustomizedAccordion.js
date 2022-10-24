import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import pizzaIcon from '../assets/pizza-icon.png';
//import { Icon } from "@material-ui/core";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: "75%",
  margin: "auto",
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
    
  },
}));


// const PizzaLogo = () => (
//   <Icon>
//     <image src={pizzaIcon} height={10} width={10}/>
//   </Icon>
// )

//This component helps with expansion functionality on clicks
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  color: 'white',
  
  backgroundColor:
    theme.palette.mode === 'dark'
      ? '#5075ed'
      : '#5075ed',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: '#5075ed',
  color: 'white'
}));

export default function CustomizedAccordion(props) {
  const [expanded, setExpanded] = React.useState();
  const accordionInfo = props.accordionInfo;

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  

  return (
    accordionInfo.map((item, index) => (
    <div className='accord-div' key={index}>
      
      <Accordion expanded={expanded == item.expandedId} onChange={handleChange(item.expandedId)}>
        <AccordionSummary aria-controls={item.controls} id={item.header}>
          <Typography>{item.label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {item.content}
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
     ))
  );
}
