import * as React from 'react';
import { useState, useEffect } from 'react';
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

// Create array of image sources for easier management
const pizzaImages = [
  { src: pizza1, alt: "Delicious Pizza 1" },
  { src: pizza2, alt: "Delicious Pizza 2" },
  { src: pizza3, alt: "Delicious Pizza 3" },
  { src: pizza4, alt: "Delicious Pizza 4" },
  { src: pizza5, alt: "Delicious Pizza 5" },
  { src: pizza6, alt: "Delicious Pizza 6" },
  { src: pizza7, alt: "Delicious Pizza 7" },
  { src: pizza8, alt: "Delicious Pizza 8" },
  { src: pizza9, alt: "Delicious Pizza 9" },
  { src: pizza10, alt: "Delicious Pizza 10" },
  { src: pizza11, alt: "Delicious Pizza 11" },
  { src: pizza12, alt: "Delicious Pizza 12" }
];

export const Pizzas = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [expandedImage, setExpandedImage] = useState(null);

  // Preload first 4 images
  useEffect(() => {
    pizzaImages.slice(0, 4).forEach((image) => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [image.src]: true
        }));
      };
    });
  }, []);

  // Add keyboard listener for Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedImage(null);
      }
    };

    if (expandedImage) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [expandedImage]);

  const handleImageLoad = (src) => {
    setLoadedImages(prev => ({
      ...prev,
      [src]: true
    }));
  };

  const handleImageClick = (image) => {
    setExpandedImage(image);
  };

  return (
    <div className='Pizzas-Color'>
      <p className='quote-text'>
        "Every pizza is a personal pizza if you try hard and believe in yourself" –Bill Murray
      </p>

      <div className="pizza-container">
        {pizzaImages.map((image, index) => (
          <div 
            key={index} 
            className="pizza-photo-wrapper"
            style={{ 
              opacity: loadedImages[image.src] ? 1 : 0,
              transition: 'opacity 0.3s ease-in'
            }}
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="pizza-photo"
              loading={index < 4 ? "eager" : "lazy"}
              onLoad={() => handleImageLoad(image.src)}
            />
          </div>
        ))}
      </div>

      {expandedImage && (
        <div 
          className="expanded-image-overlay"
          onClick={() => setExpandedImage(null)}
        >
          <div 
            className="expanded-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={expandedImage.src}
              alt={expandedImage.alt}
              className="expanded-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};
