import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary text-white'
          : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
      }`}
    >
      {children}
    </Link>
  );
};

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">MatchPro</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/app-matchpro-resume">Resume Builder</NavLink>
            <NavLink to="/app-job-matching">Job Matching</NavLink>
            <NavLink to="/app-resume-tailoring">Resume Tailoring</NavLink>
            <NavLink to="/app-interview-coach">Interview Coach</NavLink>
          </div>

          {/* User Menu - Placeholder for now */}
          <div className="flex items-center">
            <button className="btn btn-outline">Sign In</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
