
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  PlusCircle, 
  List, 
  BarChart2, 
  Clock, 
  Bell, 
  Smartphone, 
  Wallet, 
  DollarSign, 
  Search
} from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
      <Icon className="h-7 w-7 text-app-blue" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: PlusCircle,
      title: "Easy Expense Entry",
      description: "Quickly add your daily expenses with just a few taps - no complicated forms or categories."
    },
    {
      icon: List,
      title: "Expense List",
      description: "View all your expenses in a simple, chronological list to keep track of your spending."
    },
    {
      icon: BarChart2,
      title: "Basic Reports",
      description: "See your spending totals by day, week, or month with easy-to-understand charts."
    },
    {
      icon: Bell,
      title: "Spending Alerts",
      description: "Get simple notifications when you've spent more than usual in a single day."
    },
    {
      icon: Clock,
      title: "Monthly Summaries",
      description: "Review how much you've spent at the end of each month with a simple summary report."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Use the app on your phone or computer with the same simple interface."
    },
    {
      icon: Wallet,
      title: "Expense Categories",
      description: "Organize expenses into basic categories like food, transport, and entertainment."
    },
    {
      icon: DollarSign,
      title: "Budget Tracking",
      description: "Set a simple monthly budget and track how much you've spent against it."
    },
    {
      icon: Search,
      title: "Search Expenses",
      description: "Find specific expenses quickly by searching for descriptions or amounts."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-blue-500 to-app-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple Expense Tracking</h1>
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Track your daily expenses with our easy-to-use expense tracker designed for beginners.
            </p>
            <Button asChild size="lg" className="bg-white text-app-blue hover:bg-gray-100">
              <Link to="/signup">Start Tracking for Free</Link>
            </Button>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Simple Features for Everyday Use</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 shadow-md">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to start tracking your expenses?</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Join thousands of beginners who have taken control of their spending with our simple expense tracker.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button asChild size="lg">
                    <Link to="/signup">Get Started Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">Log In</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
