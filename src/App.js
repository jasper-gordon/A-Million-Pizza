import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './components/Home'
import { NoPage } from './components/NoPage'
import { Videos } from './components/Videos'
import { Tips } from './components/Tips'
import { Pizzas } from './components/Pizzas'
import Navbar from './components/Navbar'
import './App.css';
import { entries } from 'lodash';


function App() {
  
  return (
    <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/tips' element={<Tips />} />
        <Route path='/pizzas' element={<Pizzas />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
//<Route path='/a-million-pizza' element={<Home />} />
//<Route path='/' element={<Navigate to='/a-million-pizza'/>} />