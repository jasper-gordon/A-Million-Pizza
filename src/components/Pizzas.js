import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import logo from '../assets/IMG_1766.PNG';
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





const pizza_photos = [pizza1, pizza2, pizza3, pizza4, pizza5, pizza6]

export const Pizzas = () => {
  return (
    <>
  <div className='Pizzas-Color'>
  
  <p className='quote-text'> "Just seeing a pizza can be enough to inspire new ideas"
  </p>
 

    <div className="flex-container">
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

    {/* <div className='pizzaRow'>
      <div className='pizzaCol'>
        <image src={pizza1}/>
        <image src={pizza2}/>
      </div>

      <div className='pizzaCol'>
        <image src={pizza3}/>
        <image src={pizza4}/>
      </div>
      <div className='pizzaCol'>
        <image src={pizza5}/>
        <image src={pizza2}/>
      </div>
    </div>
   
    <ImageList  sx={{ width: 500, height: 450, backgroundColor: 'white' }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            
          />
        </ImageListItem>
      ))}
    </ImageList>
    */}
    </div>
    
  </>
  )
}





const itemData = [
  {
    img: pizza1,
    title: 'Breakfast',
  },
  {
    img: pizza2,
    title: 'Camera',
  },
  {
    img: pizza3,
    title: 'Coffee',
  },
  {
    img: pizza4,
    title: 'Hats',
  },
  {
    img: pizza5,
    title: 'Honey',
  },
  {
    img: pizza6,
    title: 'Basketball',
  }
];