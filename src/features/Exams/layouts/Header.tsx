import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeaderProps {
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    about: [
      'Message from the President',
      'Operations and future plans',
      'History',
      'Facts and Figures',
      'Awards and honors',
      'University profile',
      'Living in Kyoto',
      'Public relations',
      'Employment',
      'Human rights',
      'Gender equality',
      'Health, safety, and environment',
      'Kyoto University from a Global Perspective',
    ],
    research: [
      'Research news and departments',
      'Policies',
      'Collaboration',
      'Research support and scholarships',
      'Careers',
      'Visa/Housing/Daily Life',
      'About',
      'Research compliance & ethics',
    ],
    study: [
      'Admissions',
      'Academic Programs',
      'Student Life',
      'Campus Facilities',
      'Tuition and Fees',
      'Scholarships',
    ],
    global: [
      'International Programs',
      'Global Partnerships',
      'Student Exchange',
      'Study Abroad',
      'International Students',
      'Global Initiatives',
    ],
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="flex bg-red-800">
        {/* White Banner - Spans both sections vertically */}
        <div className={`bg-white flex items-center justify-center ml-4 transition-all duration-300 ${isScrolled ? 'w-16' : 'w-24'}`}>
          <div className={`text-[#003366] text-center font-light leading-tight transition-all duration-300 ${isScrolled ? 'text-[10px]' : 'text-xs'}`}>
            京都
            <br />
            大学
          </div>
        </div>

        {/* Right Side - Contains both Top and Bottom sections */}
        <div className="flex-1">
          {/* Top Section - Navy Blue Background */}
          <div className="bg-[#003366] transition-all duration-300">
            <div className="container mx-auto px-4">
              <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-1.5' : 'py-3'}`}>
                {/* Left Side - Logo and University Name */}
                <div className="flex items-center gap-3">
                  <div className={`bg-white rounded-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-9 h-9' : 'w-12 h-12'}`}>
                    <div className={`bg-[#003366] rounded-full transition-all duration-300 ${isScrolled ? 'w-7 h-7' : 'w-10 h-10'}`}></div>
                  </div>
                  <span className={`text-white font-semibold tracking-wide transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-2xl'}`}>
                    KYOTO UNIVERSITY
                  </span>
                </div>

                {/* Right Side - Two Rows of Links */}
                <div className={`flex flex-col items-end transition-all duration-300 ${isScrolled ? 'gap-1' : 'gap-2'}`}>
                  {/* First Row: Events, Directions, Contact, Search, Language */}
                  <div className={`flex items-center text-white transition-all duration-300 ${isScrolled ? 'gap-3 text-xs' : 'gap-6 text-sm'}`}>
                    <a href="/events" className="hover:text-gray-200 transition-colors">
                      Events
                    </a>
                    <a href="/directions" className="hover:text-gray-200 transition-colors">
                      Directions
                    </a>
                    <a href="/contact" className="hover:text-gray-200 transition-colors">
                      Contact
                    </a>
                    <div className={`bg-white/30 transition-all duration-300 ${isScrolled ? 'w-px h-4' : 'w-px h-6'}`}></div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white/10 transition-all duration-300 ${isScrolled ? 'h-6 w-6' : 'h-8 w-8'}`}
                    >
                      <Search className={`transition-all duration-300 ${isScrolled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                    </Button>
                    <Select defaultValue="en">
                      <SelectTrigger className={`bg-transparent border-white/20 text-white hover:bg-white/10 transition-all duration-300 ${isScrolled ? 'w-24 h-6 text-xs' : 'w-32 h-8'}`}>
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="th">ไทย</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second Row: Current Students & Staff, Alumni, Make a gift */}
                  <div className={`flex items-center text-white transition-all duration-300 ${isScrolled ? 'gap-2 text-xs' : 'gap-4 text-sm'}`}>
                    <a
                      href="/current-students"
                      className="hover:text-gray-200 transition-colors"
                    >
                      Current Students & Staff
                    </a>
                    <a href="/alumni" className="hover:text-gray-200 transition-colors">
                      Alumni
                    </a>
                    <Button
                      variant="outline"
                      className={`bg-white text-[#003366] hover:bg-gray-100 border-0 transition-all duration-300 ${isScrolled ? 'h-6 text-xs px-3' : 'h-8'}`}
                      size="sm"
                    >
                      Make a gift
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Darker Navy with Navigation */}
          <div className="bg-[#002855] border-t border-white/10 relative transition-all duration-300">
            <div className="container mx-auto px-4">
              <div className={`flex items-center gap-8 transition-all duration-300 ${isScrolled ? 'h-10' : 'h-14'}`}>
                {/* About Menu */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu('about')}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className={`text-white hover:bg-white/10 rounded transition-all duration-300 h-full ${isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'}`}>
                    About
                  </button>
                  {activeMenu === 'about' && (
                    <>
                      {/* Invisible bridge to connect button to dropdown */}
                      <div className="absolute left-0 right-0 top-full h-4 bg-transparent"></div>
                      <div className={`fixed left-0 right-0 bg-[#2d2d2d] border-t border-white/10 shadow-lg z-50 transition-all duration-300 ${isScrolled ? 'top-[112px]' : 'top-[154px]'}`}>
                        <div className="container mx-auto px-4 py-8">
                          <div className="grid grid-cols-3 gap-x-12 gap-y-3">
                            {menuItems.about.map((item, index) => (
                              <a
                                key={index}
                                href={`/about/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 py-1"
                              >
                                <span className="text-gray-400">›</span>
                                <span>{item}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Research & Collaborate Menu */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu('research')}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className={`text-white hover:bg-white/10 rounded transition-all duration-300 h-full ${isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'}`}>
                    Research & Collaborate
                  </button>
                  {activeMenu === 'research' && (
                    <>
                      {/* Invisible bridge to connect button to dropdown */}
                      <div className="absolute left-0 right-0 top-full h-4 bg-transparent"></div>
                      <div className={`fixed left-0 right-0 bg-[#2d2d2d] border-t border-white/10 shadow-lg z-50 transition-all duration-300 ${isScrolled ? 'top-[112px]' : 'top-[154px]'}`}>
                        <div className="container mx-auto px-4 py-8">
                          <div className="grid grid-cols-3 gap-x-12 gap-y-3">
                            {menuItems.research.map((item, index) => (
                              <a
                                key={index}
                                href={`/research/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 py-1"
                              >
                                <span className="text-gray-400">›</span>
                                <span>{item}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Study at KyotoU Menu */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu('study')}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className={`text-white hover:bg-white/10 rounded transition-all duration-300 h-full ${isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'}`}>
                    Study at KyotoU
                  </button>
                  {activeMenu === 'study' && (
                    <>
                      {/* Invisible bridge to connect button to dropdown */}
                      <div className="absolute left-0 right-0 top-full h-4 bg-transparent"></div>
                      <div className={`fixed left-0 right-0 bg-[#2d2d2d] border-t border-white/10 shadow-lg z-50 transition-all duration-300 ${isScrolled ? 'top-[112px]' : 'top-[154px]'}`}>
                        <div className="container mx-auto px-4 py-8">
                          <div className="grid grid-cols-3 gap-x-12 gap-y-3">
                            {menuItems.study.map((item, index) => (
                              <a
                                key={index}
                                href={`/study/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 py-1"
                              >
                                <span className="text-gray-400">›</span>
                                <span>{item}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Global KyotoU Menu */}
                <div
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveMenu('global')}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className={`text-white hover:bg-white/10 rounded transition-all duration-300 h-full ${isScrolled ? 'px-3 py-1 text-sm' : 'px-4 py-2'}`}>
                    Global KyotoU
                  </button>
                  {activeMenu === 'global' && (
                    <>
                      {/* Invisible bridge to connect button to dropdown */}
                      <div className="absolute left-0 right-0 top-full h-4 bg-transparent"></div>
                      <div className={`fixed left-0 right-0 bg-[#2d2d2d] border-t border-white/10 shadow-lg z-50 transition-all duration-300 ${isScrolled ? 'top-[112px]' : 'top-[154px]'}`}>
                        <div className="container mx-auto px-4 py-8">
                          <div className="grid grid-cols-3 gap-x-12 gap-y-3">
                            {menuItems.global.map((item, index) => (
                              <a
                                key={index}
                                href={`/global/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 py-1"
                              >
                                <span className="text-gray-400">›</span>
                                <span>{item}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className={`bg-[#001a33] border-t border-white/10 transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center gap-2 h-full text-gray-300 transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span>›</span>
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <span>›</span>
            <span className="text-white">History</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;