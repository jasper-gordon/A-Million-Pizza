/**
 * Main application component that handles routing and layout.
 * Implements a React Router setup with navigation and lazy-loaded components.
 * 
 * @component
 * @returns {JSX.Element} The rendered application with routing
 */

import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { NoPage } from './components/NoPage'
import { Videos } from './components/Videos'
import { Tips } from './components/Tips'
import { Pizzas } from './components/Pizzas'
import {Calculator} from './components/Calculator'
import Navbar from './components/Navbar'
import PizzaMap from './components/PizzaMap'
import AboutUs from './components/AboutUs'
import DoughCalculator from './components/DoughCalculator'
import PizzaFlocking from './components/PizzaFlocking'
import './App.css';
import { entries } from 'lodash';
import {lazy, Suspense} from 'react';
// const Home = lazy(() => import('./components/Home' ));
// const NoPage = lazy(() => import('./components/NoPage' ));
// const Videos = lazy(() => import('./components/Videos' ));
// const Tips = lazy(() => import('./components/Tips' ));
// const Pizzas = lazy(() => import('./components/Pizzas' ));
// const Navbar = lazy(() => import('./components/Navbar' ));



function App() {
  
  return (
    <>
    <Navbar />
    <div className='container'>
    {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Routes>
        {/* Main Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/tips' element={<Tips />} />
        <Route path='/pizzas' element={<Pizzas />} />
        
        {/* Interactive Features */}
        <Route path='/calculator' element={<Calculator />} />
        <Route path='/dough-calculator' element={<DoughCalculator />} />
        <Route path='/map' element={<PizzaMap />} />
        <Route path='/farm' element={<PizzaFlocking />} />
        
        {/* Information Pages */}
        <Route path='/aboutus' element={<AboutUs />}/>
        
        {/* 404 Route */}
        <Route path='*' element={<NoPage />} />
      </Routes>
    {/* </Suspense> */}
    </div>
    </>
  );
}

export default App;
