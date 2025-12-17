import {
    Briefcase,
    Building2,
    ChevronDown,
    Home,
    Info,
    LayoutDashboard,
    Mail
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {

    const getLinkClass = (path: string) => {
    const baseClass = "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium";
    const activeClass = "bg-slate-900 text-white shadow-sm";
    const inactiveClass = "bg-slate-100 text-slate-900 hover:bg-slate-200";

    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FCFCF9] border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">


        <Link to="/properties" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 border border-slate-800 flex items-end justify-center pb-1 rounded-t-full rounded-bl-full">
            <span className="text-slate-800 font-serif italic font-bold">f</span>
          </div>
          <span className="text-2xl font-serif text-slate-800 tracking-tight group-hover:opacity-80 transition-opacity">
            the flex.
          </span>
        </Link>

        {/* RIGHT NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">

          {/* 1. MANAGER DASHBOARD  */}
          <div className="flex items-center gap-3 mr-4">

            {/* 1. MANAGER DASHBOARD LINK */}
            <Link to="/" className={getLinkClass('/')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>

            {/* 2. PUBLIC PROPERTIES LINK */}
            <Link to="/properties" className={getLinkClass('/properties')}>
              <Home size={18} />
              <span>Public View</span>
            </Link>

          </div>

          {/* DIVIDER */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* 2. LANDLORDS  */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
            <Building2 size={18} />
            <span>Landlords</span>
            <ChevronDown size={14} className="mt-0.5" />
          </div>

          {/* 3. ABOUT US  */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
            <Info size={18} />
            <span>About Us</span>
          </div>

          {/* 4. CAREERS  */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
            <Briefcase size={18} />
            <span>Careers</span>
          </div>

          {/* 5. CONTACT  */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
            <Mail size={18} />
            <span>Contact</span>
          </div>

          {/* DIVIDER */}
          <div className="h-6 w-px bg-slate-200"></div>

          {/* 6. LANGUAGE & CURRENCY */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <span className="text-lg leading-none">🇬🇧</span>
              <span>English</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
              <span className="font-serif font-semibold text-lg">£</span>
              <span>GBP</span>
            </div>
          </div>

        </nav>
      </div>
    </header>
  );
};