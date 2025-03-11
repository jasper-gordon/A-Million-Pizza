/**
 * Tips component that displays frequently asked questions about pizza making,
 * organized into categories: dough, toppings, and cooking/equipment.
 * 
 * @component
 */

import * as React from 'react';
import CustomizedAccordion from './CustomizedAccordion';

/**
 * FAQ data structure for dough-related questions
 * @type {Array<{
 *   label: string,
 *   content: string,
 *   expandedId: string,
 *   controls: string,
 *   header: string
 * }>}
 */
const DOUGH_FAQ = [
  {
    label: "Why is my pizza dough so stiff and hard to shape?",
    content: "Most likely it's about time or temperature. Dough is made up of a complex gluten network of proteins which can be thought of like the muscles in your body. If you're too cold or you just finished exercising, your muscles will be stiff and inflexible. For best shaping, we recommend letting your dough rest in warm spot (at least 70˚F) for at least an hour or two after shaping or coming out of the fridge.",
    expandedId: "dough-panel-1",
    controls: "dough-panel-1-content",
    header: "dough-panel-1-header"
  },
  {
    label: "What flour do you use?",
    content: "Generally speaking we like to use unbleached all-purpose or bread flour for pizza. To form a dough strong enough to handle being tossed, shaped, and topped we want a strong gluten network. That said, there are many varieties of flour on the market from both local and national millers and we love to experiment!",
    expandedId: "dough-panel-2",
    controls: "dough-panel-2-content",
    header: "dough-panel-2-header"
  },
  {
    label: "Why do some recipes use sugar or oil and others don't?",
    content: "Color and texture! Sugars and fats both lend to better browning when baking. Sugar also helps activate yeast, providing food for the bacteria. Fats help improve texture, keeping the crust from drying out too much in the oven, however it also can inhibit gluten development so it is important to beware of the amount you're adding.",
    expandedId: "dough-panel-3",
    controls: "dough-panel-3-content",
    header: "dough-panel-3-header"
  }
];

/**
 * FAQ data structure for topping-related questions
 * @type {Array<{
 *   label: string,
 *   content: string,
 *   expandedId: string,
 *   controls: string,
 *   header: string
 * }>}
 */
const TOPPINGS_FAQ = [
  {
    label: "What tomatoes do you use?",
    content: "The best tomatoes depend on whatever you prefer. There are many great local and national brands. Our favorites are Bianco DiNapoli and Alta Cucina!",
    expandedId: "toppings-panel-1",
    controls: "toppings-panel-1-content",
    header: "toppings-panel-1-header"
  },
  {
    label: "Do you need to precook meats before putting pizza into the oven?",
    content: "It depends! If you're cooking in a standard oven around 500˚F, most meats will cook fully, especially if cut into bite size portions before. If you're using a wood-fire oven, smaller portions become more important.",
    expandedId: "toppings-panel-2",
    controls: "toppings-panel-2-content",
    header: "toppings-panel-2-header"
  }
];

/**
 * FAQ data structure for cooking and equipment-related questions
 * @type {Array<{
 *   label: string,
 *   content: string,
 *   expandedId: string,
 *   controls: string,
 *   header: string
 * }>}
 */
const COOKING_FAQ = [
  {
    label: "What temperature is best for cooking pizza?",
    content: "As hot as you can go! Higher temperatures provide better heat transfer and faster cooking for the pizza, leading to better texture, coloration, and a risen crust. Neapolitan pizza generally runs the hottest, maxing out around 950˚F. Anything hotter and you risk your pizza tasting like fire and not much else. At home, simply preheat your oven to its max heat.",
    expandedId: "cooking-panel-1",
    controls: "cooking-panel-1-content",
    header: "cooking-panel-1-header"
  },
  {
    label: "Why do my onions keep burning?",
    content: "Toppings, especially when small in size, can burn before a pizza is done. Our advice, either wait to add toppings until the pizza is almost done, or coat them with a little oil to protect them from the direct heat.",
    expandedId: "cooking-panel-2",
    controls: "cooking-panel-2-content",
    header: "cooking-panel-2-header"
  },
  {
    label: "Best portable home oven?",
    content: "Ooni and Gozney currently make the best ovens on the market for the home pizza-maker.",
    expandedId: "cooking-panel-3",
    controls: "cooking-panel-3-content",
    header: "cooking-panel-3-header"
  },
  {
    label: "Do I need a pizza peel (the wood thingy)?",
    content: "Certainly not, it just makes things easier and looks cool 😎. A well-floured cutting board or really any flat, non-stick surface will do just fine. We've been known to use cardboard in a pinch! The important thing is to test before putting the pizza in the oven that it slides easily.",
    expandedId: "cooking-panel-4",
    controls: "cooking-panel-4-content",
    header: "cooking-panel-4-header"
  }
];

/**
 * Contact email for user inquiries
 * @type {string}
 */
const CONTACT_EMAIL = "amillionpizza@gmail.com";

export const Tips = () => {
  return (
    <div className='background'>
      <h1 className='faq-header'>FAQ</h1>
      
      {/* Dough Section */}
      <h2 className='faq-sub-header'>Dough</h2>
      <CustomizedAccordion accordionInfo={DOUGH_FAQ} />
      
      {/* Toppings Section */}
      <h2 className='faq-sub-header'>Toppings</h2>
      <CustomizedAccordion accordionInfo={TOPPINGS_FAQ} />
      
      {/* Cooking Section */}
      <h2 className='faq-sub-header'>Cooking + Equipment</h2>
      <CustomizedAccordion accordionInfo={COOKING_FAQ} />
      
      {/* Contact Information */}
      <div className='tips-footer'>
        <h2>
          Didn't find what you're looking for? Send us a note at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {' '}and we'll get right back to you!
        </h2>
      </div>
    </div>
  );
};
