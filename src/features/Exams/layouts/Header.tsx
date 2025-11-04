import React from 'react';
import { Search } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
        
      <div className="flex bg-red-800">
        {/* White Banner - Spans both sections vertically */}
        <div className="bg-white w-24 flex items-center justify-center ml-4">
          {/* Replace this div with your white banner image */}
          <div className="text-[#003366] text-center text-xs font-light leading-tight">
            京都
            <br />
            大学
          </div>
        </div>

        {/* Right Side - Contains both Top and Bottom sections */}
        <div className="flex-1">
          {/* Top Section - Navy Blue Background */}
          <div className="bg-[#003366]">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-3">
                {/* Left Side - Logo and University Name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    {/* University Logo/Seal - Replace with actual logo */}
                    <div className="w-10 h-10 bg-[#003366] rounded-full"></div>
                  </div>
                  <span className="text-white text-2xl font-semibold tracking-wide">
                    KYOTO UNIVERSITY
                  </span>
                </div>

                {/* Right Side - Two Rows of Links */}
                <div className="flex flex-col items-end gap-2">
                  {/* First Row: Events, Directions, Contact, Search, Language */}
                  <div className="flex items-center gap-6 text-white text-sm">
                    <a href="/events" className="hover:text-gray-200 transition-colors">
                      Events
                    </a>
                    <a href="/directions" className="hover:text-gray-200 transition-colors">
                      Directions
                    </a>
                    <a href="/contact" className="hover:text-gray-200 transition-colors">
                      Contact
                    </a>
                    <div className="w-px h-6 bg-white/30"></div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/10"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-32 h-8 bg-transparent border-white/20 text-white hover:bg-white/10">
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
                  <div className="flex items-center gap-4 text-white text-sm">
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
                      className="bg-white text-[#003366] hover:bg-gray-100 border-0 h-8"
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
          <div className="bg-[#002855] border-t border-white/10">
            <div className="container mx-auto px-4">
              <div className="flex items-center h-14">
                {/* Navigation Menu */}
                <NavigationMenu>
                  <NavigationMenuList className="gap-8">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                        About
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/about/overview"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Overview</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Learn about Kyoto University
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/about/history"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">History</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Our rich heritage and traditions
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                        Research & Collaborate
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/research"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  Research Areas
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Explore our research domains
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                        Study at KyotoU
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/admissions"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Admissions</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Join our academic community
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                        Global KyotoU
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/international"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  International Programs
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Global partnerships and opportunities
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#001a33] border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 h-10 text-sm text-gray-300">
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