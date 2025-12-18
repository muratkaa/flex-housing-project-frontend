import {
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
    const baseClass = "flex items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-lg transition-colors text-xs md:text-sm font-medium";
    const activeClass = "bg-slate-900 text-white shadow-sm";
    const inactiveClass = "bg-slate-100 text-slate-900 hover:bg-slate-200";

    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FCFCF9] border-b border-slate-100">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">

        {/*LOGO*/}
        <Link to="/properties" className="flex items-center gap-2 md:gap-3 group">
          <div className="text-slate-900 group-hover:opacity-80 transition-opacity">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current md:w-8 md:h-8"
            >
              <path
                d="M16 2L2 12V28H30V12L16 2Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="50%"
                y="82%"
                textAnchor="middle"
                fontFamily="Times New Roman, serif"
                fontStyle="italic"
                fontSize="20"
                fontWeight="bold"
                fill="currentColor"
                stroke="none"
              >
                f
              </text>
            </svg>
          </div>

          {/* Logo Text */}
          <span className="hidden md:block text-2xl font-serif text-slate-900 tracking-tight group-hover:opacity-80 transition-opacity">
            the flex.
          </span>
        </Link>

        {/* MAIN ACTIONS*/}
        <div className="flex items-center gap-2 md:gap-3 md:mr-auto md:ml-8">

          {/* Manager Dashboard Link */}
          <Link to="/" className={getLinkClass('/')}>
            <LayoutDashboard size={16} className="md:w-[18px] md:h-[18px]" />
            <span>Dashboard</span>
          </Link>

          {/* Public Properties Link */}
          <Link to="/properties" className={getLinkClass('/properties')}>
            <Home size={16} className="md:w-[18px] md:h-[18px]" />
            <span>Public</span> {/* Mobilde kısa isim "Public" kalabilir */}
          </Link>

        </div>

        {/* RIGHT NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6">

          <div className="h-6 w-px bg-slate-200"></div>

          {/* PASSIVE (MOCKED) LINKS */}
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
              <Building2 size={18} />
              <span>Landlords</span>
              <ChevronDown size={14} className="mt-0.5" />
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
              <Info size={18} />
              <span>About</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
              <Mail size={18} />
              <span>Contact</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* LANGUAGE & CURRENCY */}
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
              <span className="text-lg leading-none">🇬🇧</span>
              <span>EN</span>
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