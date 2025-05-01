
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Sociolinq
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
