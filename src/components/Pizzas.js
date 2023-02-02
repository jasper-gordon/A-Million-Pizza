import * as React from 'react';
import pizza1 from '../assets/pizza1.png';
import pizza2 from '../assets/pizza2.png';
import pizza3 from '../assets/pizza3.png';
import pizza4 from '../assets/pizza4.png';
import pizza5 from '../assets/pizza5.png';
import pizza6 from '../assets/pizza6.png';
import pizza7 from '../assets/pizza7.png';
import pizza8 from '../assets/pizza8.png';
import pizza9 from '../assets/pizza9.png';
import pizza10 from '../assets/pizza10.png';
import pizza11 from '../assets/pizza11.png';
import pizza12 from '../assets/pizza12.png';

import '../App.css';







export const Pizzas = () => {
  return (
    <>
  <div className='Pizzas-Color'>
  <p className='quote-text'> "Just seeing a pizza can be enough to inspire new ideas"
  </p>
 

    <div className="pizza-container">
        <img src={pizza1} className="pizza-photo"></img>
        <img src={pizza2} className="pizza-photo"></img>
        <img src={pizza3} className="pizza-photo"></img>
        <img src={pizza4} className="pizza-photo"></img>
        <img src={pizza5} className="pizza-photo"></img>
        <img src={pizza6} className="pizza-photo"></img>
        <img src={pizza7} className="pizza-photo"></img>
        <img src={pizza8} className="pizza-photo"></img>
        <img src={pizza9} className="pizza-photo"></img>
        <img src={pizza10} className="pizza-photo"></img>
        <img src={pizza11} className="pizza-photo"></img>
        <img src={pizza12} className="pizza-photo"></img>


    </div>

    </div>
    
  </>
  )
}


