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
import '../App.css';
//There must be a way to import all the files in the folder, to automate this^^






export const Pizzas = () => {
  return (
    <>
  <div className='Pizzas-Color'>
  <h3> Pizza Page </h3>
  <p>The goal of this page is to display any and all Pizzas
    created by this community! Your favorite bite, a quick snack, or even one
    that just didn't cook enough, all pizzas welcome!
  </p>
  <h1> To Do:</h1>
   <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Add photo grid UI" />
      <FormControlLabel control={<Checkbox />} label="Add photo submission form" />
      <FormControlLabel control={<Checkbox />} label="Format page" />
    </FormGroup> 
    
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
    img: logo,
    title: 'Burger',
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
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];