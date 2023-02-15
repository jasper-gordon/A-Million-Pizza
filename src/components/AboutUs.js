// About Us Page that displays a photo gallery of people with titles below.
import * as React from 'react';
import jasper from '../assets/profiles/jasper_profile.png';
import cooper from '../assets/profiles/cooper_profile.png';

export const AboutUs = () => {
    return (
      <>
      <div className='about-background'>
    <div className="faq-header">
        About Us
    </div>
    <h3>Meet the team behind the pizza!</h3>
    <div className='about-row'>
        <div className='about-col'>
        <img src={jasper} className="about-photo"></img>
        <p className='about-name'>Jasper</p>
        <p className='about-title'> Cheese Slice Investigator </p>
        </div>
        <div className='about-col'>
        <img src={cooper} className="about-photo"></img>
        <p className='about-name'>Cooper</p>
        <p className='about-title'> Security and Gas Specialist </p>
        </div>
    </div>
    </div>
      </>
    )
};

export default AboutUs