
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, PieChart, BarChart2, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-app-blue text-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Track Your Expenses Effortlessly</h1>
              <p className="text-xl mb-8">Smart budgeting and insightful reports to help you stay on top of your finances.</p>
              <Button asChild size="lg" className="bg-white text-app-blue hover:bg-gray-100">
                <Link to="/signup">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=1200"
                alt="Financial planning and money management" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Expense Tracker?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <BarChart2 className="h-8 w-8 text-app-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Budgeting</h3>
                <p className="text-gray-600">Set monthly limits and receive overspending alerts.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <PieChart className="h-8 w-8 text-app-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Reports</h3>
                <p className="text-gray-600">Visualize spending patterns with charts.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-app-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Automated Reminders</h3>
                <p className="text-gray-600">Get notifications for upcoming payments.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of users who have improved their financial health with our expense tracker.</p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg">
                <Link to="/signup">Create Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
