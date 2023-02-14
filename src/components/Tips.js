import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CustomizedAccordion from './CustomizedAccordion';


const doughFAQ = [
  {
  label: "Why is my pizza dough so stiff and hard to shape?",
  content: "Most likely it's about time or temperature. Dough is made up of a complex gluten network of proteins which can be thought of like the muscles in your body. If you're too cold or you just finished excersising, your muscles will be stiff and inflexible. For best shaping, we recommend letting your dough rest in warm spot (at least 70˚F) for at least an hour or two after shaping or coming out of the fridge.",
  expandedId: "panel1",
  controls: "panel1d-content",
  header: "panel1d-header"
  },

  {
    label: "What flour do you use?",
    content: "Generally speaking we like to use unbleached all-purpose or bread flour for pizza. To form a dough strong enough to handle being tossed, shaped, and topped we want a strong gluten network. That said, there are many varieties of flour on the market from both local and national millers and we love to experiement!",
    expandedId: "panel2",
    controls: "panel2d-content",
    header: "panel2d-header"
    },
    {
    label: "Why do some recipes use sugar or oil and others don't?",
    content: "Color and texture! Sugars and fats both lend to better browning when baking. Sugar also helps activate yeast, providing food for the bacteria. Fats help improve texture, keeping the crust from drying out too much in the oven, however it also can inhibit gluten development so it is important to beware of the amount you're adding. ",
    expandedId: "panel3",
    controls: "panel3d-content",
    header: "panel3d-header"
    }
]


const toppingsFAQ = [
  {
  label: "What tomatoes do you use?",
  content: "The best tomaotes depend on whatever you prefer. There are many great local and national brands. Our favorites are Bianco DiNapoli and Alta Cucina!",
  expandedId: "panel1",
  controls: "panel1d-content",
  header: "panel1d-header"
  },

  {
    label: "Do you need to precook meats before putting pizza into the oven?",
    content: "It depends! If you're cooking in a standard oven around 500˚F, most meats will cook fully, especially if cut into bite size portions before. If you're using a wood-fire oven, smaller portions become more important.",
    expandedId: "panel2",
    controls: "panel2d-content",
    header: "panel2d-header"
    }
]

const cookingFAQ = [
  {
  label: "What temperature is best for cooking pizza?",
  content: "As hot as you can go! Higher temperatures provide better heat transfer and faster cooking for the pizza, leading to better texture, coloration, and a risen crust. Neopolitan pizza generally runs the hottest, maxing out around 950˚F. Anything hotter and you risk your pizza tasting like fire and not much else. At home, simply preheat your oven to it's max heat.",
  expandedId: "panel1",
  controls: "panel1d-content",
  header: "panel1d-header"
  },

  {
    label: "Why do my onions keep burning?",
    content: "Toppings, escpailly when small in size, can burn before a pizza is done. Our advice, either wait to add toppings until the pizza is almost done, or coat them with a little oil to protect them from the direct heat.",
    expandedId: "panel2",
    controls: "panel2d-content",
    header: "panel2d-header"
    },
    {
      label: "Best portable home oven?",
      content: "Ooni and Gozeny currently make the best ovens on the market for the home pizza-maker.",
      expandedId: "panel3",
      controls: "panel3d-content",
      header: "panel3d-header"
      },
      {
        label: "Do I need a pizza peel (the wood thingy)?",
        content: "Certainly not, it just makes things easier and looks cool 😎. A well-floured cutting board or really any flat, non-stick surface will do just fine. We've been known to use cardboard in a pinch! The important thing is to test before putting the pizza in the oven that it slides easily.",
        expandedId: "panel4",
        controls: "panel4d-content",
        header: "panel4d-header"
        }
]

const contactUs = "j.gordon1998"

// var email = '<b>Email:</b> <a href="mailto:' + calendarMonth[i].events[j].email + '">' + 
//             calendarMonth[i].events[j].email + '</a>';

export const Tips = () => {
  return (
    <>
  <div className='background'>
    <p className='faq-header'>FAQ</p>
    <p className='faq-sub-header'>Dough</p>
    <CustomizedAccordion accordionInfo = {doughFAQ} />
    <p className='faq-sub-header'>Toppings</p>
    <CustomizedAccordion accordionInfo = {toppingsFAQ} />
    <p className='faq-sub-header'>Cooking + Equipment</p>
    <CustomizedAccordion accordionInfo = {cookingFAQ} />
    <h2 className='tips-footer'>Didn't find what you're looking for? Send us a note at <a href="mailto:amillionpizza@gmail.com">amillionpizza@gmail</a> and we'll get right back to you!</h2>
    </div>
    
  </>
  )
}
