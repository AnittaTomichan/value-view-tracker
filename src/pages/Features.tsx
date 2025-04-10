
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Shield, 
  BarChart2, 
  PieChart, 
  Clock, 
  Bell, 
  Smartphone, 
  CreditCard, 
  Zap, 
  Lock
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
      icon: BarChart2,
      title: "Smart Budgeting",
      description: "Set customizable budgets for different categories and track your spending habits to stay financially disciplined."
    },
    {
      icon: PieChart,
      title: "Visual Analytics",
      description: "View comprehensive charts and graphs that break down your expenses and help identify spending patterns."
    },
    {
      icon: Clock,
      title: "Recurring Expenses",
      description: "Set up automated tracking for recurring expenses like subscriptions and monthly bills."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Receive timely alerts when you're approaching budget limits or when bills are due."
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your financial data on any device with our responsive interface designed for desktops and mobile."
    },
    {
      icon: CreditCard,
      title: "Multiple Accounts",
      description: "Connect and manage multiple bank accounts and credit cards in one central dashboard."
    },
    {
      icon: Zap,
      title: "Quick Entry",
      description: "Add new expenses in seconds with our streamlined expense entry form and category suggestions."
    },
    {
      icon: Shield,
      title: "Secure Data",
      description: "Rest easy knowing your financial data is encrypted and protected with industry-leading security."
    },
    {
      icon: Lock,
      title: "Private by Design",
      description: "Your financial data is yours alone - we never share or sell your information to third parties."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-app-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Your Financial Journey</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Our expense tracker combines powerful tools with an intuitive interface to help you manage your finances with confidence.
            </p>
            <Button asChild size="lg" className="bg-white text-app-blue hover:bg-gray-100">
              <Link to="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </section>
        
        {/* Features Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Our Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 md:p-12 shadow-md">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to transform your financial management?</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of users who have improved their financial health with our powerful expense tracking tools.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button asChild size="lg">
                    <Link to="/signup">Get Started Today</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/contact">Contact Sales</Link>
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
