
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'CompanyIMG/IMG1.png',
      title: 'Opening Event'
    },
    {
      image: 'CompanyIMG/IMG2.png',
      title: 'Team Disscussion'
    },
    {
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3',
      title: 'Coding Competition'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="relative w-full h-40 rounded-md overflow-hidden group">
      <div className="absolute inset-0">
        <img 
          src={slides[currentSlide].image} 
          alt={slides[currentSlide].title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <span className="text-sm font-medium">{slides[currentSlide].title}</span>
        </div>
      </div>
      
      <button 
        onClick={prevSlide} 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={20} />
      </button>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === index ? "w-6 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
