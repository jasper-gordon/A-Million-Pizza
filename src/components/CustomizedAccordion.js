/**
 * CustomizedAccordion component that creates a styled accordion for FAQ sections.
 * Uses Material-UI components with custom styling to match the pizza theme.
 * 
 * @component
 */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import pizzaIcon from '../assets/pizza-icon.png';
//import { Icon } from "@material-ui/core";

/**
 * Custom styled Accordion component
 */
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
  borderRadius: '4px',
  overflow: 'hidden',
}));


// const PizzaLogo = () => (
//   <Icon>
//     <image src={pizzaIcon} height={10} width={10}/>
//   </Icon>
// )

/**
 * Custom styled AccordionSummary component
 */
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#C75146',
  color: 'white',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#81171B',
  },
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * Custom styled AccordionDetails component
 */
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  backgroundColor: '#C75146',
  color: 'white',
}));

/**
 * @typedef {Object} AccordionItem
 * @property {string} label - The question or title of the accordion item
 * @property {string} content - The answer or content of the accordion item
 * @property {string} expandedId - Unique ID for tracking expansion state
 * @property {string} controls - ARIA controls ID
 * @property {string} header - ARIA header ID
 */

/**
 * @typedef {Object} CustomizedAccordionProps
 * @property {AccordionItem[]} accordionInfo - Array of accordion items to display
 */

/**
 * Renders a customized accordion component with the provided items
 * @param {CustomizedAccordionProps} props - Component props
 * @returns {JSX.Element} Rendered accordion component
 */
export default function CustomizedAccordion({ accordionInfo }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="accordion-container">
      {accordionInfo.map((item, index) => (
        <div className="accordion-item" key={item.expandedId || index}>
          <Accordion 
            expanded={expanded === item.expandedId}
            onChange={handleChange(item.expandedId)}
          >
            <AccordionSummary
              aria-controls={item.controls}
              id={item.header}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                {item.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
