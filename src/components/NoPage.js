import pizza_gif from '../assets/pizza-gif.gif'


export const NoPage = () => {
  return (
  <>
  <div className='no-page'>
   <p className='no-page-text'> Oops </p>
  <img className='no-page-cat' src={pizza_gif} alt="Cat dj'ing a spinning pizza in space"></img>
  </div>
  </>
  )
}