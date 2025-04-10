
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Signup: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-50 to-sky-50 py-12">
        <div className="w-full max-w-md px-4">
          <SignupForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
