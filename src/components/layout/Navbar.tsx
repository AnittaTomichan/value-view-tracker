
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-app-blue">Expense Tracker</Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-app-blue">Home</Link>
          <Link to="/features" className="text-gray-700 hover:text-app-blue">Features</Link>
          <Link to="/contact" className="text-gray-700 hover:text-app-blue">Contact</Link>
        </div>
        
        <div className="flex space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
