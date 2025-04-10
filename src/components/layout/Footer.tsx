
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Smart financial management at your fingertips.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
